(this["webpackJsonpfe-admin-senior-ute"]=this["webpackJsonpfe-admin-senior-ute"]||[]).push([[19],{311:function(e,t,n){"use strict";n.d(t,"e",(function(){return l})),n.d(t,"c",(function(){return u})),n.d(t,"b",(function(){return d})),n.d(t,"d",(function(){return j})),n.d(t,"a",(function(){return b}));var c=n(121),a=n(92),s=n.n(a),i=n(418),r=n.n(i),o=n(61),l=r.a.create({baseURL:o.b.ApiUrl,timeout:3e4,headers:{"Content-Type":"application/json"}});l.interceptors.request.use((function(e){var t,n=o.b.getAPIRequestToken();return n?(e.headers.Authorization="".concat(null===n||void 0===n||null===(t=n.access)||void 0===t?void 0:t.token),e):e}),(function(e){return Promise.reject(e)})),l.interceptors.response.use((function(e){return e}),(function(e){var t=e.response.status,n=e.response.config;return 401===t&&Object(c.a)(s.a.mark((function e(){var t,c,a,i,r,u,d,j;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=o.b.getAPIRequestToken(),e.next=3,l.post("/api/v1/user/refresh",{refreshToken:null===c||void 0===c||null===(t=c.refresh)||void 0===t?void 0:t.token});case 3:if(null===(a=e.sent)||void 0===a||!a.data){e.next=13;break}if(null!==a&&void 0!==a&&null!==(i=a.data)&&void 0!==i&&i.token){e.next=8;break}return o.b.setApiRequestToken(""),e.abrupt("return");case 8:return o.b.setApiRequestToken(null===a||void 0===a||null===(r=a.data)||void 0===r?void 0:r.token),n.headers={"Content-Type":"application/json",Authorization:"".concat(null===a||void 0===a||null===(u=a.data)||void 0===u||null===(d=u.token)||void 0===d||null===(j=d.access)||void 0===j?void 0:j.token)},n.baseURL=o.b.ApiUrl,n.timeout=3e4,e.abrupt("return",l(n));case 13:case"end":return e.stop()}}),e)})))(),e.response}));var u=function(e,t){return l.post(e,t)},d=function(e,t){return l.get("".concat(e),{params:t})},j=function(e,t){return l.put("".concat(e),t)},b=function(e,t){return l.delete("".concat(e),{params:t})}},313:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var c=n(645),a=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";c.a[e]({message:t,description:n})}},383:function(e,t,n){"use strict";n(0);var c=n(656),a=n(283),s=n(178),i=(n(384),n(1));t.a=function(e){var t=e.show,n=e.handleClose,r=e.handleSubmit,o=e.title,l=e.body;return Object(i.jsx)(i.Fragment,{children:Object(i.jsx)(c.a,{show:t,onHide:n,className:"modal-question",children:Object(i.jsxs)(a.a,{children:[Object(i.jsx)(c.a.Header,{closeButton:!0,children:Object(i.jsx)(c.a.Title,{children:o})}),Object(i.jsx)(c.a.Body,{children:Object(i.jsx)("pre",{style:{whiteSpace:"pre-line",fontSize:"20px"},children:l})}),Object(i.jsxs)(c.a.Footer,{children:[Object(i.jsx)(s.a,{variant:"secondary",onClick:n,children:"Close"}),Object(i.jsx)(s.a,{variant:"primary",onClick:r,children:"Submit"})]})]})})})}},384:function(e,t,n){},389:function(e,t,n){"use strict";n.d(t,"c",(function(){return l})),n.d(t,"b",(function(){return u}));n(0);var c=n(331),a=n(1),s=function(){return Object(a.jsxs)("svg",{viewBox:"0 0 18 18",children:[Object(a.jsx)("polygon",{className:"ql-fill ql-stroke",points:"6 10 4 12 2 10 6 10"}),Object(a.jsx)("path",{className:"ql-stroke",d:"M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"})]})},i=function(){return Object(a.jsxs)("svg",{viewBox:"0 0 18 18",children:[Object(a.jsx)("polygon",{className:"ql-fill ql-stroke",points:"12 10 14 12 16 10 12 10"}),Object(a.jsx)("path",{className:"ql-stroke",d:"M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"})]})};var r=c.Quill.import("formats/size");r.whitelist=["extra-small","small","medium","large"],c.Quill.register(r,!0);var o=c.Quill.import("formats/font");o.whitelist=["arial","comic-sans","courier-new","georgia","helvetica","lucida"],c.Quill.register(o,!0);var l={toolbar:{container:"#toolbar",handlers:{undo:function(){this.quill.history.undo()},redo:function(){this.quill.history.redo()}}},history:{delay:500,maxStack:100,userOnly:!0}},u=["header","font","size","bold","italic","underline","align","strike","script","blockquote","background","list","bullet","indent","link","image","video","color","code-block"];t.a=function(){return Object(a.jsxs)("div",{id:"toolbar",children:[Object(a.jsxs)("span",{className:"ql-formats",children:[Object(a.jsxs)("select",{className:"ql-font",defaultValue:"arial",children:[Object(a.jsx)("option",{value:"arial",children:"Arial"}),Object(a.jsx)("option",{value:"comic-sans",children:"Comic Sans"}),Object(a.jsx)("option",{value:"courier-new",children:"Courier New"}),Object(a.jsx)("option",{value:"georgia",children:"Georgia"}),Object(a.jsx)("option",{value:"helvetica",children:"Helvetica"}),Object(a.jsx)("option",{value:"lucida",children:"Lucida"})]}),Object(a.jsxs)("select",{className:"ql-size",defaultValue:"medium",children:[Object(a.jsx)("option",{value:"extra-small",children:"Size 1"}),Object(a.jsx)("option",{value:"small",children:"Size 2"}),Object(a.jsx)("option",{value:"medium",children:"Size 3"}),Object(a.jsx)("option",{value:"large",children:"Size 4"})]}),Object(a.jsxs)("select",{className:"ql-header",defaultValue:"3",children:[Object(a.jsx)("option",{value:"1",children:"Heading"}),Object(a.jsx)("option",{value:"2",children:"Subheading"}),Object(a.jsx)("option",{value:"3",children:"Normal"})]})]}),Object(a.jsxs)("span",{className:"ql-formats",children:[Object(a.jsx)("button",{className:"ql-bold"}),Object(a.jsx)("button",{className:"ql-italic"}),Object(a.jsx)("button",{className:"ql-underline"}),Object(a.jsx)("button",{className:"ql-strike"})]}),Object(a.jsxs)("span",{className:"ql-formats",children:[Object(a.jsx)("button",{className:"ql-list",value:"ordered"}),Object(a.jsx)("button",{className:"ql-list",value:"bullet"}),Object(a.jsx)("button",{className:"ql-indent",value:"-1"}),Object(a.jsx)("button",{className:"ql-indent",value:"+1"})]}),Object(a.jsxs)("span",{className:"ql-formats",children:[Object(a.jsx)("button",{className:"ql-script",value:"super"}),Object(a.jsx)("button",{className:"ql-script",value:"sub"}),Object(a.jsx)("button",{className:"ql-blockquote"}),Object(a.jsx)("button",{className:"ql-direction"})]}),Object(a.jsxs)("span",{className:"ql-formats",children:[Object(a.jsx)("select",{className:"ql-align"}),Object(a.jsx)("select",{className:"ql-color"}),Object(a.jsx)("select",{className:"ql-background"})]}),Object(a.jsxs)("span",{className:"ql-formats",children:[Object(a.jsx)("button",{className:"ql-link"}),Object(a.jsx)("button",{className:"ql-image"}),Object(a.jsx)("button",{className:"ql-video"})]}),Object(a.jsxs)("span",{className:"ql-formats",children:[Object(a.jsx)("button",{className:"ql-formula"}),Object(a.jsx)("button",{className:"ql-code-block"}),Object(a.jsx)("button",{className:"ql-clean"})]}),Object(a.jsxs)("span",{className:"ql-formats",children:[Object(a.jsx)("button",{className:"ql-undo",children:Object(a.jsx)(s,{})}),Object(a.jsx)("button",{className:"ql-redo",children:Object(a.jsx)(i,{})})]})]})}},390:function(e,t,n){"use strict";n.d(t,"d",(function(){return a})),n.d(t,"e",(function(){return s})),n.d(t,"a",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"b",(function(){return o}));var c=n(311),a=function(){return Object(c.b)("/api/v1/topic/list")},s=function(e){return Object(c.b)("/api/v1/topic?_id=".concat(e))},i=function(e){return Object(c.c)("/api/v1/topic",e)},r=function(e){return Object(c.d)("/api/v1/topic",e)},o=function(e){return c.e.delete("/api/v1/topic?_id=".concat(e._id))}},451:function(e,t,n){"use strict";n.d(t,"e",(function(){return a})),n.d(t,"f",(function(){return s})),n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return r})),n.d(t,"d",(function(){return o})),n.d(t,"c",(function(){return l}));var c=n(311),a=function(){return Object(c.b)("/api/v1/question/list")},s=function(e){return Object(c.b)("/api/v1/question?_id=".concat(e))},i=function(e){return Object(c.c)("/api/v1/question",e)},r=function(e){return Object(c.c)("/api/v1/question/with-exam",e)},o=function(e){return Object(c.d)("/api/v1/question",e)},l=function(e){return c.e.delete("/api/v1/question?_id=".concat(e._id))}},625:function(e,t,n){},626:function(e,t,n){},627:function(e,t,n){},661:function(e,t,n){"use strict";n.r(t);var c=n(19),a=n(121),s=n(36),i=n(92),r=n.n(i),o=n(10),l=n(12),u=n(287),d=n(178),j=n(383),b=n(313),h=n(451),f=n(7),v=n(0),O=n.n(v),p=n(46),x=n(123),m=n(656),w=n(283),k=n(276),q=n(179),N=n(281),g=n(390),y=n(648),C=n(331),_=n.n(C),S=n(389),A=(n(625),n(1)),I=function(e){return Object(A.jsxs)("div",{className:"text-editor",children:[Object(A.jsx)(S.a,{}),Object(A.jsx)(_.a,Object(c.a)(Object(c.a)({theme:"snow"},e),{},{value:e.value||"",modules:S.c,formats:S.b}))]})},T=(n(626),y.a.Option),Q=function(e){var t,n=e.show,i=e.handleClose,o=e.item,l=e.setItem,u=e.fetchQuestionList,j=Object(v.useState)([]),f=Object(s.a)(j,2),O=f[0],p=f[1],x=Object(v.useState)(""),C=Object(s.a)(x,2),_=C[0],S=C[1],Q=Object(v.useState)(""),z=Object(s.a)(Q,2),D=z[0],B=z[1],G=Object(v.useState)(""),L=Object(s.a)(G,2),V=L[0],E=L[1];Object(v.useEffect)((function(){""!==o?(B(o.question),E(o.explanation)):(B(""),E(""))}),[o]);var H=function(){var e=Object(a.a)(r.a.mark((function e(t){var n,a,s,d,j;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),n=o,l(""),a="single_choice",s=[],d="",void 0===(null===n||void 0===n?void 0:n.question)){e.next=25;break}return e.prev=7,s=(s=n.choices).map((function(e,n){return Object(c.a)(Object(c.a)({},e),{},{label:t.target["choices".concat(n)].value.trim()})})),d=t.target.answer[0].checked?{_id:s[0]._id}:t.target.answer[1].checked?{_id:s[1]._id}:t.target.answer[2].checked?{_id:s[2]._id}:{_id:s[3]._id},e.next=13,Object(h.d)(Object(c.a)(Object(c.a)({},n),{},{question:D,explanation:V,type:a,choices:s,answer:d,topic:null===O||void 0===O?void 0:O.find((function(e){return e.title===_}))._id}));case 13:if(201!==e.sent.status){e.next=19;break}return e.next=17,u();case 17:i(),Object(b.a)("success","A new question has been updated");case 19:e.next=23;break;case 21:e.prev=21,e.t0=e.catch(7);case 23:e.next=40;break;case 25:for(e.prev=25,j=0;j<4;j++)s.push({_id:j,label:t.target["choices".concat(j)].value.trim()});return d=t.target.answer[0].checked?{_id:0}:t.target.answer[1].checked?{_id:1}:t.target.answer[2].checked?{_id:2}:{_id:3},e.next=30,Object(h.a)({question:D,explanation:V,type:a,choices:s,answer:d,topic:null===O||void 0===O?void 0:O.find((function(e){return e.title===_}))._id});case 30:if(201!==e.sent.status){e.next=36;break}return e.next=34,u();case 34:i(),Object(b.a)("success","A new question has been created");case 36:e.next=40;break;case 38:e.prev=38,e.t1=e.catch(25);case 40:case"end":return e.stop()}}),e,null,[[7,21],[25,38]])})));return function(t){return e.apply(this,arguments)}}();return Object(v.useEffect)((function(){Object(a.a)(r.a.mark((function e(){var t,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(g.d)();case 3:n=e.sent,p(null===n||void 0===n||null===(t=n.data)||void 0===t?void 0:t.topic),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})))()}),[]),Object(A.jsx)(A.Fragment,{children:Object(A.jsx)(m.a,{show:n,onHide:Object(a.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l("");case 2:i();case 3:case"end":return e.stop()}}),e)}))),className:"modal-question",children:Object(A.jsxs)(w.a,{noValidate:!0,onSubmit:H,children:[Object(A.jsx)(m.a.Header,{closeButton:!0,children:Object(A.jsx)(m.a.Title,{children:"Add New Question"})}),Object(A.jsx)(m.a.Body,{children:Object(A.jsxs)(k.a,{children:[Object(A.jsxs)(q.a,{lg:8,children:[Object(A.jsxs)(w.a.Group,{className:"form-group mb-3",as:q.a,controlId:"formTitle",children:[Object(A.jsx)(w.a.Label,{children:"Question"}),Object(A.jsx)(I,{state:D,setState:B,placeholder:"Enter question"})]}),Object(A.jsxs)(w.a.Group,{className:"form-group error mb-3",controlId:"formDescription",children:[Object(A.jsx)(w.a.Label,{children:"Explanation(Optional)"}),Object(A.jsx)(N.a,{children:Object(A.jsx)(w.a.Control,{as:"textarea",value:V,onChange:function(e){return E(e.target.value)},rows:3,placeholder:"Enter explanation"})})]}),Object(A.jsx)(w.a.Label,{children:"Answer"}),Object(A.jsxs)(w.a.Group,{className:"mb-3 d-flex",controlId:"formDescription",children:[Object(A.jsx)(w.a.Check,{inline:!0,defaultChecked:void 0!==(null===o||void 0===o?void 0:o.choices)&&(null===o||void 0===o?void 0:o.choices[0]._id)===(null===o||void 0===o?void 0:o.answer),name:"answer",type:"radio",id:"inline-1"}),Object(A.jsx)(w.a.Control,{defaultValue:void 0!==(null===o||void 0===o?void 0:o.choices)?o.choices[0].label:"",as:"textarea",name:"choices0",rows:2,placeholder:"Answer A"})]}),Object(A.jsxs)(w.a.Group,{className:"mb-3 d-flex",controlId:"formDescription",children:[Object(A.jsx)(w.a.Check,{inline:!0,defaultChecked:void 0!==(null===o||void 0===o?void 0:o.choices)&&(null===o||void 0===o?void 0:o.choices[1]._id)===(null===o||void 0===o?void 0:o.answer),name:"answer",type:"radio",id:"inline-2"}),Object(A.jsx)(w.a.Control,{defaultValue:void 0!==(null===o||void 0===o?void 0:o.choices)?o.choices[1].label:"",as:"textarea",name:"choices1",rows:2,placeholder:"Answer B"})]}),Object(A.jsxs)(w.a.Group,{className:"mb-3 d-flex",controlId:"formDescription",children:[Object(A.jsx)(w.a.Check,{inline:!0,defaultChecked:void 0!==(null===o||void 0===o?void 0:o.choices)&&(null===o||void 0===o?void 0:o.choices[2]._id)===(null===o||void 0===o?void 0:o.answer),name:"answer",type:"radio",id:"inline-3"}),Object(A.jsx)(w.a.Control,{defaultValue:void 0!==(null===o||void 0===o?void 0:o.choices)?o.choices[2].label:"",as:"textarea",rows:2,name:"choices2",placeholder:"Answer C"})]}),Object(A.jsxs)(w.a.Group,{className:"mb-3 d-flex",controlId:"formDescription",children:[Object(A.jsx)(w.a.Check,{inline:!0,defaultChecked:void 0!==(null===o||void 0===o?void 0:o.choices)&&(null===o||void 0===o?void 0:o.choices[3]._id)===(null===o||void 0===o?void 0:o.answer),name:"answer",type:"radio",id:"inline-4"}),Object(A.jsx)(w.a.Control,{defaultValue:void 0!==(null===o||void 0===o?void 0:o.choices)?o.choices[3].label:"",as:"textarea",name:"choices3",rows:2,placeholder:"Answer D"})]})]}),Object(A.jsx)(q.a,{lg:4,children:Object(A.jsxs)(w.a.Group,{className:"mb-3",controlId:"formDescription",children:[Object(A.jsx)(w.a.Label,{children:"Topic"}),Object(A.jsx)(y.a,{style:{width:"300px"},defaultValue:""!==o&&(null===O||void 0===O||null===(t=O.find((function(e){return e._id===o.topic})))||void 0===t?void 0:t.title),onChange:function(e){S(e)},children:null===O||void 0===O?void 0:O.map((function(e){return Object(A.jsx)(T,{value:e.title,children:e.title},e._id)}))})]})})]})}),Object(A.jsxs)(m.a.Footer,{children:[Object(A.jsx)(d.a,{variant:"secondary",onClick:Object(a.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l("");case 2:i();case 3:case"end":return e.stop()}}),e)}))),children:"Close"}),Object(A.jsx)(d.a,{variant:"primary",type:"submit",children:"Submit"})]})]})})})},z=n(288),D=(n(627),function(e){e.data,e.title,e.handleShow;var t=O.a.useState(10),n=Object(s.a)(t,2);n[0],n[1];return Object(A.jsx)(z.a,{border:"light",className:"table-wrapper table-responsive shadow-sm",children:Object(A.jsx)(z.a.Body,{className:"pt-0",children:Object(A.jsx)("div",{style:{height:632,width:"100%"}})})})});t.default=function(){var e=Object(v.useState)([]),t=Object(s.a)(e,2),n=t[0],i=t[1],O=Object(v.useState)(!1),m=Object(s.a)(O,2),w=m[0],k=m[1],q=Object(p.d)((function(e){return e.confirmDelete})),N=Object(p.c)(),g=function(){return k(!0)},y=Object(v.useState)(""),C=Object(s.a)(y,2),_=C[0],S=C[1],I=Object(v.useState)(""),T=Object(s.a)(I,2),z=T[0],B=T[1];N(Object(x.c)({title:"Confirm delete this question",body:"Are you sure to delete this question ?\n            This question in exam which contains this will be remove.\n            This modified changes will not saved and you can't rollback"}));var G=function(){var e=Object(a.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(h.c)({_id:z});case 3:if(200!==e.sent.status){e.next=9;break}return e.next=7,V();case 7:N(Object(x.b)({show:!1})),Object(b.a)("success","Delete question successfully");case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),alert(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}(),L=Object(v.useCallback)((function(e){return function(){B(e),N(Object(x.b)({show:!0}))}}),[n]),V=(Object(v.useCallback)((function(e){return function(){Object(a.a)(r.a.mark((function t(){var n,c;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(h.f)(e);case 3:200===(n=t.sent).status&&(S(null===(c=n.data)||void 0===c?void 0:c.question[0]),g()),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),alert(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()}}),[]),function(){var e=Object(a.a)(r.a.mark((function e(){var t,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(h.e)();case 3:200===(t=e.sent).status&&i(null===t||void 0===t||null===(n=t.data)||void 0===n?void 0:n.question.map((function(e){return Object(c.a)(Object(c.a)({},e),{},{explanation:void 0,choices:void 0,id:e._id,_id:void 0})}))),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),alert(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}());return Object(v.useEffect)((function(){Object(a.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V();case 2:case"end":return e.stop()}}),e)})))()}),[]),Object(v.useEffect)((function(){""!==_&&g()}),[_]),Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)(Q,{fetchQuestionList:V,show:w,handleClose:function(){return k(!1)},item:_,setItem:S}),Object(A.jsx)(j.a,Object(c.a)({handleSubmit:G,handleClose:function(){return N(Object(x.b)({show:!1}))}},q)),Object(A.jsxs)("div",{className:"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4",children:[Object(A.jsxs)("div",{className:"d-block mb-4 mb-md-0",children:[Object(A.jsxs)(u.a,{className:"d-none d-md-inline-block",listProps:{className:"breadcrumb-dark breadcrumb-transparent"},children:[Object(A.jsx)(u.a.Item,{children:Object(A.jsx)(l.a,{icon:o.C})}),Object(A.jsx)(u.a.Item,{active:!0,children:f.a.QuestionPage.name})]}),Object(A.jsx)("h4",{children:f.a.QuestionPage.name}),Object(A.jsx)("p",{className:"mb-0",children:"Below tables will shown all of course in your website and some information about them."})]}),Object(A.jsx)("div",{className:"btn-toolbar mb-2 mb-md-0",children:Object(A.jsxs)(d.a,{className:"mx-2",onClick:g,children:[Object(A.jsx)(l.a,{icon:o.G,className:"me-2"}),"New Question"]})})]}),Object(A.jsx)("div",{className:"table-settings mb-4",children:Object(A.jsx)(D,{title:[],deleteUser:L,data:n,handleShow:g})})]})}}}]);
//# sourceMappingURL=19.e140ec79.chunk.js.map