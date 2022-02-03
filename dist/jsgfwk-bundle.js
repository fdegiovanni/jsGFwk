!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("jsGFwk",[],e):"object"==typeof exports?exports.jsGFwk=e():t.jsGFwk=e()}(self,(function(){return(()=>{var t={505:t=>{t.exports&&(t.exports=class{_name="Animator2D";_2Dcontext={};_canvas={};_2Dbuffer={};_bufferCanvas={};_lastFrame=0;constructor(){}_pointer(){const t=(new Date).getTime(),e=(t-this._lastFrame)/1e3;this._lastFrame=t,this._2Dbuffer.save(),this._2Dbuffer.fillStyle=this._gfwk.settings.clearColor,this._2Dbuffer.fillRect(0,0,this._canvas.width,this._canvas.height),this._2Dbuffer.restore();for(let t in this._gfwk._gameObjects)if(null!==this._gfwk._gameObjects[t]){const i=this._gfwk._gameObjects[t];void 0!==i&&i.update&&i.update(e),void 0!==i&&i.draw&&i.isVisible&&(this._2Dbuffer.save(),i.draw(this._2Dbuffer),this._2Dbuffer.restore())}for(let t=0;t<this._gfwk._includes.length;t++)void 0!==this._gfwk._includes[t].onPreRender&&(this._gfwk._2Dbuffer.save(),this._gfwk._includes[t].onPreRender(this._2Dbuffer),this._2Dbuffer.restore());for(let t in this._gfwk._gameObjects)this._2Dbuffer.save(),void 0!==this._gfwk._gameObjects[t].postRender&&this._gfwk._gameObjects[t].postRender(this._2Dbuffer),this._2Dbuffer.restore();this._2Dcontext.drawImage(this._bufferCanvas,0,0),requestAnimFrame(this._pointer.bind(this))}onStart(){this._canvas=document.getElementById(this._gfwk.settings.canvas),this._2Dcontext=this._canvas.getContext("2d"),this._bufferCanvas=document.createElement("canvas"),this._bufferCanvas.width=this._canvas.width,this._bufferCanvas.height=this._canvas.height,this._2Dbuffer=this._bufferCanvas.getContext("2d"),window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,_gfwk.settings.frameRate)},requestAnimFrame(this._pointer.bind(this))}})},501:t=>{t.exports&&(t.exports=class{_name="Clock";_counter=0;triggerTime=0;_action={};constructor(t){void 0!==t&&(this.setAction(t.action||this._action),this.triggerTime=t.triggerTime||this.triggerTime)}reset(){this._counter=0}setAction(t){this._action=t}tick(t){this._counter+=t,this._counter>=this.triggerTime&&(this._counter=0,this._action())}})},436:t=>{class e{_name="Collisions";static RECTANGLE_COLLISION_MODE="RECTANGLE";static RADIUS_DISTANCE_COLLISION_MODE="RADIUS_DISTANCE";constructor(){}_rectangleCollisionChecker(t){if(!t)return!1;if(null==this.width||null==this.height||null==this.x||null==this.y)return!1;if(null==t.width||null==t.height||null==t.x||null==t.y)return!1;this.rotationPoint||(this.rotationPoint={x:0,y:0}),t.rotationPoint||(t.rotationPoint={x:0,y:0});var e=this.x-this.rotationPoint.x,i=this.y-this.rotationPoint.y,s=t.x-t.rotationPoint.x,r=t.y-t.rotationPoint.y;return!(e+this.width<s||i+this.height<r||e>s+t.width||i>r+t.height)}_circleCollisionChecker(t){if(!t)return!1;if(!(this.radius&&this.x&&this.y&&this.center))return!1;if(!t.radius||!t.x||!t.y)return!1;var e=t.x+t.center.x-(this.x+this.center.x),i=t.y+t.center.y-(this.y+this.center.y);return Math.sqrt(e*e+i*i)<this.radius+t.radius}areCollidingBy(t,i,s){switch(s){case e.RECTANGLE_COLLISION_MODE:return this._rectangleCollisionChecker.call(t,i);case e.RADIUS_DISTANCE_COLLISION_MODE:return this._circleCollisionChecker.call(t,i);default:return!1}}onStart(){}onObjectCreated(t){t.width=t.width||1,t.height=t.height||1,t.radius=t.radius||1,t.center=t.center||{x:0,y:0},t.isRectColliding=this._rectangleCollisionChecker,t.isRadColliding=this._circleCollisionChecker}}t.exports&&(t.exports=e)}},e={};function i(s){var r=e[s];if(void 0!==r)return r.exports;var n=e[s]={exports:{}};return t[s](n,n.exports,i),n.exports}i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var s={};return(()=>{"use strict";i.r(s),i.d(s,{Animator2D:()=>e.Animator2D,Clock:()=>r.Clock,Collisions:()=>n.Collisions,Engine:()=>t});class t{_gameObjects={};_includes=[];settings={width:640,height:480,canvas:"canvas",frameRate:1e3/33,clearColor:"rgb(0,0,0)"};constructor(){}_destroyObject(t){delete this._gameObjects[t]}createObject(t){if(t.id=t.id||crypto.randomUUID(),void 0!==t.name){t.destroy=this._destroyObject.bind(this,t.name),this._gameObjects[t.name]=t;for(var e=0;e<this._includes.length;e++)void 0!==this._includes[e].onObjectCreated&&this._includes[e].onObjectCreated(this._gameObjects[t.name]);void 0!==t.init&&t.init()}}sort(){let t=[];for(let e in this._gameObjects)t.push(this._gameObjects[e]);t.sort(((t,e)=>t.zOrder-e.zOrder));for(let e=0;e<t.length;e++)delete this._gameObjects[t[e].name],this._gameObjects[t[e].name]=t[e]}include(t){for(let e=0;e<this._includes.length;e++)if(t._name===this._includes[e]._name)return;this._includes[this._includes.length]=t,t._gfwk=this}start(){for(let t=0;t<this._includes.length;t++)void 0!==this._includes[t].onStart&&this._includes[t].onStart()}stop(){for(let t=0;t<this._includes.length;t++)void 0!==this._includes[t].onStop&&this._includes[t].onStop()}}var e=i(505),r=i(501),n=i(436)})(),s})()}));