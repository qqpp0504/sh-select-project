import{j as e,L as r,e as m,r as c}from"./index-BCGig1a0.js";import{S as i}from"./BrandsProducts-BekNsPWf.js";const x="https://sh-select-project.onrender.com";function f({products:t,sectionTitle:s="新品和精選"}){return e.jsx(i,{title:s,children:t.map(l=>e.jsx(r,{to:`/products/${l.slug}`,children:e.jsxs("li",{className:"w-[27rem] h-[34rem] relative flex-shrink-0",children:[e.jsx("img",{src:`${x}/${l.image}`,alt:l.alt,className:"w-full h-full object-cover object-bottom"}),e.jsx("h2",{className:"my-9 text-xl font-400",children:l.title})]})},l.title))})}const d="https://sh-select-project.onrender.com";function g({products:t}){return e.jsx(i,{title:"推薦單品",children:t.map(s=>e.jsx(r,{to:`/products/${s.slug}`,children:e.jsxs("li",{className:"w-[27rem] h-[34rem] flex-shrink-0",children:[e.jsx("div",{className:"bg-gray-100 flex justify-center items-center h-[83%]",children:e.jsx("img",{src:`${d}/${s.image}`,alt:s.alt,className:"w-[90%] h-[80%] object-cover"})}),e.jsxs("div",{className:"mt-3",children:[e.jsxs("h2",{className:"text-gray text-base font-400",children:[s.brand," -"," "]}),e.jsx("h2",{className:"text-black text-lg font-400 my-1",children:s.name}),e.jsxs("span",{children:["NT",m.format(s.price)]})]})]})},s.name))})}function u({gender:t}){const[s,l]=c.useState(!1);c.useEffect(()=>{const a=()=>{const o=window.scrollY;l(o>250)};return window.addEventListener("scroll",a),()=>window.removeEventListener("scroll",a)},[]);const n="hover:text-gray transition-all duration-200 ease-in-out";return e.jsxs("div",{className:"sticky top-0 padding-small lg:padding-large pt-8 pb-4 bg-white z-10 flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:my-4 lg:pt-4",children:[e.jsx("div",{className:"flex-1 flex justify-start",children:e.jsx("h2",{className:`font-500 transition-all duration-200 ${s?"text-2xl lg:text-base":"text-2xl"}`,children:t=="men"?"男款":"女款"})}),e.jsx("div",{className:"flex-1 flex justify-center",children:e.jsxs("ul",{className:"flex flex-row gap-8 font-500",children:[e.jsx(r,{to:t=="men"?"/products?gender=men&category=top":"/products?gender=women&category=top",children:e.jsx("li",{className:n,children:"服裝"})}),e.jsx(r,{to:t=="men"?"/products?gender=men&category=shoes":"/products?gender=women&category=shoes",children:e.jsx("li",{className:n,children:"鞋款"})}),e.jsx(r,{to:t=="men"?"/products?gender=men&category=other":"/products?gender=women&category=other",children:e.jsx("li",{className:n,children:"其他配件"})})]})}),e.jsx("div",{className:"flex-1 flex justify-end"})]})}export{u as G,f as N,g as R};
