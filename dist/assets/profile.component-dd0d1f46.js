import{j as l,a,L as o}from"./index-9b95c53b.js";import{P as c}from"./profileHeader.component-7da448a8.js";import{R as d}from"./ERoles.enum-3d17fc4b.js";const p=[{id:1,href:"/profile/about-me",label:"Mis datos personales"},{id:2,href:"/profile/about-me",label:"Mi clínica"},{id:3,href:"/profile/about-me",label:"Favoritos"},{id:4,href:"/profile/about-me",label:"Mis contactos"}];function h({style:m,children:n,user:e,viewport:r}){return l("main",{className:`bg-white-bg pb-6 min-h-screen md:pb-10 ${m||""}`,children:[a(c,{data:{name:`${e==null?void 0:e.firstName} ${e==null?void 0:e.lastName}`,isOwner:!0},children:a(o,{className:"btn btn-primary text-sm mt-4 ml-auto mr-0 text-center",to:`/expert/${e==null?void 0:e._id}`,children:(e==null?void 0:e.role)===d.EXPERT?"Ver mi perfil de experto":"Ver mi perfil de clínica"})}),a("hr",{className:"my-6 md:mb-8 lg:mb-12 separator w-11/12 mx-auto max-w-[1200px]"}),l("div",{className:"flex content-sections md:px-8 lg:gap-8",children:[a("div",{className:"px-4 flex w-full flex-col gap-6 lg:max-w-xs lg:min-w-[288px] lg:px-0 sticky top-10 h-fit",children:p.map(t=>{var i;if(!(t.id===2&&((i=e==null?void 0:e.expert)!=null&&i.id)))return l(o,{to:t.href,className:"content-box md:px-5  flex justify-between items-center cursor-default hover:border-primary hover:shadow-input md:max-w-xl mx-auto w-full ",children:[a("span",{className:"font-bold text-sm md:text-base text-text-100",children:t.label}),a("img",{src:"/assets/icons/chevron-right-icon.svg",width:8,height:15,alt:"Flecha derecha"})]},t.id)})}),r>=1024?a("div",{className:"w-full",children:n}):null]})]})}export{h as P};
