(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[719],{1239:(e,t,r)=>{Promise.resolve().then(r.bind(r,1874))},6046:(e,t,r)=>{"use strict";var l=r(6658);r.o(l,"useRouter")&&r.d(t,{useRouter:function(){return l.useRouter}})},1956:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n}});let l=r(306)._(r(580));function n(e,t){var r;let n={};"function"==typeof e&&(n.loader=e);let o={...n,...t};return(0,l.default)({...o,modules:null==(r=o.loadableGenerated)?void 0:r.modules})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9827:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BailoutToCSR",{enumerable:!0,get:function(){return n}});let l=r(3719);function n(e){let{reason:t,children:r}=e;if("undefined"==typeof window)throw new l.BailoutToCSRError(t);return r}},580:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return d}});let l=r(5155),n=r(2115),o=r(9827),s=r(9214);function a(e){return{default:e&&"default"in e?e.default:e}}let u={loader:()=>Promise.resolve(a(()=>null)),loading:null,ssr:!0},d=function(e){let t={...u,...e},r=(0,n.lazy)(()=>t.loader().then(a)),d=t.loading;function i(e){let a=d?(0,l.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,u=!t.ssr||!!t.loading,i=u?n.Suspense:n.Fragment,c=t.ssr?(0,l.jsxs)(l.Fragment,{children:["undefined"==typeof window?(0,l.jsx)(s.PreloadChunks,{moduleIds:t.modules}):null,(0,l.jsx)(r,{...e})]}):(0,l.jsx)(o.BailoutToCSR,{reason:"next/dynamic",children:(0,l.jsx)(r,{...e})});return(0,l.jsx)(i,{...u?{fallback:a}:{},children:c})}return i.displayName="LoadableComponent",i}},9214:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"PreloadChunks",{enumerable:!0,get:function(){return a}});let l=r(5155),n=r(7650),o=r(5861),s=r(8284);function a(e){let{moduleIds:t}=e;if("undefined"!=typeof window)return null;let r=o.workAsyncStorage.getStore();if(void 0===r)return null;let a=[];if(r.reactLoadableManifest&&t){let e=r.reactLoadableManifest;for(let r of t){if(!e[r])continue;let t=e[r].files;a.push(...t)}}return 0===a.length?null:(0,l.jsx)(l.Fragment,{children:a.map(e=>{let t=r.assetPrefix+"/_next/"+(0,s.encodeURIPath)(e);return e.endsWith(".css")?(0,l.jsx)("link",{precedence:"dynamic",href:t,rel:"stylesheet",as:"style"},e):((0,n.preload)(t,{as:"script",fetchPriority:"low"}),null)})})}},1874:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d});var l=r(5155),n=r(2115),o=r(6046),s=r(1956),a=r.n(s);let u=()=>{let[e,t]=(0,n.useState)(""),[r,s]=(0,n.useState)(""),[a,u]=(0,n.useState)(""),[d,i]=(0,n.useState)(""),c=(0,o.useRouter)(),f=async t=>{t.preventDefault();try{let t=await fetch("/api/createUser",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,login:r,name:a,password:d})});if(!t.ok){let e=await t.text();throw console.error("Error response:",e),Error("Failed to register user")}let l=await t.json();console.log("User registered successfully:",l),c.push("/Pages/Login")}catch(e){console.error("Error registering user:",e),alert("Failed to register user.")}};return(0,l.jsx)("div",{className:"mx-auto p-6 flex justify-center items-center h-screen",children:(0,l.jsxs)("div",{className:"w-1/2 font-bold mb-4 bg-white border border-black justify-center p-10 rounded-xl flex flex-col",children:[(0,l.jsx)("h1",{className:"text-2xl font-bold justify-center",children:"Register Form"}),(0,l.jsxs)("form",{onSubmit:f,className:"space-y-4 flex md:flex-col pt-10",children:[(0,l.jsx)("input",{type:"text",className:"p-2 border-black rounded-xl border",placeholder:"Email",value:e,onChange:e=>t(e.target.value)}),(0,l.jsx)("input",{type:"text",className:"p-2 border-black rounded-xl border",placeholder:"Login",value:r,onChange:e=>s(e.target.value)}),(0,l.jsx)("input",{type:"text",className:"p-2 border-black rounded-xl border",placeholder:"Name",value:a,onChange:e=>u(e.target.value)}),(0,l.jsx)("input",{type:"password",className:"p-2 border-black rounded-xl border",placeholder:"Password",value:d,onChange:e=>i(e.target.value)}),(0,l.jsx)("button",{className:"justify-center bg-blue-600 p-2 text-white rounded hover:bg-blue-700",children:"Sign up"})]})]})})},d=a()(()=>Promise.resolve(u),{ssr:!1})}},e=>{var t=t=>e(e.s=t);e.O(0,[441,517,358],()=>t(1239)),_N_E=e.O()}]);