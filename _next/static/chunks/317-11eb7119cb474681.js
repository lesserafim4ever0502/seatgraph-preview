"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[317],{216:(e,t,n)=>{n.d(t,{Hl:()=>d});var i=n(9045),r=n(3001),o=n(1224);function a(e,t){let n;return(...i)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...i),t)}}let s=["x","y","top","bottom","left","right","width","height"];var l=n(359),u=n(7933);function c({ref:e,children:t,fallback:n,resize:l,style:d,gl:f,events:p=i.f,eventSource:h,eventPrefix:m,shadows:v,linear:b,flat:g,legacy:y,orthographic:w,frameloop:E,dpr:x,performance:S,raycaster:A,camera:L,scene:O,onPointerMissed:_,onCreated:P,...T}){r.useMemo(()=>(0,i.e)(o),[]);let M=(0,i.u)(),[z,j]=function({debounce:e,scroll:t,polyfill:n,offsetSize:i}={debounce:0,scroll:!1,offsetSize:!1}){var o,l,u;let c=n||("u"<typeof window?class{}:window.ResizeObserver);if(!c)throw Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");let[d,f]=(0,r.useState)({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),p=(0,r.useRef)({element:null,scrollContainers:null,resizeObserver:null,lastBounds:d,orientationHandler:null}),h=e?"number"==typeof e?e:e.scroll:null,m=e?"number"==typeof e?e:e.resize:null,v=(0,r.useRef)(!1);(0,r.useEffect)(()=>(v.current=!0,()=>void(v.current=!1)));let[b,g,y]=(0,r.useMemo)(()=>{let e=()=>{let e,t;if(!p.current.element)return;let{left:n,top:r,width:o,height:a,bottom:l,right:u,x:c,y:d}=p.current.element.getBoundingClientRect(),h={left:n,top:r,width:o,height:a,bottom:l,right:u,x:c,y:d};p.current.element instanceof HTMLElement&&i&&(h.height=p.current.element.offsetHeight,h.width=p.current.element.offsetWidth),Object.freeze(h),v.current&&(e=p.current.lastBounds,t=h,!s.every(n=>e[n]===t[n]))&&f(p.current.lastBounds=h)};return[e,m?a(e,m):e,h?a(e,h):e]},[f,i,h,m]);function w(){p.current.scrollContainers&&(p.current.scrollContainers.forEach(e=>e.removeEventListener("scroll",y,!0)),p.current.scrollContainers=null),p.current.resizeObserver&&(p.current.resizeObserver.disconnect(),p.current.resizeObserver=null),p.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",p.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",p.current.orientationHandler))}function E(){p.current.element&&(p.current.resizeObserver=new c(y),p.current.resizeObserver.observe(p.current.element),t&&p.current.scrollContainers&&p.current.scrollContainers.forEach(e=>e.addEventListener("scroll",y,{capture:!0,passive:!0})),p.current.orientationHandler=()=>{y()},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",p.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",p.current.orientationHandler))}return o=y,l=!!t,(0,r.useEffect)(()=>{if(l)return window.addEventListener("scroll",o,{capture:!0,passive:!0}),()=>void window.removeEventListener("scroll",o,!0)},[o,l]),u=g,(0,r.useEffect)(()=>(window.addEventListener("resize",u),()=>void window.removeEventListener("resize",u)),[u]),(0,r.useEffect)(()=>{w(),E()},[t,y,g]),(0,r.useEffect)(()=>w,[]),[e=>{e&&e!==p.current.element&&(w(),p.current.element=e,p.current.scrollContainers=function e(t){let n=[];if(!t||t===document.body)return n;let{overflow:i,overflowX:r,overflowY:o}=window.getComputedStyle(t);return[i,r,o].some(e=>"auto"===e||"scroll"===e)&&n.push(t),[...n,...e(t.parentElement)]}(e),E())},d,b]}({scroll:!0,debounce:{scroll:50,resize:0},...l}),C=r.useRef(null),U=r.useRef(null);r.useImperativeHandle(e,()=>C.current);let R=(0,i.a)(_),[I,k]=r.useState(!1),[D,H]=r.useState(!1);if(I)throw I;if(D)throw D;let N=r.useRef(null);(0,i.b)(()=>{let e=C.current;j.width>0&&j.height>0&&e&&(N.current||(N.current=(0,i.c)(e)),async function(){await N.current.configure({gl:f,scene:O,events:p,shadows:v,linear:b,flat:g,legacy:y,orthographic:w,frameloop:E,dpr:x,performance:S,raycaster:A,camera:L,size:j,onPointerMissed:(...e)=>null==R.current?void 0:R.current(...e),onCreated:e=>{null==e.events.connect||e.events.connect(h?(0,i.i)(h)?h.current:h:U.current),m&&e.setEvents({compute:(e,t)=>{let n=e[m+"X"],i=e[m+"Y"];t.pointer.set(n/t.size.width*2-1,-(2*(i/t.size.height))+1),t.raycaster.setFromCamera(t.pointer,t.camera)}}),null==P||P(e)}}),N.current.render((0,u.jsx)(M,{children:(0,u.jsx)(i.E,{set:H,children:(0,u.jsx)(r.Suspense,{fallback:(0,u.jsx)(i.B,{set:k}),children:null!=t?t:null})})}))}())}),r.useEffect(()=>{let e=C.current;if(e)return()=>(0,i.d)(e)},[]);let B=h?"none":"auto";return(0,u.jsx)("div",{ref:U,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:B,...d},...T,children:(0,u.jsx)("div",{ref:z,style:{width:"100%",height:"100%"},children:(0,u.jsx)("canvas",{ref:C,style:{display:"block"},children:n})})})}function d(e){return(0,u.jsx)(l.Af,{children:(0,u.jsx)(c,{...e})})}n(1150)},359:(e,t,n)=>{n.d(t,{Af:()=>u,Nz:()=>a,u5:()=>c,y3:()=>p});var i,r,o=n(3001);function a(e,t,n){if(!e)return;if(!0===n(e))return e;let i=t?e.return:e.child;for(;i;){let e=a(i,t,n);if(e)return e;i=t?null:i.sibling}}function s(e){try{return Object.defineProperties(e,{_currentRenderer:{get:()=>null,set(){}},_currentRenderer2:{get:()=>null,set(){}}})}catch(t){return e}}"u">typeof window&&((null==(i=window.document)?void 0:i.createElement)||(null==(r=window.navigator)?void 0:r.product)==="ReactNative")?o.useLayoutEffect:o.useEffect;let l=s(o.createContext(null));class u extends o.Component{render(){return o.createElement(l.Provider,{value:this._reactInternals},this.props.children)}}function c(){let e=o.useContext(l);if(null===e)throw Error("its-fine: useFiber must be called within a <FiberProvider />!");let t=o.useId();return o.useMemo(()=>{for(let n of[e,null==e?void 0:e.alternate]){if(!n)continue;let e=a(n,!1,e=>{let n=e.memoizedState;for(;n;){if(n.memoizedState===t)return!0;n=n.next}});if(e)return e}},[e,t])}let d=Symbol.for("react.context"),f=e=>null!==e&&"object"==typeof e&&"$$typeof"in e&&e.$$typeof===d;function p(){let e=function(){let e=c(),[t]=o.useState(()=>new Map);t.clear();let n=e;for(;n;){let e=n.type;f(e)&&e!==l&&!t.has(e)&&t.set(e,o.use(s(e))),n=n.return}return t}();return o.useMemo(()=>Array.from(e.keys()).reduce((t,n)=>i=>o.createElement(t,null,o.createElement(n.Provider,{...i,value:e.get(n)})),e=>o.createElement(u,{...e})),[e])}},925:(e,t,n)=>{n.d(t,{DY:()=>a,IU:()=>l,uv:()=>s});let i=[];function r(e,t,n=(e,t)=>e===t){if(e===t)return!0;if(!e||!t)return!1;let i=e.length;if(t.length!==i)return!1;for(let r=0;r<i;r++)if(!n(e[r],t[r]))return!1;return!0}function o(e,t=null,n=!1,a={}){for(let o of(null===t&&(t=[e]),i))if(r(t,o.keys,o.equal)){if(n)return;if(Object.prototype.hasOwnProperty.call(o,"error"))throw o.error;if(Object.prototype.hasOwnProperty.call(o,"response"))return a.lifespan&&a.lifespan>0&&(o.timeout&&clearTimeout(o.timeout),o.timeout=setTimeout(o.remove,a.lifespan)),o.response;if(!n)throw o.promise}let s={keys:t,equal:a.equal,remove:()=>{let e=i.indexOf(s);-1!==e&&i.splice(e,1)},promise:("object"==typeof e&&"function"==typeof e.then?e:e(...t)).then(e=>{s.response=e,a.lifespan&&a.lifespan>0&&(s.timeout=setTimeout(s.remove,a.lifespan))}).catch(e=>s.error=e)};if(i.push(s),!n)throw s.promise}let a=(e,t,n)=>o(e,t,!1,n),s=(e,t,n)=>void o(e,t,!0,n),l=e=>{if(void 0===e||0===e.length)i.splice(0,i.length);else{let t=i.find(t=>r(e,t.keys,t.equal));t&&t.remove()}}},1150:(e,t,n)=>{e.exports=n(9679)},1653:(e,t,n)=>{e.exports=n(9680)},2703:(e,t,n)=>{e.exports=n(3527)},3527:(e,t,n)=>{var i=n(3001),r=n(1653),o="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},a=r.useSyncExternalStore,s=i.useRef,l=i.useEffect,u=i.useMemo,c=i.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,n,i,r){var d=s(null);if(null===d.current){var f={hasValue:!1,value:null};d.current=f}else f=d.current;var p=a(e,(d=u(function(){function e(e){if(!l){if(l=!0,a=e,e=i(e),void 0!==r&&f.hasValue){var t=f.value;if(r(t,e))return s=t}return s=e}if(t=s,o(a,e))return t;var n=i(e);return void 0!==r&&r(t,n)?(a=e,t):(a=e,s=n)}var a,s,l=!1,u=void 0===n?null:n;return[function(){return e(t())},null===u?void 0:function(){return e(u())}]},[t,n,i,r]))[0],d[1]);return l(function(){f.hasValue=!0,f.value=p},[p]),c(p),p}},5304:(e,t,n)=>{n.d(t,{g:()=>o});var i=n(1224),r=n(9691);class o{static init(){r.l.init();let{LTC_FLOAT_1:e,LTC_FLOAT_2:t,LTC_HALF_1:n,LTC_HALF_2:o}=r.l;i.UniformsLib.LTC_FLOAT_1=e,i.UniformsLib.LTC_FLOAT_2=t,i.UniformsLib.LTC_HALF_1=n,i.UniformsLib.LTC_HALF_2=o}}},6e3:(e,t,n)=>{let i,r;n.d(t,{N:()=>C});var o=n(6103),a=n(3001),s=n(4996),l=n(9045);let u=new s.NRn,c=new s.Pq0;class d extends s.CmU{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new s.qtW([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new s.qtW([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new s.LuO(t,6,1);return this.setAttribute("instanceStart",new s.eHs(n,3,0)),this.setAttribute("instanceEnd",new s.eHs(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let i=new s.LuO(n,2*t,1);return this.setAttribute("instanceColorStart",new s.eHs(i,t,0)),this.setAttribute("instanceColorEnd",new s.eHs(i,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new s.XJ7(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new s.NRn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),u.setFromBufferAttribute(t),this.boundingBox.union(u))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new s.iyt),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)c.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(c)),c.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(c));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var f=n(1224);let p=parseInt(s.sPf.replace(/\D+/g,""));class h extends s.BKk{constructor(e){super({type:"LineMaterial",uniforms:s.LlO.clone(s.LlO.merge([f.UniformsLib.common,f.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new s.I9Y(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${p>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let m=p>=125?"uv1":"uv2",v=new s.IUQ,b=new s.Pq0,g=new s.Pq0,y=new s.IUQ,w=new s.IUQ,E=new s.IUQ,x=new s.Pq0,S=new s.kn4,A=new s.cZY,L=new s.Pq0,O=new s.NRn,_=new s.iyt,P=new s.IUQ;function T(e,t,n){return P.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),P.multiplyScalar(1/P.w),P.x=r/n.width,P.y=r/n.height,P.applyMatrix4(e.projectionMatrixInverse),P.multiplyScalar(1/P.w),Math.abs(Math.max(P.x,P.y))}class M extends s.eaF{constructor(e=new d,t=new h({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let e=0,r=0,o=t.count;e<o;e++,r+=2)b.fromBufferAttribute(t,e),g.fromBufferAttribute(n,e),i[r]=0===r?0:i[r-1],i[r+1]=i[r]+b.distanceTo(g);let r=new s.LuO(i,2,1);return e.setAttribute("instanceDistanceStart",new s.eHs(r,1,0)),e.setAttribute("instanceDistanceEnd",new s.eHs(r,1,1)),this}raycast(e,t){let n,o,a=this.material.worldUnits,l=e.camera;null!==l||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let u=void 0!==e.params.Line2&&e.params.Line2.threshold||0;i=e.ray;let c=this.matrixWorld,d=this.geometry,f=this.material;if(r=f.linewidth+u,null===d.boundingSphere&&d.computeBoundingSphere(),_.copy(d.boundingSphere).applyMatrix4(c),a)n=.5*r;else{let e=Math.max(l.near,_.distanceToPoint(i.origin));n=T(l,e,f.resolution)}if(_.radius+=n,!1!==i.intersectsSphere(_)){if(null===d.boundingBox&&d.computeBoundingBox(),O.copy(d.boundingBox).applyMatrix4(c),a)o=.5*r;else{let e=Math.max(l.near,O.distanceToPoint(i.origin));o=T(l,e,f.resolution)}O.expandByScalar(o),!1!==i.intersectsBox(O)&&(a?function(e,t){let n=e.matrixWorld,o=e.geometry,a=o.attributes.instanceStart,l=o.attributes.instanceEnd,u=Math.min(o.instanceCount,a.count);for(let o=0;o<u;o++){A.start.fromBufferAttribute(a,o),A.end.fromBufferAttribute(l,o),A.applyMatrix4(n);let u=new s.Pq0,c=new s.Pq0;i.distanceSqToSegment(A.start,A.end,c,u),c.distanceTo(u)<.5*r&&t.push({point:c,pointOnLine:u,distance:i.origin.distanceTo(c),object:e,face:null,faceIndex:o,uv:null,[m]:null})}}(this,t):function(e,t,n){let o=t.projectionMatrix,a=e.material.resolution,l=e.matrixWorld,u=e.geometry,c=u.attributes.instanceStart,d=u.attributes.instanceEnd,f=Math.min(u.instanceCount,c.count),p=-t.near;i.at(1,E),E.w=1,E.applyMatrix4(t.matrixWorldInverse),E.applyMatrix4(o),E.multiplyScalar(1/E.w),E.x*=a.x/2,E.y*=a.y/2,E.z=0,x.copy(E),S.multiplyMatrices(t.matrixWorldInverse,l);for(let t=0;t<f;t++){if(y.fromBufferAttribute(c,t),w.fromBufferAttribute(d,t),y.w=1,w.w=1,y.applyMatrix4(S),w.applyMatrix4(S),y.z>p&&w.z>p)continue;if(y.z>p){let e=y.z-w.z,t=(y.z-p)/e;y.lerp(w,t)}else if(w.z>p){let e=w.z-y.z,t=(w.z-p)/e;w.lerp(y,t)}y.applyMatrix4(o),w.applyMatrix4(o),y.multiplyScalar(1/y.w),w.multiplyScalar(1/w.w),y.x*=a.x/2,y.y*=a.y/2,w.x*=a.x/2,w.y*=a.y/2,A.start.copy(y),A.start.z=0,A.end.copy(w),A.end.z=0;let u=A.closestPointToPointParameter(x,!0);A.at(u,L);let f=s.cj9.lerp(y.z,w.z,u),h=f>=-1&&f<=1,v=x.distanceTo(L)<.5*r;if(h&&v){A.start.fromBufferAttribute(c,t),A.end.fromBufferAttribute(d,t),A.start.applyMatrix4(l),A.end.applyMatrix4(l);let r=new s.Pq0,o=new s.Pq0;i.distanceSqToSegment(A.start,A.end,o,r),n.push({point:o,pointOnLine:r,distance:i.origin.distanceTo(o),object:e,face:null,faceIndex:t,uv:null,[m]:null})}}}(this,l,t))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(v),this.material.uniforms.resolution.value.set(v.z,v.w))}}class z extends d{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,i=new Float32Array(2*n);if(3===t)for(let r=0;r<n;r+=t)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5];else for(let r=0;r<n;r+=t)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5],i[2*r+6]=e[r+6],i[2*r+7]=e[r+7];return super.setColors(i,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class j extends M{constructor(e=new z,t=new h({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let C=a.forwardRef(function({points:e,color:t=0xffffff,vertexColors:n,linewidth:i,lineWidth:r,segments:u,dashed:c,...f},p){var m,v;let b=(0,l.C)(e=>e.size),g=a.useMemo(()=>u?new M:new j,[u]),[y]=a.useState(()=>new h),w=(null==n||null==(m=n[0])?void 0:m.length)===4?4:3,E=a.useMemo(()=>{let i=u?new d:new z,r=e.map(e=>{let t=Array.isArray(e);return e instanceof s.Pq0||e instanceof s.IUQ?[e.x,e.y,e.z]:e instanceof s.I9Y?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(i.setPositions(r.flat()),n){t=0xffffff;let e=n.map(e=>e instanceof s.Q1f?e.toArray():e);i.setColors(e.flat(),w)}return i},[e,u,n,w]);return a.useLayoutEffect(()=>{g.computeLineDistances()},[e,g]),a.useLayoutEffect(()=>{c?y.defines.USE_DASH="":delete y.defines.USE_DASH,y.needsUpdate=!0},[c,y]),a.useEffect(()=>()=>{E.dispose(),y.dispose()},[E]),a.createElement("primitive",(0,o.A)({object:g,ref:p},f),a.createElement("primitive",{object:E,attach:"geometry"}),a.createElement("primitive",(0,o.A)({object:y,attach:"material",color:t,vertexColors:!!n,resolution:[b.width,b.height],linewidth:null!=(v=null!=i?i:r)?v:1,dashed:c,transparent:4===w},f)))})},6103:(e,t,n)=>{n.d(t,{A:()=>i});function i(){return(i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)({}).hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(null,arguments)}},7195:(e,t,n)=>{n.d(t,{N:()=>v});var i=n(6103),r=n(9045),o=n(3001),a=n(4996),s=Object.defineProperty;class l{constructor(){((e,t)=>{let n,i;i=void 0,(n="symbol"!=typeof t?t+"":t)in e?s(e,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[n]=i})(this,"_listeners")}addEventListener(e,t){void 0===this._listeners&&(this._listeners={});let n=this._listeners;void 0===n[e]&&(n[e]=[]),-1===n[e].indexOf(t)&&n[e].push(t)}hasEventListener(e,t){if(void 0===this._listeners)return!1;let n=this._listeners;return void 0!==n[e]&&-1!==n[e].indexOf(t)}removeEventListener(e,t){if(void 0===this._listeners)return;let n=this._listeners[e];if(void 0!==n){let e=n.indexOf(t);-1!==e&&n.splice(e,1)}}dispatchEvent(e){if(void 0===this._listeners)return;let t=this._listeners[e.type];if(void 0!==t){e.target=this;let n=t.slice(0);for(let t=0,i=n.length;t<i;t++)n[t].call(this,e);e.target=null}}}var u=Object.defineProperty,c=(e,t,n)=>{let i;return(i="symbol"!=typeof t?t+"":t)in e?u(e,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[i]=n,n};let d=new a.RlV,f=new a.Zcv,p=Math.cos(Math.PI/180*70),h=(e,t)=>(e%t+t)%t;class m extends l{constructor(e,t){super(),c(this,"object"),c(this,"domElement"),c(this,"enabled",!0),c(this,"target",new a.Pq0),c(this,"minDistance",0),c(this,"maxDistance",1/0),c(this,"minZoom",0),c(this,"maxZoom",1/0),c(this,"minPolarAngle",0),c(this,"maxPolarAngle",Math.PI),c(this,"minAzimuthAngle",-1/0),c(this,"maxAzimuthAngle",1/0),c(this,"enableDamping",!1),c(this,"dampingFactor",.05),c(this,"enableZoom",!0),c(this,"zoomSpeed",1),c(this,"enableRotate",!0),c(this,"rotateSpeed",1),c(this,"enablePan",!0),c(this,"panSpeed",1),c(this,"screenSpacePanning",!0),c(this,"keyPanSpeed",7),c(this,"zoomToCursor",!1),c(this,"autoRotate",!1),c(this,"autoRotateSpeed",2),c(this,"reverseOrbit",!1),c(this,"reverseHorizontalOrbit",!1),c(this,"reverseVerticalOrbit",!1),c(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),c(this,"mouseButtons",{LEFT:a.kBv.ROTATE,MIDDLE:a.kBv.DOLLY,RIGHT:a.kBv.PAN}),c(this,"touches",{ONE:a.wtR.ROTATE,TWO:a.wtR.DOLLY_PAN}),c(this,"target0"),c(this,"position0"),c(this,"zoom0"),c(this,"_domElementKeyEvents",null),c(this,"getPolarAngle"),c(this,"getAzimuthalAngle"),c(this,"setPolarAngle"),c(this,"setAzimuthalAngle"),c(this,"getDistance"),c(this,"getZoomScale"),c(this,"listenToKeyEvents"),c(this,"stopListenToKeyEvents"),c(this,"saveState"),c(this,"reset"),c(this,"update"),c(this,"connect"),c(this,"dispose"),c(this,"dollyIn"),c(this,"dollyOut"),c(this,"getScale"),c(this,"setScale"),this.object=e,this.domElement=t,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>m.phi,this.getAzimuthalAngle=()=>m.theta,this.setPolarAngle=e=>{let t=h(e,2*Math.PI),i=m.phi;i<0&&(i+=2*Math.PI),t<0&&(t+=2*Math.PI);let r=Math.abs(t-i);2*Math.PI-r<r&&(t<i?t+=2*Math.PI:i+=2*Math.PI),v.phi=t-i,n.update()},this.setAzimuthalAngle=e=>{let t=h(e,2*Math.PI),i=m.theta;i<0&&(i+=2*Math.PI),t<0&&(t+=2*Math.PI);let r=Math.abs(t-i);2*Math.PI-r<r&&(t<i?t+=2*Math.PI:i+=2*Math.PI),v.theta=t-i,n.update()},this.getDistance=()=>n.object.position.distanceTo(n.target),this.listenToKeyEvents=e=>{e.addEventListener("keydown",ee),this._domElementKeyEvents=e},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",ee),this._domElementKeyEvents=null},this.saveState=()=>{n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=()=>{n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(i),n.update(),l=s.NONE},this.update=(()=>{let t=new a.Pq0,r=new a.Pq0(0,1,0),o=new a.PTz().setFromUnitVectors(e.up,r),c=o.clone().invert(),h=new a.Pq0,y=new a.PTz,w=2*Math.PI;return function(){let E=n.object.position;o.setFromUnitVectors(e.up,r),c.copy(o).invert(),t.copy(E).sub(n.target),t.applyQuaternion(o),m.setFromVector3(t),n.autoRotate&&l===s.NONE&&U(2*Math.PI/60/60*n.autoRotateSpeed),n.enableDamping?(m.theta+=v.theta*n.dampingFactor,m.phi+=v.phi*n.dampingFactor):(m.theta+=v.theta,m.phi+=v.phi);let x=n.minAzimuthAngle,S=n.maxAzimuthAngle;isFinite(x)&&isFinite(S)&&(x<-Math.PI?x+=w:x>Math.PI&&(x-=w),S<-Math.PI?S+=w:S>Math.PI&&(S-=w),x<=S?m.theta=Math.max(x,Math.min(S,m.theta)):m.theta=m.theta>(x+S)/2?Math.max(x,m.theta):Math.min(S,m.theta)),m.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,m.phi)),m.makeSafe(),!0===n.enableDamping?n.target.addScaledVector(g,n.dampingFactor):n.target.add(g),n.zoomToCursor&&M||n.object.isOrthographicCamera?m.radius=B(m.radius):m.radius=B(m.radius*b),t.setFromSpherical(m),t.applyQuaternion(c),E.copy(n.target).add(t),n.object.matrixAutoUpdate||n.object.updateMatrix(),n.object.lookAt(n.target),!0===n.enableDamping?(v.theta*=1-n.dampingFactor,v.phi*=1-n.dampingFactor,g.multiplyScalar(1-n.dampingFactor)):(v.set(0,0,0),g.set(0,0,0));let A=!1;if(n.zoomToCursor&&M){let i=null;if(n.object instanceof a.ubm&&n.object.isPerspectiveCamera){let e=t.length();i=B(e*b);let r=e-i;n.object.position.addScaledVector(P,r),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let e=new a.Pq0(T.x,T.y,0);e.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/b)),n.object.updateProjectionMatrix(),A=!0;let r=new a.Pq0(T.x,T.y,0);r.unproject(n.object),n.object.position.sub(r).add(e),n.object.updateMatrixWorld(),i=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;null!==i&&(n.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(i).add(n.object.position):(d.origin.copy(n.object.position),d.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(d.direction))<p?e.lookAt(n.target):(f.setFromNormalAndCoplanarPoint(n.object.up,n.target),d.intersectPlane(f,n.target))))}else n.object instanceof a.qUd&&n.object.isOrthographicCamera&&(A=1!==b)&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/b)),n.object.updateProjectionMatrix());return b=1,M=!1,!!(A||h.distanceToSquared(n.object.position)>u||8*(1-y.dot(n.object.quaternion))>u)&&(n.dispatchEvent(i),h.copy(n.object.position),y.copy(n.object.quaternion),A=!1,!0)}})(),this.connect=e=>{n.domElement=e,n.domElement.style.touchAction="none",n.domElement.addEventListener("contextmenu",et),n.domElement.addEventListener("pointerdown",K),n.domElement.addEventListener("pointercancel",$),n.domElement.addEventListener("wheel",J)},this.dispose=()=>{var e,t,i,r,o,a;n.domElement&&(n.domElement.style.touchAction="auto"),null==(e=n.domElement)||e.removeEventListener("contextmenu",et),null==(t=n.domElement)||t.removeEventListener("pointerdown",K),null==(i=n.domElement)||i.removeEventListener("pointercancel",$),null==(r=n.domElement)||r.removeEventListener("wheel",J),null==(o=n.domElement)||o.ownerDocument.removeEventListener("pointermove",Q),null==(a=n.domElement)||a.ownerDocument.removeEventListener("pointerup",$),null!==n._domElementKeyEvents&&n._domElementKeyEvents.removeEventListener("keydown",ee)};const n=this,i={type:"change"},r={type:"start"},o={type:"end"},s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let l=s.NONE;const u=1e-6,m=new a.YHV,v=new a.YHV;let b=1;const g=new a.Pq0,y=new a.I9Y,w=new a.I9Y,E=new a.I9Y,x=new a.I9Y,S=new a.I9Y,A=new a.I9Y,L=new a.I9Y,O=new a.I9Y,_=new a.I9Y,P=new a.Pq0,T=new a.I9Y;let M=!1;const z=[],j={};function C(){return Math.pow(.95,n.zoomSpeed)}function U(e){n.reverseOrbit||n.reverseHorizontalOrbit?v.theta+=e:v.theta-=e}function R(e){n.reverseOrbit||n.reverseVerticalOrbit?v.phi+=e:v.phi-=e}const I=(()=>{let e=new a.Pq0;return function(t,n){e.setFromMatrixColumn(n,0),e.multiplyScalar(-t),g.add(e)}})(),k=(()=>{let e=new a.Pq0;return function(t,i){!0===n.screenSpacePanning?e.setFromMatrixColumn(i,1):(e.setFromMatrixColumn(i,0),e.crossVectors(n.object.up,e)),e.multiplyScalar(t),g.add(e)}})(),D=(()=>{let e=new a.Pq0;return function(t,i){let r=n.domElement;if(r&&n.object instanceof a.ubm&&n.object.isPerspectiveCamera){let o=n.object.position;e.copy(o).sub(n.target);let a=e.length();I(2*t*(a*=Math.tan(n.object.fov/2*Math.PI/180))/r.clientHeight,n.object.matrix),k(2*i*a/r.clientHeight,n.object.matrix)}else r&&n.object instanceof a.qUd&&n.object.isOrthographicCamera?(I(t*(n.object.right-n.object.left)/n.object.zoom/r.clientWidth,n.object.matrix),k(i*(n.object.top-n.object.bottom)/n.object.zoom/r.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function H(e){n.object instanceof a.ubm&&n.object.isPerspectiveCamera||n.object instanceof a.qUd&&n.object.isOrthographicCamera?b=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function N(e){if(!n.zoomToCursor||!n.domElement)return;M=!0;let t=n.domElement.getBoundingClientRect(),i=e.clientX-t.left,r=e.clientY-t.top,o=t.width,a=t.height;T.x=i/o*2-1,T.y=-(r/a*2)+1,P.set(T.x,T.y,1).unproject(n.object).sub(n.object.position).normalize()}function B(e){return Math.max(n.minDistance,Math.min(n.maxDistance,e))}function Y(e){y.set(e.clientX,e.clientY)}function F(e){x.set(e.clientX,e.clientY)}function q(){if(1==z.length)y.set(z[0].pageX,z[0].pageY);else{let e=.5*(z[0].pageX+z[1].pageX),t=.5*(z[0].pageY+z[1].pageY);y.set(e,t)}}function G(){if(1==z.length)x.set(z[0].pageX,z[0].pageY);else{let e=.5*(z[0].pageX+z[1].pageX),t=.5*(z[0].pageY+z[1].pageY);x.set(e,t)}}function V(){let e=z[0].pageX-z[1].pageX,t=z[0].pageY-z[1].pageY,n=Math.sqrt(e*e+t*t);L.set(0,n)}function W(e){if(1==z.length)w.set(e.pageX,e.pageY);else{let t=ei(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);w.set(n,i)}E.subVectors(w,y).multiplyScalar(n.rotateSpeed);let t=n.domElement;t&&(U(2*Math.PI*E.x/t.clientHeight),R(2*Math.PI*E.y/t.clientHeight)),y.copy(w)}function X(e){if(1==z.length)S.set(e.pageX,e.pageY);else{let t=ei(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);S.set(n,i)}A.subVectors(S,x).multiplyScalar(n.panSpeed),D(A.x,A.y),x.copy(S)}function Z(e){var t;let i=ei(e),r=e.pageX-i.x,o=e.pageY-i.y,a=Math.sqrt(r*r+o*o);O.set(0,a),_.set(0,Math.pow(O.y/L.y,n.zoomSpeed)),t=_.y,H(b/t),L.copy(O)}function K(e){var t,i,o;!1!==n.enabled&&(0===z.length&&(null==(t=n.domElement)||t.ownerDocument.addEventListener("pointermove",Q),null==(i=n.domElement)||i.ownerDocument.addEventListener("pointerup",$)),o=e,z.push(o),"touch"===e.pointerType?function(e){switch(en(e),z.length){case 1:switch(n.touches.ONE){case a.wtR.ROTATE:if(!1===n.enableRotate)return;q(),l=s.TOUCH_ROTATE;break;case a.wtR.PAN:if(!1===n.enablePan)return;G(),l=s.TOUCH_PAN;break;default:l=s.NONE}break;case 2:switch(n.touches.TWO){case a.wtR.DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&V(),n.enablePan&&G(),l=s.TOUCH_DOLLY_PAN;break;case a.wtR.DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&V(),n.enableRotate&&q(),l=s.TOUCH_DOLLY_ROTATE;break;default:l=s.NONE}break;default:l=s.NONE}l!==s.NONE&&n.dispatchEvent(r)}(e):function(e){let t;switch(e.button){case 0:t=n.mouseButtons.LEFT;break;case 1:t=n.mouseButtons.MIDDLE;break;case 2:t=n.mouseButtons.RIGHT;break;default:t=-1}switch(t){case a.kBv.DOLLY:if(!1===n.enableZoom)return;N(e),L.set(e.clientX,e.clientY),l=s.DOLLY;break;case a.kBv.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enablePan)return;F(e),l=s.PAN}else{if(!1===n.enableRotate)return;Y(e),l=s.ROTATE}break;case a.kBv.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enableRotate)return;Y(e),l=s.ROTATE}else{if(!1===n.enablePan)return;F(e),l=s.PAN}break;default:l=s.NONE}l!==s.NONE&&n.dispatchEvent(r)}(e))}function Q(e){!1!==n.enabled&&("touch"===e.pointerType?function(e){switch(en(e),l){case s.TOUCH_ROTATE:if(!1===n.enableRotate)return;W(e),n.update();break;case s.TOUCH_PAN:if(!1===n.enablePan)return;X(e),n.update();break;case s.TOUCH_DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&Z(e),n.enablePan&&X(e),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&Z(e),n.enableRotate&&W(e),n.update();break;default:l=s.NONE}}(e):function(e){if(!1!==n.enabled)switch(l){case s.ROTATE:let t;if(!1===n.enableRotate)return;w.set(e.clientX,e.clientY),E.subVectors(w,y).multiplyScalar(n.rotateSpeed),(t=n.domElement)&&(U(2*Math.PI*E.x/t.clientHeight),R(2*Math.PI*E.y/t.clientHeight)),y.copy(w),n.update();break;case s.DOLLY:var i,r;if(!1===n.enableZoom)return;(O.set(e.clientX,e.clientY),_.subVectors(O,L),_.y>0)?(i=C(),H(b/i)):_.y<0&&(r=C(),H(b*r)),L.copy(O),n.update();break;case s.PAN:if(!1===n.enablePan)return;S.set(e.clientX,e.clientY),A.subVectors(S,x).multiplyScalar(n.panSpeed),D(A.x,A.y),x.copy(S),n.update()}}(e))}function $(e){var t,i,r;(function(e){delete j[e.pointerId];for(let t=0;t<z.length;t++)if(z[t].pointerId==e.pointerId)return void z.splice(t,1)})(e),0===z.length&&(null==(t=n.domElement)||t.releasePointerCapture(e.pointerId),null==(i=n.domElement)||i.ownerDocument.removeEventListener("pointermove",Q),null==(r=n.domElement)||r.ownerDocument.removeEventListener("pointerup",$)),n.dispatchEvent(o),l=s.NONE}function J(e){if(!1!==n.enabled&&!1!==n.enableZoom&&(l===s.NONE||l===s.ROTATE)){var t,i;e.preventDefault(),n.dispatchEvent(r),(N(e),e.deltaY<0)?(t=C(),H(b*t)):e.deltaY>0&&(i=C(),H(b/i)),n.update(),n.dispatchEvent(o)}}function ee(e){if(!1!==n.enabled&&!1!==n.enablePan){let t=!1;switch(e.code){case n.keys.UP:D(0,n.keyPanSpeed),t=!0;break;case n.keys.BOTTOM:D(0,-n.keyPanSpeed),t=!0;break;case n.keys.LEFT:D(n.keyPanSpeed,0),t=!0;break;case n.keys.RIGHT:D(-n.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),n.update())}}function et(e){!1!==n.enabled&&e.preventDefault()}function en(e){let t=j[e.pointerId];void 0===t&&(t=new a.I9Y,j[e.pointerId]=t),t.set(e.pageX,e.pageY)}function ei(e){return j[(e.pointerId===z[0].pointerId?z[1]:z[0]).pointerId]}this.dollyIn=(e=C())=>{H(b*e),n.update()},this.dollyOut=(e=C())=>{H(b/e),n.update()},this.getScale=()=>b,this.setScale=e=>{H(e),n.update()},this.getZoomScale=()=>C(),void 0!==t&&this.connect(t),this.update()}}let v=o.forwardRef(({makeDefault:e,camera:t,regress:n,domElement:a,enableDamping:s=!0,keyEvents:l=!1,onChange:u,onStart:c,onEnd:d,...f},p)=>{let h=(0,r.C)(e=>e.invalidate),v=(0,r.C)(e=>e.camera),b=(0,r.C)(e=>e.gl),g=(0,r.C)(e=>e.events),y=(0,r.C)(e=>e.setEvents),w=(0,r.C)(e=>e.set),E=(0,r.C)(e=>e.get),x=(0,r.C)(e=>e.performance),S=t||v,A=a||g.connected||b.domElement,L=o.useMemo(()=>new m(S),[S]);return(0,r.D)(()=>{L.enabled&&L.update()},-1),o.useEffect(()=>(l&&L.connect(!0===l?A:l),L.connect(A),()=>void L.dispose()),[l,A,n,L,h]),o.useEffect(()=>{let e=e=>{h(),n&&x.regress(),u&&u(e)},t=e=>{c&&c(e)},i=e=>{d&&d(e)};return L.addEventListener("change",e),L.addEventListener("start",t),L.addEventListener("end",i),()=>{L.removeEventListener("start",t),L.removeEventListener("end",i),L.removeEventListener("change",e)}},[u,c,d,L,h,y]),o.useEffect(()=>{if(e){let e=E().controls;return w({controls:L}),()=>w({controls:e})}},[e,L]),o.createElement("primitive",(0,i.A)({ref:p,object:L,enableDamping:s},f))})},8504:(e,t,n)=>{n.d(t,{pP:()=>r});var i=n(4996);function r(e,t=!1){let n=null!==e[0].index,a=new Set(Object.keys(e[0].attributes)),s=new Set(Object.keys(e[0].morphAttributes)),l={},u={},c=e[0].morphTargetsRelative,d=new i.LoY,f=0;for(let i=0;i<e.length;++i){let r=e[i],o=0;if(n!==(null!==r.index))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+i+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let e in r.attributes){if(!a.has(e))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+i+'. All geometries must have compatible attributes; make sure "'+e+'" attribute exists among all geometries, or in none of them.'),null;void 0===l[e]&&(l[e]=[]),l[e].push(r.attributes[e]),o++}if(o!==a.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+i+". Make sure all geometries have the same number of attributes."),null;if(c!==r.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+i+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let e in r.morphAttributes){if(!s.has(e))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+i+".  .morphAttributes must be consistent throughout all geometries."),null;void 0===u[e]&&(u[e]=[]),u[e].push(r.morphAttributes[e])}if(t){let e;if(n)e=r.index.count;else{if(void 0===r.attributes.position)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+i+". The geometry must have either an index or a position attribute"),null;e=r.attributes.position.count}d.addGroup(f,e,i),f+=e}}if(n){let t=0,n=[];for(let i=0;i<e.length;++i){let r=e[i].index;for(let e=0;e<r.count;++e)n.push(r.getX(e)+t);t+=e[i].attributes.position.count}d.setIndex(n)}for(let e in l){let t=o(l[e]);if(!t)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+e+" attribute."),null;d.setAttribute(e,t)}for(let e in u){let t=u[e][0].length;if(0===t)break;d.morphAttributes=d.morphAttributes||{},d.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let i=0;i<u[e].length;++i)t.push(u[e][i][n]);let i=o(t);if(!i)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+e+" morphAttribute."),null;d.morphAttributes[e].push(i)}}return d}function o(e){let t,n,r,o=-1,a=0;for(let i=0;i<e.length;++i){let s=e[i];if(void 0===t&&(t=s.array.constructor),t!==s.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(void 0===n&&(n=s.itemSize),n!==s.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(void 0===r&&(r=s.normalized),r!==s.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(-1===o&&(o=s.gpuType),o!==s.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;a+=s.count*n}let s=new t(a),l=new i.THS(s,n,r),u=0;for(let t=0;t<e.length;++t){let i=e[t];if(i.isInterleavedBufferAttribute){let e=u/n;for(let t=0,r=i.count;t<r;t++)for(let r=0;r<n;r++){let n=i.getComponent(t,r);l.setComponent(t+e,r,n)}}else s.set(i.array,u);u+=i.count*n}return void 0!==o&&(l.gpuType=o),l}},8830:(e,t,n)=>{n.d(t,{l:()=>r});var i=n(4996);class r extends i.Z58{constructor(){super();const e=new i.iNn;e.deleteAttribute("uv");const t=new i._4j({side:i.hsX}),n=new i._4j,r=new i.HiM(0xffffff,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const a=new i.eaF(e,t);a.position.set(-.757,13.219,.717),a.scale.set(31.713,28.305,28.591),this.add(a);const s=new i.ZLX(e,n,6),l=new i.B69;l.position.set(-10.906,2.009,1.846),l.rotation.set(0,-.195,0),l.scale.set(2.328,7.905,4.651),l.updateMatrix(),s.setMatrixAt(0,l.matrix),l.position.set(-5.607,-.754,-.758),l.rotation.set(0,.994,0),l.scale.set(1.97,1.534,3.955),l.updateMatrix(),s.setMatrixAt(1,l.matrix),l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),l.updateMatrix(),s.setMatrixAt(2,l.matrix),l.position.set(-2.017,.018,6.124),l.rotation.set(0,.333,0),l.scale.set(2.002,4.566,2.064),l.updateMatrix(),s.setMatrixAt(3,l.matrix),l.position.set(2.291,-.756,-2.621),l.rotation.set(0,-.286,0),l.scale.set(1.546,1.552,1.496),l.updateMatrix(),s.setMatrixAt(4,l.matrix),l.position.set(-2.193,-.369,-5.547),l.rotation.set(0,.516,0),l.scale.set(3.875,3.487,2.986),l.updateMatrix(),s.setMatrixAt(5,l.matrix),this.add(s);const u=new i.eaF(e,o(50));u.position.set(-16.116,14.37,8.208),u.scale.set(.1,2.428,2.739),this.add(u);const c=new i.eaF(e,o(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const d=new i.eaF(e,o(17));d.position.set(14.904,12.198,-1.832),d.scale.set(.15,4.265,6.331),this.add(d);const f=new i.eaF(e,o(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const p=new i.eaF(e,o(20));p.position.set(3.235,11.486,-12.541),p.scale.set(2.5,2,.1),this.add(p);const h=new i.eaF(e,o(100));h.position.set(0,20,0),h.scale.set(1,.1,1),this.add(h)}dispose(){let e=new Set;for(let t of(this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))}),e))t.dispose()}}function o(e){return new i.G_z({color:0,emissive:0xffffff,emissiveIntensity:e})}},9541:(e,t,n)=>{n.d(t,{h:()=>l});var i=n(3001),r=n(2703);let o=e=>{let t,n=new Set,i=(e,i)=>{let r="function"==typeof e?e(t):e;if(!Object.is(r,t)){let e=t;t=(null!=i?i:"object"!=typeof r||null===r)?r:Object.assign({},t,r),n.forEach(n=>n(t,e))}},r=()=>t,o={setState:i,getState:r,getInitialState:()=>a,subscribe:e=>(n.add(e),()=>n.delete(e))},a=t=e(i,r,o);return o},{useSyncExternalStoreWithSelector:a}=r,s=(e,t)=>{let n=e?o(e):o,r=(e,r=t)=>(function(e,t=e=>e,n){let r=a(e.subscribe,e.getState,e.getInitialState,t,n);return i.useDebugValue(r),r})(n,e,r);return Object.assign(r,n),r},l=(e,t)=>e?s(e,t):s},9679:(e,t)=>{function n(e,t){var n=e.length;for(e.push(t);0<n;){var i=n-1>>>1,r=e[i];if(0<o(r,t))e[i]=t,e[n]=r,n=i;else break}}function i(e){return 0===e.length?null:e[0]}function r(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;for(var i=0,r=e.length,a=r>>>1;i<a;){var s=2*(i+1)-1,l=e[s],u=s+1,c=e[u];if(0>o(l,n))u<r&&0>o(c,l)?(e[i]=c,e[u]=n,i=u):(e[i]=l,e[s]=n,i=s);else if(u<r&&0>o(c,n))e[i]=c,e[u]=n,i=u;else break}}return t}function o(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if(t.unstable_now=void 0,"object"==typeof performance&&"function"==typeof performance.now){var a,s=performance;t.unstable_now=function(){return s.now()}}else{var l=Date,u=l.now();t.unstable_now=function(){return l.now()-u}}var c=[],d=[],f=1,p=null,h=3,m=!1,v=!1,b=!1,g=!1,y="function"==typeof setTimeout?setTimeout:null,w="function"==typeof clearTimeout?clearTimeout:null,E="u">typeof setImmediate?setImmediate:null;function x(e){for(var t=i(d);null!==t;){if(null===t.callback)r(d);else if(t.startTime<=e)r(d),t.sortIndex=t.expirationTime,n(c,t);else break;t=i(d)}}function S(e){if(b=!1,x(e),!v)if(null!==i(c))v=!0,A||(A=!0,a());else{var t=i(d);null!==t&&j(S,t.startTime-e)}}var A=!1,L=-1,O=5,_=-1;function P(){return!!g||!(t.unstable_now()-_<O)}function T(){if(g=!1,A){var e=t.unstable_now();_=e;var n=!0;try{e:{v=!1,b&&(b=!1,w(L),L=-1),m=!0;var o=h;try{t:{for(x(e),p=i(c);null!==p&&!(p.expirationTime>e&&P());){var s=p.callback;if("function"==typeof s){p.callback=null,h=p.priorityLevel;var l=s(p.expirationTime<=e);if(e=t.unstable_now(),"function"==typeof l){p.callback=l,x(e),n=!0;break t}p===i(c)&&r(c),x(e)}else r(c);p=i(c)}if(null!==p)n=!0;else{var u=i(d);null!==u&&j(S,u.startTime-e),n=!1}}break e}finally{p=null,h=o,m=!1}}}finally{n?a():A=!1}}}if("function"==typeof E)a=function(){E(T)};else if("u">typeof MessageChannel){var M=new MessageChannel,z=M.port2;M.port1.onmessage=T,a=function(){z.postMessage(null)}}else a=function(){y(T,0)};function j(e,n){L=y(function(){e(t.unstable_now())},n)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):O=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_next=function(e){switch(h){case 1:case 2:case 3:var t=3;break;default:t=h}var n=h;h=t;try{return e()}finally{h=n}},t.unstable_requestPaint=function(){g=!0},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=h;h=e;try{return t()}finally{h=n}},t.unstable_scheduleCallback=function(e,r,o){var s=t.unstable_now();switch(o="object"==typeof o&&null!==o&&"number"==typeof(o=o.delay)&&0<o?s+o:s,e){case 1:var l=-1;break;case 2:l=250;break;case 5:l=0x3fffffff;break;case 4:l=1e4;break;default:l=5e3}return l=o+l,e={id:f++,callback:r,priorityLevel:e,startTime:o,expirationTime:l,sortIndex:-1},o>s?(e.sortIndex=o,n(d,e),null===i(c)&&e===i(d)&&(b?(w(L),L=-1):b=!0,j(S,o-s))):(e.sortIndex=l,n(c,e),v||m||(v=!0,A||(A=!0,a()))),e},t.unstable_shouldYield=P,t.unstable_wrapCallback=function(e){var t=h;return function(){var n=h;h=t;try{return e.apply(this,arguments)}finally{h=n}}}},9680:(e,t,n)=>{var i=n(3001),r="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},o=i.useState,a=i.useEffect,s=i.useLayoutEffect,l=i.useDebugValue;function u(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!r(e,n)}catch(e){return!0}}var c="u"<typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var n=t(),i=o({inst:{value:n,getSnapshot:t}}),r=i[0].inst,c=i[1];return s(function(){r.value=n,r.getSnapshot=t,u(r)&&c({inst:r})},[e,n,t]),a(function(){return u(r)&&c({inst:r}),e(function(){u(r)&&c({inst:r})})},[e]),l(n),n};t.useSyncExternalStore=void 0!==i.useSyncExternalStore?i.useSyncExternalStore:c},9758:(e,t,n)=>{n.d(t,{j:()=>a});var i=n(4996);let r=new i.Pq0;function o(e,t,n,i,o,a){let s=2*Math.PI*o/4,l=Math.max(a-2*o,0),u=Math.PI/4;r.copy(t),r[i]=0,r.normalize();let c=.5*s/(s+l),d=1-r.angleTo(e)/u;return 1===Math.sign(r[n])?d*c:l/(s+l)+c+c*(1-d)}class a extends i.iNn{constructor(e=1,t=1,n=1,r=2,a=.1){const s=2*r+1;if(a=Math.min(e/2,t/2,n/2,a),super(1,1,1,s,s,s),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:r,radius:a},1===s)return;const l=this.toNonIndexed();this.index=null,this.attributes.position=l.attributes.position,this.attributes.normal=l.attributes.normal,this.attributes.uv=l.attributes.uv;const u=new i.Pq0,c=new i.Pq0,d=new i.Pq0(e,t,n).divideScalar(2).subScalar(a),f=this.attributes.position.array,p=this.attributes.normal.array,h=this.attributes.uv.array,m=f.length/6,v=new i.Pq0,b=.5/s;for(let i=0,r=0;i<f.length;i+=3,r+=2)switch(u.fromArray(f,i),c.copy(u),c.x-=Math.sign(c.x)*b,c.y-=Math.sign(c.y)*b,c.z-=Math.sign(c.z)*b,c.normalize(),f[i+0]=d.x*Math.sign(u.x)+c.x*a,f[i+1]=d.y*Math.sign(u.y)+c.y*a,f[i+2]=d.z*Math.sign(u.z)+c.z*a,p[i+0]=c.x,p[i+1]=c.y,p[i+2]=c.z,Math.floor(i/m)){case 0:v.set(1,0,0),h[r+0]=o(v,c,"z","y",a,n),h[r+1]=1-o(v,c,"y","z",a,t);break;case 1:v.set(-1,0,0),h[r+0]=1-o(v,c,"z","y",a,n),h[r+1]=1-o(v,c,"y","z",a,t);break;case 2:v.set(0,1,0),h[r+0]=1-o(v,c,"x","z",a,e),h[r+1]=o(v,c,"z","x",a,n);break;case 3:v.set(0,-1,0),h[r+0]=1-o(v,c,"x","z",a,e),h[r+1]=1-o(v,c,"z","x",a,n);break;case 4:v.set(0,0,1),h[r+0]=1-o(v,c,"x","y",a,e),h[r+1]=1-o(v,c,"y","x",a,t);break;case 5:v.set(0,0,-1),h[r+0]=o(v,c,"x","y",a,e),h[r+1]=1-o(v,c,"y","x",a,t)}}static fromJSON(e){return new a(e.width,e.height,e.depth,e.segments,e.radius)}}}}]);