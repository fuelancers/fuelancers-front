import{j as s,a as e}from"./index-44fa87b3.js";function i({onClose:a,children:o,label:n}){return s("div",{className:"fixed inset-0 h-full z-30 nav-menu",children:[s("div",{className:"content-nav w-4/5 max-w-xs h-full absolute z-40 right-0 top-0 bg-white px-4 py-6",id:"content-nav",children:[s("div",{className:"label mb-6 mt-4",children:[e("h5",{className:"font-bold text-text-100 md:text-lg",children:n}),e("hr",{className:"border-text-50 mt-2"})]}),e("div",{className:"max-h-[80vh] overflow-y-auto h-full",children:o})]}),e("div",{className:"overlay w-full absolute z-30 insert-0 h-full bg-text-90 opacity-25",id:"overlay",onClick:()=>{const t=document.querySelector("#content-nav"),l=document.querySelector("#overlay");t==null||t.classList.add("close-nav"),l==null||l.classList.add("close-overlay"),setTimeout(()=>{a()},1300)}})]})}export{i as S};