(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"+VXy":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("NmBM"),c=()=>l.a.createElement("pre",null,l.a.createElement("div",null,"\u901a\u8fc7\u8868\u8fbe\u5f0f\u4f7f\u7528\u5168\u5c40\u51fd\u6570\uff1a"),l.a.createElement(r["a"],{value:"{{JSON.stringify(data.info, null, 2)}}",data:{info:{name:"jack",age:18}}}),l.a.createElement("div",null,"\u901a\u8fc7\u8fc7\u6ee4\u5668\u4f7f\u7528\u5168\u5c40\u51fd\u6570\uff1a"),l.a.createElement(r["a"],{value:"{{data.info | JSON.stringify(null, 2)}}",data:{info:{name:"jack",age:18}}}));a["default"]=c},"+tVr":function(e,a,t){"use strict";var n=t("vDqi"),l=t.n(n),r=l.a.create({baseURL:"https://www.fastmock.site/mock/3bff4788a9dad8a803681a2bca5f9cae/api/"});r.interceptors.response.use((function(e){var a=e.status,t=e.data,n=t.code,l=t.message,r=t.data;return 200===a&&0===n?r:Promise.reject({message:l,errors:r})}),(function(e){return Promise.reject(e)})),a["a"]=r},"/380":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=t("D3pr"),i=()=>l.a.createElement(r["a"],{layout:"vertical"},l.a.createElement(c["b"],{name:"name",label:"\u7b7e\u7ea6\u5ba2\u6237\u59d3\u540d"}),l.a.createElement(m["a"],{visibleOn:"{{data.name}}",label:"\u4e0e\u300a{{data.name}}\u300b\u7b7e\u7ea6\u65b9\u5f0f",linkageFields:"name",name:"mode",options:[{value:"online",label:"\u7ebf\u4e0a\u7b7e\u7ea6"},{value:"offline",label:"\u7ebf\u4e0b\u7b7e\u7ea6"}],clearValueAfterHidden:!0}));a["default"]=i},"/D/e":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=()=>l.a.createElement(r["a"],{autoPlaceholder:!1},l.a.createElement(c["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(c["a"],{name:"email",label:"\u90ae\u7bb1"}));a["default"]=m},"/mJJ":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("cbCg"),i=t("L/hZ"),s=t("+tVr"),u=()=>l.a.createElement(r["a"],{axios:s["a"]},l.a.createElement(c["a"],{api:{url:"/user/1",method:"POST",data:e=>({myName:e.name,myAge:e.age})}},l.a.createElement(m["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(i["a"],{name:"age",label:"\u5e74\u9f84"})));a["default"]=u},"0D/c":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=()=>l.a.createElement(r["a"],{onValuesChange:e=>console.log(e),throttleTimeout:1e3},l.a.createElement(c["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(c["a"],{name:"email",label:"\u90ae\u7bb1"}));a["default"]=m},"0bjN":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("cbCg"),i=t("+tVr"),s=()=>l.a.createElement(r["a"],{axios:i["a"]},l.a.createElement(c["a"],{initApi:{url:"/user/1",method:"GET",response:{address:"{{data.province}}-{{data.city}}"}}},l.a.createElement(m["b"],{name:"address",label:"\u5730\u533a"})));a["default"]=s},"0pwv":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=()=>l.a.createElement(r["a"],{btns:{btnsAlign:"center"},style:{width:400},layout:"vertical",align:"center"},l.a.createElement(c["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(c["a"],{name:"email",label:"\u90ae\u7bb1"}));a["default"]=m},"1dPo":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=()=>l.a.createElement(r["a"],{debug:!0},l.a.createElement(c["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(c["a"],{name:"email",label:"\u90ae\u7bb1"}));a["default"]=m},"2O4p":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("cbCg"),i=t("+tVr"),s=()=>l.a.createElement(r["a"],{axios:i["a"]},l.a.createElement(c["a"],{api:{url:"/user/1",method:"POST",data:{address:"{{data.province}}-{{data.city}}"}}},l.a.createElement(m["b"],{name:"province",label:"\u7701\u4efd"}),l.a.createElement(m["b"],{name:"city",label:"\u57ce\u5e02"})));a["default"]=s},"42o/":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("Paxk"),i=t("vDqi"),s=t.n(i),u=s.a.create({baseURL:"https://www.fastmock.site/mock/3bff4788a9dad8a803681a2bca5f9cae/api/"});u.interceptors.response.use((function(e){var a=e.status,t=e.data,n=t.code,l=t.message,r=t.data;return 200===a&&0===n?r:Promise.reject({message:l,errors:r})}),(function(e){return Promise.reject(e)}));var o=u,b=()=>l.a.createElement(r["a"],{axios:o},l.a.createElement(c["a"],{debug:!0},l.a.createElement(m["a"],{name:"animation",label:"\u52a8\u6f2b\u4eba\u7269",request:{url:"/search/animation",method:"GET",params:{name:"{{data.keyWords}}"}},optionsProp:{labelKey:"name",valueKey:"id"}})));a["default"]=b},"4vAn":function(e,a,t){"use strict";t.r(a);t("+L6B");var n=t("2/Rp"),l=t("q1tI"),r=t.n(l),c=t("KVgs"),m=t("cbCg"),i=()=>r.a.createElement(c["a"],{btns:{extraBtns:[r.a.createElement(n["a"],{key:"print",onClick:()=>window.print()},"\u6253\u5370")]}},r.a.createElement(m["b"],{name:"name",label:"\u59d3\u540d"}),r.a.createElement(m["a"],{name:"email",label:"\u90ae\u7bb1"}));a["default"]=i},"5OzO":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("NmBM"),c=()=>l.a.createElement(r["a"],{value:"{{data.message.split('').reverse().join('')}}",data:{message:"are you ok?"}});a["default"]=c},"5nkU":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=t("DKs0"),i=t("3Twy"),s=t("K858"),u=t("lCkX"),o={form:r["a"],input:c["b"],checkbox:m["a"]},b=()=>{var e={component:"form",initApi:{url:"/user/1",response:{name:"{{data.first_name}}-{{data.last_name}}",id:"{{data.id}}"}},api:{url:"/user/1",method:"PUT"},redirect:"https://bilibili.com",children:[{component:"input",name:"name",label:"\u59d3\u540d"},{component:"checkbox",name:"cat",label:"\u662f\u5426\u6709\u732b"},{component:"input",name:"cat_name",label:"\u732b\u7684\u540d\u5b57",visibleOn:e=>e.cat,linkageFields:["cat"],clearValueAfterHidden:!0}]};return l.a.createElement(i["a"],{axios:u["a"],components:o},l.a.createElement(s["e"],{schema:e}))};a["default"]=b},"5suV":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("D3pr"),m=t("cbCg"),i=()=>l.a.createElement(r["a"],{debug:!0},l.a.createElement(c["a"],{name:"animation",label:"\u52a8\u6f2b",options:[{label:"\u770b",value:1},{label:"\u4e0d\u770b",value:2}]}),l.a.createElement(m["b"],{name:"name",label:"\u52a8\u6f2b\u540d\u79f0",clearValueAfterHidden:!0,linkageFields:["animation"],visibleOn:"{{data.animation === 1}}"}));a["default"]=i},"6v43":function(e,a,t){"use strict";t.r(a);t("sRBo");var n=t("kaz8"),l=(t("y8nQ"),t("Vl3Y")),r=(t("5NDa"),t("5rEg")),c=t("q1tI"),m=t.n(c),i=t("KVgs"),s=t("cbCg"),u=t("DKs0"),o=()=>m.a.createElement("div",null,m.a.createElement("h2",null,"\u65e0 label \u65f6\u81ea\u52a8\u5bf9\u9f50"),m.a.createElement(i["a"],null,m.a.createElement(s["b"],{name:"name",label:"\u59d3\u540d"}),m.a.createElement(s["a"],{name:"email",label:"\u90ae\u7bb1"}),m.a.createElement(u["a"],{name:"remember",text:"\u8bb0\u4f4f\u767b\u5f55"})),m.a.createElement("h2",null,"antd Form \u65e0\u6cd5\u5bf9\u9f50"),m.a.createElement(l["a"],{labelCol:{span:3}},m.a.createElement(l["a"].Item,{name:"name",label:"\u59d3\u540d"},m.a.createElement(r["a"],null)),m.a.createElement(l["a"].Item,{name:"email",label:"\u90ae\u7bb1"},m.a.createElement(r["a"],null)),m.a.createElement(l["a"].Item,{valuePropName:"checked",name:"remember"},m.a.createElement(n["a"],null,"\u8bb0\u4f4f\u767b\u5f55"))));a["default"]=o},"7hqS":function(e,a,t){"use strict";var n=t("vDqi"),l=t.n(n),r=l.a.create({baseURL:"https://www.fastmock.site/mock/3bff4788a9dad8a803681a2bca5f9cae/api/"});r.interceptors.response.use((function(e){var a=e.status,t=e.data,n=t.code,l=t.message,r=t.data;return 200===a&&0===n?r:Promise.reject({message:l,errors:r})}),(function(e){return Promise.reject(e)})),a["a"]=r},"7rW3":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=t("DKs0"),i=()=>l.a.createElement("div",null,l.a.createElement("h2",null,"\u54cd\u5e94\u5f0f\u8868\u5355\uff08\u9ed8\u8ba4\u5f00\u542f\uff09"),l.a.createElement(r["a"],null,l.a.createElement(c["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(c["a"],{name:"email",label:"\u90ae\u7bb1"}),l.a.createElement(m["a"],{name:"remember",text:"Remember me"})),l.a.createElement("h2",null,"\u975e\u54cd\u5e94\u5f0f\u8868\u5355"),l.a.createElement(r["a"],{isResponsive:!1},l.a.createElement(c["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(c["b"],{name:"email",label:"\u90ae\u7bb1"})));a["default"]=i},"8Osk":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("Plug"),m=t("cbCg"),i=()=>l.a.createElement(r["a"],{debug:!0},l.a.createElement(c["a"],{label:"\u57fa\u672c\u4fe1\u606f"},l.a.createElement(m["b"],{name:"user.name",label:"\u59d3\u540d",required:!0,hideLabel:!0,rules:[{type:"string",min:2}]}),l.a.createElement(m["b"],{hideLabel:!0,name:"user.age",label:"\u5e74\u9f84"})));a["default"]=i},"8veM":function(e,a,t){"use strict";t.r(a),t.d(a,"waitTime",(function(){return z}));var n=t("WmNS"),l=t.n(n),r=(t("miYZ"),t("tsqr")),c=t("9og8"),m=t("tJVT"),i=t("vDqi"),s=t.n(i),u=t("q1tI"),o=t.n(u),b=t("3Twy"),d=t("KVgs"),p=t("Plug"),E=t("cbCg"),f=t("vjYb"),g=t("L/hZ"),v=t("MEej"),h=t("DEPl"),y=t("tWYJ"),w=t("D0qS"),V=t("DKs0"),K=t("6rhR"),q=t("9r6o"),C=t("D3pr"),k=t("Paxk"),I=t("Fp8Z"),x=t("rZMW"),T=t("94es"),S=t("/Vwo"),P=t("KTRN"),D=t("bgFZ"),j=t("4VNU"),O=t("gGHC"),B=t("0wDC"),R=t("PsLe"),A=t("8+sR"),L=t("jRrh"),N=t("33Ai"),U=t("GZC/"),F=t("cc3X"),z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100;return new Promise((a=>{setTimeout((()=>{a(!0)}),e)}))},J=()=>{var e=Object(u["useState"])(!1),a=Object(m["a"])(e,2),t=a[0],n=a[1],i=Object(u["useState"])(!1),J=Object(m["a"])(i,2),M=J[0],G=J[1],Z=Object(u["useState"])(!1),W=Object(m["a"])(Z,2),_=W[0],Y=W[1],H=Object(u["useState"])(!0),X=Object(m["a"])(H,2),Q=X[0],$=X[1];return o.a.createElement(b["a"],{axios:s.a},o.a.createElement(d["a"],{layout:"vertical",readonly:t,disabled:M,onFinish:e=>new Promise((e=>[])),hideLabel:_,autoPlaceholder:Q,btns:{extraBtns:[{text:"\u53ea\u8bfb",key:"readonly",onClick:()=>n((e=>!e))},{text:"\u7981\u7528",key:"disabled",onClick:()=>G((e=>!e))},{text:"\u9690\u85cf\u6807\u7b7e",key:"hideLabel",onClick:()=>Y((e=>!e))},{text:"\u81ea\u52a8 placeholder",key:"autoPlaceholder",onClick:()=>$((e=>!e))}]}},o.a.createElement(p["a"],{label:"\u8f93\u5165\u6846\u7c7b"},o.a.createElement(E["b"],{name:"input",label:"SuperInput"}),o.a.createElement(f["a"],{name:"password",label:"SuperPassword"}),o.a.createElement(E["c"],{name:"url",label:"SuperUrl"}),o.a.createElement(E["a"],{name:"email",label:"SuperEmail"}),o.a.createElement(g["a"],{name:"number",label:"SuperNumber"}),o.a.createElement(v["a"],{name:"textarea",label:"SuperTextArea"}),o.a.createElement(h["a"],{phoneName:"phone",onGetCaptcha:function(){var e=Object(c["a"])(l.a.mark((function e(a){return l.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:r["b"].success("\u624b\u673a\u53f7 ".concat(a," \u9a8c\u8bc1\u7801\u53d1\u9001\u6210\u529f!"));case 1:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),name:"captcha",label:"SuperCaptcha"})),o.a.createElement(p["a"],{label:"\u9009\u62e9\u7c7b"},o.a.createElement(y["a"],{name:"radio",label:"SuperRadioGroup",options:[{label:"\u5355\u90091",value:"1"},{label:"\u5355\u90092",value:"2"}]}),o.a.createElement(w["a"],{name:"radio-button",label:"SuperRadioButton",options:[{label:"\u5355\u90091",value:"1"},{label:"\u5355\u90092",value:"2"}]}),o.a.createElement(V["a"],{name:"checkbox",label:"SuperCheckbox",text:"\u662f\u5426\u8bb0\u4f4f\u5bc6\u7801"}),o.a.createElement(K["a"],{name:"checkbox-group",label:"SuperCheckboxGroup",options:[{label:"\u4e2d\u56fd",value:1},{label:"\u7f8e\u56fd",value:2}]}),o.a.createElement(q["a"],{name:"switch",label:"SuperSwitch"}),o.a.createElement(C["a"],{name:"select",label:"SuperSelect",options:[{label:"\u5c0f\u732b",value:1},{label:"\u5c0f\u72d7",value:2}]}),o.a.createElement(k["a"],{name:"select2",label:"\u652f\u6301\u641c\u7d22\u67e5\u8be2\u7684 Select",request:function(){var e=Object(c["a"])(l.a.mark((function e(a){var t,n,r;return l.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=a.keyWords,n=void 0===t?"":t,e.next=3,z(1e3);case 3:return r=Array.from({length:10}).map(((e,a)=>({value:a,label:"\u6a21\u677f-"+a}))).concat({value:n,label:"\u76ee\u6807_target"}),e.abrupt("return",{data:r});case 5:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}()})),o.a.createElement(p["a"],{label:"\u65f6\u95f4\u9009\u62e9\u7c7b"},o.a.createElement(I["a"],{name:"time",label:"SuperTime"}),o.a.createElement(x["a"],{name:"date",label:"SuperDate"}),o.a.createElement(T["a"],{name:"week",label:"SuperWeek"}),o.a.createElement(S["a"],{name:"month",label:"SuperMonth"}),o.a.createElement(P["a"],{name:"quarter",label:"SuperQuarter"}),o.a.createElement(D["a"],{name:"year",label:"SuperYear"}),o.a.createElement(j["a"],{name:"date-time",label:"SuperDateTime"})),o.a.createElement(p["a"],{label:"\u65f6\u95f4\u8303\u56f4\u9009\u62e9\u7c7b"},o.a.createElement(O["a"],{name:"date-range",label:"SuperDateRange"}),o.a.createElement(B["a"],{name:"time-range",label:"SuperTimeRange"}),o.a.createElement(R["a"],{name:"date-time-range",label:"SuperDateTimeRange"})),o.a.createElement(p["a"],{label:"\u4e0a\u4f20"},o.a.createElement(A["a"],{label:"upload",name:"upload",action:"upload.do"}),o.a.createElement(L["a"],{label:"Dragger",name:"dragger",action:"upload.do"})),o.a.createElement(p["a"],{label:"\u5176\u4ed6"},o.a.createElement(N["a"],{name:"rate",label:"SuperRate"}),o.a.createElement(U["a"],{name:"color",label:"SuperColor"}),o.a.createElement(F["a"],{name:"slider",label:"SuperSlider"}))))};a["default"]=J},"8xF2":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=()=>l.a.createElement(r["a"],null,l.a.createElement(c["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(c["a"],{name:"email",label:"\u90ae\u7bb1"}));a["default"]=m},"96Eh":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("D3pr"),i=t("IRze"),s=()=>l.a.createElement(r["a"],{axios:i["a"]},l.a.createElement(c["a"],{debug:!0},l.a.createElement(m["a"],{name:"role",label:"\u89d2\u8272",options:"/users",optionsProp:{labelKey:"name",valueKey:"id"}})));a["default"]=s},AAh4:function(e,a,t){"use strict";t.r(a);t("+L6B");var n=t("2/Rp"),l=t("q1tI"),r=t.n(l),c=t("KVgs"),m=t("cbCg"),i=()=>r.a.createElement(c["a"],{btns:{extraBtns:[{type:"default",text:"\u6d4b\u8bd5\u6587\u672c",key:"test",onClick:()=>{alert("test")},visible:!0},r.a.createElement(n["a"],{key:"print",onClick:()=>window.print()},"\u6253\u5370")]}},r.a.createElement(m["b"],{name:"name",label:"\u59d3\u540d"}),r.a.createElement(m["a"],{name:"email",label:"\u90ae\u7bb1"}));a["default"]=i},Brdr:function(e,a,t){"use strict";t.r(a),t.d(a,"getUser",(function(){return s}));var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("cbCg"),i=t("+tVr"),s=e=>Object(i["a"])({method:"GET",url:"/user/".concat(e)}),u=()=>l.a.createElement(r["a"],{axios:i["a"]},l.a.createElement(c["a"],{initApi:()=>s(1)},l.a.createElement(m["b"],{name:"name",label:"\u59d3\u540d"})));a["default"]=u},BwjI:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("K858"),c=()=>{var e={component:"div",className:["ant-card","ant-card-bordered","ant-card-hoverable"],style:{height:"300px",lineHeight:"300px",fontSize:"50px",textAlign:"center"},children:"\u672c\u6765\u65e0\u4e00\u7269\uff0c\u4f55\u5904\u60f9\u5c18\u57c3\u3002"};return l.a.createElement(r["e"],{schema:e})};a["default"]=c},CP4M:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("cbCg"),i=t("+tVr"),s=()=>l.a.createElement(r["a"],{axios:i["a"]},l.a.createElement(c["a"],{initApi:{url:"/user/1",method:"GET",params:{foo:"bar"}}},l.a.createElement(m["b"],{name:"name",label:"\u59d3\u540d"})));a["default"]=s},EAdU:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=()=>l.a.createElement(r["a"],{labelCol:4,wrapperCol:15},l.a.createElement(c["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(c["a"],{name:"email",label:"\u90ae\u7bb1"}));a["default"]=m},EPGR:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("cbCg"),i=t("DKs0"),s=t("lCkX"),u=()=>l.a.createElement(r["a"],{axios:s["a"]},l.a.createElement(c["a"],{initApi:{url:"/user/1",response:e=>({name:"".concat(e.first_name,"\xb7").concat(e.last_name),id:e.id})},api:{url:"/user/1",method:"PUT"},redirect:"https://bilibili.com"},l.a.createElement(m["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(i["a"],{name:"cat",label:"\u662f\u5426\u6709\u732b"}),l.a.createElement(m["b"],{visibleOn:e=>e.cat,linkageFields:["cat"],name:"cat_name",label:"\u732b\u7684\u540d\u5b57",clearValueAfterHidden:!0})));a["default"]=u},FM88:function(e,a,t){"use strict";t.r(a);var n=t("cJ7L"),l=t("KNrP"),r=t("q1tI"),c=t.n(r),m=t("KVgs"),i=t("cbCg"),s=t("DKs0"),u=t("3Twy"),o=t("K858"),b={form:m["a"],input:i["b"],email:i["a"],checkbox:s["a"],"icon-UserOutlined":n["a"],"icon-AudioOutlined":l["a"]},d=()=>{var e={component:"form",initialValues:{remember:!0},size:"large",children:[{component:"input",name:"name",label:"\u59d3\u540d",prefix:{component:"icon-UserOutlined"},suffix:{component:"icon-AudioOutlined"}},{component:"email",name:"email",label:"\u90ae\u7bb1"},{component:"checkbox",name:"remember",text:"remember me"}]};return c.a.createElement(u["a"],{components:b},c.a.createElement(o["e"],{schema:e}))};a["default"]=d},FpSD:function(e,a,t){"use strict";t.r(a);t("IzEo");var n=t("bx4M"),l=t("q1tI"),r=t.n(l),c=t("3Twy"),m=t("KVgs"),i=t("cbCg"),s=t("nSzK"),u=()=>r.a.createElement(c["a"],{axios:s["a"]},r.a.createElement(n["a"],{type:"inner",title:"\u8868\u53551"},r.a.createElement(m["a"],{refreshName:"form2",btns:{submitBtn:"\u70b9\u51fb\u63d0\u4ea4\u8bd5\u8bd5"}},r.a.createElement(i["b"],{name:"name",label:"\u59d3\u540d"}))),r.a.createElement("br",null),r.a.createElement(n["a"],{type:"inner",title:"\u8868\u53552"},r.a.createElement(m["a"],{name:"form2",initApi:{url:"/random"}},r.a.createElement(i["b"],{name:"user",label:"\u59d3\u540d"}))));a["default"]=u},IRze:function(e,a,t){"use strict";var n=t("vDqi"),l=t.n(n),r=l.a.create({baseURL:"https://www.fastmock.site/mock/3bff4788a9dad8a803681a2bca5f9cae/api/"});r.interceptors.response.use((function(e){var a=e.status,t=e.data,n=t.code,l=t.message,r=t.data;return 200===a&&0===n?r:Promise.reject({message:l,errors:r})}),(function(e){return Promise.reject(e)})),a["a"]=r},"If/V":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("NmBM"),m=e=>"string"===typeof e?e.toUpperCase():e,i=e=>"string"===typeof e?e.toLowerCase():e,s={toUpperCase:m,toLowerCase:i},u=()=>{var e={name:"jack"};return l.a.createElement(r["a"],{filters:s},l.a.createElement(c["a"],{value:"hello\uff1a{{data.name | toUpperCase}}",data:e}))};a["default"]=u},KpJC:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("cbCg"),i=t("DKs0"),s=t("pBBx"),u=()=>l.a.createElement(r["a"],{axios:s["a"]},l.a.createElement(c["a"],{api:{method:"PUT",url:"/user/1"},message:{saveSuccess:"\u4fdd\u5b58\u6210\u529f",saveError:"\u4fdd\u5b58\u5931\u8d25"}},l.a.createElement(m["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(m["a"],{name:"email",label:"\u90ae\u7bb1"}),l.a.createElement(i["a"],{name:"remember",text:"Remember me"})));a["default"]=u},L11e:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("NmBM"),c=()=>l.a.createElement(r["a"],{value:"{{data.total | toInt | toPrice}}",data:{total:23500.33}});a["default"]=c},L4vY:function(e,a,t){"use strict";t.r(a);var n=t("WmNS"),l=t.n(n),r=t("9og8"),c=t("q1tI"),m=t.n(c),i=t("3Twy"),s=t("KVgs"),u=t("D3pr"),o=t("+tVr"),b=()=>m.a.createElement(i["a"],{axios:o["a"]},m.a.createElement(s["a"],null,m.a.createElement(u["a"],{name:"type",label:"\u9009\u9879",options:Object(r["a"])(l.a.mark((function e(){var a;return l.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["a"].get("/options/a");case 2:return a=e.sent,e.abrupt("return",a.list.map((e=>({label:e.name,value:e.id}))));case 4:case"end":return e.stop()}}),e)})))})));a["default"]=b},MnQT:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("D3pr"),m=t("cbCg"),i=()=>l.a.createElement(r["a"],{debug:!0},l.a.createElement(c["a"],{name:"animation",label:"\u52a8\u6f2b",options:[{label:"\u770b",value:1},{label:"\u4e0d\u770b",value:2}]}),l.a.createElement(m["b"],{name:"name",label:"\u52a8\u6f2b\u540d\u79f0",linkageFields:["animation"],visibleOn:e=>1===e.animation}));a["default"]=i},NekF:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=()=>l.a.createElement(r["a"],{btns:{submitBtn:"\u81ea\u5b9a\u4e49\u6587\u672c",resetBtn:{type:"dashed",text:"reset Btn"}}},l.a.createElement(c["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(c["a"],{name:"email",label:"\u90ae\u7bb1"}));a["default"]=m},RGeH:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=()=>l.a.createElement(r["a"],{hideLabel:!0},l.a.createElement(c["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(c["a"],{name:"email",label:"\u90ae\u7bb1"}));a["default"]=m},"TPR/":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("NmBM"),c=()=>{var e={startTime:new Date};return l.a.createElement(r["a"],{value:"\u5f00\u59cb\u65f6\u95f4\u4e3a\uff1a{{data.startTime | date }}",data:e})};a["default"]=c},Tdy9:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=t("DKs0"),i=t("3Twy"),s=t("4rmk"),u={form:r["a"],input:c["b"],email:c["a"],checkbox:m["a"]},o=()=>{var e={component:"form",children:[{component:"input",name:"name",label:"\u59d3\u540d",key:"name"},{component:"email",name:"email",label:"\u90ae\u7bb1",key:"email"},{component:"checkbox",name:"remember",text:"Remember me",key:"remember"}]};return l.a.createElement(i["a"],{components:u},l.a.createElement(s["b"],{schema:e}))};a["default"]=o},UQjl:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("cbCg"),i=t("vjYb"),s=t("pBBx"),u=()=>l.a.createElement(r["a"],{axios:s["a"]},l.a.createElement(c["a"],{align:"center",hideLabel:!0,size:"large",style:{width:330},btns:{resetBtn:!1,submitBtn:{text:"\u767b\u5f55",style:{width:330}}}},l.a.createElement(m["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(i["a"],{name:"password",label:"\u5bc6\u7801"})));a["default"]=u},Wx8u:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=t("D3pr"),i=()=>l.a.createElement(r["a"],{initialValues:{name:""},layout:"vertical"},l.a.createElement(c["b"],{name:"name",label:"\u5ba2\u6237\u540d\u79f0"}),l.a.createElement(m["a"],{name:"type",linkageFields:["name"],label:"\u548c\u300a{{ data.name }}\u300b\u7b7e\u8ba2\u5408\u540c\u7c7b\u578b\u4e3a",options:[{label:"\u4e0b\u7ebf\u7b7e\u7ea6",value:1},{label:"\u7ebf\u4e0a\u7b7e\u7ea6",value:2}]}));a["default"]=i},a4uO:function(e,a,t){"use strict";t.r(a);var n=t("cJ7L"),l=t("KNrP"),r=t("q1tI"),c=t.n(r),m=t("KVgs"),i=t("cbCg"),s=t("DKs0"),u=t("3Twy"),o=t("K858"),b=t("7hqS"),d={form:m["a"],input:i["b"],email:i["a"],checkbox:s["a"],"icon-UserOutlined":n["a"],"icon-AudioOutlined":l["a"]};a["default"]=()=>c.a.createElement(u["a"],{axios:b["a"],components:d},c.a.createElement(o["e"],{schema:{component:"div",style:{margin:"20px"},schemaApi:"/form"}}))},anBb:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=()=>l.a.createElement(r["a"],{resetAfterSubmit:!0,persistData:!0,name:"userInfo"},l.a.createElement(c["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(c["a"],{name:"email",label:"\u90ae\u7bb1"}));a["default"]=m},bJv8:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("cbCg"),i=t("DKs0"),s=t("pBBx"),u=()=>l.a.createElement(r["a"],{axios:s["a"]},l.a.createElement(c["a"],{debug:!0,initialValues:{remember:!0},initApi:"/user/1"},l.a.createElement(m["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(m["a"],{name:"email",label:"\u90ae\u7bb1"}),l.a.createElement(i["a"],{name:"remember",text:"Remember me"})));a["default"]=u},bvM2:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=()=>l.a.createElement(r["a"],{btns:{btnsAlign:"center"}},l.a.createElement(c["b"],{labelCol:8,wrapperCol:8,name:"name",label:"\u59d3\u540d"}),l.a.createElement(c["b"],{labelCol:8,wrapperCol:8,name:"phone",label:"\u624b\u673a\u53f7"}));a["default"]=m},bz2r:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("cbCg"),i=()=>l.a.createElement(r["a"],null,l.a.createElement("h2",null,"A \u8868\u5355"),l.a.createElement(c["a"],{updateName:"b-form"},l.a.createElement(m["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(m["a"],{name:"email",label:"\u90ae\u7bb1"})),l.a.createElement("h2",null,"B \u8868\u5355"),l.a.createElement(c["a"],{name:"b-form",readonly:!0},l.a.createElement(m["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(m["a"],{name:"email",label:"\u90ae\u7bb1"})));a["default"]=i},cWjg:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("D3pr"),i=t("IRze"),s=()=>l.a.createElement(r["a"],{axios:i["a"]},l.a.createElement(c["a"],null,l.a.createElement(m["a"],{name:"province",label:"\u7701\u4efd",options:[{label:"\u5e7f\u4e1c",value:"guangdong"},{label:"\u6cb3\u5357",value:"henan"}]}),l.a.createElement(m["a"],{visibleOn:e=>e.province,name:"city",label:"\u57ce\u5e02",linkageFields:"province",options:"/city?province={{data.province}}"})));a["default"]=s},cZYa:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("cbCg"),i=t("+tVr"),s=()=>l.a.createElement(r["a"],{axios:i["a"]},l.a.createElement(c["a"],{api:{url:"https://error.com",method:"PUT"},message:{saveError:"\u8bf7\u6c42\u5730\u5740\u9519\u8bef\u4e86~"}},l.a.createElement(m["b"],{name:"province",label:"\u7701\u4efd"}),l.a.createElement(m["b"],{name:"city",label:"\u57ce\u5e02"})));a["default"]=s},"cl+j":function(e,a,t){"use strict";t.r(a);t("+L6B");var n=t("2/Rp"),l=t("q1tI"),r=t.n(l),c=t("KVgs"),m=t("cbCg"),i=()=>r.a.createElement(c["a"],{btns:{render(e,a){return r.a.createElement(n["a"],{type:"primary",htmlType:"submit"},"\u81ea\u5b9a\u4e49\u7684\u63d0\u4ea4")}}},r.a.createElement(m["b"],{name:"name",label:"\u59d3\u540d"}),r.a.createElement(m["a"],{name:"email",label:"\u90ae\u7bb1"}));a["default"]=i},"eAZ+":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("cbCg"),i=t("vDqi"),s=t.n(i),u=s.a.create({baseURL:"https://www.fastmock.site/mock/3bff4788a9dad8a803681a2bca5f9cae/api/"});u.interceptors.response.use((function(e){var a=e.status,t=e.data,n=t.code,l=t.message,r=t.data;return 200===a&&0===n?r:Promise.reject({message:l,errors:r})}),(function(e){return Promise.reject(e)}));var o=u,b=()=>l.a.createElement(r["a"],{axios:o},l.a.createElement(c["a"],{initApi:{url:"/user/1",response:{name:"{{data.first_name}}-{{data.last_name}}"}},api:{url:"/user/1",method:"PUT",data:{first_name:'{{data.name.split("-")[0]}}',last_name:'{{data.name.split("-")[1]}}'}}},l.a.createElement(m["b"],{name:"name",label:"\u59d3\u540d"})));a["default"]=b},f7kR:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=t("3Twy"),i=t("K858"),s=t("7hqS"),u={form:r["a"],input:c["b"]},o=()=>{var e={component:"form",api:{url:"/user/1",method:"PUT"},redirect:"https://bilibili.com",children:{component:"input",name:"username",label:"\u59d3\u540d"}};return l.a.createElement(m["a"],{components:u,axios:s["a"]},l.a.createElement(i["e"],{schema:e}))};a["default"]=o},gVrH:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("cbCg"),i=t("vjYb"),s=t("+tVr"),u=()=>l.a.createElement(r["a"],{axios:s["a"]},l.a.createElement(c["a"],{align:"center",hideLabel:!0,size:"large",style:{width:330},api:{url:"/login/error",method:"POST"},btns:{resetBtn:!1,submitBtn:{text:"\u767b\u5f55",style:{width:330}}}},l.a.createElement(m["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(i["a"],{name:"password",label:"\u5bc6\u7801"})));a["default"]=u},goht:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("Plug"),m=t("cbCg"),i=()=>l.a.createElement(r["a"],{initialValues:{address:{}},debug:!0,layout:"vertical"},l.a.createElement(c["a"],null,l.a.createElement(m["b"],{name:"address.province",label:"\u7701\u4efd"}),l.a.createElement(m["b"],{name:"address.city",visibleOn:"{{data.address.province}}",linkageFields:["address.province"],label:"\u57ce\u5e02"})));a["default"]=i},hLyi:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=()=>l.a.createElement(r["a"],{readonly:!0,initialValues:{name:"jack",email:"jack@gmail.com"}},l.a.createElement(c["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(c["a"],{name:"email",label:"\u90ae\u7bb1"}));a["default"]=m},hpix:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("Plug"),m=t("cbCg"),i=()=>l.a.createElement(r["a"],null,l.a.createElement(c["a"],{label:"\u57fa\u672c\u4fe1\u606f"},l.a.createElement(m["b"],{name:"name",label:"\u59d3\u540d",required:!0,hideLabel:!0,rules:[{type:"string",min:2}]}),l.a.createElement(m["b"],{hideLabel:!0,name:"age",label:"\u5e74\u9f84"})));a["default"]=i},i7k2:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=t("L/hZ"),i=t("3Twy"),s=t("K858"),u={form:r["a"],input:c["b"],number:m["a"]},o=()=>{var e={component:"form",initialValues:{remember:!0},size:"large",children:[{component:"input",name:"name",label:"\u59d3\u540d"},{component:"number",name:"age",label:"\u5e74\u9f84"},{component:"number",name:"money",label:"\u6536\u5165"}]},a={number:{min:0}};return l.a.createElement(i["a"],{components:u,componentProps:a},l.a.createElement(s["e"],{schema:e}))};a["default"]=o},j6Y2:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=()=>l.a.createElement(r["a"],{resetAfterSubmit:!0},l.a.createElement(c["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(c["a"],{name:"email",label:"\u90ae\u7bb1"}));a["default"]=m},jjru:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("D3pr"),m=t("cbCg"),i=()=>l.a.createElement(r["a"],{debug:!0},l.a.createElement(c["a"],{name:"animation",label:"\u52a8\u6f2b",options:[{label:"\u770b",value:1},{label:"\u4e0d\u770b",value:2}]}),l.a.createElement(m["b"],{name:"name",label:"\u52a8\u6f2b\u540d\u79f0",linkageFields:["animation"],visibleOn:"{{data.animation === 1}}"}));a["default"]=i},kawc:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("D3pr"),m=t("cbCg"),i=()=>l.a.createElement(r["a"],null,l.a.createElement(c["a"],{name:"animation",label:"\u52a8\u6f2b",options:[{label:"\u770b",value:1},{label:"\u4e0d\u770b",value:2}]}),l.a.createElement(m["b"],{name:"name",label:"\u52a8\u6f2b\u540d\u79f0",linkageFields:["animation"],visibleOn:e=>1===e.animation}));a["default"]=i},l81C:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=()=>l.a.createElement(r["a"],{disabled:!0},l.a.createElement(c["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(c["a"],{name:"email",label:"\u90ae\u7bb1"}));a["default"]=m},lCkX:function(e,a,t){"use strict";var n=t("vDqi"),l=t.n(n),r=l.a.create({baseURL:"https://www.fastmock.site/mock/3bff4788a9dad8a803681a2bca5f9cae/api/"});r.interceptors.response.use((function(e){var a=e.status,t=e.data,n=t.code,l=t.message,r=t.data;return 200===a&&0===n?r:Promise.reject({message:l,errors:r})}),(function(e){return Promise.reject(e)})),a["a"]=r},lZsN:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("D3pr"),i=t("nSzK"),s=()=>l.a.createElement(r["a"],{axios:i["a"]},l.a.createElement(c["a"],{debug:!0,initialValues:{type:"a"}},l.a.createElement(m["a"],{name:"type",label:"\u7c7b\u578b",options:["a","b","c"]}),l.a.createElement(m["a"],{name:"type_val",label:"\u7c7b\u578b\u5217\u8868",linkageFields:["type"],options:{url:"/options/{{data.type}}",response:e=>e.list},clearValueAfterOptionsChange:!0,optionsProp:{labelKey:"name",valueKey:"id"}})));a["default"]=s},mIk2:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=()=>l.a.createElement(r["a"],{redirect:"https://bilibili.com"},l.a.createElement(c["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(c["a"],{name:"email",label:"\u90ae\u7bb1"}));a["default"]=m},mOIH:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("cbCg"),m=()=>l.a.createElement(r["a"],{btns:{resetBtn:!1}},l.a.createElement(c["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(c["a"],{name:"email",label:"\u90ae\u7bb1"}));a["default"]=m},nSzK:function(e,a,t){"use strict";var n=t("vDqi"),l=t.n(n),r=l.a.create({baseURL:"https://www.fastmock.site/mock/3bff4788a9dad8a803681a2bca5f9cae/api/"});r.interceptors.response.use((function(e){var a=e.status,t=e.data,n=t.code,l=t.message,r=t.data;return 200===a&&0===n?r:Promise.reject({message:l,errors:r})}),(function(e){return Promise.reject(e)})),a["a"]=r},oJkN:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("cbCg"),i=t("L/hZ"),s=()=>l.a.createElement(r["a"],{delimiters:["${","}"]},l.a.createElement(c["a"],null,l.a.createElement(m["b"],{name:"name",label:"\u59d3\u540d"}),l.a.createElement(i["a"],{name:"age",linkageFields:["name"],disabledOn:"${!data.name}",label:"\u5e74\u9f84"})));a["default"]=s},pBBx:function(e,a,t){"use strict";var n=t("vDqi"),l=t.n(n),r=l.a.create({baseURL:"https://www.fastmock.site/mock/3bff4788a9dad8a803681a2bca5f9cae/api/"});r.interceptors.response.use((function(e){var a=e.status,t=e.data,n=t.code,l=t.message,r=t.data;return 200===a&&0===n?r:Promise.reject({message:l,errors:r})}),(function(e){return Promise.reject(e)})),a["a"]=r},pt1h:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("D3pr"),i=t("IRze"),s=()=>l.a.createElement(r["a"],{axios:i["a"]},l.a.createElement(c["a"],{debug:!0},l.a.createElement(m["a"],{name:"role",label:"\u89d2\u8272",options:{url:"/users",method:"GET",response:e=>e.map((e=>({label:e.name,value:e.id})))}})));a["default"]=s},qSGO:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("D3pr"),m=()=>l.a.createElement(r["a"],{debug:!0},l.a.createElement(c["a"],{name:"country",label:"\u56fd\u5bb6",options:[{label:"\u4e2d\u56fd",value:"china"},{label:"\u7f8e\u56fd",value:"usa"},{label:"\u65e5\u672c",value:"jp"}]}));a["default"]=m},rkN1:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("KVgs"),c=t("D3pr"),m=()=>l.a.createElement(r["a"],{debug:!0},l.a.createElement(c["a"],{name:"langrage",label:"\u7f16\u7a0b\u8bed\u8a00",options:["Go","Javascript",{label:"Python",value:"Python"}]}));a["default"]=m},sJVB:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("D3pr"),i=t("IRze"),s=()=>l.a.createElement(r["a"],{axios:i["a"]},l.a.createElement(c["a"],{debug:!0},l.a.createElement(m["a"],{name:"province",label:"\u7701\u4efd",options:[{label:"\u5e7f\u4e1c",value:"guangdong"},{label:"\u6cb3\u5357",value:"henan"}]}),l.a.createElement(m["a"],{clearValueAfterOptionsChange:!0,visibleOn:e=>e.province,name:"city",label:"\u57ce\u5e02",linkageFields:"province",options:"/city?province={{data.province}}"})));a["default"]=s},tWRm:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("cbCg"),i=t("+tVr"),s=()=>l.a.createElement(r["a"],{axios:i["a"]},l.a.createElement(c["a"],{initApi:"/user/1"},l.a.createElement(m["b"],{name:"name",label:"\u59d3\u540d"})));a["default"]=s},u4sA:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("cbCg"),i=t("pBBx"),s=()=>l.a.createElement(r["a"],{axios:i["a"]},l.a.createElement(c["a"],{preserveRemoteData:!0,api:{url:"/user/1",method:"POST"},initApi:"/user/1",btns:{submitBtn:"\u4f7f\u7528 network \u770b\u770b\u8bf7\u6c42\u53c2\u6570"}},l.a.createElement(m["b"],{name:"name",label:"\u59d3\u540d"})));a["default"]=s},"w4i+":function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),l=t.n(n),r=t("3Twy"),c=t("KVgs"),m=t("D3pr"),i=t("+tVr"),s=()=>l.a.createElement(r["a"],{axios:i["a"]},l.a.createElement(c["a"],null,l.a.createElement(m["a"],{name:"province",label:"\u7701\u4efd",options:[{label:"\u5e7f\u4e1c",value:"guangdong"},{label:"\u6cb3\u5357",value:"henan"}]}),l.a.createElement(m["a"],{clearValueAfterOptionsChange:!0,visibleOn:e=>e.province,name:"city",label:"\u57ce\u5e02",linkageFields:"province",options:"/city?province={{data.province}}"})));a["default"]=s},wNgW:function(e,a,t){"use strict";t.r(a);t("miYZ");var n=t("tsqr"),l=t("q1tI"),r=t.n(l),c=t("3Twy"),m=t("KVgs"),i=t("cbCg"),s=t("+tVr"),u=e=>{e&&n["b"].success(e)},o=(e,a)=>{n["b"].error(e||(null===a||void 0===a?void 0:a.message))},b=()=>r.a.createElement(c["a"],{axios:s["a"],successNotify:u,errorNotify:o},r.a.createElement(m["a"],{api:{url:"/user/1",method:"POST"}},r.a.createElement(i["b"],{name:"name",label:"\u59d3\u540d"})));a["default"]=b},xnpF:function(e,a,t){"use strict";t.r(a);t("IzEo");var n=t("bx4M"),l=t("q1tI"),r=t.n(l),c=t("3Twy"),m=t("KVgs"),i=t("cbCg"),s=()=>r.a.createElement(c["a"],null,r.a.createElement(n["a"],{type:"inner",title:"\u8868\u53551"},r.a.createElement(m["a"],{updateName:"form2",btns:{submitBtn:"\u70b9\u51fb\u63d0\u4ea4\u8bd5\u8bd5"}},r.a.createElement(i["b"],{name:"name",label:"\u59d3\u540d"}))),r.a.createElement("br",null),r.a.createElement(n["a"],{type:"inner",title:"\u8868\u53552"},r.a.createElement(m["a"],{name:"form2"},r.a.createElement(i["b"],{name:"name",label:"\u59d3\u540d"}))));a["default"]=s}}]);