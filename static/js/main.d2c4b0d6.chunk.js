(this["webpackJsonpthreejs-test"]=this["webpackJsonpthreejs-test"]||[]).push([[0],{21:function(e,t,n){},22:function(e,t,n){},24:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var i=n(9),a=n.n(i),o=n(15),r=n.n(o),s=(n(21),n(22),n(5)),d=(n(14),n.p+"static/media/earth.ca9e8806.jpg"),c=(n(24),n(7)),p=function(){return Object(i.useEffect)((function(){!function(){var e=(new s.s).load(d),t=document.querySelector("canvas.canvas"),n=new s.o,i=new s.p(.8,32,32),a=new s.i;a.map=e;var o=new s.f(i,a);n.add(o);var r=new s.l(16777215,1.92);r.position.x=4,r.position.y=4.2,r.position.z=2,n.add(r);var c=document.querySelector(".canvas-wrapper"),p={width:c.offsetHeight,height:c.offsetHeight};window.addEventListener("resize",(function(){p.width=c.offsetHeight,p.height=c.offsetHeight,u.aspect=p.width/p.height,u.updateProjectionMatrix(),l.setSize(p.width,p.height),l.setPixelRatio(Math.min(window.devicePixelRatio,2))}));var u=new s.k(75,p.width/p.height,.1,100);u.position.x=0,u.position.y=0,u.position.z=1.5,n.add(u);var l=new s.v({canvas:t,alpha:!0,antialias:!0});l.setSize(c.offsetHeight,c.offsetHeight),l.setPixelRatio(Math.min(window.devicePixelRatio,2));var w=0,h=0,m=0,g=0,v=window.innerWidth/2,f=window.innerHeight/2;document.addEventListener("mousemove",(function(e){w=e.clientX-v,h=e.clientY-f})),window.addEventListener("scroll",(function(e){o.position.y=.001*window.scrollY}));var x=new s.a;!function e(){m=.001*w,g=.001*h;var t=x.getElapsedTime();o.rotation.y=.5*t,o.rotation.y+=.5*(m-o.rotation.y),o.rotation.x+=.5*(g-o.rotation.x),o.position.z=-.3*m,l.render(n,u),window.requestAnimationFrame(e)}()}()}),[]),Object(c.jsx)("canvas",{className:"canvas"})},u=n(11),l=n(0),w=n(1),h=n.p+"static/media/sun.b34e6ead.jpg",m=n.p+"static/media/mercury.8f80953b.jpg",g=n.p+"static/media/venus.b4312567.jpg",v=n.p+"static/media/moon.7e1ad9ea.jpg",f=n.p+"static/media/mars.33960f5a.jpg",x=n.p+"static/media/asteroid.83eccd8b.jpg",j=n.p+"static/media/jupiter.3e84533e.jpeg",b=n(16),y=function(){return Object(i.useEffect)((function(){!function(){var e=new s.s,t=document.querySelector("canvas.solar"),n=new s.o,i=function(){function t(n,i,a){Object(l.a)(this,t),this.map=n,this.radius=i/2,this.name=a;var o,r=e.load(n),d=new s.p(this.radius,32,32);o="Sun"===a?new s.g({map:r}):new s.i({map:r}),this._planet=new s.f(d,o),this._planet.name=a}return Object(w.a)(t,[{key:"planet",get:function(){return this._planet}},{key:"createRing",value:function(){var e=3*this.radius,t=new s.n(e,e+.0025,64),n=new s.g;return n.color=new s.b(368099),this.ring=new s.f(t,n),this.ring.rotation.x=4.75,this.ring}},{key:"createOrbits",value:function(){var e=[],t=[];for(var n in t[0]=20,t[1]=108*t[0]/58,t[2]=150*t[1]/108,t[3]=228*t[2]/150,t[4]=778*t[3]/228,t=t.map((function(e){return Number(e)/8})),console.log(t),console.log(this.radius),t){var i=t[n],a=i+.0025,o=new s.n(i,a,64),r=new s.g;r.color=new s.b(368099);var d=new s.f(o,r);d.rotation.x=4.75,e.push(d)}return e}}]),t}(),a={},o=new s.a,r=(o.getElapsedTime(),o.getElapsedTime(),o.getElapsedTime(),o.getElapsedTime(),o.getElapsedTime(),function(e,t,n,i,o){e.position.x=-Math.cos(o+n*i/2440)*t,e.position.z=Math.sin(o+n*i/2440)*t,a[e.name.toLowerCase()]=e.position.x}),c={},p=new s.a,y=(p.getElapsedTime(),p.getElapsedTime(),p.getElapsedTime(),p.getElapsedTime(),p.getElapsedTime(),p.getElapsedTime(),p.getElapsedTime(),function(e,t,n){e.rotation.y=t*n/60,c[e.name.toLowerCase()]=e.rotation.y}),E=function(e,t){return Number(Math.random()*(t-e)+e).toFixed(4)},R=new i(h,1.666,"Sun"),S=new i(m,.167,"Mercury"),M=new i(g,.475,"Venus"),O=new i(d,.5,"Earth"),z=new i(v,.135,"Moon"),T=new i(f,.25,"Mars"),P=new s.j;P.name="Asteroids";for(var H=new i(j,5.6,"Jupiter"),L=e.load(x),k=0;k<1e3;k++){var F=E(.012,.042)/2,N=E(4,10),q=E(4,10),C=E(150,200)/8,J=E(-2,2)/2,W=new s.h;W.map=L;var A=new s.f(new s.p(F,N,q),W);A.position.y=J;var B=E(0,360)*Math.PI/180;A.position.x=Math.cos(B)*C,A.position.z=Math.sin(B)*C,P.add(A)}var D=R.createOrbits(),I=Object(u.a)(D,5),_=I[0],V=I[1],Y=I[2],X=I[3],G=I[4],K=S.createRing(),Q=M.createRing(),U=O.createRing(),Z=T.createRing(),$=H.createRing(),ee=new s.d;ee.name="Sun",ee.add(R.planet),ee.add(_),ee.add(V),ee.add(Y),ee.add(X),ee.add(G);var te=new s.d;te.name="Mercury",te.add(S.planet),te.add(K);var ne=new s.d;ne.name="Venus",ne.add(M.planet),ne.add(Q);var ie=new s.d;ie.name="Earth",ie.add(O.planet),ie.add(U),ie.add(z.planet);var ae=new s.d;ae.name="Mars",ae.add(T.planet),ae.add(Z);var oe=new s.d;oe.name="Jupiter",oe.add(H.planet),oe.add($),n.add(ee),n.add(te),n.add(ne),n.add(ie),n.add(ae),n.add(P),n.add(oe);var re=new s.l(16777215,3.3);re.position.x=0,re.position.y=0,re.position.z=0,n.add(re);var se=document.querySelector(".canvas-wrapper"),de={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",(function(){de.width=window.innerWidth,de.height=window.innerHeight,ce.aspect=de.width/de.height,ce.updateProjectionMatrix(),ue.setSize(de.width,de.height),ue.setPixelRatio(Math.min(window.devicePixelRatio,2))}));var ce=new s.k(75,de.width/de.height,.1,100);ce.position.x=0,ce.position.y=9,ce.position.z=10,ce.zoom=2,ce.far=1e3,n.add(ce),console.log(ce);var pe=new b.a(ce,t);pe.enableDamping=!0,pe.zoomSpeed=.25;var ue=new s.v({canvas:t,alpha:!0,logarithmicDepthBuffer:!0});ue.setSize(se.offsetHeight,se.offsetHeight),ue.setSize(de.width,de.height),ue.setPixelRatio(Math.min(window.devicePixelRatio,2));var le=new s.a,we=0;!function e(){var t=le.getElapsedTime();y(R.planet,19,t),y(S.planet,8,t),y(M.planet,1.9,t),y(O.planet,465,t),y(z.planet,-17.2,t),y(T.planet,455.3,t),y(P,.27,t),y(H.planet,193.8,t);var i=U.geometry.parameters.outerRadius,a=Y.geometry.parameters.outerRadius,o=_.geometry.parameters.outerRadius,s=V.geometry.parameters.outerRadius,d=X.geometry.parameters.outerRadius,c=G.geometry.parameters.outerRadius;if(0===we){r(z.planet,i,t,714,0),r(te,o,t,214,0),r(ne,s,t,85,0),r(ie,a,t,48,0),r(ae,d,t,25.53,0),r(oe,c,t,25.53,0),we++;var p=te.position.x-R.radius;console.log(778*p/58);var u=328*p/58,l=478*p/58,w={mercury:58,venus:ne.position.x/p*58,earth:58*ie.position.x/p,mars:58*ae.position.x/p,asteroidsStart:58*-u/p,asteroidsEnd:58*-l/p,jupiter:58*oe.position.x/p};console.table(w),console.table({sun:ee.position.x,sunRadius:R.radius,mercury:te.position.x,venus:ne.position.x,earth:ie.position.x,mars:ae.position.x,asteroidsStart:u,asteroidsEnd:l,jupiter:oe.position.x})}r(z.planet,i,t,714,2),r(te,o,t,209,5),r(ne,s,t,82,10),r(ie,a,t,48,3),r(ae,d,t,25.53,7),pe.update(),ue.render(n,ce),window.requestAnimationFrame(e)}()}()})),Object(c.jsx)("canvas",{className:"solar"})},E=function(){return Object(c.jsxs)("div",{className:"app",children:[Object(c.jsxs)("div",{className:"canvas-wrapper",children:[Object(c.jsx)("h1",{className:"label",children:"Welcome to the Solar System!"}),Object(c.jsx)(p,{})]}),Object(c.jsx)("section",{children:Object(c.jsx)(y,{})})]})},R=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,27)).then((function(t){var n=t.getCLS,i=t.getFID,a=t.getFCP,o=t.getLCP,r=t.getTTFB;n(e),i(e),a(e),o(e),r(e)}))};r.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(E,{})}),document.getElementById("root")),R()}},[[26,1,2]]]);
//# sourceMappingURL=main.d2c4b0d6.chunk.js.map