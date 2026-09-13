# gameNews event的正確步驟
---
## 第一步[從畫面或想像猜狀態](State),(最重要！先做)

### 不看 code，也要硬猜
問自己：
Q:這個專案裡有哪些狀態？
A:推論

- 從json或其他api載入每筆news
空→載入→有資料(每個網站10筆)

- 當click時選取某篇新聞該篇news將出現
null→選取某篇新聞

- 當click時選取"X"或關閉按鈕該篇news將影藏
選取某篇新聞→null

- 應該存在一個代表 Modal 開關的狀態
false →true →false

- (event版可能由dom或bootstrap管理,state版或react版應該有state管理)

### 推斷state意義
allNews=空→載入→有資料
selectNews=null→選取某篇新聞→null
isModalOpen=false →true →false

### 結論
- 這一步為「核心能力」,從專案邏輯 → 推狀態
- 先用直覺猜狀態線，再用資料線與時間線去驗證狀態
- 用需求找 State（不是找 state 變數）
- 有些專案不一定有state 去集中管理的，但需求上仍然存在各種狀態(State)
- PPP 第一步的目的，就是先從需求推論可能有哪些狀態

---
## 第二步:[找state,找初值設定,找事件來源,找資料來源,找render]?

### allNews 載入

- 找state ?
無集中式 State 管理

- 找初值設定?
> 設定三個新聞來源（JSON 路徑、Container、Source）
初值設定{
	const newsSources = [...
		json: "./ettoday/ettoday_data.json",
		json: "./setn/setn_data.json",
		json: "./gameapps/gameapps_data.json",
	]
}

> 初值設定執行步驟
newsSources.forEach((src) => {
  renderNews(src.json, src.container, src.source);
});

- 找資料來源?
function renderNews(...) {
  fetch(jsonPath) 
}

- 找事件來源?
無

- 找render?
無render()，直接更新 DOM

### selectNews開啟

- 找state? 
無集中式 State 管理

- 找初值設定?
無

- 與找資料來源?
dataset

- 找事件來源?
無明確定義state,但用事件click觸發Modal開啟
document.addEventListener("click"...){
...
	const modal = new bootstrap.Modal(document.getElementById("readerModal"));
	modal.show();
}

- 找render?
無render()，直接更新 DOM，modal.show()

### selectNews 關閉

- 找state? 
無集中式 State 管理

- 找初值設定?
無

- 找資料來源?
無

- 找事件來源?
無明確定義state,但用bootstrap寫在html觸發Modal關閉
```
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="關閉"
            ></button>

              <button
                type="button"
                class="btn btn-outline-light reader-btn"
                data-bs-dismiss="modal"
              >
                關閉
              </button>
```
- 找render?
無render()，Bootstrap 操作更新 DOM,Modal hide

### 結論
要能夠說出這是一個「遊戲網頁的news」，起初自動抓取json的每筆資料並顯示在畫面上,選取時可以出現個別news,按下關閉就關掉個別news。

---
## 第三步 [找入口→找主幹線(必須要找)→找次幹線(可以不找)]

### 找「入口」(超重要)

newsSources.forEach((src) => {
  renderNews(src.json, src.container, src.source);
});

### 找主幹線(必須要找)

- 載入allNews

newsSources.forEach()
↓
renderNews()
↓
fetch(jsonPath)
↓
r.json()
↓
data
↓
forEach(...)
↓
document.createElement("div")
↓
col
↓
col.innerHTML 
↓
appendChild(col)

### 找次幹線(可以不找)

- 開啟modal

document.addEventListener("click")
↓
e.target.closest(".open-reader")
↓
a 
↓
e.preventDefault()
↓
取得dataset
↓
填入readerTitle
↓
填入readerImage
↓
填入btnEl.href
↓
new bootstrap.Modal(document.getElementById("readerModal"))
↓
modal 
↓
modal.show()

- 關閉modal
```
<button
         type="button"
         ...
         data-bs-dismiss="modal"
        >
關閉
</button>


click
↓
bootstrap
↓
data-bs-dismiss="modal"
↓
關閉
```

### note
分析步驟-第三步:分析data與function穿插,第四步:分析data,第五步:分析function

---
## 第四步[對state分析]

### renderNews（全部資料載入）

- 狀態線:

無集中式 State 管理

空
↓
載入全部news

- 資料線:

--入口renderNews--
jsonPath
↓
r
↓
data
↓
n
↓
wrap
↓
col
↓
DOM

- 時間線:

renderNews()
↓
fetch()
↓
r.json()
↓
forEach()
↓
createElement()
↓
appendChild()

### modal show 選取時可以出現個別news

- 狀態線:

無集中式 State 管理

空
↓
目前選中news的畫面

- 資料線:

入口 --handleClick()--
dataset
├── title ──► readerTitle
├── date ───► readerDate
├── image ──► imgEl
├── desc ───► sumEl
├── link ───► btnEl
└── source ─► sourceEl

↓
modal
↓
DOM

- 時間線:

document.addEventListener("click")
↓
handleClick()
↓
e.target.closest(".open-reader")
↓
e.preventDefault(); 
↓
new bootstrap.Modal(document.getElementById("readerModal"));
↓
modal.show();

### modal hide按下關閉就關掉個別news

- 狀態線:

按下關掉或X
已選中的 news
↓
空

- 資料線:

無資料線

- 時間線:

click
↓
Bootstrap 偵測 data-bs-dismiss="modal"
↓
Modal hide
↓
更新 DOM

---
## 第五步:[對function分析]

### function renderNews()

- 狀態線:

無集中式 State 管理

空畫面
↓
載入全部news並呈現畫面

- 資料線:

jsonPath
↓
r
↓
data
↓
n
↓
col
↓
col.innerHTML
↓
更新DOM

- 時間線:

renderNews()
↓
fetch()
↓
r.json()
↓
.then(data)
↓
document.getElementById()
↓
forEach()
↓
document.createElement("div")
↓
wrap.appendChild()

### function handleClick()

- 狀態線:
無集中式 State 管理

Modal

Close
↓
Open

- 資料線:

a
↓
dataset填寫
├── title ──► readerTitle
├── date  ──► readerDate
├── image ──► imgEl
├── desc  ──► sumEl
├── link  ──► btnEl
└── source──► sourceEl
↓
更新DOM

- 時間線:

document.addEventListener("click")
↓
handleClick()
↓
e.target.closest(".open-reader")
↓
e.preventDefault(); 
↓
new bootstrap.Modal(document.getElementById("readerModal"));
↓
modal.show();
<!--

-->