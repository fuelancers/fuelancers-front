import{r as c,T as e,H as i}from"./index-23031116.js";import{u as p}from"./useDispatch-a52118b3.js";const g=()=>{const s=p(),[t,n]=c.useState(null);return{callEndpoint:async l=>{var r;s(e({loading_page:!0})),t!==null&&n(null);const o={response:null};try{const{data:a}=await l.call;o.response=a}catch(a){i.isAxiosError(a)&&n((r=a==null?void 0:a.response)==null?void 0:r.data)}finally{s(e({loading_page:!1}))}return o},error:t}};export{g as u};