(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{15:function(t,e,n){},16:function(t,e,n){},17:function(t,e,n){},19:function(t,e,n){"use strict";n.r(e);var c=n(0),r=n(1),s=n.n(r),o=n(8),a=n.n(o),i=(n(15),n(16),n(4)),d=(n(17),n(2)),l=n.n(d),u=n(9),j=n(3),b=function(t){var e=t.todos,n=t.setTodos,s=Object(r.useState)(""),o=Object(i.a)(s,2),a=o[0],d=o[1],b=function(){var t=Object(j.a)(l.a.mark((function t(c){var r,s,o;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(c.preventDefault(),""!==a){t.next=3;break}return t.abrupt("return");case 3:return t.prev=3,r={description:a},t.next=7,fetch("http://localhost:5000/todos",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(r)});case 7:return s=t.sent,t.next=10,s.json();case 10:o=t.sent,n([].concat(Object(u.a)(e),[o])),d(""),t.next=18;break;case 15:t.prev=15,t.t0=t.catch(3),console.error(t.t0.message,t.t0);case 18:case"end":return t.stop()}}),t,null,[[3,15]])})));return function(e){return t.apply(this,arguments)}}();return Object(c.jsxs)(r.Fragment,{children:[Object(c.jsx)("h1",{className:"text-center mt-5",children:"Pern Todo List"}),Object(c.jsxs)("form",{className:"d-flex mt-5",onSubmit:b,children:[Object(c.jsx)("input",{type:"text",className:"form-control",value:a,onChange:function(t){return d(t.target.value)}}),Object(c.jsx)("button",{className:"btn btn-success",children:"Add"})]})]})},h=function(t){var e=t.todo,n=t.todos,s=t.setTodos,o=Object(r.useState)(!0),a=Object(i.a)(o,2),d=a[0],u=a[1],b=Object(r.useState)(e.description.slice()),h=Object(i.a)(b,2),p=h[0],m=h[1],f=function(){var t=Object(j.a)(l.a.mark((function t(c){var r,o;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c.preventDefault(),t.prev=1,r=e.todo_id,o=p,console.log(r,o,e),t.next=7,fetch("http://localhost:5000/todos/".concat(r),{method:"PUT",headers:{"Content-type":"application/json"},body:JSON.stringify({description:o})});case 7:s(n.map((function(t){return t.todo_id===r&&(t.description=o),t}))),console.log(n),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(1),console.error(t.t0.message,t.t0);case 14:case"end":return t.stop()}}),t,null,[[1,11]])})));return function(e){return t.apply(this,arguments)}}();return Object(c.jsxs)(r.Fragment,{children:[Object(c.jsx)("button",{className:"btn btn-warning","data-toggle":"modal","data-target":"#id".concat(e.todo_id),onClick:function(){return u(!d)},children:"Edit"}),d?null:Object(c.jsx)("div",{className:"modal",style:{display:"block",backgroundColor:"rgba(0, 0, 0, 0.9)"},children:Object(c.jsx)("div",{className:"modal-dialog",children:Object(c.jsxs)("div",{className:"modal-content",children:[Object(c.jsxs)("div",{className:"modal-header",children:[Object(c.jsx)("h4",{className:"modal-title",children:"Edit Todo"}),Object(c.jsx)("button",{type:"button",className:"close","data-dismiss":"modal",onClick:function(){return u(!d)},children:"\xd7"})]}),Object(c.jsx)("div",{className:"modal-body",children:Object(c.jsx)("input",{type:"text",className:"form-control",value:p,onChange:function(t){return m(t.target.value)}})}),Object(c.jsxs)("div",{className:"modal-footer",children:[Object(c.jsx)("button",{type:"button",className:"btn btn-warning","data-dismiss":"modal",onClick:function(t){return f(t)},children:"Edit"}),Object(c.jsx)("button",{type:"button",className:"btn btn-danger","data-dismiss":"modal",onClick:function(){return u(!d)},children:"Close"})]})]})})})]})},p=function(t){var e=t.todos,n=t.setTodos,s=function(){var t=Object(j.a)(l.a.mark((function t(c){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("http://localhost:5000/todos/".concat(c),{method:"DELETE"});case 3:n(e.filter((function(t){return t.todo_id!==c}))),t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),console.error(t.t0.message,t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e){return t.apply(this,arguments)}}(),o=function(){var t=Object(j.a)(l.a.mark((function t(){var e,c;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("http://localhost:5000/todos/");case 3:return e=t.sent,t.next=6,e.json();case 6:c=t.sent,n(c.sort((function(t,e){return t.todo_id-e.todo_id}))),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),console.error(t.t0.message,t.t0);case 13:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(){return t.apply(this,arguments)}}();return Object(r.useEffect)((function(){o()}),[]),Object(c.jsx)(r.Fragment,{children:Object(c.jsxs)("table",{className:"table mt-5 text-center",children:[Object(c.jsx)("thead",{children:Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"Description"}),Object(c.jsx)("th",{children:"Edit"}),Object(c.jsx)("th",{children:"Delete"})]})}),Object(c.jsx)("tbody",{children:e.map((function(t){return Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{children:t.description}),Object(c.jsx)("td",{children:Object(c.jsx)(h,{todo:t,todos:e,setTodos:n})}),Object(c.jsx)("td",{children:Object(c.jsx)("button",{className:"btn btn-danger",onClick:function(){return s(t.todo_id)},children:"Delete"})})]},t.todo_id)}))})]})})};var m=function(){var t=Object(r.useState)([]),e=Object(i.a)(t,2),n=e[0],s=e[1];return Object(c.jsxs)("div",{className:"container",children:[Object(c.jsx)(b,{todos:n,setTodos:s}),Object(c.jsx)(p,{todos:n,setTodos:s})]})};a.a.render(Object(c.jsx)(s.a.StrictMode,{children:Object(c.jsx)(m,{})}),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.ab615bb1.chunk.js.map