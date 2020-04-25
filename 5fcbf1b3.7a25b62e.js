(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{112:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return s})),r.d(t,"default",(function(){return l}));var n=r(1),a=r(6),o=(r(0),r(134)),i={id:"ts-transformer",title:"ts-transformer"},c={id:"tooling/ts-transformer",title:"ts-transformer",description:"[![npm version](https://badgen.net/npm/v/@formatjs/ts-transformer)](https://badgen.net/npm/v/@formatjs/ts-transformer)",source:"@site/docs/tooling/ts-transformer.md",permalink:"/docs/tooling/ts-transformer",editUrl:"https://github.com/formatjs/formatjs/edit/master/website/docs/tooling/ts-transformer.md",sidebar:"tooling",previous:{title:"babel-plugin-react-intl",permalink:"/docs/tooling/babel-plugin"}},s=[],p={rightToc:s};function l(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},p,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"https://badgen.net/npm/v/@formatjs/ts-transformer"}),Object(o.b)("img",Object(n.a)({parentName:"a"},{src:"https://badgen.net/npm/v/@formatjs/ts-transformer",alt:"npm version"})))),Object(o.b)("p",null,"Extracts string messages for translation from modules that use React Intl (similar to ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"https://github.com/formatjs/formatjs/tree/master/packages/babel-plugin-react-intl"}),Object(o.b)("inlineCode",{parentName:"a"},"babel-plugin-react-intl")),")."),Object(o.b)("p",null,"Take a look at ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"compile.ts"}),Object(o.b)("inlineCode",{parentName:"a"},"compile.ts"))," for example in integration."))}l.isMDXComponent=!0},134:function(e,t,r){"use strict";r.d(t,"a",(function(){return m})),r.d(t,"b",(function(){return b}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=a.a.createContext({}),l=function(e){var t=a.a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):c({},t,{},e)),r},m=function(e){var t=l(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},u=Object(n.forwardRef)((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=l(r),u=n,b=m["".concat(i,".").concat(u)]||m[u]||f[u]||o;return r?a.a.createElement(b,c({ref:t},p,{components:r})):a.a.createElement(b,c({ref:t},p))}));function b(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=u;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var p=2;p<o;p++)i[p]=r[p];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,r)}u.displayName="MDXCreateElement"}}]);