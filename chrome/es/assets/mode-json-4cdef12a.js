import{n as _}from"./index-a0976c3f.js";function b(k,v){for(var i=0;i<v.length;i++){const s=v[i];if(typeof s!="string"&&!Array.isArray(s)){for(const u in s)if(u!=="default"&&!(u in k)){const h=Object.getOwnPropertyDescriptor(s,u);h&&Object.defineProperty(k,u,h.get?h:{enumerable:!0,get:()=>s[u]})}}}return Object.freeze(Object.defineProperty(k,Symbol.toStringTag,{value:"Module"}))}var x={exports:{}};(function(k,v){ace.define("ace/mode/json_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(i,s,u){var h=i("../lib/oop"),f=i("./text_highlight_rules").TextHighlightRules,l=function(){this.$rules={start:[{token:"variable",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)'},{token:"string",regex:'"',next:"string"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:"text",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"comment",regex:"\\/\\/.*$"},{token:"comment.start",regex:"\\/\\*",next:"comment"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"punctuation.operator",regex:/[,]/},{token:"text",regex:"\\s+"}],string:[{token:"constant.language.escape",regex:/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/},{token:"string",regex:'"|$',next:"start"},{defaultToken:"string"}],comment:[{token:"comment.end",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}]}};h.inherits(l,f),s.JsonHighlightRules=l}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(i,s,u){var h=i("../range").Range,f=function(){};(function(){this.checkOutdent=function(l,d){return/^\s+$/.test(l)?/^\s*\}/.test(d):!1},this.autoOutdent=function(l,d){var e=l.getLine(d),r=e.match(/^(\s*\})/);if(!r)return 0;var t=r[1].length,o=l.findMatchingBracket({row:d,column:t});if(!o||o.row==d)return 0;var n=this.$getIndent(l.getLine(o.row));l.replace(new h(d,0,d,t-1),n)},this.$getIndent=function(l){return l.match(/^\s*/)[0]}}).call(f.prototype),s.MatchingBraceOutdent=f}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(i,s,u){var h=i("../../lib/oop"),f=i("../../range").Range,l=i("./fold_mode").FoldMode,d=s.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};h.inherits(d,l),(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,r,t){var o=e.getLine(t);if(this.singleLineBlockCommentRe.test(o)&&!this.startRegionRe.test(o)&&!this.tripleStarBlockCommentRe.test(o))return"";var n=this._getFoldWidgetBase(e,r,t);return!n&&this.startRegionRe.test(o)?"start":n},this.getFoldWidgetRange=function(e,r,t,o){var n=e.getLine(t);if(this.startRegionRe.test(n))return this.getCommentRegionBlock(e,n,t);var a=n.match(this.foldingStartMarker);if(a){var c=a.index;if(a[1])return this.openingBracketBlock(e,a[1],t,c);var g=e.getCommentFoldRange(t,c+a[0].length,1);return g&&!g.isMultiLine()&&(o?g=this.getSectionRange(e,t):r!="all"&&(g=null)),g}if(r!=="markbegin"){var a=n.match(this.foldingStopMarker);if(a){var c=a.index+a[0].length;return a[1]?this.closingBracketBlock(e,a[1],t,c):e.getCommentFoldRange(t,c,-1)}}},this.getSectionRange=function(e,r){var t=e.getLine(r),o=t.search(/\S/),n=r,c=t.length;r=r+1;for(var g=r,a=e.getLength();++r<a;){t=e.getLine(r);var p=t.search(/\S/);if(p!==-1){if(o>p)break;var m=this.getFoldWidgetRange(e,"all",r);if(m){if(m.start.row<=n)break;if(m.isMultiLine())r=m.end.row;else if(o==p)break}g=r}}return new f(n,c,g,e.getLine(g).length)},this.getCommentRegionBlock=function(e,r,t){for(var o=r.search(/\s*$/),n=e.getLength(),c=t,g=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,a=1;++t<n;){r=e.getLine(t);var p=g.exec(r);if(p&&(p[1]?a--:a++,!a))break}var m=t;if(m>c)return new f(c,o,m,r.length)}}).call(d.prototype)}),ace.define("ace/mode/json",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/json_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/cstyle","ace/worker/worker_client"],function(i,s,u){var h=i("../lib/oop"),f=i("./text").Mode,l=i("./json_highlight_rules").JsonHighlightRules,d=i("./matching_brace_outdent").MatchingBraceOutdent,e=i("./folding/cstyle").FoldMode,r=i("../worker/worker_client").WorkerClient,t=function(){this.HighlightRules=l,this.$outdent=new d,this.$behaviour=this.$defaultBehaviour,this.foldingRules=new e};h.inherits(t,f),(function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(o,n,c){var g=this.$getIndent(n);if(o=="start"){var a=n.match(/^.*[\{\(\[]\s*$/);a&&(g+=c)}return g},this.checkOutdent=function(o,n,c){return this.$outdent.checkOutdent(n,c)},this.autoOutdent=function(o,n,c){this.$outdent.autoOutdent(n,c)},this.createWorker=function(o){var n=new r(["ace"],"ace/mode/json_worker","JsonWorker");return n.attachToDocument(o.getDocument()),n.on("annotate",function(c){o.setAnnotations(c.data)}),n.on("terminate",function(){o.clearAnnotations()}),n},this.$id="ace/mode/json"}).call(t.prototype),s.Mode=t}),function(){ace.require(["ace/mode/json"],function(i){k&&(k.exports=i)})}()})(x);var R=x.exports;const M=_(R),B=b({__proto__:null,default:M},[R]);export{B as m};
