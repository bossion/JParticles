+function(t){"use strict";function e(t,i){a.createCanvas(this,e,t,i)}var a=t.utils,i=Math.random,o=Math.abs,s=2*Math.PI;e.defaultConfig={color:"#fff",maxR:6.5,minR:.4,maxSpeed:.6,minSpeed:0};var r=e.prototype={version:"1.1.0",init:function(){this.dots=[],this.createDots(),this.draw(),this.resize()},snowShape:function(){var t=this.set,e=a.calcSpeed,s=t.maxSpeed,r=t.minSpeed,n=a.limitRandom(t.maxR,t.minR);return{x:i()*this.cw,y:-n,r:n,vx:e(s,r),vy:o(n*e(s,r)),color:this.color()}},createDots:function(){for(var t=a.pInt(6*i()),e=this.dots;t--;)e.push(this.snowShape())},draw:function(){var t=this,e=t.set,a=t.cxt,o=t.cw,r=t.ch,n=t.paused;a.clearRect(0,0,o,r),a.globalAlpha=e.opacity,t.dots.forEach(function(e,c,h){var l=e.x,p=e.y,f=e.r;a.save(),a.beginPath(),a.arc(l,p,f,0,s),a.fillStyle=e.color,a.fill(),a.restore(),n||(e.x+=e.vx,e.y+=e.vy,i()>.99&&i()>.5&&(e.vx*=-1),l<0||l-f>o?h.splice(c,1,t.snowShape()):p-f>=r&&h.splice(c,1))}),!n&&i()>.9&&t.createDots(),t.requestAnimationFrame()}};t.extend(r),t.snow=r.constructor=e}(JParticles);