import{r,u as n,a as t,F as a}from"./index-44fa87b3.js";import{P as p}from"./profile.component-4d12b580.js";import"./profileHeader.component-960f28ba.js";import"./button.component-06c957be.js";import"./useDispatch-e871a8d4.js";import"./useFetch-17dba94a.js";import"./ERoles.enum-3d17fc4b.js";function w(){const[e,o]=r.useState(null),i=n(s=>s.user);return r.useEffect(()=>{o(window.innerWidth)},[]),t(a,{children:e&&e<=1024?t(p,{user:i,viewport:e}):t("div",{children:t("h3",{className:"text-center",children:"¡Edita tu perfil aquí!"})})})}export{w as default};