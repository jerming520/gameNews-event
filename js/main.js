/////////////////////////////////////////////
////////////////////外部檔案/////////////////////
dayjs.extend(window.dayjs_plugin_localeData);
/////////////////////////////////////////////
////////////////////工具/////////////////////
const brief = (txt, n = 80) =>
  (txt || "").replace(/\s+/g, " ").slice(0, n) +
  (txt && txt.length > n ? "…" : "");
/////////////////////////////////////////////
//////////////////渲染新聞///////////////////
function renderNews(jsonPath, containerId, sourceName) {
  fetch(jsonPath) 
    .then((r) => r.json()) 
    .then((data) => {
      const wrap = document.getElementById(containerId); 
      if (!wrap) return; 
      // console.log("data=", data);
      data.slice(0, 10).forEach((n, i) => {
        const col = document.createElement("div"); 
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3 col-xl-5col"; 
        col.innerHTML = `
          <a class="text-decoration-none text-light open-reader"
             href="${n.link}"
             data-title="${(n.title || "").replace(/"/g, "&quot;")}"
             data-image="${n.image || ""}"
             data-desc="${brief(n.title, 120).replace(/"/g, "&quot;")}"
             data-date="${dayjs().format('YYYY-MM-DD HH:mm:ss')}"
             data-source="${sourceName}">
            <div class="card h-100">
              <img class="card-img-top" src="${n.image || ""}" alt="">
              <div class="card-body">
                <div class="card-title small">
                  ${n.title || ""}
                </div>
              </div>
            </div>
          </a>
        `;
        wrap.appendChild(col);
      });
    });
}
/////////////////////////////////////////////
/////////////////資料來源設定/////////////////
const newsSources = [
  {
    json: "./ettoday/ettoday_data.json",
    container: "etTodayList",
    source: "ETtoday",
  },
  {
    json: "./setn/setn_data.json",
    container: "setnList",
    source: "SETN",
  },
  {
    json: "./gameapps/gameapps_data.json",
    container: "gameAppsList",
    source: "GameApps",
  },
];
/////////////////////////////////////////////
//////////////初值設定載入新聞/////////////
newsSources.forEach((src) => {
  renderNews(src.json, src.container, src.source);
});
/////////////////////////////////////////////
////////////////點擊→打開Modal///////////////
// console.log("open-reader=",document.querySelectorAll(".open-reader"));
document.addEventListener("click", function (e) {
  const a = e.target.closest(".open-reader"); 
  if (!a) return; 
  // console.log("點到卡片了a=", a);
  e.preventDefault(); 
  const title = a.dataset.title || "—";
  const date = a.dataset.date || "—";
  const image = a.dataset.image || "";
  const desc = a.dataset.desc || "（此來源未提供摘要）";
  const link = a.getAttribute("href") || "#";
  const source = a.dataset.source || new URL(link).hostname;
  // console.log("a.dataset.source=", a.dataset.source);
  // console.log("hostname=", new URL(link).hostname);
  /////////////////////////////////////////////
  ////////////////////填資料///////////////////
  document.getElementById("readerTitle").textContent = title;
  document.getElementById("readerDate").textContent = date;
  const imgEl = document.getElementById("readerImage");
  if (image) {
    imgEl.src = image;
    imgEl.style.display = "block";
  } else {
    imgEl.removeAttribute("src");
    imgEl.style.display = "none";
  }
  /////////////////////////////////////////////
  ///////////////////抓 DOM////////////////////
  const sumEl = document.getElementById("readerSummary");
  const btnEl = document.getElementById("readerFullBtn");
  const sourceEl = document.getElementById("readerSource");
  /////////////////////////////////////////////
  ////摘要(XSS(防跨站腳本攻擊)→包<p>→render)/////
  sumEl.innerHTML =
    "<p>" + desc.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</p>";
  ///////////////////////////////////////////// 
  ////////////////////其他/////////////////////
  btnEl.href = link;
  //console.log("btnEl.href=", btnEl.href);
  //
  sourceEl.innerHTML = `
  來源：<a href="${link}" target="_blank" rel="noopener">
    ${source || "原文"}
  </a>（僅作作品展示）
  `;
  //console.log("<p>" + desc.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</p>",);
  /////////////////////////////////////////////
  ////////////////建立Modal物件/////////////////
  const modal = new bootstrap.Modal(document.getElementById("readerModal"));
  modal.show();
});
//
//
/////////////////////////////////////////////
// my note
/////////////////////////////////////////////
//工具---------------------------------------
//文字處理(文字限長度+文字多空白成一個空白+文字超出成呈現)
// 
// 
//渲染新聞-----------------------------------
//renderNews函數(各參數的用途)
//發送HTTP請求抓JSON
//把回應轉成JS物件 
//拿到資料(通常是陣列)
//查詢已存在的DOM節點 
//防呆：如果DOM不存在→直接結束 
//遍歷每一筆並建立div的DOM節點,col指向他 
//Bootstrap控制一排幾個卡片
//用字串直接產生HTML(模板)
// 
//資料來源設定-------------------------------
//資料來源相關設定
// 
// 
//初值設定載入新聞------------------------
//載入所有新聞
//  
//  
//點擊→打開Modal-----------------------------
//抓全部→篩選要的=事件委派 
//找到被點擊的"卡片本體"若選到img就→往上找最近的 
//防呆(不是卡片就離開) 
//阻止跳入新聞網站,若不跳掉新聞網站，就無法開Modal 
//將dom資料存到variable,source有提供來源就用(ETtoday)，無提供就從網址解析出來 
//填資料------------------------------------- 
//塞標題&日期 
//處理圖片 
// 
//抓DOM--------------------------------------
//抓DOM並用某個variable指向他 
// 
// 
//摘要(XSS(防跨站腳本攻擊)→包<p>→render)-------
//如果:desc是<script>alert('被攻擊')</script>,瀏覽器會真的執行script,也等於XSS(跨站腳本攻擊),所以要防XSS  
// 
//  
//其他---------------------------------------  
//處理link,按鈕link原網站  
//來源:字串模板,用JS動態生成一段HTML(含連結)，並插入DOM顯示  
//  
//建立Modal物件------------------------------
//建立Modal物件→呼叫show()→Bootstrap幫助將Modal彈窗打開 
/////////////////////////////////////////////
// my note flow
/////////////////////////////////////////////
////////////////////工具/////////////////////
//txt是null/undefined/空,就改成空字串 ""
//文字處理(文字限長度+文字多空白成一個空白+文字超出成呈現)...=(如下:)
//brief = (txt, n = 80) =>(txt || "").replace(/\s+/g, " ").slice(0, n) +(txt && txt.length > n ? "…" : "");
/////////////////////////////////////////////
//////////////////渲染新聞///////////////////
//function renderNews函數(各參數的用途){}
//jsonPath=("...ettoday_data.json")
//containerId=(<div id="ettodayList">)
//sourceName=(render在html的sourceName="ETtoday")
//
//發送HTTP請求抓JSON==(如下:)
//fetch(jsonPath).then().then()
//
//把回應轉成JS物件=（JSON → JS)=(如下:)
//.then((r) => r.json())  
//
//拿到資料(通常是陣列)=(如下:) 
//.then((data) => {}
// 
//查詢已存在的DOM節點,div id="ettodayList",wrap指向他=(如下:)
//wrap=document.getElementById(containerId);
//
//防呆：如果DOM不存在→直接結束=(if (!wrap) return;)
//
//遍歷每一筆並建立div的DOM節點,col指向他=(如下:)
//data.slice(0, 10).forEach((n) => {col = document.createElement("div");
//
//Bootstrap控制一排幾個卡片=(如下:)
//col.className = "col-12 col-sm-6 col-md-4 col-lg-3 col-xl-5col";
//
//用字串直接產生HTML(模板),如:data-title存資料在 DOM上=(如下:)
// col.innerHTML = `
// href="${n.link}"
// data-title="${(n.title || "")...""
// ...`;
//
//JS加入節點到 DOM → 瀏覽器自動 render=(如下:)
// wrap.appendChild(col);
/////////////////////////////////////////////
/////////////////資料來源設定/////////////////
//資料來源相關設定:json檔名位置,div id名稱,render在html的source名稱=(如下:)
//newsSources = [ {json:..,container:..,source:..} ]
/////////////////////////////////////////////
//////////////初值設定載入新聞/////////////
//載入所有新聞=(如下:)
//newsSources.forEach(  (src) => {renderNews(src.json, src.container, src.source);} );
/////////////////////////////////////////////
////////////////點擊→打開Modal///////////////
//抓全部→篩選要的=事件委派=(如下:)
// document.addEventListener("click", function (e) {}
//
//找到被點擊的"卡片本體"若選到img就→往上找最近的<a class="open-reader">=(如下:)
//const a = e.target.closest(".open-reader");
//
//防呆(不是卡片就離開)=(如下:)
//if (!a) return;
//
//阻止跳入新聞網站,若不跳掉新聞網站，就無法開Modal=，e.preventDefault();
//
//將dom資料存到variable,source有提供來源就用(ETtoday)，無提供就從網址解析出來,將(https://game.ettoday.net/...→解析成game.ettoday.net)=(如下:)
//const source = a.dataset.source || new URL(link).hostname;
/////////////////////////////////////////////
////////////////////填資料///////////////////
//塞標題&日期=(如下:)
//document.getElementById("readerTitle").textContent = title;
//document.getElementById("readerDate").textContent = date;
//
//外部檔案=(如下:)
//dayjs.extend(window.dayjs_plugin_localeData);
// 
//添加dayjs()=(如下:)
//data-date="${dayjs().format('YYYY-MM-DD')}"
//
//處理圖片=(如下:)
//要刪掉與不呈現兩著皆要做處理=(如下:)
//(imgEl.removeAttribute("src");imgEl.style.display = "none";)
//const imgEl = document.getElementById("readerImage");
// if (image) {
//   imgEl.src = image;
//   imgEl.style.display = "block";
// } else {
//   imgEl.removeAttribute("src");
//   imgEl.style.display = "none";
// }
/////////////////////////////////////////////
///////////////////抓DOM/////////////////////
//抓DOM並用某個variable指向他
//const sumEl = document.getElementById("readerSummary");
//const btnEl = document.getElementById("readerFullBtn");
//const sourceEl = document.getElementById("readerSource");
//
/////////////////////////////////////////////
////摘要(XSS(防跨站腳本攻擊)→包<p>→render)/////
//原資料=(如下:)
//desc="<script>alert('XSS')</script>這是一段文字"
// 
//將左右<>改成&lt與$gt=(如下:)
//"&lt;script&gt;alert('XSS')&lt;/script&gt;"
//
//如果:desc是<script>alert('被攻擊')</script>,瀏覽器會真的執行script,也等於XSS(跨站腳本攻擊),所以要防XSS只當文字顯示=(如下:)
//sumEl.innerHTML = "<p>" + desc.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</p>";
// 
//有語意(段落),可以套CSS(例如行距)=<p>內容</p> 
// 
//把字串變成DOM,顯示在Modal裡=sumEl.innerHTML= ...
/////////////////////////////////////////////
////////////////////其他/////////////////////
//處理link,按鈕link原網站=(如下:)
//btnEl.href = link;
//
//來源:字串模板,用JS動態生成一段HTML(含連結)，並插入DOM顯示=(如下:)
//sourceEl.innerHTML = `來源：<a href="${link}" target="_blank" rel="noopener">${source || "原文"}</a>（僅作作品展示）`;
/////////////////////////////////////////////
////////////////建立Modal物件/////////////////
//建立Modal物件→呼叫show()→Bootstrap幫助將Modal彈窗打開=(如下:)
//const modal = new bootstrap.Modal(document.getElementById("readerModal")); modal.show();
//
//
//
//
//
//
//
//
//
//