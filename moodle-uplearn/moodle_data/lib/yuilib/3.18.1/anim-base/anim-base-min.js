YUI.add("anim-base",function(e,t){var n="running",r="startTime",i="elapsedTime",s="start",o="tween",u="end",a="node",f="paused",l="reverse",c="iterationCount",h=Number,p={},d;e.Anim=function(){e.Anim.superclass.constructor.apply(this,arguments),e.Anim._instances[e.stamp(this)]=this},e.Anim.NAME="anim",e.Anim._instances={},e.Anim.RE_DEFAULT_UNIT=/^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i,e.Anim.DEFAULT_UNIT="px",e.Anim.DEFAULT_EASING=function(e,t,n,r){return n*e/r+t},e.Anim._intervalTime=20,e.Anim.behaviors={left:{get:function(e,t){return e._getOffset(t)}}},e.Anim.behaviors.top=e.Anim.behaviors.left,e.Anim.DEFAULT_SETTER=function(t,n,r,i,s,o,u,a){var f=t._node,l=f._node,c=u(s,h(r),h(i)-h(r),o);l?"style"in l&&(n in l.style||n in e.DOM.CUSTOM_STYLES)?(a=a||"",f.setStyle(n,c+a)):"attributes"in l&&n in l.attributes?f.setAttribute(n,c):n in l&&(l[n]=c):f.set?f.set(n,c):n in f&&(f[n]=c)},e.Anim.DEFAULT_GETTER=function(t,n){var r=t._node,i=r._node,s="";return i?"style"in i&&(n in i.style||n in e.DOM.CUSTOM_STYLES)?s=r.getComputedStyle(n):"attributes"in i&&n in i.attributes?s=r.getAttribute(n):n in i&&(s=i[n]):r.get?s=r.get(n):n in r&&(s=r[n]),s},e.Anim.ATTRS={node:{setter:function(t){return t&&(typeof t=="string"||t.nodeType)&&(t=e.one(t)),this._node=t,!t,t}},duration:{value:1},easing:{value:e.Anim.DEFAULT_EASING,setter:function(t){if(typeof t=="string"&&e.Easing)return e.Easing[t]}},from:{},to:{},startTime:{value:0,readOnly:!0},elapsedTime:{value:0,readOnly:!0},running:{getter:function(){return!!p[e.stamp(this)]},value:!1,readOnly:!0},iterations:{value:1},iterationCount:{value:0,readOnly:!0},direction:{value:"normal"},paused:{readOnly:!0,value:!1},reverse:{value:!1}},e.Anim.run=function(){var t=e.Anim._instances,n;for(n in t)t[n].run&&t[n].run()},e.Anim.pause=function(){for(var t in p)p[t].pause&&p[t].pause();e.Anim._stopTimer()},e.Anim.stop=function(){for(var t in p)p[t].stop&&p[t].stop();e.Anim._stopTimer()},e.Anim._startTimer=function(){d||(d=setInterval(e.Anim._runFrame,e.Anim._intervalTime))},e.Anim._stopTimer=function(){clearInterval(d),d=0},e.Anim._runFrame=function(){var t=!0,n;for(n in p)p[n]._runFrame&&(t=!1,p[n]._runFrame());t&&e.Anim._stopTimer()},e.Anim.RE_UNITS=/^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/;var v={run:function(){return this.get(f)?this._resume():this.get(n)||this._start(),this},pause:function(){return this.get(n)&&this._pause(),this},stop:function(e){return(this.get(n)||this.get(f))&&this._end(e),this},_added:!1,_start:function(){this._set(r,new Date-this.get(i)),this._actualFrames=0,this.get(f)||this._initAnimAttr(),p[e.stamp(this)]=this,e.Anim._startTimer(),this.fire(s)},_pause:function(){this._set(r,null),this._set(f,!0),delete p[e.stamp(this)],this.fire("pause")},_resume:function(){this._set(f,!1),p[e.stamp(this)]=this,this._set(r,new Date-this.get(i)),e.Anim._startTimer(),this.fire("resume")},_end:function(t){var n=this.get("duration")*1e3;t&&this._runAttrs(n,n,this.get(l)),this._set(r,null),this._set(i,0),this._set(f,!1),delete p[e.stamp(this)],this.fire(u,{elapsed:this.get(i)})},_runFrame:function(){var e=this._runtimeAttr.duration,t=new Date-this.get(r),n=this.get(l),s=t>=e;this._runAttrs(t,e,n),this._actualFrames+=1,this._set(i,t),this.fire(o),s&&this._lastFrame()},_runAttrs:function(t,n,r){var i=this._runtimeAttr,s=e.Anim.behaviors,o=i.easing,u=n,a=!1,f,l,c;t>=n&&(a=!0),r&&(t=n-t,u=0);for(c in i)i[c].to&&(f=i[c],l=c in s&&"set"in s[c]?s[c].set:e.Anim.DEFAULT_SETTER,a?l(this,c,f.from,f.to,u,n,o,f.unit):l(this,c,f.from,f.to,t,n,o,f.unit))},_lastFrame:function(){var e=this.get("iterations"),t=this.get(c);t+=1,e==="infinite"||t<e?(this.get("direction")==="alternate"&&this.set(l,!this.get(l)),this.fire("iteration")):(t=0,this._end()),this._set(r,new Date),this._set(c,t)},_initAnimAttr:function(){var t=this.get("from")||{},n=this.get("to")||{},r={duration:this.get("duration")*1e3,easing:this.get("easing")},i=e.Anim.behaviors,s=this.get(a),o,u,f;e.each(n,function(n,a){typeof n=="function"&&(n=n.call(this,s)),u=t[a],u===undefined?u=a in i&&"get"in i[a]?i[a].get(this,a):e.Anim.DEFAULT_GETTER(this,a):typeof u=="function"&&(u=u.call(this,s));var l=e.Anim.RE_UNITS.exec(u),c=e.Anim.RE_UNITS.exec(n);u=l?l[1]:u,f=c?c[1]:n,o=c?c[2]:l?l[2]:"",!o&&e.Anim.RE_DEFAULT_UNIT.test(a)&&(o=e.Anim.DEFAULT_UNIT);if(!u||!f){e.error('invalid "from" or "to" for "'+a+'"',"Anim");return}r[a]={from:e.Lang.isObject(u)?e.clone(u):u,to:f,unit:o}},this),this._runtimeAttr=r},_getOffset:function(e){var t=this._node,n=t.getComputedStyle(e),r=e==="left"?"getX":"getY",i=e==="left"?"setX":"setY",s;return n==="auto"&&(s=t.getStyle("position"),s==="absolute"||s==="fixed"?(n=t[r](),t[i](n)):n=0),n},destructor:function(){delete e.Anim._instances[e.stamp(this)]}};e.extend(e.Anim,e.Base,v)},"3.18.1",{requires:["base-base","node-style","color-base"]});
