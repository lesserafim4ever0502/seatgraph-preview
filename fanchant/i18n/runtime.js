/* Static-export bridge. Translation resources and supported languages live in JSON. */
(function () {
  "use strict";
  const { config, messages, source } = window.SeatGraphTranslations;
  const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
  const sourceKeys = new Map(Object.entries(source).map(([key, value]) => [value, key]));
  sourceKeys.set("This page could not be found.", "notFound.this_page_could_not_be_found");
  const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = Object.entries(source).filter(([, value]) => /\{\w+\}/.test(value)).map(([key, value]) => {
    const names = [];
    const parts = value.split(/(\{\w+\})/).map((part) => {
      if (/^\{\w+\}$/.test(part)) { names.push(part.slice(1, -1)); return "(.+?)"; }
      return escapeRegex(part);
    });
    return { key, names, regex: new RegExp("^" + parts.join("") + "$") };
  });
  function resolveLocale(value) {
    if (typeof value !== "string") return null;
    const normalized = value.replace(/_/g, "-").toLowerCase();
    const exact = config.locales.find((item) => [item.code, ...(item.aliases || [])].some((code) => code.toLowerCase() === normalized));
    if (exact) return exact.code;
    // Prefer an explicit script/region before a generic language fallback.
    if (/^zh-(?:hant|tw|hk|mo)(?:-|$)/.test(normalized)) return config.locales.find((item) => item.code === "zh-TW")?.code || null;
    const prefix = config.locales.flatMap((item) => [item.code, ...(item.aliases || [])].map((alias) => ({ code: item.code, alias: alias.toLowerCase() })))
      .filter((item) => normalized.startsWith(item.alias + "-"))
      .sort((left, right) => right.alias.length - left.alias.length)[0];
    return prefix?.code || null;
  }
  let saved;
  try { saved = localStorage.getItem(config.storageKey); } catch (_) { /* Storage may be disabled. */ }
  const query = new URL(location.href).searchParams.get(config.queryParameter);
  const browserLocale = (navigator.languages || [navigator.language]).map(resolveLocale).find(Boolean);
  let locale = resolveLocale(query) || resolveLocale(saved) || browserLocale || config.defaultLocale;
  // A shared language URL also carries that preference into subsequent pages.
  if (resolveLocale(query)) {
    saved = locale;
    try { localStorage.setItem(config.storageKey, locale); } catch (_) { /* Continue in memory. */ }
  }
  let renderLocale = config.sourceLocale;
  const listeners = new Set();
  const wrappers = new WeakMap();
  const textBindings = new WeakMap();
  const attributeBindings = new WeakMap();
  const attributes = ["alt", "title", "aria-label", "aria-description", "placeholder"];
  let started = false;
  let scheduled = false;
  let selector;
  function t(key, parameters = {}, language = locale) {
    const template = own(messages[language] || {}, key) ? messages[language][key] : messages[config.defaultLocale][key] || source[key];
    if (typeof template !== "string") return key;
    return template.replace(/\{(\w+)\}/g, (match, name) => own(parameters, name) ? String(parameters[name]) : match);
  }
  function translate(value, language = locale) {
    if (typeof value !== "string" || !value) return value;
    const key = sourceKeys.get(value);
    if (key) return t(key, {}, language);
    for (const pattern of patterns) {
      const match = value.match(pattern.regex);
      if (match) return t(pattern.key, Object.fromEntries(pattern.names.map((name, index) => [name, translate(match[index + 1], language)])), language);
    }
    // Whitespace around an exported text node is layout, not part of the message.
    const trimmed = value.trim();
    const trimmedKey = sourceKeys.get(trimmed);
    if (trimmedKey && trimmed !== value) return value.replace(trimmed, t(trimmedKey, {}, language));
    return value;
  }
  function boundValue(current, previous) {
    const original = previous && current === previous.output ? previous.source : current;
    return { source: original, output: translate(original) };
  }
  function syncDocument() {
    scheduled = false;
    // Add tools after hydration; no edits to generated React markup or bundles.
    const navigation = document.querySelector('.sg-header nav, .editorial-nav, .venue-topbar');
    if (navigation && !navigation.querySelector('[data-fanchant-link]')) {
      const script = document.querySelector('script[src$="/i18n/runtime.js"]');
      if (script) {
        const link = document.createElement('a');
        link.href = new URL('../fanchant/', script.src).href;
        link.dataset.fanchantLink = '';
        link.dataset.i18n = 'fanchant.nav';
        link.textContent = t('fanchant.nav');
        navigation.append(link);
      }
    }
    document.documentElement.lang = locale;
    const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement?.closest("script,style,textarea,[data-i18n-ignore]") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const binding = boundValue(node.data, textBindings.get(node));
      textBindings.set(node, binding);
      if (node.data !== binding.output) node.data = binding.output;
    }
    document.querySelectorAll("[alt],[title],[aria-label],[aria-description],[placeholder],meta[name='description'],[data-i18n]").forEach((element) => {
      if (element.closest("[data-i18n-ignore]")) return;
      const bindings = attributeBindings.get(element) || {};
      const names = element.matches("meta[name='description']") ? [...attributes, "content"] : attributes;
      for (const name of names) {
        if (!element.hasAttribute(name)) continue;
        const binding = boundValue(element.getAttribute(name), bindings[name]);
        bindings[name] = binding;
        if (element.getAttribute(name) !== binding.output) element.setAttribute(name, binding.output);
      }
      attributeBindings.set(element, bindings);
      // Explicit keys are the extension point for newly authored static markup.
      if (element.dataset.i18n && element.children.length === 0) {
        const translated = t(element.dataset.i18n);
        if (element.textContent !== translated) element.textContent = translated;
      }
    });
    if (selector) {
      selector.value = locale;
      const label = t("common.language");
      if (selector.getAttribute("aria-label") !== label) selector.setAttribute("aria-label", label);
      if (selector.title !== label) selector.title = label;
    }
  }
  function schedule() {
    if (!scheduled) { scheduled = true; queueMicrotask(syncDocument); }
  }
  function ready() {
    if (started) return;
    started = true;
    const host = document.querySelector(".sg-header .account, .editorial-header .account, .venue-topbar") || document.body;
    const control = document.createElement("label");
    control.className = "language-control";
    control.dataset.i18nIgnore = "";
    const icon = document.createElement("span");
    icon.textContent = "◎";
    icon.setAttribute("aria-hidden", "true");
    selector = document.createElement("select");
    selector.name = "language";
    for (const item of config.locales) {
      const option = document.createElement("option");
      option.value = item.code; option.textContent = item.label; selector.append(option);
    }
    selector.addEventListener("change", (event) => setLocale(event.target.value));
    control.append(icon, selector); host.append(control);
    new MutationObserver(schedule).observe(document.documentElement, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: [...attributes, "content"] });
    syncDocument();
  }
  function setLocale(value, persist = true) {
    const next = resolveLocale(value);
    if (!next) return false;
    locale = next;
    renderLocale = next;
    saved = next;
    if (persist) {
      try { localStorage.setItem(config.storageKey, next); } catch (_) { /* Continue in memory. */ }
      const url = new URL(location.href);
      url.searchParams.set(config.queryParameter, next);
      history.replaceState(history.state, "", url);
    }
    for (const listener of listeners) listener();
    if (started) schedule();
    window.dispatchEvent(new CustomEvent("seatgraph:localechange", { detail: { locale: next } }));
    return true;
  }
  function jsxRuntime(runtime) {
    const adapt = (create) => (type, props, key) => {
      if (!props) return create(type, props, key);
      const translated = { ...props };
      const children = (value) => typeof value === "string" ? translate(value, renderLocale) : Array.isArray(value) ? value.map(children) : value;
      if (own(props, "children")) translated.children = children(props.children);
      if (typeof type === "string") for (const name of attributes) {
        if (typeof props[name] === "string") translated[name] = translate(props[name], renderLocale);
      }
      return create(type, translated, key);
    };
    return { ...runtime, jsx: adapt(runtime.jsx), jsxs: adapt(runtime.jsxs) };
  }
  function wrapComponent(Component, React) {
    if (!wrappers.has(Component)) {
      function LocalizedComponent(props) {
        renderLocale = React.useSyncExternalStore((listener) => { listeners.add(listener); return () => listeners.delete(listener); }, () => locale, () => config.sourceLocale);
        React.useEffect(ready, []);
        return React.createElement(Component, props);
      }
      wrappers.set(Component, LocalizedComponent);
    }
    return wrappers.get(Component);
  }
  window.SeatGraphI18n = { t, translate, setLocale, resolveLocale, jsxRuntime, wrapComponent, get locale() { return renderLocale; }, get resolvedLocale() { return locale; }, get locales() { return config.locales; } };
  window.addEventListener("storage", (event) => { if (event.key === config.storageKey) setLocale(event.newValue || config.defaultLocale, false); });
  window.addEventListener("popstate", () => setLocale(new URL(location.href).searchParams.get(config.queryParameter) || saved || config.defaultLocale, false));
  // Not-found pages have no application component to signal hydration completion.
  window.addEventListener("load", () => {
    if (!document.querySelector("script[src*='/app/page-'],script[src*='/app/venue/page-']")) ready();
  }, { once: true });
})();
