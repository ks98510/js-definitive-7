/* module */
// Specify script type
// async and deferred
// js加载的时候，必须确认他不会输出任何html 在他能回复解析和render之前 所以dramatic slow down,唯一告可以修改浏览器的就是document.write
<scirpt defer></scirpt>
<scirpt async></scirpt>
// 这两个属性都是为了告诉浏览器这个script里是没有document.write，所以浏览器可以在下载脚本的时候继续解和render，
// defer 是知道文档parse和load之后再execution , async 是让浏览器尽可能快的执行，但是再下载是不会阻挡文档parse，async has precedence
// defer 会桉文档出现顺序run，async 是按load顺序
// type= module 的script 默认就会在document loaded之后加载，就像有一个defer】
// 简单替代两个的方法就是把script放到html最底部 

// Loading script on demand
// 可以使用import 或者使用创建script标签

/* # 15.1.2 Document Object model */
// DoM api 真实反正html 文档结构，每一个tag一个element 对象 每一个text 都有一个text object;

/* global Object */
// 每个浏览器窗口或者tab都有一个globalObject，除了运行在work thread 的代码，当前窗口下所有js共享这个global
// document and window
/* # 15.1.4 Script share a namespace */

/* # 15.1.5 execution of javascript programs */
// 来源于统一server的document 和embedded document 可以interact 
// js programs execution as occurring in two phases  , first 。load the document content,执行script里的代码，从上到下
// 如果第一阶段的document load 和 script脚本执行完了就要开始第二阶段，asynchronous and event-driven ，如果script想参与必须至少注册一个异步事件处理或callback,有可能是dom event Click ，也可能是网络活动，resource load ,
// event-driven 最先发生的就是document content load and "load" "DomContentLoaded" event 发生在html 文档完全loaded和parsed。load发生在所有文档额外资源加载完成，例如image
// document load 是非常快的理想情况不到1s，event-driven 会持续到 browser display the document , punctuate by burst of activity triggered by user or network.

// ! Client-side js thread model
// js 是单线程，永远不会有两个事件一起触发，也不会有锁，死锁，race condition
// 单线程意味着，当执行script或者event-handler的时候，浏览器会stop response to use input
// web platform define a concurrency form named "web worker" ; 不会冻结用户操作，专门处理intensive tasks 
// code on the web worker  不可以访问document content ，不能直接和main thread or other thread share state。only communicate with asynchronous message event
// 所以 web worker cant be detected to the main thread , and alter the single-thread model

// ! Client-side js timeline
// script-execution -> event-handler two phases can be further broken down into following
1.浏览器创建Document object 当parse html element and their text Node, 这个时候 document.readyState 是 loading
2.如果遇到了script标签并且不带有async、defer、type = "module"，就会直接execute, script 下载和执行的时候都会stop parse document，这样的脚本可以使用document.write插入到动粗们特种工
  当parser resume 的时候会作为温昂的一部分，经常会注册一些event handler 但是也可以traverse and manipulate Dom Tress as it exists at that time.Dom
3.如果遇到了defer async 等标签，web browser 开始download script，有可能 recursive 下载相关依赖，并且继续解析文档，script downloaded 之后会尽快执行，下载不会阻止parser 工作, must not
  use the document.write ，it can see the document before it coming
4. when the document is completely parsed, the document.readyState will change to be "interactive".
5. 所有的defer script 会按照他们出现的顺序执行，async script 也会在这时执行，defer 可以access the complete document, must not have document.write
6. "DomContentLoaded" fires，标志这从script - execution 到 event - handler ，这个时候 async script 可以能还没有开始执行
7. document completely parsed ， but has some additional content like Image, ，所有的content 加载完成, 所有的async 标签loaded and executed ，document.readyState change to be "complete"
  web browser fires a "load" event
8.之后，event Handler 开始 response to user input event or network event, or time expiration


loaded document => create document Object, parse the element and text node(document.readyState = "loading")
synchronous script => loaded, executed, stop the parse document, 有document.write 可以 modify the document content，等到结束后，parser resume ，会把这部分作为document 的一部分添加进去
defer script ，download, 不会stop parser, 也不允许有 document.write
document completely parsed => document.readyState 'interactive' 
all defer executed in the order that they appeared.async 也会在这里 executed
"DomContentLoaded" fires => means transition from "script-execution" to "event-handler"
although document parsed, there are some additional content like image, 等所有的content and script 执行完，document.readyState变成"complete"
"load" fires

/* 15.1.6 program input and output */
1.DOM API
2.click event, mouse event, so on
3.URL class
4. navigator

/* # 15.1.7 Program Errors */
// window.error 不能捕获资源加载错误
window.onerror = (message, code, line, colno, error) => {

  console.log(message, code, line)
  // 返回true 告诉浏览器我已经处理了
  return true
}
// 当一个promise reject 并且没有catch 可以通过 onUnHandleRejection or window.addEventListener('unhandleReject')
window.addEventListener('unhandledrejection', (ev) => {
  // ev 是一个promise 并且value的值就是传递的，reason也是
  // 调用preventDefault() 阻止默认行为，告诉browser已经handle 了,控制台也不会输出
  ev.preventDefault();
})
// 对于上报很有用

/* # 15.1.8 the web security model */
// what js can't do？
js 不允许client - side write and delete files and list dictionary
可以发起http 或者 webSocket 但是不允许直接无中介的访问network 互联网的客户端和服务端也不能由client - side 编写

// same origin policy 
主要控制的就是js code 和 web 的interact, 发生在 iframe 的情况较多，只有 same - origin 才能读取window 和 document 的内容
same - origin 意味着 host, port, protocol same prevent的是访问nested 文档 
同源策略 apply to http request js code 可以发起任何请求load document 但是不可以和其他的web server communicate 除非选择cors
为了解决 multiple domain 允许 script set document.domain 更改来源
relax the same - origin policy is Cross - Origin Resource Sharing 可以允许server 决定哪个origin 他们可以服务 让http request header 多了一个Origin;response header Access - control - allow - origin, 用wildCard 代表所有

// cross-site scripting
也叫xxs ，就是把script or html tag inject to the target website
  < script >
  let name = new URL(document.URL).searchParams.get("Name");
document.querySelector('h1').innerHTML = "Hello " + name;
</ >
  // name=%3Cimg%20src=%22x.png%22%20onload=%22alert(%27hacked%27)%22/%3E
  decoded 之后就变成了 Hello < img src = "x.png" onload = "alert('hacked')" />
    // 还有比如b中嵌入一个链接指向a ，窃取a的信息发送到b
    通常情况 预防xss 就是在使用不信任数据来动态生成document 的时候remove html tag  转义所有的符号
另一种就是构建web app 使用iframe 的 sandbox attribute，设置 disable scripting and other capabilities

/* # 15.2 Events */
event type;
event target;
event handler or listener
event object
event propagation // capture,bubble  

/* # 15.2.1 Event Categories */
device dependent input events; // mousedown,mouseover,touchstart,keydown,keyup
device - indepenent input events; // click,input...
// user interface events ; // focus,change,submit
state - change event; "load" "DomContentLoaded" "online" "offline"  history  "popstate"
api specify event; // video audio "playing" "waiting" web 平台 api is before promise inserted into event-driven  indexdb API fetch 

/* # 15.2.2 registering event handler */
// 一种直复制，另一种addeventListener 也可以直接定义在html上
<button onclick="console.log('hello')"></button>
addEventListener 不会和 直接设置相互影响，按照registered order 执行, third optional argument is a Boolean;如果是true 作为一个capture event handler invoking
并且remove的时候必须也添加，不过只是其中的一部分, 默认是true，不发生在捕获阶段
paired with removeEventListener,
document.addEventListener('click', handleClick, {
  capture: true,
  once: true,
  passive: true,
})
passive 如果是true 代表着永远不能使用 preventDefault 来阻止默认时间

/* # 15.2.3 Event handler invocation  */
event properties; type target currentTarget timeStamp isTrusted（如果是web browser发出的，就是true，js 的就是false） ClientX 
如果 return flase， 就会组织默认时间， 使用preventDefault 是阻止浏览器执行默认造作的标准和首选方法。
按照 register order 执行。

/* # 15.2.4  propagation */

除了 focus blur scroll 不会冒泡
target => document object => window object
load 事件是不会冒泡到window object 的
capture => target event handler => bubble 
addEventListener 的 capture 是true 的话就会在capture阶段触发。也就是先是 window =》document =》tree =》 dom target
事件capture 提供了delivered to their target 之前 seek 到他的target  还可以过滤事件，处理鼠标拖动，

/* # 15.2.5 event cancellation */
preventDefault() 阻止
stopPropagation()  在capture阶段调用 stopImmediatePropagation() 在target 和 bubble 阶段和stopPropagation 一样;
并且也会阻止任何子事件注册在同一个target上的
可以自己custom event  document.dispatchEvent(new CustomEvent("busy", { detail: false }))
// Dispatch a custom event so the UI knows we are busy
document.dispatchEvent(new CustomEvent("busy", { detail: true }));
// Perform a network operation
fetch(url)
  .then(handleNetworkResponse)
  .catch(handleNetworkError)
  .finally(() => {
    // After the network request has succeeded or failed, dispatch
    // another event to let the UI know that we are no longer busy.
    document.dispatchEvent(new CustomEvent("busy", { detail: false }));
  });
// Elsewhere, in your program you can register a handler for "busy" events
// and use it to show or hide the spinner to let the user know.
document.addEventListener("busy", (e) => {
  if (e.detail) {
    showSpinner();
  } else {
    hideSpinner();
  }
})
/* # 15.3 scripting documents */
/* 
  p[lang="fs"]
  *[name="x"]
  span.fatal.error
  span[lang="fs"].warning
  img+p.caption img后紧跟的p 
  h2 ~ p 
  button , input[type="button"]
*/
let spinner = document.querySelector('css选择去') querySelector返回第一个匹配到的怨妇 或者null
let title = document.querySelectorAll('h1,h2,h3')  返回所有  返回一个array-like
closest() 向上寻找
let hyperlink = event.target.closest("a[href]");
function insideList(e) {
  return e.closest("ul,ol,dl") !== null;
}
matches()
function isHeading(e) {
  return e.matches("h1,h2,h3")
}
document.getElementsByTagName 等 都返回一个NodeList 但是返回的是"live"的 就是说length 和内容会变化

Preselected elements
有一些预制的select
document.forms.address;
<form id="address"></form>
/* # 15.3.2 document structure and traversal */
// 这些是不关注text文档的
// 
parentNode children nextElementSbling previousElementSibling
// 关注text
Documents as trees of nodes;
parentNode childNode nextSibling nodeType

/* # 15.3.3 Attributes */
// element 也除了tagname 有a set of name/value pairs known as attribute; like <a/> has a href
getAttribute(), setAttribute(), hasAttribute(), removeAttribute()
let image = document.querySelector("#main_image");
let url = image.src;
image.id = "main_image";

let f = document.querySelector("form");
form.action = "https://www.example.com/sumbit";
f.method = "POST";
// class attribute
// class 是保留字符 className 是一个字符串不好删减 classList 应运而生 Array-like object 
let spinner = document.querySelector("#spinner");
// add , coontaines
spinner.classList.remove("hiddren");

// Dataset attribute
// 以data-开头
<h1 id="title" data-section-number="16.1">Attributes</h1>
// dataset.sectionNumber;

/* # 15.3.4 Element Content */