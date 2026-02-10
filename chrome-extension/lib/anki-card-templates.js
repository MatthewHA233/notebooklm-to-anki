/**
 * Anki 卡片模板
 * 内嵌自 Anki卡片模板/ 目录下的三个文件
 */

// ── 正面内容模板.html ──
const FRONT_TEMPLATE = `<script>
    // v1.0.0 - https://github.com/SimonLammer/anki-persistence/blob/cd2ca88e019dc3b8f32dad623932c1eabdba7e21/script.js
    if (void 0 === window.Persistence) { var _persistenceKey = "github.com/SimonLammer/anki-persistence/", _defaultKey = "_default"; if (window.Persistence_sessionStorage = function () { var e = !1; try { "object" == typeof window.sessionStorage && (e = !0, this.clear = function () { for (var e = 0; e < sessionStorage.length; e++) { var t = sessionStorage.key(e); 0 == t.indexOf(_persistenceKey) && (sessionStorage.removeItem(t), e--) } }, this.setItem = function (e, t) { null == t && (t = e, e = _defaultKey), sessionStorage.setItem(_persistenceKey + e, JSON.stringify(t)) }, this.getItem = function (e) { return null == e && (e = _defaultKey), JSON.parse(sessionStorage.getItem(_persistenceKey + e)) }, this.removeItem = function (e) { null == e && (e = _defaultKey), sessionStorage.removeItem(_persistenceKey + e) }) } catch (e) { } this.isAvailable = function () { return e } }, window.Persistence_windowKey = function (e) { var t = window[e], n = !1; "object" == typeof t && (n = !0, this.clear = function () { t[_persistenceKey] = {} }, this.setItem = function (e, n) { null == n && (n = e, e = _defaultKey), t[_persistenceKey][e] = n }, this.getItem = function (e) { return null == e && (e = _defaultKey), null == t[_persistenceKey][e] ? null : t[_persistenceKey][e] }, this.removeItem = function (e) { null == e && (e = _defaultKey), delete t[_persistenceKey][e] }, null == t[_persistenceKey] && this.clear()), this.isAvailable = function () { return n } }, window.Persistence = new Persistence_sessionStorage, Persistence.isAvailable() || (window.Persistence = new Persistence_windowKey("py")), !Persistence.isAvailable()) { var titleStartIndex = window.location.toString().indexOf("title"), titleContentIndex = window.location.toString().indexOf("main", titleStartIndex); titleStartIndex > 0 && titleContentIndex > 0 && titleContentIndex - titleStartIndex < 10 && (window.Persistence = new Persistence_windowKey("qt")) } }
</script>

<div class="card_Cat disTran"><svg viewBox="0 0 0 0" style="position:absolute;z-index:-1;opacity:0"><defs><linearGradient id="boxGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="25" y2="25"><stop offset="0%" stop-color="var(--check_box)"/><stop offset="100%" stop-color="var(--check_box)"/></linearGradient><path id="todo__box" stroke="url(#boxGradient)" d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"></path><path id="todo__check" d="M10 13l2 2 5-5"></path><circle id="todo__circle" cx="13.5" cy="12.5" r="10"></circle></defs></svg><div class="question_Cat">{{正面}}</div><div class="map_Cat">{{所在组}} - {{序号}}</div><div class="info_Cat"><div class="info_Cat_box"><div class="tools_cat_left"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" active="false" show="false" class="icon_cat i_timer" fill="var(--icon_default)"><path d="M17.618 5.968l1.453-1.453 1.414 1.414-1.453 1.453a9 9 0 1 1-1.414-1.414zM11 8v6h2V8h-2zM8 1h8v2H8V1z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" active="false" show="false" class="icon_cat i_random" fill="var(--icon_default)"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM7 9h2v4h2V9h2l-3-3.5L7 9zm10 6h-2v-4h-2v4h-2l3 3.5 3-3.5z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" active="false" show="false" class="icon_cat i_stats" fill="var(--icon_default)"><path d="M10.9999 2.04932L11 5.07082C7.6077 5.55605 5 8.47346 5 11.9999C5 15.8659 8.13401 18.9999 12 18.9999C13.5723 18.9999 15.0236 18.4815 16.1922 17.6063L18.3289 19.7427C16.605 21.1535 14.4014 21.9999 12 21.9999C6.47715 21.9999 2 17.5228 2 11.9999C2 6.81462 5.94662 2.55109 10.9999 2.04932ZM21.9506 13C21.7509 15.011 20.9555 16.8467 19.7433 18.3282L17.6064 16.1921C18.2926 15.2759 18.7595 14.1859 18.9291 12.9999L21.9506 13ZM13.0011 2.04942C17.725 2.51895 21.4815 6.27583 21.9506 10.9998L18.9291 10.9997C18.4905 7.93446 16.0661 5.50985 13.001 5.07096L13.0011 2.04942Z"></path></svg></div><div class="tools_cat_right"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" active="false" show="false" class="icon_cat i_map" fill="var(--icon_default)"><path d="M2.9 2.3l18.805 6.268a.5.5 0 0 1 .028.939L13 13l-4.425 8.85a.5.5 0 0 1-.928-.086L2.26 2.911A.5.5 0 0 1 2.9 2.3z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" active="false" show="false" class="icon_cat i_eye i_eye_close" fill="var(--icon_default)"><path d="M17.882 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 0 0 3.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.769z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" active="false" show="false" class="icon_cat i_eye i_eye_open" fill="var(--icon_default)"><path d="M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" active="false" show="true" class="icon_cat i_setting" fill="var(--icon_default)"><path fill="none" d="M0 0h24v24H0z"/><path d="M2.132 13.63a9.942 9.942 0 0 1 0-3.26c1.102.026 2.092-.502 2.477-1.431.385-.93.058-2.004-.74-2.763a9.942 9.942 0 0 1 2.306-2.307c.76.798 1.834 1.125 2.764.74.93-.385 1.457-1.376 1.43-2.477a9.942 9.942 0 0 1 3.262 0c-.027 1.102.501 2.092 1.43 2.477.93.385 2.004.058 2.763-.74a9.942 9.942 0 0 1 2.307 2.306c-.798.76-1.125 1.834-.74 2.764.385.93 1.376 1.457 2.477 1.43a9.942 9.942 0 0 1 0 3.262c-1.102-.027-2.092.501-2.477 1.43-.385.93-.058 2.004.74 2.763a9.942 9.942 0 0 1-2.306 2.307c-.76-.798-1.834-1.125-2.764-.74-.93.385-1.457 1.376-1.43 2.477a9.942 9.942 0 0 1-3.262 0c.027-1.102-.501-2.092-1.43-2.477-.93-.385-2.004-.058-2.763.74a9.942 9.942 0 0 1-2.307-2.306c.798-.76 1.125-1.834.74-2.764-.385-.93-1.376-1.457-2.477-1.43zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg></div><div class="info info2"><a>回答正确 !!!</a><a> 做出选择 ..?</a><a> 回答错误 ...</a></div></div></div><div class="options_Cat"><div class="options_bg"><i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i> <i></i></div><div class="todo todo_anim"><div class="todo_order"></div><div class="option_Cat" option="A" order="A" correct="false"><span>{{A}}</span></div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" class="todo__icon"><use xlink:href="#todo__box" class="todo__box"></use><use xlink:href="#todo__check" class="todo__check"></use><use xlink:href="#todo__circle" class="todo__circle"></use></svg></div><div class="todo todo_anim"><div class="todo_order"></div><div class="option_Cat" option="B" order="B" correct="false"><span>{{B}}</span></div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" class="todo__icon"><use xlink:href="#todo__box" class="todo__box"></use><use xlink:href="#todo__check" class="todo__check"></use><use xlink:href="#todo__circle" class="todo__circle"></use></svg></div><div class="todo todo_anim"><div class="todo_order"></div><div class="option_Cat" option="C" order="C" correct="false"><span>{{C}}</span></div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" class="todo__icon"><use xlink:href="#todo__box" class="todo__box"></use><use xlink:href="#todo__check" class="todo__check"></use><use xlink:href="#todo__circle" class="todo__circle"></use></svg></div><div class="todo todo_anim"><div class="todo_order"></div><div class="option_Cat" option="D" order="D" correct="false"><span>{{D}}</span></div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" class="todo__icon"><use xlink:href="#todo__box" class="todo__box"></use><use xlink:href="#todo__check" class="todo__check"></use><use xlink:href="#todo__circle" class="todo__circle"></use></svg></div></div><div class="answer_Cat" style="display:none">{{答案}}</div><div class="answer2_Cat"><div class="stats_Cat"><div class="stats_txt"></div><div class="lx_Cat">包含一个正确答案...</div></div></div></div>

<script>
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(h){return h.raw=h};$jscomp.createTemplateTagFirstArgWithRaw=function(h,g){h.raw=g;return h};(function(){function h(a){var b="true"===$(a).attr("active");$(a).attr("active",!b);return b}function g(a,b){var c=1==a?"info_correct":"info_wrong";(1==a?$(".info a").eq(0):$(".info a").eq(2)).html(" "+b);$(".info").addClass(c);setTimeout(function(){$(".info").removeClass(c)},1300)}function t(){var a=p,b=z(a);$.each(q,function(c,e){$(".options_Cat").append($(".option_Cat[option='"+b[c]+"']").parent())});$.each($(".todo_order"),function(c,e){$(e).html(a[c]+".")});d("optionsOrder",b)}function A(){var a=p;$.each(q,function(b,c){$(".options_Cat").append($(".option_Cat[option='"+a[b]+"']").parent())});$.each($(".todo_order"),function(b,c){$(c).html(a[b]+".")});d("optionsOrder",a)}function x(){var a=p.slice(),b=[];q.each(function(c,e){"true"===$(e).attr("haschecked")&&(a[c]=$(e).attr("haschecked"),b.push($(e).attr("option")))});console.log(b);d("userOptions",b)}function y(a,b){0!=l(a)&&$(b).trigger("click")}function m(a,b,c){[].forEach.call(a,function(e){e.onclick=function(){b(e,c)}})}function l(a){return getComputedStyle(document.documentElement).getPropertyValue("--"+a).trim()}function u(){return $(".answer_Cat").text().split("")}function z(a){a=a.slice();a.sort(function(){return Math.random()-.5});return a}function d(a,b){Persistence.isAvailable()&&(Persistence.setItem(a,b),f[a]=1)}function v(a){if(Persistence.isAvailable())return Persistence.getItem(a)}function w(){var a=f.endTime,b=setInterval(function(){a--;$(".info_Cat").attr("time",a+" s");0===a&&clearInterval(b)},1E3);return b}var p=function(a){return Array.from({length:Math.min(a,8)},function(b,c){return String.fromCharCode(65+c)})}($(".todo").length),q=$(".option_Cat"),n,f=function(){for(var a="i_setting i_eye i_map i_timer i_random i_stats correctNum inCorrectNum".split(" "),b=a.map(function(k){return v(k)}),c={},e=0;e<a.length;e++)c[a[e]]=b[e];c.endTime=l("endTime");return c}();console.log(f);(function(){var a=u(),b=1<u().length;$(".lx_Cat").html(b?"\\u5305\\u542b\\u591a\\u4e2a\\u6b63\\u786e\\u7b54\\u6848":"\\u5305\\u542b\\u4e00\\u4e2a\\u6b63\\u786e\\u7b54\\u6848").css("color","var(--type)");q.each(function(c,e){$(".todo_order").eq(c).html(p[c]+".");$(e).attr("correct",a.includes($(e).attr("option")))});setTimeout(function(){$(".card_Cat").removeClass("disTran")},50)})();x();m($(".todo"),function(a,b){a=$(a);var c=a.hasClass("haschecked"),e=a.find(".option_Cat");!1===b&&$(".todo").removeClass("haschecked").find(".option_Cat").attr("haschecked","false");a.toggleClass("haschecked");e.attr("haschecked",!c);x()},1<u().length);m($(".icon_cat.i_setting"),function(a){h(a)?($(".icon_cat").attr("show","false"),$(a).attr("show","true"),d("i_setting",0)):($(".icon_cat").attr("show","true"),d("i_setting",1))});m($(".icon_cat.i_eye"),function(a){h(a)?(d("i_eye",0),g(0,"\\u63d0\\u793a\\u9009\\u9879\\u6570\\u5173\\u95ed"),$(".i_eye_open").css("opacity","0").attr("active","false"),$(".i_eye_close").css("opacity","1"),$(".lx_Cat").css("opacity","0")):(d("i_eye",1),g(1,"\\u63d0\\u793a\\u9009\\u9879\\u6570\\u5f00\\u542f"),$(".i_eye_close").css("opacity","0").attr("active","false"),$(".i_eye_open").css("opacity","1").attr("active","true"),$(".lx_Cat").css("opacity","1"))});m($(".icon_cat.i_map"),function(a){h(a)?($(".map_Cat").slideUp(400),g(0,"\\u9898\\u76ee\\u5b9a\\u4f4d\\u5173\\u95ed"),d("i_map",0)):($(".map_Cat").slideDown(400),g(1,"\\u9898\\u76ee\\u5b9a\\u4f4d\\u5f00\\u542f"),d("i_map",1))});m($(".icon_cat.i_random"),function(a){a=h(a);var b=$(".options_bg");b.attr("active","true");b.css("z-index","99");a?(d("i_random",0),g(0,"\\u968f\\u673a\\u9009\\u9879\\u5173\\u95ed"),setTimeout(function(){A();b.attr("active","false");b.css("z-index","0")},650)):(d("i_random",1),g(1,"\\u968f\\u673a\\u9009\\u9879\\u5f00\\u542f"),setTimeout(function(){t();b.attr("active","false");b.css("z-index","0")},650))});m($(".icon_cat.i_timer"),function(a){a=h(a);!a&&0<f.endTime?(d("i_timer",1),$(".info_Cat").attr("active","true"),$(".info_Cat").attr("active","true").attr("time",f.endTime+" s"),g(1,"\\u5012\\u8ba1\\u65f6\\u5f00\\u542f"),n=w(),d("timeCount",n)):!a&&0>=f.endTime?($(".info_Cat").attr("active","true").attr("show","false"),g(0,"\\u5012\\u8ba1\\u65f6\\u5fc5\\u987b\\u5927\\u4e8e0")):(d("i_timer",0),clearInterval(n),$(".info_Cat").attr("active","false"),g(0,"\\u5012\\u8ba1\\u65f6\\u5173\\u95ed"))});m($(".icon_cat.i_stats"),function(a){a=h(a);var b=v("correctNum")||0,c=v("inCorrectNum")||0,e=b+c,k=b/e*100;a?(d("i_stats",0),g(0,"\\u7edf\\u8ba1\\u6570\\u636e\\u5173\\u95ed"),$(".stats_Cat").removeClass("stats_Cat_Bar"),$(".stats_txt").removeClass("stats_text_show")):(d("i_stats",1),g(1,"\\u7edf\\u8ba1\\u6570\\u636e\\u5f00\\u542f"),$(".stats_Cat").addClass("stats_Cat_Bar"),$(".stats_txt").addClass("stats_text_show"),0!=e?($(".stats_txt").attr("correctNum",b+" = "+k.toFixed(1)+"%").attr("inCorrectNum",c+" = "+(100-k.toFixed(1))+"%"),document.documentElement.style.setProperty("--statsLeftBar",k+"%"),document.documentElement.style.setProperty("--statsRightBar",100-k+"%")):($(".stats_txt").attr("correctNum","0").attr("inCorrectNum","0"),document.documentElement.style.setProperty("--statsLeftBar","50%"),document.documentElement.style.setProperty("--statsRightBar","50%")))});(function(){function a(){$(b.stats).attr("active","true");var c=f.correctNum||0,e=f.inCorrectNum||0,k=c+e,r=c/k*100;$(".stats_Cat").addClass("stats_Cat_Bar").addClass("disTran");$(".stats_txt").addClass("stats_text_show");0!=k?($(".stats_txt").attr("correctNum",c+" = "+r.toFixed(1)+"%").attr("inCorrectNum",e+" = "+(100-r.toFixed(1))+"%"),document.documentElement.style.setProperty("--statsLeftBar",r+"%"),document.documentElement.style.setProperty("--statsRightBar",100-r+"%")):($(".stats_txt").attr("correctNum","0").attr("inCorrectNum","0"),document.documentElement.style.setProperty("--statsLeftBar","50%"),document.documentElement.style.setProperty("--statsRightBar","50%"))}var b={setting:".i_setting",eye:".i_eye_close",map:".i_map",random:".i_random",timer:".i_timer",stats:".i_stats"};0!=f.i_setting&&(1==f.i_setting?y("setting",b.setting):0!=l("setting")&&y("setting",b.setting));0!=f.i_eye&&(1==f.i_eye?($(".i_eye_close").css("opacity","0").attr("active","false"),$(".i_eye_open").css("opacity","1").attr("active","true"),$(".lx_Cat").css("opacity","1"),d("i_eye",1)):0!=l("eye")&&($(".i_eye_close").css("opacity","0").attr("active","false"),$(".i_eye_open").css("opacity","1").attr("active","true"),$(".lx_Cat").css("opacity","1"),d("i_eye",1)));0!=f.i_map&&(1==f.i_map?($(b.map).attr("active","true"),$(".map_Cat").css("display","block"),d("i_map",1)):0!=l("map")&&($(b.map).attr("active","true"),$(".map_Cat").css("display","block"),d("i_map",1)));0!=f.i_timer&&(1==f.i_timer&&0<f.endTime?($(b.timer).attr("active","true"),$(".info_Cat").attr("active","true").attr("time",f.endTime+" s"),n=w(),d("i_timer",1),d("timeCount",n)):0!=l("timer")&&($(b.timer).attr("active","true"),$(".info_Cat").attr("active","true").attr("time",f.endTime+" s"),n=w(),d("i_timer",1),d("timeCount",n)));0!=f.i_random&&(1==f.i_random?($(b.random).attr("active","true"),t()):0!=l("random")?($(b.random).attr("active","true"),d("i_random",1),t()):d("optionsOrder",p));null!=f.i_stats?1==f.i_stats?a():($(".stats_Cat").removeClass("stats_Cat_Bar"),$(".stats_txt").removeClass("stats_text_show")):1==l("stats")&&a()})()})();
</script>`;

// ── 背面内容模板.html ──
const BACK_TEMPLATE = `<script>
    // v1.0.0 - https://github.com/SimonLammer/anki-persistence/blob/cd2ca88e019dc3b8f32dad623932c1eabdba7e21/script.js
    if(void 0===window.Persistence){var _persistenceKey="github.com/SimonLammer/anki-persistence/",_defaultKey="_default";if(window.Persistence_sessionStorage=function(){var e=!1;try{"object"==typeof window.sessionStorage&&(e=!0,this.clear=function(){for(var e=0;e<sessionStorage.length;e++){var t=sessionStorage.key(e);0==t.indexOf(_persistenceKey)&&(sessionStorage.removeItem(t),e--)}},this.setItem=function(e,t){null==t&&(t=e,e=_defaultKey),sessionStorage.setItem(_persistenceKey+e,JSON.stringify(t))},this.getItem=function(e){return null==e&&(e=_defaultKey),JSON.parse(sessionStorage.getItem(_persistenceKey+e))},this.removeItem=function(e){null==e&&(e=_defaultKey),sessionStorage.removeItem(_persistenceKey+e)})}catch(e){}this.isAvailable=function(){return e}},window.Persistence_windowKey=function(e){var t=window[e],n=!1;"object"==typeof t&&(n=!0,this.clear=function(){t[_persistenceKey]={}},this.setItem=function(e,n){null==n&&(n=e,e=_defaultKey),t[_persistenceKey][e]=n},this.getItem=function(e){return null==e&&(e=_defaultKey),null==t[_persistenceKey][e]?null:t[_persistenceKey][e]},this.removeItem=function(e){null==e&&(e=_defaultKey),delete t[_persistenceKey][e]},null==t[_persistenceKey]&&this.clear()),this.isAvailable=function(){return n}},window.Persistence=new Persistence_sessionStorage,Persistence.isAvailable()||(window.Persistence=new Persistence_windowKey("py")),!Persistence.isAvailable()){var titleStartIndex=window.location.toString().indexOf("title"),titleContentIndex=window.location.toString().indexOf("main",titleStartIndex);titleStartIndex>0&&titleContentIndex>0&&titleContentIndex-titleStartIndex<10&&(window.Persistence=new Persistence_windowKey("qt"))}}
    </script>

        <div class="card_Cat disTran"><svg viewBox="0 0 0 0" style="position:absolute;z-index:-1;opacity:0"><defs><linearGradient id="boxGradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="25" y2="25"><stop offset="0%" stop-color="var(--check_box)"/><stop offset="100%" stop-color="var(--check_box)"/></linearGradient><path id="todo__box" stroke="url(#boxGradient)" d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"></path><path id="todo__check" d="M10 13l2 2 5-5"></path><circle id="todo__circle" cx="13.5" cy="12.5" r="10"></circle></defs></svg><div class="question_Cat">{{正面}}</div><div class="map_Cat">{{所在组}} - {{序号}}</div><div class="header_Cat"><canvas id="canvas_Cat"></canvas><div class="info_Cat"><div class="info_Cat_box"><div class="tools_cat_left"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" active="false" show="false" class="icon_cat i_timer" fill="var(--icon_default)"><path d="M17.618 5.968l1.453-1.453 1.414 1.414-1.453 1.453a9 9 0 1 1-1.414-1.414zM11 8v6h2V8h-2zM8 1h8v2H8V1z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" active="false" show="false" class="icon_cat i_random" fill="var(--icon_default)"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM7 9h2v4h2V9h2l-3-3.5L7 9zm10 6h-2v-4h-2v4h-2l3 3.5 3-3.5z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" active="false" show="false" class="icon_cat i_stats" fill="var(--icon_default)"><path d="M10.9999 2.04932L11 5.07082C7.6077 5.55605 5 8.47346 5 11.9999C5 15.8659 8.13401 18.9999 12 18.9999C13.5723 18.9999 15.0236 18.4815 16.1922 17.6063L18.3289 19.7427C16.605 21.1535 14.4014 21.9999 12 21.9999C6.47715 21.9999 2 17.5228 2 11.9999C2 6.81462 5.94662 2.55109 10.9999 2.04932ZM21.9506 13C21.7509 15.011 20.9555 16.8467 19.7433 18.3282L17.6064 16.1921C18.2926 15.2759 18.7595 14.1859 18.9291 12.9999L21.9506 13ZM13.0011 2.04942C17.725 2.51895 21.4815 6.27583 21.9506 10.9998L18.9291 10.9997C18.4905 7.93446 16.0661 5.50985 13.001 5.07096L13.0011 2.04942Z"></path></svg></div><div class="tools_cat_right"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" active="false" show="false" class="icon_cat i_map" fill="var(--icon_default)"><path d="M2.9 2.3l18.805 6.268a.5.5 0 0 1 .028.939L13 13l-4.425 8.85a.5.5 0 0 1-.928-.086L2.26 2.911A.5.5 0 0 1 2.9 2.3z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" active="false" show="false" class="icon_cat i_eye i_eye_close" fill="var(--icon_default)"><path d="M17.882 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 0 0 3.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.769z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" active="false" show="false" class="icon_cat i_eye i_eye_open" fill="var(--icon_default)"><path d="M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" active="false" show="true" class="icon_cat i_setting" fill="var(--icon_default)"><path fill="none" d="M0 0h24v24H0z"/><path d="M2.132 13.63a9.942 9.942 0 0 1 0-3.26c1.102.026 2.092-.502 2.477-1.431.385-.93.058-2.004-.74-2.763a9.942 9.942 0 0 1 2.306-2.307c.76.798 1.834 1.125 2.764.74.93-.385 1.457-1.376 1.43-2.477a9.942 9.942 0 0 1 3.262 0c-.027 1.102.501 2.092 1.43 2.477.93.385 2.004.058 2.763-.74a9.942 9.942 0 0 1 2.307 2.306c-.798.76-1.125 1.834-.74 2.764.385.93 1.376 1.457 2.477 1.43a9.942 9.942 0 0 1 0 3.262c-1.102-.027-2.092.501-2.477 1.43-.385.93-.058 2.004.74 2.763a9.942 9.942 0 0 1-2.306 2.307c-.76-.798-1.834-1.125-2.764-.74-.93.385-1.457 1.376-1.43 2.477a9.942 9.942 0 0 1-3.262 0c.027-1.102-.501-2.092-1.43-2.477-.93-.385-2.004-.058-2.763.74a9.942 9.942 0 0 1-2.307-2.306c.798-.76 1.125-1.834.74-2.764-.385-.93-1.376-1.457-2.477-1.43zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg></div><div class="info"><a>回答正确 !!!</a><a> 做出选择 ..?</a><a> 回答错误 ...</a></div></div></div><div class="options_Cat"><div class="todo todo2"><div class="todo_order"></div><div class="option_Cat" option="A" order="A" correct="false"><span>{{A}}</span></div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" class="todo__icon"><use xlink:href="#todo__box" class="todo__box"></use><use xlink:href="#todo__check" class="todo__check"></use><use xlink:href="#todo__circle" class="todo__circle"></use></svg></div><div class="todo todo2"><div class="todo_order"></div><div class="option_Cat" option="B" order="B" correct="false"><span>{{B}}</span></div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" class="todo__icon"><use xlink:href="#todo__box" class="todo__box"></use><use xlink:href="#todo__check" class="todo__check"></use><use xlink:href="#todo__circle" class="todo__circle"></use></svg></div><div class="todo todo2"><div class="todo_order"></div><div class="option_Cat" option="C" order="C" correct="false"><span>{{C}}</span></div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" class="todo__icon"><use xlink:href="#todo__box" class="todo__box"></use><use xlink:href="#todo__check" class="todo__check"></use><use xlink:href="#todo__circle" class="todo__circle"></use></svg></div><div class="todo todo2"><div class="todo_order"></div><div class="option_Cat" option="D" order="D" correct="false"><span>{{D}}</span></div><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 25" class="todo__icon"><use xlink:href="#todo__box" class="todo__box"></use><use xlink:href="#todo__check" class="todo__check"></use><use xlink:href="#todo__circle" class="todo__circle"></use></svg></div></div><div class="answer_Cat" style="display:none">{{答案}}</div><div class="answer2_Cat"><div class="stats_Cat"><div class="stats_txt"></div><div class="title_chose">正确选项</div><div class="title_icon"><i></i></div><div class="re_chose"></div><div class="split_chose"></div><div class="user_chose"></div><div class="title_icon icon2"><i></i></div><div class="title_chose">你的选择</div></div></div></div><div class="ex1">{{解题思路}}</div><div class="ex2">{{点拨内容}}</div><div class="read_Cat"><span class="title"><a>笔记</a></span><span class="note_Cat"><p>{{我的笔记}}</p></span></div><div class="read_Cat"><span class="title"><a>{{标题1}}</a></span><span class="ex_Cat ex__cat"></span></div><div class="read_Cat"><span class="title"><a>{{标题2}}</a></span><span class="ex2_Cat ex__cat"></span></div></div>

<script>
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(q){return q.raw=q};$jscomp.createTemplateTagFirstArgWithRaw=function(q,r){q.raw=r;return q};(function(){function q(a,b){0!=v(a)&&$(b).trigger("click")}function r(a){var b="true"===$(a).attr("active");$(a).attr("active",!b);return b}function B(a){r(a)?($(".icon_cat").attr("show","false"),$(a).attr("show","true"),k("i_setting",0)):($(".icon_cat").attr("show","true"),k("i_setting",1))}function C(a){if(!$(a).length)return"";var b=$(a).html(),e=b.match(/([A-D])[\\u3001,\\uff0c]([A-D])[\\u3001,\\uff0c]([A-D])[\\u3001,\\uff0c]([A-D])|([A-D])[\\u3001,\\uff0c]([A-D])[\\u3001,\\uff0c]([A-D])|([A-D])[\\u3001,\\uff0c]([A-D])|([A-D]+)/g);if(null==e)return"";for(var d=0;d<e.length;d++){var f=e[d].replace(/[\\u3001,\\uff0c]/g,"");f=f.split("");f.sort();f=f.join("\\u3001");b=b.replace(e[d],f)}$(a).html(b)}function v(a){return getComputedStyle(document.documentElement).getPropertyValue("--"+a).trim()}function k(a,b){Persistence.isAvailable()&&(Persistence.setItem(a,b),g[a]=1)}function t(a){if(Persistence.isAvailable())return Persistence.getItem(a)}function w(a,b,e){[].forEach.call(a,function(d){d.onclick=function(){b(d,e)}})}function E(){function a(){this.randomModifier=randomRange(0,99);this.color=f[Math.floor(randomRange(0,h))];this.dimensions={x:randomRange(5,9),y:randomRange(8,15)};this.position={x:randomRange(n/2,n/2),y:randomRange(200,205)};this.rotation=randomRange(0,2*Math.PI);this.scale={x:1,y:1};this.velocity=initConfettoVelocity([-9,9],[6,11])}var b=document.getElementById("canvas_Cat"),e=b.getContext("2d");b.width=window.innerWidth;b.height=window.innerHeight;var d=[],f=[{front:"#7b5cff",back:"#6245e0"},{front:"#b3c7ff",back:"#8fa5e5"},{front:"#5c86ff",back:"#345dd1"}],n=b.width,p=b.height,h=f.length;randomRange=function(c,l){return Math.random()*(l-c)+c};initConfettoVelocity=function(c,l){c=randomRange(c[0],c[1]);var m=l[1]-l[0]+1;m=l[1]-Math.abs(randomRange(0,m)+randomRange(0,m)-m);m>=l[1]-1&&(m+=.25>Math.random()?randomRange(1,3):0);return{x:c,y:-m}};a.prototype.update=function(){this.velocity.x-=.075*this.velocity.x;this.velocity.y=Math.min(this.velocity.y+.3,3);this.velocity.x+=.5<Math.random()?Math.random():-Math.random();this.position.x+=this.velocity.x;this.position.y+=this.velocity.y;this.scale.y=Math.cos(.09*(this.position.y+this.randomModifier))};initBurst=function(){for(var c=0;15>c;c++)d[c]?(d[c].randomModifier=randomRange(0,99),d[c].color=f[Math.floor(randomRange(0,h))],d[c].dimensions.x=randomRange(5,9),d[c].dimensions.y=randomRange(8,15),d[c].position.x=randomRange(n/2,n/2),d[c].position.y=randomRange(200,205),d[c].rotation=randomRange(0,2*Math.PI),d[c].scale={x:1,y:1},d[c].velocity=initConfettoVelocity([-9,9],[6,11])):d[c]=new a};render=function(){e.clearRect(0,0,n,p);d.forEach(function(c,l){e.beginPath();l=c.dimensions.x*c.scale.x;var m=c.dimensions.y*c.scale.y;e.translate(c.position.x,c.position.y);e.rotate(c.rotation);c.update();e.fillStyle=0<c.scale.y?c.color.front:c.color.back;e.fillRect(-l/2,-m/2,l,m);e.setTransform(1,0,0,1,0,0);0>c.velocity.y&&e.clearRect(n/2,p/2,0,0)});d.forEach(function(c,l){c.position.y>=p&&d.splice(l,1)});window.requestAnimationFrame(render)};initBurst();render()}var u=function(a){return Array.from({length:Math.min(a,8)},function(b,e){return String.fromCharCode(65+e)})}($(".todo").length),y=$(".option_Cat"),x=t("optionsOrder"),D=t("userOptions"),z=u.reduce(function(a,b,e){a[b]=x[e];return a},{}),A=x.reduce(function(a,b,e){a[b]=u[e];return a},{}),g=function(){for(var a="i_setting i_eye i_map i_timer i_random i_stats correctNum inCorrectNum".split(" "),b=a.map(function(f){return t(f)}),e={},d=0;d<a.length;d++)e[a[d]]=b[d];e.endTime=v("endTime");return e}();console.log(z);console.log(A);console.log(x);console.log(D);(function(){var a=$(".answer_Cat").text().split(""),b=1<$(".answer_Cat").text().split("").length;$(".lx_Cat").html(b?"\\u5305\\u542b\\u591a\\u4e2a\\u6b63\\u786e\\u7b54\\u6848":"\\u5305\\u542b\\u4e00\\u4e2a\\u6b63\\u786e\\u7b54\\u6848").css("color","var(--type)");y.each(function(e,d){$(d).attr("correct",a.includes($(d).attr("option")))});setTimeout(function(){$(".card_Cat").removeClass("disTran")},50)})();(function(){y.each(function(a,b){$(".options_Cat").append($(".option_Cat[option='"+x[a]+"']").parent());$(".option_Cat[option='"+x[a]+"']").attr("order",u[a])});$(".option_Cat").each(function(a,b){$(b).prev().html(u[a]+".");D.includes(z[u[a]])&&(console.log(z[u[a]]),$(b).attr("isChecked","true"),$(b).parent().addClass("haschecked"))})})();setTimeout(function(){y.each(function(a,b){$(b).attr("haschecked","true")})},500);(function(){function a(){$(".stats_Cat").addClass("stats_Cat_Bar").addClass("disTran");$(b.stats).attr("active","true");var d=g.correctNum||0,f=g.inCorrectNum||0,n=d+f,p=d/n*100;$(".stats_Cat").addClass("stats_Cat_Bar");$(".stats_txt").addClass("stats_text_show");$(".title_chose").css("display","none");$(".title_icon").css("display","none");0!=n?($(".stats_txt").attr("correctNum",d+" = "+p.toFixed(1)+"%").attr("inCorrectNum",f+" = "+(100-p.toFixed(1))+"%"),document.documentElement.style.setProperty("--statsLeftBar",p+"%"),document.documentElement.style.setProperty("--statsRightBar",100-p+"%")):($(".stats_txt").attr("correctNum","0").attr("inCorrectNum","0"),document.documentElement.style.setProperty("--statsLeftBar","50%"),document.documentElement.style.setProperty("--statsRightBar","50%"))}var b={setting:".i_setting",eye:".i_eye_close",map:".i_map",random:".i_random",timer:".i_timer",stats:".i_stats"};null!=g.i_setting?1==g.i_setting&&($(b.setting).attr("active","true"),B()):q("setting",b.setting);0!=g.i_eye&&(1==g.i_eye?($(".i_eye_close").css("opacity","0").attr("active","false"),$(".i_eye_open").css("opacity","1").attr("active","true"),$(".lx_Cat").css("opacity","1")):0!=v("eye")&&q("eye",b.eye));0!=g.i_map&&(1==g.i_map?($(b.map).attr("active","true"),$(".map_Cat").css("display","block")):0!=v("map")&&($(b.map).attr("active","true"),$(".map_Cat").css("display","block")));if(0!=g.i_timer){var e=t("timeCount");clearInterval(e);1==g.i_timer&&0<g.endTime?$(b.timer).attr("active","true"):0!=v("timer")&&q("timer",b.timer)}0!=g.i_random&&1==g.i_random&&$(b.random).attr("active","true");null!=g.i_stats?1==g.i_stats?a():($(".title_chose").css("display","block"),$(".title_icon").css("display","block"),$(".stats_Cat").removeClass("stats_Cat_Bar"),$(".stats_txt").removeClass("stats_text_show")):1==v("stats")&&a()})();(function(){var a="",b=[],e="",d=[],f=t("correctNum")||0,n=t("inCorrectNum")||0;$(".option_Cat").each(function(h,c){var l=$(c).attr("isChecked"),m="true"===$(c).attr("correct");h=u[h];"true"===l&&(d.push($(c).attr("order")),e=m?e+('<b style="color:var(--correctGreen)">'+h+"</b>"):e+('<b style="color:var(--incorrectRed)">'+h+"</b>"))});var p=e||'<b style="color:var(--incorrectRed)">Nothing</b>';$(".user_chose").html(p);$(".option_Cat[correct='true']").each(function(h,c){h=$(c).attr("order");0===d.length&&"true"===$(c).attr("correct")?a+='<b style="color:var(--missorange)">'+h+"</b>":"true"!==$(c).attr("correct")||d.includes(h)?"true"===$(c).attr("correct")&&d.includes(h)&&(a+='<b style="color:var(--correctGreen)">'+h+"</b>"):a+='<b style="color:var(--missorange)">'+h+"</b>";b.push(h)});$(".re_chose").html(a);b.join("")==d.join("")?($(".info").addClass("info_correct"),k("correctNum",f+1),E()):($(".info").addClass("info_wrong"),k("inCorrectNum",n+1))})();(function(){$(".ex_Cat").html($(".ex1").html());$(".ex2_Cat").html($(".ex2").html());$.each($(".ex__cat"),function(a,b){2>$(b).html().length&&$(b).parent().remove()});$.trim($(".note_Cat p").html())||$(".note_Cat").parent().remove();$(".ex_Cat").each(function(){$(this).html($(this).html().replace(/[A-H]/g,function(a){return A[a]}))});$(".ex2_Cat").each(function(){$(this).html($(this).html().replace(/[A-H]/g,function(a){return A[a]}))});C(".ex_Cat");C(".ex2_Cat")})();w($(".icon_cat.i_setting"),B);w($(".icon_cat.i_eye"),function(a){r(a)?(k("i_eye",0),$(".i_eye_open").css("opacity","0").attr("active","false"),$(".i_eye_close").css("opacity","1"),$(".lx_Cat").css("opacity","0")):(k("i_eye",1),$(".i_eye_close").css("opacity","0").attr("active","false"),$(".i_eye_open").css("opacity","1").attr("active","true"),$(".lx_Cat").css("opacity","1"))});w($(".icon_cat.i_map"),function(a){r(a)?($(".map_Cat").slideUp(400),k("i_map",0)):($(".map_Cat").slideDown(400),k("i_map",1))});w($(".icon_cat.i_random"),function(a){r(a)?k("i_random",0):k("i_random",1)});w($(".icon_cat.i_timer"),function(a){!r(a)&&0<g.endTime?k("i_timer",1):k("i_timer",0)});w($(".icon_cat.i_stats"),function(a){a=r(a);var b=t("correctNum")||0,e=t("inCorrectNum")||0,d=b+e,f=b/d*100;a?(k("i_stats",0),$(".title_chose").css("display","block"),$(".title_icon").css("display","block"),$(".stats_Cat").removeClass("stats_Cat_Bar"),$(".stats_txt").removeClass("stats_text_show")):(k("i_stats",1),$(".title_chose").css("display","none"),$(".title_icon").css("display","none"),$(".stats_Cat").addClass("stats_Cat_Bar"),$(".stats_txt").addClass("stats_text_show"),0!=d?($(".stats_txt").attr("correctNum",b+" = "+f.toFixed(1)+"%").attr("inCorrectNum",e+" = "+(100-f.toFixed(1))+"%"),document.documentElement.style.setProperty("--statsLeftBar",f+"%"),document.documentElement.style.setProperty("--statsRightBar",100-f+"%")):($(".stats_txt").attr("correctNum","0").attr("inCorrectNum","0"),document.documentElement.style.setProperty("--statsLeftBar","50%"),document.documentElement.style.setProperty("--statsRightBar","50%")))})})();
</script>`;

// ── 样式.css ──
const CARD_CSS = `:root {



    /* -- 如需修改字体大小，修改下方数字 -- */
    font-size: 16px;

    /* - 是否进入直接开启功能, 1 为开启, 0 为关闭 - */
    --setting: 0;   /* 是否显示设置 */
    --eye: 0;				/* 是否显示选项类型 */
    --map: 0;       /* 是否显示所在位置 */
    --timer: 0;			/* 是否开启倒计时 */
    --random: 0;			/* 是否随机选项 */
    --stats: 0;			/* 是否显示对错数量 */

    /* - 倒计时时间 默认20秒倒计时 - */
    --endTime: 20;

    /* - 思考/错误/正确 是否添加表情，可以删除下方左侧两处注释开启，默认不使用 - */

   /*
      --emmm: "🤔";
      --nooo: "😢";
      --yesss: "😎";
   */



  }

  .card {
    font-family: arial;
    text-align: left;
    color: var(--commonColor);
    background-color: var(--bg);
  }

  .card {
    text-shadow: 1px 1px 1px rgb(0 0 0 / 5%);
    --bg: white;
    --question_num: #4f6ef2;
    --correctGreen: #00cda8;
    --incorrectRed: #f71c4b;
    --missorange: #ffc300;
    --commonColor: #283155;
    --icon: #00cda8;
    --icon_shadow: #00cda726;
    --icon: #00cda8;
    --icon_default: #28315522;
    --time: #00cda8;
    --time_bar: #00cda8;
    --time_over: #f71c4b;
    --title: #185bf1;
    --info_border: #29325723;
    --info_border_active: #4b6cee8c;
    --lx: #185bf1;
    --check_box: #6d738e;
    --type: #4f6ef2;
    --option_order: #fda31d;
    --option_key: #00cda743;
    --option_bg1: #ffc300;
    --option_bg2: #00cda8;
    --option_press_bg: #2a2c53;
    --option_press: #8e94f7;
    --option_release: #e4e4e4;
    --key: #00cda8;
  }

  .card.nightMode {
    text-shadow: 1px 1px 1px #ffffff0d;
    background-color: var(--bg);
    --bg: #1a1a1a;
    --question_num: #8cadf3;
    --correctGreen: #acf3e1;
    --incorrectRed: #f87995;
    --missorange: #fbdb73;
    --commonColor: #dcdcdc;
    --icon: #00cda8;
    --icon_default: #729ea844;
    --icon_shadow: #00cda726;
    --icon: #00cda8;
    --time: #00cda8;
    --time_bar: #00cda8;
    --time_over: #f71c4b;
    --title: #7ba2f7;
    --info_border: #dae2ff23;
    --info_border_active: #4b6cee8c;
    --lx: #185bf1;
    --type: #7ba2f7;
    --option_order: #ffb23f;
    --option_key: #00cda743;
    --option_bg1: #163dff;
    --option_bg2: #cd1d5e;
    --option_press_bg: #404153;
    --option_press: #ffffff;
    --option_release: #302f2f;
    --key: #8cadf3;
  }

  :root {
    -webkit-tap-highlight-color: transparent;
    --duration: 0.8s;
  }
  .read_Cat,
  .question_Cat,
  .option_Cat{
    letter-spacing:1px;
  }
  .ex1,.ex2{display:none}
  .card_Cat{position:relative}
  .question_Cat{position:relative;padding:8px 12px;border-radius:17px;box-sizing:border-box;line-height:1.5;margin-top:10px;color:var(--commonColor);font-size:1rem}
  @keyframes questionMove{to{bottom:-5px}
  }
  .question_Cat .title_num{color:var(--question_num)}
  .question_Cat .title_num::after{content:". "}
  .map_Cat{font-size:10px;text-align:right;margin:5px 15px 3px 0;display:none}
  .todo{line-height:1.4;position:relative;padding:.6rem 1rem;margin:8px auto;cursor:pointer;transition:all .4s;overflow:hidden;border-radius:16px;box-shadow:inset 1px 1px 1px 0 rgb(255 255 255 / 80%),inset -1px -1px 1px 0 rgb(40 49 85 / 30%),1px 1px 3px 0 rgb(40 49 85 / 10%);user-select:none;font-size:1rem}
  .card.nightMode .todo{box-shadow:none;border:1px var(--option_release) solid}
  .card.nightMode .haschecked{border:1px var(--option_press) solid}
  .haschecked{background-color:var(--option_press_bg);box-shadow:inset -1px -1px 1px 0 rgb(255 255 255 / 70%),inset 1px 1px 1px 0 rgb(40 49 85 / 40%),1px 1px 3px 0 rgb(40 49 85 / 10%)}
  .haschecked .option_Cat{background-size:100% 40%;color:#fff}
  .todo2 .option_Cat[correct=true][haschecked=true] span{transition:all .4s;color:var(--correctGreen);text-shadow:1px 1px 1px #00cda72d}
  .todo2 .option_Cat[correct=true][haschecked=true]+.todo__icon .todo__check{stroke:var(--correctGreen)}
  .todo2 .option_Cat[correct=false][haschecked=true] span{transition:all .4s;color:var(--incorrectRed);text-shadow:1px 1px 1px #fa446b2d}
  .todo2 .todo__circle{animation-delay:calc(var(--duration) * .7);animation-duration:calc(var(--duration) * .7)}
  .todo2 .option_Cat[correct=true][haschecked=true]+.todo__icon .todo__box{stroke-dashoffset:56.1053;transition-delay:0s}
  .todo2 .option_Cat[correct=true][haschecked=true]+.todo__icon .todo__check{stroke-dashoffset:0;transition-delay:calc(var(--duration) * .6)}
  .todo2 .option_Cat[correct=true][haschecked=true]+.todo__icon .todo__circle{animation-name:explode}
  .todo2 .option_Cat[correct=false][haschecked=true]+.todo__icon .todo__box{stroke-dashoffset:56.1053;transition-delay:0s;stroke:var(--incorrectRed)}
  .todo2 .option_Cat[correct=false][haschecked=true]+.todo__icon .todo__check{stroke-dashoffset:9.8995;transition-delay:calc(var(--duration) * .6);stroke:var(--incorrectRed)}
  .todo2 .option_Cat[correct=false][haschecked=true]+.todo__icon .todo__circle{stroke:var(--incorrectRed)}
  .read_Cat{opacity:0;animation:fade-in .5s linear forwards}
  .option_Cat{margin-left:50px;pointer-events:auto;transition:color .3s;color:var(--commonColor);display:inline-block}
  .option_cat span{background-color:transparent;background-image:linear-gradient(var(--option_key),var(--option_key));background-position:0 100%;background-size:0 40%;background-repeat:no-repeat;transition:all .4s ease;display:inline}
  @keyframes fade-inn{0%{transform:translateY(40%);opacity:0}
  100%{transform:translateY(0);opacity:1}
  }
  .todo__state{position:absolute;top:0;left:0;opacity:0}
  .todo__text{text-align:left;transition:all calc(var(--duration)/ 2) linear calc(var(--duration)/ 2)}
  .todo__icon{position:absolute;left:10px;top:50%;transform:translateY(-50%);fill:none;stroke:var(--correctGreen);stroke-width:2;stroke-linejoin:round;stroke-linecap:round;height:30px}
  .todo__box,.todo__check{transition:stroke-dashoffset var(--duration) cubic-bezier(.9,0,.5,1)}
  .todo__circle{stroke:var(--correctGreen);stroke-dasharray:1 6;stroke-width:0;stroke-opacity:0;transform-origin:13.5px 12.5px;transform:scale(.4) rotate(0);animation:none var(--duration) linear}
  @keyframes fade-in{to{opacity:1}
  }
  @keyframes explode{0%{stroke-width:0;transform:scale(.5) rotate(0)}
  30%{stroke-width:3;stroke-opacity:1;transform:scale(.8) rotate(40deg)}
  100%{stroke-width:0;stroke-opacity:0;transform:scale(1.1) rotate(60deg)}
  }
  .todo__box{stroke-dasharray:56.1053,56.1053;stroke-dashoffset:0;transition-delay:calc(var(--duration) * .2)}
  .todo__check{stroke:var(--correctGreen);stroke-dasharray:9.8995,9.8995;stroke-dashoffset:9.8995;transition-duration:calc(var(--duration) * .4)}
  .todo .todo_order{position:absolute;top:50%;left:45px;transform:translateY(-50%);color:var(--option_order);transition:all .4s}
  .todo_anim .option_Cat{opacity:0;transform:translateX(150%);animation:icon .7s cubic-bezier(.16,1,.3,1) forwards}
  .options_Cat .todo_anim:nth-of-type(2) .option_Cat{animation-delay:.1s}
  .options_Cat .todo_anim:nth-of-type(3) .option_Cat{animation-delay:.15s}
  .options_Cat .todo_anim:nth-of-type(4) .option_Cat{animation-delay:.25s}
  .options_Cat .todo_anim:nth-of-type(5) .option_Cat{animation-delay:.3s}
  .info_Cat{position:relative;overflow:hidden;margin:0 8px;transition:.4s all;-webkit-text-size-adjust:none!important}
  .info_Cat[active=true]::after{position:absolute;content:"";width:100%;height:3px;background-color:var(--icon);bottom:4px;border-radius:10px;left:-100%;z-index:2;animation:bar_Cat calc(var(--endTime) * 1s) linear forwards}
  .info_Cat[show=false]::after{opacity:0!important}
  .info_Cat[active=true]::before{position:absolute;content:attr(time);font-size:10px;left:10px;top:10px;color:var(--time)}
  .info_Cat[active=true]::before{animation:fade-in-out .4s ease-in-out forwards}
  @keyframes fade-in-out{from{top:10px;opacity:0}
  to{top:2px;opacity:1}
  }
  @keyframes bar_Cat{90%{background-color:var(--time_bar)}
  100%{left:0;background-color:var(--time_over)}
  }
  .info_Cat_box{padding:5px 0;z-index:1;position:relative;text-align:center;height:26px;overflow:hidden;margin:15px 0 5px 0;line-height:2;border-bottom:var(--info_border) 1px dashed;border-top:var(--info_border) 1px dashed;user-select:none}
  .info{position:absolute;display:flex;flex-direction:column;justify-content:center;transition-delay:3.6s;transition:all .7s cubic-bezier(.65,0,.076,1);letter-spacing:2px;left:50%;top:-100%;transform:translateX(-50%)}
  .info a{height:36px;font-size:.8rem;line-height:36px;white-space:pre;font-weight:700;transition:all .7s cubic-bezier(.65,0,.076,1);transition-delay:.3s;display:block;color:var(--commonColor)}
  .info a:first-of-type::before{content:var(--yesss)}
  .info a:nth-of-type(2):before{content:var(--emmm)}
  .info a:nth-of-type(3):before{content:var(--nooo)}
  .info.info2 a:first-of-type::before{content:""}
  .info.info2 a:nth-of-type(3):before{content:""}
  .info.info2 a{transition-delay:0s}
  .info_correct{top:0}
  .info_correct,.info_correct a{color:var(--correctGreen)}
  .info_wrong{top:-200%}
  .info_wrong,.info_wrong a{color:var(--incorrectRed)}
  .tools_cat_left,.tools_cat_right{position:absolute;height:1.6rem;display:flex;flex-wrap:wrap;align-content:center;z-index:99}
  .disTran .icon_cat{transition:none!important}
  .disTran .stats_Cat::after,.disTran .stats_Cat::before{transition:none!important}
  .icon_cat{transition:all .4s}
  .icon_cat[active=true]{fill:var(--icon);filter:drop-shadow(2px 2px 4px var(--icon_shadow))}
  .icon_cat[show=false]{opacity:0!important}
  .tools_cat_left{left:0}
  .tools_cat_right{right:0}
  .tools_cat_left .icon_cat:first-of-type{margin-left:8px}
  .tools_cat_right .icon_cat:last-of-type{margin-right:7px}
  .tools_cat_left .icon_cat{margin-left:10px}
  .tools_cat_right .icon_cat{margin-right:10px}
  .i_eye_open{opacity:0}
  .i_eye_close{position:absolute;height:1.6rem;transform:translateX(30px)}
  .i_timer_open{position:absolute;height:1.6rem;transform:translateX(28px)}
  .i_face{opacity:1!important}
  .answer2_Cat{-webkit-text-size-adjust:none!important;user-select:none;height:1.6rem;font-size:.8rem;color:var(--base);border-top:var(--info_border) 1px dashed;border-bottom:var(--info_border) 1px dashed;font-weight:700;padding:5px 0;margin:13px 8px;line-height:2}
  .stats_Cat{position:relative;display:flex;justify-content:center;align-items:center}
  .stats_Cat::after,.stats_Cat::before{content:"";position:absolute;height:3px;top:0;transform:translateY(-6px);width:0;transition:1s cubic-bezier(.34,1.56,.64,1)}
  .stats_Cat.stats_Cat_Bar::before{width:var(--statsLeftBar)}
  .stats_Cat.stats_Cat_Bar::after{width:var(--statsRightBar)}
  .stats_Cat::before{background-color:var(--correctGreen);left:0}
  .stats_Cat::after{right:0;background-color:var(--incorrectRed)}
  .stats_txt{position:absolute;left:0;top:10px;font-size:10px;width:100%;opacity:0;transition:all .4s}
  .stats_txt.stats_text_show{opacity:1;top:0}
  .stats_txt::after,.stats_txt::before{position:absolute}
  .stats_txt::before{left:0;content:attr(correctNum);color:var(--correctGreen)}
  .stats_txt::after{right:0;content:attr(inCorrectNum);color:var(--incorrectRed)}
  .lx_Cat{letter-spacing:2px;color:var(--lx);opacity:0;transition:all .4s}
  .re_chose{color:var(--correctGreen)}
  .re_chose,.user_chose{letter-spacing:2px;animation:fade-inn .4s ease-in-out forwards}
  .split_chose{margin:auto .5rem;height:0;width:2px;border-radius:15px;opacity:0;background-color:var(--commonColor);animation:split_chose .6s ease forwards;animation-delay:.8s}
  @keyframes split_chose{0%{opacity:0;height:.1rem}
  100%{opacity:1;height:.6rem}
  }
  .title_chose{margin:0 .3rem;animation:fade-inn .4s ease-in-out forwards;position:relative;display:flex;letter-spacing:2px;transition:all 1s}
  .answer2_Cat[hide=true] .title_chose,.answer2_Cat[hide=true] .title_icon{opacity:0!important;transition:all 1s}
  .title_icon{position:relative;margin:auto .5rem;opacity:0;transform:translateX(-10px);animation:icon .7s ease-in-out forwards;animation-delay:.5s}
  .title_icon.icon2{transform:translateX(10px);animation:icon .7s ease-in-out forwards;animation-delay:.5s}
  @keyframes icon{to{transform:none;opacity:1}
  }
  .title_icon i::after,.title_icon i::before{position:absolute;content:"";width:7px;height:2px;background-color:var(--commonColor);right:0;border-radius:15px}
  .title_icon.icon2 i::after,.title_icon.icon2 i::before{left:0}
  .title_icon i::before{transform:translateY(-3px) rotate(45deg)}
  .title_icon i::after{transform:translateY(1px) rotate(-45deg)}
  .title_icon.icon2 i::before{transform:translateY(-3px) rotate(-45deg)}
  .title_icon.icon2 i::after{transform:translateY(1px) rotate(45deg)}
  .read_Cat{color:var(--commonColor);position:relative;padding:8px 12px;border-radius:18px;line-height:1.5;margin-bottom:12px;overflow:hidden;border:1px var(--info_border) dashed;transition:all .4s;z-index:99;font-size:1rem}
  .read_Cat:hover{border:1px var(--info_border_active) solid}
  .read_Cat .ex2_Cat,.read_Cat .ex_Cat,.read_Cat .note_Cat,.read_Cat .title{text-indent:2rem;display:block}
  .read_Cat .icon,.read_Cat .key,.read_Cat .key2{color:var(--key)}
  .read_Cat .title{display:block;font-size:.9rem}
  .read_Cat p{margin:4px 0}
  .read_Cat .title a{font-weight:700;letter-spacing:3px;display:block;color:var(--title)}
  .options_Cat{position:relative}
  .options_bg{position:absolute;display:flex;width:100%;height:100%;flex-direction:column;z-index:0;transition:all .5s}
  .options_bg i{margin:0;padding:0;border:0;content:"";width:100%;height:100%;transition:all .35s cubic-bezier(1,.49,.16,.96);transform-origin:center right;transform:scaleX(0)}
  .options_bg[active=true] i{transform:scaleX(1)}
  .options_bg[active=true]{background:var(--bg)}
  i:nth-child(1){transition-delay:20ms}
  i:nth-child(2){transition-delay:40ms}
  i:nth-child(3){transition-delay:60ms}
  i:nth-child(4){transition-delay:80ms}
  i:nth-child(5){transition-delay:.1s}
  i:nth-child(6){transition-delay:.12s}
  i:nth-child(7){transition-delay:.14s}
  i:nth-child(8){transition-delay:.16s}
  i:nth-child(9){transition-delay:.18s}
  i:nth-child(10){transition-delay:.2s}
  i:nth-child(11){transition-delay:.22s}
  i:nth-child(12){transition-delay:.24s}
  i:nth-child(13){transition-delay:.26s}
  i:nth-child(14){transition-delay:.28s}
  i:nth-child(15){transition-delay:.3s}
  .options_bg i{background-color:var(--option_bg1)}
  .options_bg[active=true] i{background-color:var(--option_bg2)}
  .header_Cat{position:relative}
  #canvas_Cat{position:absolute;z-index:1;width:100%;left:50%;transform:translateX(-50%);top:0}`;
