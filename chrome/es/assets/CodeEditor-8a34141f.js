import{d as y,u as x,r as g,t as C,c as S,o as v,a as Q,b as s,e,f as t,_ as E,w as o,Q as B,g as n,h as u,i as N,j,k as m,l as _,m as f}from"./index-a0976c3f.js";import{u as q,a as z}from"./CodeEditor-7de8ea86.js";const D={class:"border-2 code-editor"},I={class:"code-editor__actions"},J={class:"inline-block"},L={class:"inline-block"},O={href:"https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts",rel:"nofollow",target:"_blank"},K=y({__name:"CodeEditor",props:{modelValue:{},commands:{}},emits:["update:modelValue"],setup(p,{emit:h}){const l=p,a=x(),d=q(),c=g(null),{copyContent:b,beautifyEditorValue:V}=z(c,{readOnly:!1,initialValue:C(l,"modelValue"),commands:l.commands,emit:h}),w=S(()=>{if(l.modelValue==="")return!0;try{return JSON.parse(l.modelValue),!0}catch{return!1}});return(k,i)=>(v(),Q("div",D,[s("div",{ref_key:"editor",ref:c,class:"full-width full-height"},null,512),s("div",I,[s("div",J,[e(E,{round:"",flat:"",dense:"","custom-handler":t(b)},null,8,["custom-handler"])]),s("div",L,[e(u,{icon:"settings",round:"",flat:"",dense:""},{default:o(()=>[e(B,{style:{"white-space":"nowrap"},dense:"",anchor:"bottom right",self:"top end"},{default:o(()=>[e(n,null,{default:o(()=>[e(u,{disable:!w.value,title:t(a)("shared.code_editor.actions.beautify.title"),color:"dark-grey",class:"full-width",onClick:t(V)},{default:o(()=>[e(N,{dense:"",name:"auto_fix_normal"}),j(" "+m(t(a)("shared.code_editor.actions.beautify.text")),1)]),_:1},8,["disable","title","onClick"])]),_:1}),e(_),e(n,{dense:"",class:"q-pt-sm"},{default:o(()=>[e(f,{modelValue:t(d).useSpaces,"onUpdate:modelValue":i[0]||(i[0]=r=>t(d).useSpaces=r),size:"32px",dense:"",label:t(a)("shared.code_editor.actions.whitespace.label"),title:t(a)("shared.code_editor.actions.whitespace.title")},null,8,["modelValue","label","title"])]),_:1}),e(n,{dense:"",class:"q-pb-sm"},{default:o(()=>[e(f,{modelValue:t(d).wrapLines,"onUpdate:modelValue":i[1]||(i[1]=r=>t(d).wrapLines=r),size:"32px",dense:"",label:t(a)("shared.code_editor.actions.wrap_lines.label"),title:t(a)("shared.code_editor.actions.wrap_lines.title")},null,8,["modelValue","label","title"])]),_:1}),e(_),e(n,null,{default:o(()=>[s("a",O,m(t(a)("shared.code_editor.actions.keyboard_shortcuts.text")),1)]),_:1})]),_:1})]),_:1})])])]))}});export{K as default};
