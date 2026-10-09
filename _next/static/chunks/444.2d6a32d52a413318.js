"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[444],{190:(e,t,n)=>{n.d(t,{A:()=>i});function i(){return(i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)({}).hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(null,arguments)}},1749:(e,t,n)=>{n.d(t,{pP:()=>r});var i=n(1473);function r(e,t=!1){let n=null!==e[0].index,s=new Set(Object.keys(e[0].attributes)),a=new Set(Object.keys(e[0].morphAttributes)),l={},c={},u=e[0].morphTargetsRelative,d=new i.LoY,f=0;for(let i=0;i<e.length;++i){let r=e[i],o=0;if(n!==(null!==r.index))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+i+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let e in r.attributes){if(!s.has(e))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+i+'. All geometries must have compatible attributes; make sure "'+e+'" attribute exists among all geometries, or in none of them.'),null;void 0===l[e]&&(l[e]=[]),l[e].push(r.attributes[e]),o++}if(o!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+i+". Make sure all geometries have the same number of attributes."),null;if(u!==r.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+i+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let e in r.morphAttributes){if(!a.has(e))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+i+".  .morphAttributes must be consistent throughout all geometries."),null;void 0===c[e]&&(c[e]=[]),c[e].push(r.morphAttributes[e])}if(t){let e;if(n)e=r.index.count;else{if(void 0===r.attributes.position)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+i+". The geometry must have either an index or a position attribute"),null;e=r.attributes.position.count}d.addGroup(f,e,i),f+=e}}if(n){let t=0,n=[];for(let i=0;i<e.length;++i){let r=e[i].index;for(let e=0;e<r.count;++e)n.push(r.getX(e)+t);t+=e[i].attributes.position.count}d.setIndex(n)}for(let e in l){let t=o(l[e]);if(!t)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+e+" attribute."),null;d.setAttribute(e,t)}for(let e in c){let t=c[e][0].length;if(0===t)break;d.morphAttributes=d.morphAttributes||{},d.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let i=0;i<c[e].length;++i)t.push(c[e][i][n]);let i=o(t);if(!i)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+e+" morphAttribute."),null;d.morphAttributes[e].push(i)}}return d}function o(e){let t,n,r,o=-1,s=0;for(let i=0;i<e.length;++i){let a=e[i];if(void 0===t&&(t=a.array.constructor),t!==a.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(void 0===n&&(n=a.itemSize),n!==a.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(void 0===r&&(r=a.normalized),r!==a.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(-1===o&&(o=a.gpuType),o!==a.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=a.count*n}let a=new t(s),l=new i.THS(a,n,r),c=0;for(let t=0;t<e.length;++t){let i=e[t];if(i.isInterleavedBufferAttribute){let e=c/n;for(let t=0,r=i.count;t<r;t++)for(let r=0;r<n;r++){let n=i.getComponent(t,r);l.setComponent(t+e,r,n)}}else a.set(i.array,c);c+=i.count*n}return void 0!==o&&(l.gpuType=o),l}},2391:(e,t,n)=>{let i,r;n.d(t,{N:()=>C});var o=n(190),s=n(7268),a=n(1473),l=n(3136);let c=new a.NRn,u=new a.Pq0;class d extends a.CmU{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new a.qtW([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new a.qtW([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new a.LuO(t,6,1);return this.setAttribute("instanceStart",new a.eHs(n,3,0)),this.setAttribute("instanceEnd",new a.eHs(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let i=new a.LuO(n,2*t,1);return this.setAttribute("instanceColorStart",new a.eHs(i,t,0)),this.setAttribute("instanceColorEnd",new a.eHs(i,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new a.XJ7(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new a.NRn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),c.setFromBufferAttribute(t),this.boundingBox.union(c))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new a.iyt),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)u.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(u)),u.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(u));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var f=n(9066);let h=parseInt(a.sPf.replace(/\D+/g,""));class m extends a.BKk{constructor(e){super({type:"LineMaterial",uniforms:a.LlO.clone(a.LlO.merge([f.UniformsLib.common,f.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new a.I9Y(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
					#include <${h>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let p=h>=125?"uv1":"uv2",v=new a.IUQ,b=new a.Pq0,g=new a.Pq0,y=new a.IUQ,w=new a.IUQ,E=new a.IUQ,x=new a.Pq0,S=new a.kn4,A=new a.cZY,L=new a.Pq0,O=new a.NRn,P=new a.iyt,z=new a.IUQ;function _(e,t,n){return z.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),z.multiplyScalar(1/z.w),z.x=r/n.width,z.y=r/n.height,z.applyMatrix4(e.projectionMatrixInverse),z.multiplyScalar(1/z.w),Math.abs(Math.max(z.x,z.y))}class M extends a.eaF{constructor(e=new d,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let e=0,r=0,o=t.count;e<o;e++,r+=2)b.fromBufferAttribute(t,e),g.fromBufferAttribute(n,e),i[r]=0===r?0:i[r-1],i[r+1]=i[r]+b.distanceTo(g);let r=new a.LuO(i,2,1);return e.setAttribute("instanceDistanceStart",new a.eHs(r,1,0)),e.setAttribute("instanceDistanceEnd",new a.eHs(r,1,1)),this}raycast(e,t){let n,o,s=this.material.worldUnits,l=e.camera;null!==l||s||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let c=void 0!==e.params.Line2&&e.params.Line2.threshold||0;i=e.ray;let u=this.matrixWorld,d=this.geometry,f=this.material;if(r=f.linewidth+c,null===d.boundingSphere&&d.computeBoundingSphere(),P.copy(d.boundingSphere).applyMatrix4(u),s)n=.5*r;else{let e=Math.max(l.near,P.distanceToPoint(i.origin));n=_(l,e,f.resolution)}if(P.radius+=n,!1!==i.intersectsSphere(P)){if(null===d.boundingBox&&d.computeBoundingBox(),O.copy(d.boundingBox).applyMatrix4(u),s)o=.5*r;else{let e=Math.max(l.near,O.distanceToPoint(i.origin));o=_(l,e,f.resolution)}O.expandByScalar(o),!1!==i.intersectsBox(O)&&(s?function(e,t){let n=e.matrixWorld,o=e.geometry,s=o.attributes.instanceStart,l=o.attributes.instanceEnd,c=Math.min(o.instanceCount,s.count);for(let o=0;o<c;o++){A.start.fromBufferAttribute(s,o),A.end.fromBufferAttribute(l,o),A.applyMatrix4(n);let c=new a.Pq0,u=new a.Pq0;i.distanceSqToSegment(A.start,A.end,u,c),u.distanceTo(c)<.5*r&&t.push({point:u,pointOnLine:c,distance:i.origin.distanceTo(u),object:e,face:null,faceIndex:o,uv:null,[p]:null})}}(this,t):function(e,t,n){let o=t.projectionMatrix,s=e.material.resolution,l=e.matrixWorld,c=e.geometry,u=c.attributes.instanceStart,d=c.attributes.instanceEnd,f=Math.min(c.instanceCount,u.count),h=-t.near;i.at(1,E),E.w=1,E.applyMatrix4(t.matrixWorldInverse),E.applyMatrix4(o),E.multiplyScalar(1/E.w),E.x*=s.x/2,E.y*=s.y/2,E.z=0,x.copy(E),S.multiplyMatrices(t.matrixWorldInverse,l);for(let t=0;t<f;t++){if(y.fromBufferAttribute(u,t),w.fromBufferAttribute(d,t),y.w=1,w.w=1,y.applyMatrix4(S),w.applyMatrix4(S),y.z>h&&w.z>h)continue;if(y.z>h){let e=y.z-w.z,t=(y.z-h)/e;y.lerp(w,t)}else if(w.z>h){let e=w.z-y.z,t=(w.z-h)/e;w.lerp(y,t)}y.applyMatrix4(o),w.applyMatrix4(o),y.multiplyScalar(1/y.w),w.multiplyScalar(1/w.w),y.x*=s.x/2,y.y*=s.y/2,w.x*=s.x/2,w.y*=s.y/2,A.start.copy(y),A.start.z=0,A.end.copy(w),A.end.z=0;let c=A.closestPointToPointParameter(x,!0);A.at(c,L);let f=a.cj9.lerp(y.z,w.z,c),m=f>=-1&&f<=1,v=x.distanceTo(L)<.5*r;if(m&&v){A.start.fromBufferAttribute(u,t),A.end.fromBufferAttribute(d,t),A.start.applyMatrix4(l),A.end.applyMatrix4(l);let r=new a.Pq0,o=new a.Pq0;i.distanceSqToSegment(A.start,A.end,o,r),n.push({point:o,pointOnLine:r,distance:i.origin.distanceTo(o),object:e,face:null,faceIndex:t,uv:null,[p]:null})}}}(this,l,t))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(v),this.material.uniforms.resolution.value.set(v.z,v.w))}}class T extends d{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,i=new Float32Array(2*n);if(3===t)for(let r=0;r<n;r+=t)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5];else for(let r=0;r<n;r+=t)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5],i[2*r+6]=e[r+6],i[2*r+7]=e[r+7];return super.setColors(i,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class j extends M{constructor(e=new T,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let C=s.forwardRef(function({points:e,color:t=0xffffff,vertexColors:n,linewidth:i,lineWidth:r,segments:c,dashed:u,...f},h){var p,v;let b=(0,l.C)(e=>e.size),g=s.useMemo(()=>c?new M:new j,[c]),[y]=s.useState(()=>new m),w=(null==n||null==(p=n[0])?void 0:p.length)===4?4:3,E=s.useMemo(()=>{let i=c?new d:new T,r=e.map(e=>{let t=Array.isArray(e);return e instanceof a.Pq0||e instanceof a.IUQ?[e.x,e.y,e.z]:e instanceof a.I9Y?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(i.setPositions(r.flat()),n){t=0xffffff;let e=n.map(e=>e instanceof a.Q1f?e.toArray():e);i.setColors(e.flat(),w)}return i},[e,c,n,w]);return s.useLayoutEffect(()=>{g.computeLineDistances()},[e,g]),s.useLayoutEffect(()=>{u?y.defines.USE_DASH="":delete y.defines.USE_DASH,y.needsUpdate=!0},[u,y]),s.useEffect(()=>()=>{E.dispose(),y.dispose()},[E]),s.createElement("primitive",(0,o.A)({object:g,ref:h},f),s.createElement("primitive",{object:E,attach:"geometry"}),s.createElement("primitive",(0,o.A)({object:y,attach:"material",color:t,vertexColors:!!n,resolution:[b.width,b.height],linewidth:null!=(v=null!=i?i:r)?v:1,dashed:u,transparent:4===w},f)))})},4084:(e,t,n)=>{n.d(t,{Hl:()=>d});var i=n(3136),r=n(7268),o=n(9066);function s(e,t){let n;return(...i)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...i),t)}}let a=["x","y","top","bottom","left","right","width","height"];var l=n(2060),c=n(776);function u({ref:e,children:t,fallback:n,resize:l,style:d,gl:f,events:h=i.f,eventSource:m,eventPrefix:p,shadows:v,linear:b,flat:g,legacy:y,orthographic:w,frameloop:E,dpr:x,performance:S,raycaster:A,camera:L,scene:O,onPointerMissed:P,onCreated:z,..._}){r.useMemo(()=>(0,i.e)(o),[]);let M=(0,i.u)(),[T,j]=function({debounce:e,scroll:t,polyfill:n,offsetSize:i}={debounce:0,scroll:!1,offsetSize:!1}){var o,l,c;let u=n||("u"<typeof window?class{}:window.ResizeObserver);if(!u)throw Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");let[d,f]=(0,r.useState)({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),h=(0,r.useRef)({element:null,scrollContainers:null,resizeObserver:null,lastBounds:d,orientationHandler:null}),m=e?"number"==typeof e?e:e.scroll:null,p=e?"number"==typeof e?e:e.resize:null,v=(0,r.useRef)(!1);(0,r.useEffect)(()=>(v.current=!0,()=>void(v.current=!1)));let[b,g,y]=(0,r.useMemo)(()=>{let e=()=>{let e,t;if(!h.current.element)return;let{left:n,top:r,width:o,height:s,bottom:l,right:c,x:u,y:d}=h.current.element.getBoundingClientRect(),m={left:n,top:r,width:o,height:s,bottom:l,right:c,x:u,y:d};h.current.element instanceof HTMLElement&&i&&(m.height=h.current.element.offsetHeight,m.width=h.current.element.offsetWidth),Object.freeze(m),v.current&&(e=h.current.lastBounds,t=m,!a.every(n=>e[n]===t[n]))&&f(h.current.lastBounds=m)};return[e,p?s(e,p):e,m?s(e,m):e]},[f,i,m,p]);function w(){h.current.scrollContainers&&(h.current.scrollContainers.forEach(e=>e.removeEventListener("scroll",y,!0)),h.current.scrollContainers=null),h.current.resizeObserver&&(h.current.resizeObserver.disconnect(),h.current.resizeObserver=null),h.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",h.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",h.current.orientationHandler))}function E(){h.current.element&&(h.current.resizeObserver=new u(y),h.current.resizeObserver.observe(h.current.element),t&&h.current.scrollContainers&&h.current.scrollContainers.forEach(e=>e.addEventListener("scroll",y,{capture:!0,passive:!0})),h.current.orientationHandler=()=>{y()},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",h.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",h.current.orientationHandler))}return o=y,l=!!t,(0,r.useEffect)(()=>{if(l)return window.addEventListener("scroll",o,{capture:!0,passive:!0}),()=>void window.removeEventListener("scroll",o,!0)},[o,l]),c=g,(0,r.useEffect)(()=>(window.addEventListener("resize",c),()=>void window.removeEventListener("resize",c)),[c]),(0,r.useEffect)(()=>{w(),E()},[t,y,g]),(0,r.useEffect)(()=>w,[]),[e=>{e&&e!==h.current.element&&(w(),h.current.element=e,h.current.scrollContainers=function e(t){let n=[];if(!t||t===document.body)return n;let{overflow:i,overflowX:r,overflowY:o}=window.getComputedStyle(t);return[i,r,o].some(e=>"auto"===e||"scroll"===e)&&n.push(t),[...n,...e(t.parentElement)]}(e),E())},d,b]}({scroll:!0,debounce:{scroll:50,resize:0},...l}),C=r.useRef(null),U=r.useRef(null);r.useImperativeHandle(e,()=>C.current);let R=(0,i.a)(P),[I,H]=r.useState(!1),[D,N]=r.useState(!1);if(I)throw I;if(D)throw D;let B=r.useRef(null);(0,i.b)(()=>{let e=C.current;j.width>0&&j.height>0&&e&&(B.current||(B.current=(0,i.c)(e)),async function(){await B.current.configure({gl:f,scene:O,events:h,shadows:v,linear:b,flat:g,legacy:y,orthographic:w,frameloop:E,dpr:x,performance:S,raycaster:A,camera:L,size:j,onPointerMissed:(...e)=>null==R.current?void 0:R.current(...e),onCreated:e=>{null==e.events.connect||e.events.connect(m?(0,i.i)(m)?m.current:m:U.current),p&&e.setEvents({compute:(e,t)=>{let n=e[p+"X"],i=e[p+"Y"];t.pointer.set(n/t.size.width*2-1,-(2*(i/t.size.height))+1),t.raycaster.setFromCamera(t.pointer,t.camera)}}),null==z||z(e)}}),B.current.render((0,c.jsx)(M,{children:(0,c.jsx)(i.E,{set:N,children:(0,c.jsx)(r.Suspense,{fallback:(0,c.jsx)(i.B,{set:H}),children:null!=t?t:null})})}))}())}),r.useEffect(()=>{let e=C.current;if(e)return()=>(0,i.d)(e)},[]);let k=m?"none":"auto";return(0,c.jsx)("div",{ref:U,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:k,...d},..._,children:(0,c.jsx)("div",{ref:T,style:{width:"100%",height:"100%"},children:(0,c.jsx)("canvas",{ref:C,style:{display:"block"},children:n})})})}function d(e){return(0,c.jsx)(l.Af,{children:(0,c.jsx)(u,{...e})})}n(1267)},4690:(e,t,n)=>{n.d(t,{l:()=>r});var i=n(1473);class r extends i.Z58{constructor(){super();const e=new i.iNn;e.deleteAttribute("uv");const t=new i._4j({side:i.hsX}),n=new i._4j,r=new i.HiM(0xffffff,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const s=new i.eaF(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const a=new i.ZLX(e,n,6),l=new i.B69;l.position.set(-10.906,2.009,1.846),l.rotation.set(0,-.195,0),l.scale.set(2.328,7.905,4.651),l.updateMatrix(),a.setMatrixAt(0,l.matrix),l.position.set(-5.607,-.754,-.758),l.rotation.set(0,.994,0),l.scale.set(1.97,1.534,3.955),l.updateMatrix(),a.setMatrixAt(1,l.matrix),l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),l.updateMatrix(),a.setMatrixAt(2,l.matrix),l.position.set(-2.017,.018,6.124),l.rotation.set(0,.333,0),l.scale.set(2.002,4.566,2.064),l.updateMatrix(),a.setMatrixAt(3,l.matrix),l.position.set(2.291,-.756,-2.621),l.rotation.set(0,-.286,0),l.scale.set(1.546,1.552,1.496),l.updateMatrix(),a.setMatrixAt(4,l.matrix),l.position.set(-2.193,-.369,-5.547),l.rotation.set(0,.516,0),l.scale.set(3.875,3.487,2.986),l.updateMatrix(),a.setMatrixAt(5,l.matrix),this.add(a);const c=new i.eaF(e,o(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const u=new i.eaF(e,o(50));u.position.set(-16.109,18.021,-8.207),u.scale.set(.1,2.425,2.751),this.add(u);const d=new i.eaF(e,o(17));d.position.set(14.904,12.198,-1.832),d.scale.set(.15,4.265,6.331),this.add(d);const f=new i.eaF(e,o(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const h=new i.eaF(e,o(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);const m=new i.eaF(e,o(100));m.position.set(0,20,0),m.scale.set(1,.1,1),this.add(m)}dispose(){let e=new Set;for(let t of(this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))}),e))t.dispose()}}function o(e){return new i.G_z({color:0,emissive:0xffffff,emissiveIntensity:e})}},5819:(e,t,n)=>{n.d(t,{j:()=>s});var i=n(1473);let r=new i.Pq0;function o(e,t,n,i,o,s){let a=2*Math.PI*o/4,l=Math.max(s-2*o,0),c=Math.PI/4;r.copy(t),r[i]=0,r.normalize();let u=.5*a/(a+l),d=1-r.angleTo(e)/c;return 1===Math.sign(r[n])?d*u:l/(a+l)+u+u*(1-d)}class s extends i.iNn{constructor(e=1,t=1,n=1,r=2,s=.1){const a=2*r+1;if(s=Math.min(e/2,t/2,n/2,s),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:r,radius:s},1===a)return;const l=this.toNonIndexed();this.index=null,this.attributes.position=l.attributes.position,this.attributes.normal=l.attributes.normal,this.attributes.uv=l.attributes.uv;const c=new i.Pq0,u=new i.Pq0,d=new i.Pq0(e,t,n).divideScalar(2).subScalar(s),f=this.attributes.position.array,h=this.attributes.normal.array,m=this.attributes.uv.array,p=f.length/6,v=new i.Pq0,b=.5/a;for(let i=0,r=0;i<f.length;i+=3,r+=2)switch(c.fromArray(f,i),u.copy(c),u.x-=Math.sign(u.x)*b,u.y-=Math.sign(u.y)*b,u.z-=Math.sign(u.z)*b,u.normalize(),f[i+0]=d.x*Math.sign(c.x)+u.x*s,f[i+1]=d.y*Math.sign(c.y)+u.y*s,f[i+2]=d.z*Math.sign(c.z)+u.z*s,h[i+0]=u.x,h[i+1]=u.y,h[i+2]=u.z,Math.floor(i/p)){case 0:v.set(1,0,0),m[r+0]=o(v,u,"z","y",s,n),m[r+1]=1-o(v,u,"y","z",s,t);break;case 1:v.set(-1,0,0),m[r+0]=1-o(v,u,"z","y",s,n),m[r+1]=1-o(v,u,"y","z",s,t);break;case 2:v.set(0,1,0),m[r+0]=1-o(v,u,"x","z",s,e),m[r+1]=o(v,u,"z","x",s,n);break;case 3:v.set(0,-1,0),m[r+0]=1-o(v,u,"x","z",s,e),m[r+1]=1-o(v,u,"z","x",s,n);break;case 4:v.set(0,0,1),m[r+0]=1-o(v,u,"x","y",s,e),m[r+1]=1-o(v,u,"y","x",s,t);break;case 5:v.set(0,0,-1),m[r+0]=o(v,u,"x","y",s,e),m[r+1]=1-o(v,u,"y","x",s,t)}}static fromJSON(e){return new s(e.width,e.height,e.depth,e.segments,e.radius)}}},5918:(e,t,n)=>{n.d(t,{N:()=>v});var i=n(190),r=n(3136),o=n(7268),s=n(1473),a=Object.defineProperty;class l{constructor(){((e,t)=>{let n,i;i=void 0,(n="symbol"!=typeof t?t+"":t)in e?a(e,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[n]=i})(this,"_listeners")}addEventListener(e,t){void 0===this._listeners&&(this._listeners={});let n=this._listeners;void 0===n[e]&&(n[e]=[]),-1===n[e].indexOf(t)&&n[e].push(t)}hasEventListener(e,t){if(void 0===this._listeners)return!1;let n=this._listeners;return void 0!==n[e]&&-1!==n[e].indexOf(t)}removeEventListener(e,t){if(void 0===this._listeners)return;let n=this._listeners[e];if(void 0!==n){let e=n.indexOf(t);-1!==e&&n.splice(e,1)}}dispatchEvent(e){if(void 0===this._listeners)return;let t=this._listeners[e.type];if(void 0!==t){e.target=this;let n=t.slice(0);for(let t=0,i=n.length;t<i;t++)n[t].call(this,e);e.target=null}}}var c=Object.defineProperty,u=(e,t,n)=>{let i;return(i="symbol"!=typeof t?t+"":t)in e?c(e,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[i]=n,n};let d=new s.RlV,f=new s.Zcv,h=Math.cos(Math.PI/180*70),m=(e,t)=>(e%t+t)%t;class p extends l{constructor(e,t){super(),u(this,"object"),u(this,"domElement"),u(this,"enabled",!0),u(this,"target",new s.Pq0),u(this,"minDistance",0),u(this,"maxDistance",1/0),u(this,"minZoom",0),u(this,"maxZoom",1/0),u(this,"minPolarAngle",0),u(this,"maxPolarAngle",Math.PI),u(this,"minAzimuthAngle",-1/0),u(this,"maxAzimuthAngle",1/0),u(this,"enableDamping",!1),u(this,"dampingFactor",.05),u(this,"enableZoom",!0),u(this,"zoomSpeed",1),u(this,"enableRotate",!0),u(this,"rotateSpeed",1),u(this,"enablePan",!0),u(this,"panSpeed",1),u(this,"screenSpacePanning",!0),u(this,"keyPanSpeed",7),u(this,"zoomToCursor",!1),u(this,"autoRotate",!1),u(this,"autoRotateSpeed",2),u(this,"reverseOrbit",!1),u(this,"reverseHorizontalOrbit",!1),u(this,"reverseVerticalOrbit",!1),u(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),u(this,"mouseButtons",{LEFT:s.kBv.ROTATE,MIDDLE:s.kBv.DOLLY,RIGHT:s.kBv.PAN}),u(this,"touches",{ONE:s.wtR.ROTATE,TWO:s.wtR.DOLLY_PAN}),u(this,"target0"),u(this,"position0"),u(this,"zoom0"),u(this,"_domElementKeyEvents",null),u(this,"getPolarAngle"),u(this,"getAzimuthalAngle"),u(this,"setPolarAngle"),u(this,"setAzimuthalAngle"),u(this,"getDistance"),u(this,"getZoomScale"),u(this,"listenToKeyEvents"),u(this,"stopListenToKeyEvents"),u(this,"saveState"),u(this,"reset"),u(this,"update"),u(this,"connect"),u(this,"dispose"),u(this,"dollyIn"),u(this,"dollyOut"),u(this,"getScale"),u(this,"setScale"),this.object=e,this.domElement=t,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>p.phi,this.getAzimuthalAngle=()=>p.theta,this.setPolarAngle=e=>{let t=m(e,2*Math.PI),i=p.phi;i<0&&(i+=2*Math.PI),t<0&&(t+=2*Math.PI);let r=Math.abs(t-i);2*Math.PI-r<r&&(t<i?t+=2*Math.PI:i+=2*Math.PI),v.phi=t-i,n.update()},this.setAzimuthalAngle=e=>{let t=m(e,2*Math.PI),i=p.theta;i<0&&(i+=2*Math.PI),t<0&&(t+=2*Math.PI);let r=Math.abs(t-i);2*Math.PI-r<r&&(t<i?t+=2*Math.PI:i+=2*Math.PI),v.theta=t-i,n.update()},this.getDistance=()=>n.object.position.distanceTo(n.target),this.listenToKeyEvents=e=>{e.addEventListener("keydown",ee),this._domElementKeyEvents=e},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",ee),this._domElementKeyEvents=null},this.saveState=()=>{n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=()=>{n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(i),n.update(),l=a.NONE},this.update=(()=>{let t=new s.Pq0,r=new s.Pq0(0,1,0),o=new s.PTz().setFromUnitVectors(e.up,r),u=o.clone().invert(),m=new s.Pq0,y=new s.PTz,w=2*Math.PI;return function(){let E=n.object.position;o.setFromUnitVectors(e.up,r),u.copy(o).invert(),t.copy(E).sub(n.target),t.applyQuaternion(o),p.setFromVector3(t),n.autoRotate&&l===a.NONE&&U(2*Math.PI/60/60*n.autoRotateSpeed),n.enableDamping?(p.theta+=v.theta*n.dampingFactor,p.phi+=v.phi*n.dampingFactor):(p.theta+=v.theta,p.phi+=v.phi);let x=n.minAzimuthAngle,S=n.maxAzimuthAngle;isFinite(x)&&isFinite(S)&&(x<-Math.PI?x+=w:x>Math.PI&&(x-=w),S<-Math.PI?S+=w:S>Math.PI&&(S-=w),x<=S?p.theta=Math.max(x,Math.min(S,p.theta)):p.theta=p.theta>(x+S)/2?Math.max(x,p.theta):Math.min(S,p.theta)),p.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,p.phi)),p.makeSafe(),!0===n.enableDamping?n.target.addScaledVector(g,n.dampingFactor):n.target.add(g),n.zoomToCursor&&M||n.object.isOrthographicCamera?p.radius=k(p.radius):p.radius=k(p.radius*b),t.setFromSpherical(p),t.applyQuaternion(u),E.copy(n.target).add(t),n.object.matrixAutoUpdate||n.object.updateMatrix(),n.object.lookAt(n.target),!0===n.enableDamping?(v.theta*=1-n.dampingFactor,v.phi*=1-n.dampingFactor,g.multiplyScalar(1-n.dampingFactor)):(v.set(0,0,0),g.set(0,0,0));let A=!1;if(n.zoomToCursor&&M){let i=null;if(n.object instanceof s.ubm&&n.object.isPerspectiveCamera){let e=t.length();i=k(e*b);let r=e-i;n.object.position.addScaledVector(z,r),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){let e=new s.Pq0(_.x,_.y,0);e.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/b)),n.object.updateProjectionMatrix(),A=!0;let r=new s.Pq0(_.x,_.y,0);r.unproject(n.object),n.object.position.sub(r).add(e),n.object.updateMatrixWorld(),i=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;null!==i&&(n.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(i).add(n.object.position):(d.origin.copy(n.object.position),d.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(d.direction))<h?e.lookAt(n.target):(f.setFromNormalAndCoplanarPoint(n.object.up,n.target),d.intersectPlane(f,n.target))))}else n.object instanceof s.qUd&&n.object.isOrthographicCamera&&(A=1!==b)&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/b)),n.object.updateProjectionMatrix());return b=1,M=!1,!!(A||m.distanceToSquared(n.object.position)>c||8*(1-y.dot(n.object.quaternion))>c)&&(n.dispatchEvent(i),m.copy(n.object.position),y.copy(n.object.quaternion),A=!1,!0)}})(),this.connect=e=>{n.domElement=e,n.domElement.style.touchAction="none",n.domElement.addEventListener("contextmenu",et),n.domElement.addEventListener("pointerdown",K),n.domElement.addEventListener("pointercancel",J),n.domElement.addEventListener("wheel",$)},this.dispose=()=>{var e,t,i,r,o,s;n.domElement&&(n.domElement.style.touchAction="auto"),null==(e=n.domElement)||e.removeEventListener("contextmenu",et),null==(t=n.domElement)||t.removeEventListener("pointerdown",K),null==(i=n.domElement)||i.removeEventListener("pointercancel",J),null==(r=n.domElement)||r.removeEventListener("wheel",$),null==(o=n.domElement)||o.ownerDocument.removeEventListener("pointermove",Q),null==(s=n.domElement)||s.ownerDocument.removeEventListener("pointerup",J),null!==n._domElementKeyEvents&&n._domElementKeyEvents.removeEventListener("keydown",ee)};const n=this,i={type:"change"},r={type:"start"},o={type:"end"},a={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let l=a.NONE;const c=1e-6,p=new s.YHV,v=new s.YHV;let b=1;const g=new s.Pq0,y=new s.I9Y,w=new s.I9Y,E=new s.I9Y,x=new s.I9Y,S=new s.I9Y,A=new s.I9Y,L=new s.I9Y,O=new s.I9Y,P=new s.I9Y,z=new s.Pq0,_=new s.I9Y;let M=!1;const T=[],j={};function C(){return Math.pow(.95,n.zoomSpeed)}function U(e){n.reverseOrbit||n.reverseHorizontalOrbit?v.theta+=e:v.theta-=e}function R(e){n.reverseOrbit||n.reverseVerticalOrbit?v.phi+=e:v.phi-=e}const I=(()=>{let e=new s.Pq0;return function(t,n){e.setFromMatrixColumn(n,0),e.multiplyScalar(-t),g.add(e)}})(),H=(()=>{let e=new s.Pq0;return function(t,i){!0===n.screenSpacePanning?e.setFromMatrixColumn(i,1):(e.setFromMatrixColumn(i,0),e.crossVectors(n.object.up,e)),e.multiplyScalar(t),g.add(e)}})(),D=(()=>{let e=new s.Pq0;return function(t,i){let r=n.domElement;if(r&&n.object instanceof s.ubm&&n.object.isPerspectiveCamera){let o=n.object.position;e.copy(o).sub(n.target);let s=e.length();I(2*t*(s*=Math.tan(n.object.fov/2*Math.PI/180))/r.clientHeight,n.object.matrix),H(2*i*s/r.clientHeight,n.object.matrix)}else r&&n.object instanceof s.qUd&&n.object.isOrthographicCamera?(I(t*(n.object.right-n.object.left)/n.object.zoom/r.clientWidth,n.object.matrix),H(i*(n.object.top-n.object.bottom)/n.object.zoom/r.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}})();function N(e){n.object instanceof s.ubm&&n.object.isPerspectiveCamera||n.object instanceof s.qUd&&n.object.isOrthographicCamera?b=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function B(e){if(!n.zoomToCursor||!n.domElement)return;M=!0;let t=n.domElement.getBoundingClientRect(),i=e.clientX-t.left,r=e.clientY-t.top,o=t.width,s=t.height;_.x=i/o*2-1,_.y=-(r/s*2)+1,z.set(_.x,_.y,1).unproject(n.object).sub(n.object.position).normalize()}function k(e){return Math.max(n.minDistance,Math.min(n.maxDistance,e))}function Y(e){y.set(e.clientX,e.clientY)}function F(e){x.set(e.clientX,e.clientY)}function G(){if(1==T.length)y.set(T[0].pageX,T[0].pageY);else{let e=.5*(T[0].pageX+T[1].pageX),t=.5*(T[0].pageY+T[1].pageY);y.set(e,t)}}function q(){if(1==T.length)x.set(T[0].pageX,T[0].pageY);else{let e=.5*(T[0].pageX+T[1].pageX),t=.5*(T[0].pageY+T[1].pageY);x.set(e,t)}}function X(){let e=T[0].pageX-T[1].pageX,t=T[0].pageY-T[1].pageY,n=Math.sqrt(e*e+t*t);L.set(0,n)}function W(e){if(1==T.length)w.set(e.pageX,e.pageY);else{let t=ei(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);w.set(n,i)}E.subVectors(w,y).multiplyScalar(n.rotateSpeed);let t=n.domElement;t&&(U(2*Math.PI*E.x/t.clientHeight),R(2*Math.PI*E.y/t.clientHeight)),y.copy(w)}function V(e){if(1==T.length)S.set(e.pageX,e.pageY);else{let t=ei(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);S.set(n,i)}A.subVectors(S,x).multiplyScalar(n.panSpeed),D(A.x,A.y),x.copy(S)}function Z(e){var t;let i=ei(e),r=e.pageX-i.x,o=e.pageY-i.y,s=Math.sqrt(r*r+o*o);O.set(0,s),P.set(0,Math.pow(O.y/L.y,n.zoomSpeed)),t=P.y,N(b/t),L.copy(O)}function K(e){var t,i,o;!1!==n.enabled&&(0===T.length&&(null==(t=n.domElement)||t.ownerDocument.addEventListener("pointermove",Q),null==(i=n.domElement)||i.ownerDocument.addEventListener("pointerup",J)),o=e,T.push(o),"touch"===e.pointerType?function(e){switch(en(e),T.length){case 1:switch(n.touches.ONE){case s.wtR.ROTATE:if(!1===n.enableRotate)return;G(),l=a.TOUCH_ROTATE;break;case s.wtR.PAN:if(!1===n.enablePan)return;q(),l=a.TOUCH_PAN;break;default:l=a.NONE}break;case 2:switch(n.touches.TWO){case s.wtR.DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&X(),n.enablePan&&q(),l=a.TOUCH_DOLLY_PAN;break;case s.wtR.DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&X(),n.enableRotate&&G(),l=a.TOUCH_DOLLY_ROTATE;break;default:l=a.NONE}break;default:l=a.NONE}l!==a.NONE&&n.dispatchEvent(r)}(e):function(e){let t;switch(e.button){case 0:t=n.mouseButtons.LEFT;break;case 1:t=n.mouseButtons.MIDDLE;break;case 2:t=n.mouseButtons.RIGHT;break;default:t=-1}switch(t){case s.kBv.DOLLY:if(!1===n.enableZoom)return;B(e),L.set(e.clientX,e.clientY),l=a.DOLLY;break;case s.kBv.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enablePan)return;F(e),l=a.PAN}else{if(!1===n.enableRotate)return;Y(e),l=a.ROTATE}break;case s.kBv.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enableRotate)return;Y(e),l=a.ROTATE}else{if(!1===n.enablePan)return;F(e),l=a.PAN}break;default:l=a.NONE}l!==a.NONE&&n.dispatchEvent(r)}(e))}function Q(e){!1!==n.enabled&&("touch"===e.pointerType?function(e){switch(en(e),l){case a.TOUCH_ROTATE:if(!1===n.enableRotate)return;W(e),n.update();break;case a.TOUCH_PAN:if(!1===n.enablePan)return;V(e),n.update();break;case a.TOUCH_DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&Z(e),n.enablePan&&V(e),n.update();break;case a.TOUCH_DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&Z(e),n.enableRotate&&W(e),n.update();break;default:l=a.NONE}}(e):function(e){if(!1!==n.enabled)switch(l){case a.ROTATE:let t;if(!1===n.enableRotate)return;w.set(e.clientX,e.clientY),E.subVectors(w,y).multiplyScalar(n.rotateSpeed),(t=n.domElement)&&(U(2*Math.PI*E.x/t.clientHeight),R(2*Math.PI*E.y/t.clientHeight)),y.copy(w),n.update();break;case a.DOLLY:var i,r;if(!1===n.enableZoom)return;(O.set(e.clientX,e.clientY),P.subVectors(O,L),P.y>0)?(i=C(),N(b/i)):P.y<0&&(r=C(),N(b*r)),L.copy(O),n.update();break;case a.PAN:if(!1===n.enablePan)return;S.set(e.clientX,e.clientY),A.subVectors(S,x).multiplyScalar(n.panSpeed),D(A.x,A.y),x.copy(S),n.update()}}(e))}function J(e){var t,i,r;(function(e){delete j[e.pointerId];for(let t=0;t<T.length;t++)if(T[t].pointerId==e.pointerId)return void T.splice(t,1)})(e),0===T.length&&(null==(t=n.domElement)||t.releasePointerCapture(e.pointerId),null==(i=n.domElement)||i.ownerDocument.removeEventListener("pointermove",Q),null==(r=n.domElement)||r.ownerDocument.removeEventListener("pointerup",J)),n.dispatchEvent(o),l=a.NONE}function $(e){if(!1!==n.enabled&&!1!==n.enableZoom&&(l===a.NONE||l===a.ROTATE)){var t,i;e.preventDefault(),n.dispatchEvent(r),(B(e),e.deltaY<0)?(t=C(),N(b*t)):e.deltaY>0&&(i=C(),N(b/i)),n.update(),n.dispatchEvent(o)}}function ee(e){if(!1!==n.enabled&&!1!==n.enablePan){let t=!1;switch(e.code){case n.keys.UP:D(0,n.keyPanSpeed),t=!0;break;case n.keys.BOTTOM:D(0,-n.keyPanSpeed),t=!0;break;case n.keys.LEFT:D(n.keyPanSpeed,0),t=!0;break;case n.keys.RIGHT:D(-n.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),n.update())}}function et(e){!1!==n.enabled&&e.preventDefault()}function en(e){let t=j[e.pointerId];void 0===t&&(t=new s.I9Y,j[e.pointerId]=t),t.set(e.pageX,e.pageY)}function ei(e){return j[(e.pointerId===T[0].pointerId?T[1]:T[0]).pointerId]}this.dollyIn=(e=C())=>{N(b*e),n.update()},this.dollyOut=(e=C())=>{N(b/e),n.update()},this.getScale=()=>b,this.setScale=e=>{N(e),n.update()},this.getZoomScale=()=>C(),void 0!==t&&this.connect(t),this.update()}}let v=o.forwardRef(({makeDefault:e,camera:t,regress:n,domElement:s,enableDamping:a=!0,keyEvents:l=!1,onChange:c,onStart:u,onEnd:d,...f},h)=>{let m=(0,r.C)(e=>e.invalidate),v=(0,r.C)(e=>e.camera),b=(0,r.C)(e=>e.gl),g=(0,r.C)(e=>e.events),y=(0,r.C)(e=>e.setEvents),w=(0,r.C)(e=>e.set),E=(0,r.C)(e=>e.get),x=(0,r.C)(e=>e.performance),S=t||v,A=s||g.connected||b.domElement,L=o.useMemo(()=>new p(S),[S]);return(0,r.D)(()=>{L.enabled&&L.update()},-1),o.useEffect(()=>(l&&L.connect(!0===l?A:l),L.connect(A),()=>void L.dispose()),[l,A,n,L,m]),o.useEffect(()=>{let e=e=>{m(),n&&x.regress(),c&&c(e)},t=e=>{u&&u(e)},i=e=>{d&&d(e)};return L.addEventListener("change",e),L.addEventListener("start",t),L.addEventListener("end",i),()=>{L.removeEventListener("start",t),L.removeEventListener("end",i),L.removeEventListener("change",e)}},[c,u,d,L,m,y]),o.useEffect(()=>{if(e){let e=E().controls;return w({controls:L}),()=>w({controls:e})}},[e,L]),o.createElement("primitive",(0,i.A)({ref:h,object:L,enableDamping:a},f))})},8665:(e,t,n)=>{n.d(t,{g:()=>o});var i=n(9066),r=n(3742);class o{static init(){r.l.init();let{LTC_FLOAT_1:e,LTC_FLOAT_2:t,LTC_HALF_1:n,LTC_HALF_2:o}=r.l;i.UniformsLib.LTC_FLOAT_1=e,i.UniformsLib.LTC_FLOAT_2=t,i.UniformsLib.LTC_HALF_1=n,i.UniformsLib.LTC_HALF_2=o}}}}]);