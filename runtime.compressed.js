this.plt===void 0&&(this.plt={});
(function(){this.plt.runtime={};var g=this.plt.runtime,m=function(a){var b=function(){};b.prototype=a;return new b},r=function(a){return function(b){return b instanceof a}},h=function(a){return typeof a==="number"},k=function(a){return typeof a=="object"&&a.length===2},o=function(a){return typeof a=="object"&&a.length!==void 0},p=function(){},t=function(a,b){this.label=a;this.proc=b};t.prototype=m(p.prototype);var u=function(a,b){this.label=a;this.tag=b};u.prototype=m(p.prototype);var n=function(){};
p=r(n);var s=function(){};s.prototype=m(n.prototype);s.prototype.write=function(a,b){a.params.currentDisplayer(b)};var i=function(){this.buf=[]};i.prototype=m(n.prototype);i.prototype.write=function(a,b){this.buf.push(String(b))};i.prototype.getOutputString=function(){return this.buf.join("")};n=r(i);i=function(a){this.name=a};var w=new i("default-continuation-prompt-tag"),l=[],j=function(a){throw a;},f=function(a,b,c,d,e){if(b(c))return!0;else j(Error(e+": expected "+a+" as argument #"+d+" but received "+
c+" instead"))},q=function(a,b,c,d){(b<c||b>d)&&j(Error(a+": expected at least "+c+" arguments  but received "+observer))},e={};e.display=function(a,b){q("display",b,1,2);var c=a.env[a.env.length-1],d=a.params.currentOutputPort;b==2&&(d=a.env[a.env.length-2]);d.write(a,c)};e.newline=function(a,b){q("newline",b,0,1);var c=a.params.currentOutputPort;b==1&&(c=a.env[a.env.length-1]);c.write(a,"\n")};e.displayln=function(a,b){q("displayln",b,1,2);var c=a.env[a.env.length-1],d=a.params.currentOutputPort;
b==2&&(d=a.env[a.env.length-2]);d.write(a,c);d.write(a,"\n")};e.pi=Math.PI;e.e=Math.E;e["="]=function(a){var b=a.env[a.env.length-1];a=a.env[a.env.length-2];f("number",h,b,0,"=");f("number",h,a,1,"=");return b===a};e["<"]=function(a){var b=a.env[a.env.length-1];a=a.env[a.env.length-2];f("number",h,b,0,"<");f("number",h,a,1,"<");return b<a};e[">"]=function(a){var b=a.env[a.env.length-1];a=a.env[a.env.length-2];f("number",h,b,0,">");f("number",h,a,1,">");return b>a};e["<="]=function(a){var b=a.env[a.env.length-
1];a=a.env[a.env.length-2];f("number",h,b,0,"<=");f("number",h,a,1,"<=");return b<=a};e[">="]=function(a){var b=a.env[a.env.length-1];a=a.env[a.env.length-2];f("number",h,b,0,">=");f("number",h,a,1,">=");return b>=a};e["+"]=function(a,b){var c=0,d=0;for(d=0;d<b;d++)f("number",h,a.env[a.env.length-1-d],d,"+"),c+=a.env[a.env.length-1-d];return c};e["*"]=function(a,b){var c=1,d=0;for(d=0;d<b;d++)f("number",h,a.env[a.env.length-1-d],d,"*"),c*=a.env[a.env.length-1-d];return c};e["-"]=function(a,b){b===
0&&j(Error());if(b===1)return f("number",h,a.env[a.env.length-1],0,"-"),-a.env[a.env.length-1];for(var c=a.env[a.env.length-1],d=1;d<b;d++)f("number",h,a.env[a.env.length-1-d],d,"-"),c-=a.env[a.env.length-1-d];return c};e["/"]=function(a,b){b===0&&j(Error());f("number",h,a.env[a.env.length-1],0,"/");for(var c=a.env[a.env.length-1],d=1;d<b;d++)c/=a.env[a.env.length-1-d];return c};e.cons=function(a){return[a.env[a.env.length-1],a.env[a.env.length-2]]};e.list=function(a,b){for(var c=l,d=0;d<b;d++)c=
[a.env[a.env.length-(b-d)],c];return c};e.car=function(a){f("pair",k,a.env[a.env.length-1],0,"car");return a.env[a.env.length-1][0]};e.cdr=function(a){f("pair",k,a.env[a.env.length-1],0,"cdr");return a.env[a.env.length-1][1]};e["pair?"]=function(a){return k(a.env[a.env.length-1])};e["set-car!"]=function(a){f("pair",k,a.env[a.env.length-1],0,"set-car!");a.env[a.env.length-1][0]=a.env[a.env.length-2]};e["set-cdr!"]=function(a){f("pair",k,a.env[a.env.length-1],0,"set-cdr!");a.env[a.env.length-1][1]=
a.env[a.env.length-2]};e.not=function(a){return!a.env[a.env.length-1]};e["null"]=l;e["null?"]=function(a){return a.env[a.env.length-1]===l};e.add1=function(a){f("number",h,a.env[a.env.length-1],0,"add1");return a.env[a.env.length-1]+1};e.sub1=function(a){f("number",h,a.env[a.env.length-1],0,"sub1");return a.env[a.env.length-1]-1};e["zero?"]=function(a){return a.env[a.env.length-1]===0};e.vector=function(a,b){var c,d=[];for(c=0;c<b;c++)d.push(a.env[a.env.length-1-c]);return d};e["vector->list"]=function(a){f("vector",
o,a.env[a.env.length-1],0,"vector->list");a=a.env[a.env.length-1];var b,c=l;for(b=0;b<a.length;b++)c=[a[a.length-1-b],c];return c};e["list->vector"]=function(a){a=a.env[a.env.length-1];for(var b=[];a!==l;)b.push(a[0]),a=a[1];return b};e["vector-ref"]=function(a){f("vector",o,a.env[a.env.length-1],0,"vector-ref");return a.env[a.env.length-1][a.env[a.env.length-2]]};e["vector-set!"]=function(a){f("vector",o,a.env[a.env.length-1],0,"vector-set!");a.env[a.env.length-1][a.env[a.env.length-2]]=a.env[a.env.length-
3];return null};e["symbol?"]=function(a){return typeof a.env[a.env.length-1]==="string"};e["symbol->string"]=function(a){return a.env[a.env.length-1]};e["string-append"]=function(a,b){var c=[],d;for(d=0;d<b;d++)c.push(a.env[a.env.length-1-d]);return c.join("")};e["string-length"]=function(a){return a.env[a.env.length-1].length};e.box=function(a){return[a.env[a.env.length-1]]};e.unbox=function(a){return a.env[a.env.length-1][0]};e["set-box!"]=function(a){a.env[a.env.length-1][0]=a.env[a.env.length-
2]};e["void"]=function(){};e["eq?"]=function(a){return a.env[a.env.length-1]===a.env[a.env.length-2]};e["equal?"]=function(a){var b=[a.env[a.env.length-1]];for(a=[a.env[a.env.length-2]];b.length!==0&&a.length!==0;){var c=b.pop(),d=a.pop();if(c!==d)if(typeof c==="object"&&typeof d==="object"&&typeof c.length==="number"&&typeof d.length==="number"&&c.length===d.length)b.push.apply(b,c),a.push.apply(a,d);else return!1}return!0};var x=function(a,b){var c=1E3/a.params.desiredYieldsPerSecond;a.params.maxNumBouncesBeforeYield=
Math.max(a.params.maxNumBouncesBeforeYield+256*((c-b)/c),1)},v=function(a,b){var c=b,d=(new Date).valueOf();a.callsBeforeTrampoline=100;a.params.numBouncesBeforeYield=a.params.maxNumBouncesBeforeYield;for(a.running=!0;c;)try{c(a);break}catch(e){if(typeof e==="function"){if(c=e,a.callsBeforeTrampoline=100,a.params.numBouncesBeforeYield--<0){x(a,(new Date).valueOf()-d);setTimeout(function(){v(a,c)},0);return}}else return a.running=!1,a.params.currentErrorHandler(a,e)}a.running=!1;return a.params.currentSuccessHandler(a)};
g.Machine=function(){this.callsBeforeTrampoline=100;this.proc=this.val=void 0;this.env=[];this.control=[];this.running=!1;this.params={currentDisplayer:function(){},currentOutputPort:new s,currentSuccessHandler:function(){},currentErrorHandler:function(){},currentNamespace:{},desiredYieldsPerSecond:5,numBouncesBeforeYield:2E3,maxNumBouncesBeforeYield:2E3};this.primitives=e};g.CallFrame=t;g.PromptFrame=u;g.Closure=function(a,b,c,d){this.label=a;this.arity=b;this.closedVals=c;this.displayName=d};g.ContinuationPromptTag=
i;g.DEFAULT_CONTINUATION_PROMPT_TAG=w;g.NULL=l;g.testArgument=f;g.testArity=q;g.raise=j;g.captureControl=function(a,b,c){var d;for(d=a.control.length-1-b;d>=0;d--)if(a.control[d].tag===c)return a.control.slice(d+1,a.control.length-b);j(Error("captureControl: unable to find tag "+c))};g.restoreControl=function(a,b){var c;for(c=a.control.length-1;c>=0;c--)if(a.control[c].tag===b){a.control=a.control.slice(0,c+1).concat(a.env[a.env.length-1]);return}j(Error("restoreControl: unable to find tag "+b))};
g.isNumber=h;g.isPair=k;g.isVector=o;g.isOutputPort=p;g.isOutputStringPort=n;g.heir=m;g.makeClassPredicate=r;g.trampoline=v}).call(this);
