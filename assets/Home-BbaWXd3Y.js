import{j as e,B as x,L as d,u as j,f as h,a as u,E as f,S as g,b as a,c as b,d as B,M as p,m as N}from"./index-BIgimh_q.js";import{S as i,B as w}from"./BrandsProducts-D0NM7mM0.js";const y="https://sh-select-project.onrender.com";function P({products:t,sectionTitle:s}){return e.jsx(i,{title:s,children:t.map(r=>e.jsxs("li",{className:"w-full max-w-[27rem] min-w-[20rem] aspect-[4/5] relative flex-shrink-0",children:[e.jsx("img",{src:`${y}/${r.image}`,alt:r.alt,className:"w-full h-full object-cover object-bottom"}),e.jsxs("div",{className:"absolute bottom-12 left-12",children:[e.jsx("h2",{className:"text-white text-xl font-400 mb-6",children:r.title}),e.jsx(x,{link:`/products/${r.slug}`,variant:"white",children:"立即選購"})]})]},r.title))})}const S="https://sh-select-project.onrender.com";function k({products:t}){return e.jsx(i,{title:"新上架",children:t.map(s=>e.jsx("li",{className:"w-[25rem] h-[32rem] relative flex-shrink-0",children:e.jsxs(d,{to:`/products/${s.slug}`,children:[e.jsx("div",{className:"bg-gray-100 flex justify-center items-center h-[85%] rounded-xl",children:e.jsx("img",{src:`${S}/${s.image}`,alt:s.alt,className:"w-[90%] h-[80%] object-cover object-bottom"})}),e.jsx("div",{className:"mt-10",children:e.jsx("h2",{className:"text-black text-xl font-500",children:s.title})})]})},s.title))})}function $(){var n;const{data:t,isPending:s,isError:r,error:l}=j({queryKey:["homeBanners",{page:"homePage"}],queryFn:({queryKey:o,signal:m})=>h({...o[1],signal:m}),staleTime:0,retry:1,retryDelay:1e3,timeout:5e3});if(s)return e.jsx(u,{});if(r)return e.jsx(f,{message:((n=l.info)==null?void 0:n.message)||"資料加載失敗"});const c={image:B,imageSm:b,alt:"各種品牌圖片",title:"探索頂尖品牌，展現非凡選擇",description:"匯聚全球知名品牌，為你帶來更豐富的生活選擇。",buttonText:"探索各種品牌",link:"/brands",type:"frontend"};return e.jsxs(e.Fragment,{children:[e.jsx(g,{description:"歡迎來到 SH SELECT，我們提供高品質的商品與最佳購物體驗，立即探索最新商品！"}),e.jsx(a,{...t.firstBanner}),e.jsx(P,{sectionTitle:"精選",products:t.selectedProducts}),e.jsx(a,{sectionTitle:"流行趨勢",...t.secondBanner}),e.jsx(k,{products:t.newProducts}),e.jsx(a,{sectionTitle:"頂尖潮流品牌",...c}),e.jsx(w,{}),e.jsx(p,{image:N,alt:"Membership image"})]})}export{$ as default};
