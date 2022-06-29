(this["webpackJsonpfe-admin-senior-ute"]=this["webpackJsonpfe-admin-senior-ute"]||[]).push([[20],{311:function(e,t,n){"use strict";n.d(t,"e",(function(){return l})),n.d(t,"c",(function(){return u})),n.d(t,"b",(function(){return d})),n.d(t,"d",(function(){return b})),n.d(t,"a",(function(){return f}));var r=n(121),c=n(92),i=n.n(c),a=n(418),o=n.n(a),s=n(61),l=o.a.create({baseURL:s.b.ApiUrl,timeout:3e4,headers:{"Content-Type":"application/json"}});l.interceptors.request.use((function(e){var t,n=s.b.getAPIRequestToken();return n?(e.headers.Authorization="".concat(null===n||void 0===n||null===(t=n.access)||void 0===t?void 0:t.token),e):e}),(function(e){return Promise.reject(e)})),l.interceptors.response.use((function(e){return e}),(function(e){var t=e.response.status,n=e.response.config;return 401===t&&Object(r.a)(i.a.mark((function e(){var t,r,c,a,o,u,d,b;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=s.b.getAPIRequestToken(),e.next=3,l.post("/api/v1/user/refresh",{refreshToken:null===r||void 0===r||null===(t=r.refresh)||void 0===t?void 0:t.token});case 3:if(null===(c=e.sent)||void 0===c||!c.data){e.next=13;break}if(null!==c&&void 0!==c&&null!==(a=c.data)&&void 0!==a&&a.token){e.next=8;break}return s.b.setApiRequestToken(""),e.abrupt("return");case 8:return s.b.setApiRequestToken(null===c||void 0===c||null===(o=c.data)||void 0===o?void 0:o.token),n.headers={"Content-Type":"application/json",Authorization:"".concat(null===c||void 0===c||null===(u=c.data)||void 0===u||null===(d=u.token)||void 0===d||null===(b=d.access)||void 0===b?void 0:b.token)},n.baseURL=s.b.ApiUrl,n.timeout=3e4,e.abrupt("return",l(n));case 13:case"end":return e.stop()}}),e)})))(),e.response}));var u=function(e,t){return l.post(e,t)},d=function(e,t){return l.get("".concat(e),{params:t})},b=function(e,t){return l.put("".concat(e),t)},f=function(e,t){return l.delete("".concat(e),{params:t})}},313:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var r=n(645),c=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";r.a[e]({message:t,description:n})}},437:function(e,t,n){"use strict";var r=n(120),c=n(2),i=n(36),a=n(0),o=n(4),s=n.n(o),l=n(326),u=n(415),d=n(453),b=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(r=Object.getOwnPropertySymbols(e);c<r.length;c++)t.indexOf(r[c])<0&&Object.prototype.propertyIsEnumerable.call(e,r[c])&&(n[r[c]]=e[r[c]])}return n},f=function(e){var t,n=e.prefixCls,i=e.className,o=e.checked,l=e.onChange,u=e.onClick,f=b(e,["prefixCls","className","checked","onChange","onClick"]),p=(0,a.useContext(d.b).getPrefixCls)("tag",n),j=s()(p,(t={},Object(r.a)(t,"".concat(p,"-checkable"),!0),Object(r.a)(t,"".concat(p,"-checkable-checked"),o),t),i);return a.createElement("span",Object(c.a)({},f,{className:j,onClick:function(e){null===l||void 0===l||l(!o),null===u||void 0===u||u(e)}}))},p=n(430),j=n(431),v=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(r=Object.getOwnPropertySymbols(e);c<r.length;c++)t.indexOf(r[c])<0&&Object.prototype.propertyIsEnumerable.call(e,r[c])&&(n[r[c]]=e[r[c]])}return n},O=new RegExp("^(".concat(p.a.join("|"),")(-inverse)?$")),h=new RegExp("^(".concat(p.b.join("|"),")$")),m=function(e,t){var n,o=e.prefixCls,b=e.className,f=e.style,p=e.children,m=e.icon,g=e.color,x=e.onClose,y=e.closeIcon,k=e.closable,w=void 0!==k&&k,C=v(e,["prefixCls","className","style","children","icon","color","onClose","closeIcon","closable"]),P=a.useContext(d.b),S=P.getPrefixCls,E=P.direction,A=a.useState(!0),N=Object(i.a)(A,2),T=N[0],D=N[1];a.useEffect((function(){"visible"in C&&D(C.visible)}),[C.visible]);var I=function(){return!!g&&(O.test(g)||h.test(g))},_=Object(c.a)({backgroundColor:g&&!I()?g:void 0},f),R=I(),q=S("tag",o),z=s()(q,(n={},Object(r.a)(n,"".concat(q,"-").concat(g),R),Object(r.a)(n,"".concat(q,"-has-color"),g&&!R),Object(r.a)(n,"".concat(q,"-hidden"),!T),Object(r.a)(n,"".concat(q,"-rtl"),"rtl"===E),n),b),F=function(e){e.stopPropagation(),null===x||void 0===x||x(e),e.defaultPrevented||"visible"in C||D(!1)},L="onClick"in C||p&&"a"===p.type,U=Object(l.a)(C,["visible"]),B=m||null,$=B?a.createElement(a.Fragment,null,B,a.createElement("span",null,p)):p,J=a.createElement("span",Object(c.a)({},U,{ref:t,className:z,style:_}),$,w?y?a.createElement("span",{className:"".concat(q,"-close-icon"),onClick:F},y):a.createElement(u.a,{className:"".concat(q,"-close-icon"),onClick:F}):null);return L?a.createElement(j.a,null,J):J},g=a.forwardRef(m);g.displayName="Tag",g.CheckableTag=f;t.a=g},468:function(e,t,n){"use strict";n.d(t,"e",(function(){return c})),n.d(t,"a",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"b",(function(){return o})),n.d(t,"d",(function(){return s})),n.d(t,"f",(function(){return l}));var r=n(311),c=function(){return Object(r.b)("/api/v1/pricing/list")},i=function(e){return Object(r.c)("/api/v1/pricing",e)},a=function(e){return Object(r.d)("/api/v1/pricing",e)},o=function(e){return r.e.delete("/api/v1/pricing?_id=".concat(e))},s=function(){return Object(r.b)("/api/v1/pricing/ability/list")},l=function(){return Object(r.b)("/api/v1/pricing/get-all-purchase")}},641:function(e,t,n){},670:function(e,t,n){"use strict";n.r(t);var r=n(19),c=n(121),i=n(36),a=n(92),o=n.n(a),s=n(10),l=n(12),u=n(287),d=(n(313),n(468)),b=n(7),f=n(0),p=n(46),j=n(123),v=n(497),O=n(288),h=n(644),m=n(663),g=n(449),x=n(437),y=n(655),k=n(424),w=n.n(k),C=n(61),P=(n(641),n(1)),S=function(e){var t=e.data,n=e.editExam,c=e.deleteExam,a=Object(f.useState)(""),o=Object(i.a)(a,2),s=o[0],l=o[1],u=Object(f.useState)(""),d=Object(i.a)(u,2),b=d[0],p=d[1],j=Object(f.useRef)(null),k=function(e,t,n){t(),l(e[0]),p(n)},S=function(e){return{filterDropdown:function(t){var n=t.setSelectedKeys,r=t.selectedKeys,c=t.confirm,i=t.clearFilters;return Object(P.jsxs)("div",{style:{padding:8},children:[Object(P.jsx)(h.a,{ref:j,placeholder:"Search ".concat(e),value:r[0],onChange:function(e){return n(e.target.value?[e.target.value]:[])},onPressEnter:function(){return k(r,c,e)},style:{marginBottom:8,display:"block"}}),Object(P.jsxs)(m.b,{children:[Object(P.jsx)(g.a,{type:"primary",onClick:function(){return k(r,c,e)},icon:Object(P.jsx)(v.a,{}),size:"small",style:{width:90},children:"Search"}),Object(P.jsx)(g.a,{onClick:function(){return i&&function(e){e(),l("")}(i)},size:"small",style:{width:90},children:"Reset"}),Object(P.jsx)(g.a,{type:"link",size:"small",onClick:function(){c({closeDropdown:!1}),l(r[0]),p(e)},children:"Filter"})]})]})},filterIcon:function(e){return Object(P.jsx)(v.a,{style:{color:e?"#1890ff":void 0}})},onFilter:function(t,n){return n[e].toString().toLowerCase().includes(t.toLowerCase())},onFilterDropdownVisibleChange:function(e){e&&setTimeout((function(){var e;return null===(e=j.current)||void 0===e?void 0:e.select()}),100)},render:function(t){return b===e?Object(P.jsx)(w.a,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[s],autoEscape:!0,textToHighlight:t?t.toString():""}):t}}},E=[Object(r.a)({title:"Title",dataIndex:"title",key:"title",width:"20%",sorter:function(e,t){return e.title<t.title},sortDirections:["descend","ascend"]},S("title")),{title:"Slug",dataIndex:"slug",key:"slug",width:"20%",render:function(e,t){return Object(P.jsx)("a",{rel:"noreferrer",href:"".concat(C.a,"/exams/").concat(t.key),target:"_blank",children:"View on website"})}},Object(r.a)({title:"Total of Questions",dataIndex:"total_of_questions",key:"topic",width:"15%",sorter:function(e,t){return e.total_of_questions<t.total_of_questions},sortDirections:["descend","ascend"]},S("total_of_questions")),Object(r.a)(Object(r.a)({title:"Last Updated",dataIndex:"updatedAt",key:"updatedAt",width:"10%",align:"center"},S("updatedAt")),{},{sorter:function(e,t){return new Date(e.updatedAt)<new Date(t.updatedAt)},sortDirections:["descend","ascend"],render:function(e){return Object(P.jsx)("span",{children:new Date(e).toLocaleString()})}}),Object(r.a)(Object(r.a)({title:"Status",dataIndex:"isPublic",key:"isPublic",width:"10%",align:"center"},S("isPublic")),{},{sorter:function(e,t){return e.isPublic<t.isPublic},sortDirections:["descend","ascend"],render:function(e){var t="Public"===e?"geekblue":"green";return Object(P.jsx)("span",{children:Object(P.jsx)(x.a,{color:t,children:e},e)})}}),{title:"Action",key:"action",width:"10%",align:"center",render:function(e,t){return Object(P.jsxs)(m.b,{size:"middle",children:[Object(P.jsx)(g.a,{onClick:function(){return n(t._id)},children:"Edit"}),Object(P.jsx)(g.a,{type:"primary",danger:!0,onClick:function(){return c(t._id)},children:"Delete"})]})}}];return Object(P.jsx)(O.a,{border:"light",className:"table-wrapper table-responsive shadow-sm",children:Object(P.jsx)(O.a.Body,{className:"mt-3",children:Object(P.jsx)(y.a,{columns:E,dataSource:t})})})};t.default=function(){var e=Object(f.useState)([]),t=Object(i.a)(e,2),n=t[0],a=t[1],v=Object(f.useState)(!1),O=Object(i.a)(v,2),h=(O[0],O[1]),m=(Object(p.d)((function(e){return e.confirmDelete})),Object(p.c)()),g=Object(f.useState)(""),x=Object(i.a)(g,2),y=(x[0],x[1]);m(Object(j.c)({title:"Confirm delete this service",body:"Are you sure to delete this service ?\n            This modified changes will not saved and you can't rollback"}));var k=function(){var e=Object(c.a)(o.a.mark((function e(){var t,n,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(d.f)();case 3:200===(t=e.sent).status&&a(null===t||void 0===t||null===(n=t.data)||void 0===n||null===(c=n.userPricing)||void 0===c?void 0:c.sort((function(e,t){return new Date(t.createdAt).getTime()-new Date(e.createdAt).getTime()})).map((function(e,t){var n,c,i;return Object(r.a)(Object(r.a)({},e),{},{id:null===e||void 0===e?void 0:e._id,code:null===e||void 0===e?void 0:e._id,index:t,service:null===e||void 0===e||null===(n=e.pricing)||void 0===n?void 0:n.name,price:null===e||void 0===e||null===(c=e.price)||void 0===c?void 0:c.$numberDecimal,duration:null===e||void 0===e||null===(i=e.pricing)||void 0===i?void 0:i.duration})}))),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return Object(f.useEffect)((function(){Object(c.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k();case 2:case"end":return e.stop()}}),e)})))()}),[]),Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)("div",{className:"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4",children:Object(P.jsxs)("div",{className:"d-block mb-4 mb-md-0",children:[Object(P.jsxs)(u.a,{className:"d-none d-md-inline-block",listProps:{className:"breadcrumb-dark breadcrumb-transparent"},children:[Object(P.jsx)(u.a.Item,{children:Object(P.jsx)(l.a,{icon:s.C})}),Object(P.jsx)(u.a.Item,{active:!0,children:b.a.StatementPage.name})]}),Object(P.jsx)("h4",{children:b.a.StatementPage.name}),Object(P.jsx)("p",{className:"mb-0",children:"Below tables will shown all of course in your website and some information about them."})]})}),Object(P.jsx)("div",{className:"table-settings mb-4",children:Object(P.jsx)(S,{deleteExam:function(e){y(e),m(Object(j.b)({show:!0}))},editExam:function(e){},data:n,handleShow:function(){return h(!0)}})})]})}}}]);
//# sourceMappingURL=20.0e12f008.chunk.js.map