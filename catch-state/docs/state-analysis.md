# Catch State - Project Probe Process (PPP)
-------------------------------------------------------------------------
## 第一步[從畫面或想像猜狀態](State),(最重要！先做)
------------------------------------
### 不看 code，也要硬猜:
問自己：Q:這個遊戲裡「一個物件」有哪些狀態？
A:
推論
down → up → down
down → up → catch → down
推斷意義：
down：不出現
up：出現
catch：被抓到
這一步為「核心能力」,練從遊戲邏輯 → 推狀態


結論:
先用直覺猜狀態線，再用資料線與時間線去驗證狀態


### 用需求找state:
duck的state。cell[i]=down,up,catch
15 秒內。state.sec
3×3。不用state
Duck 隨機出現。不用state
點到得分。state.score
時間到結束。state,sec = 0→isPlaying = false

-------------------------------------------------------------------------
## 第二步:[初值設定state跟事件來源]?
------------------------------------
- 有沒有 state（通常在最上面）: 
有在 如下
state.cells= ['down', 'down', 'down', 'down', 'down', 'down', 'down', 'down', 'down']
- 有沒有 render():
有在 render()
- 有沒有 setTimeout(): 
有在 
startGame(),spawnDuck(),toUpEvent(),getCount()
- 有沒有 setInterval:
有在
startGame()
- 有沒有事件（click / addEventListener）:
有在
startGame(),getCount()


結論:
要能夠說出這是一個「抓鴨子遊戲」，用 state 控制畫面，時間控制出現

-------------------------------------------------------------------------
## 第三步:找入口→主幹線→次幹線
---------------------------------
- 找「入口」(超重要):

startBtn.addEventListener("click", startGame);


- 只看一條主幹線:

startGame
↓
setTimeout
↓
toUpEvent  → state = "up" → setTimeout → state = "down"


- 可以先不看,有空再看次幹線:

如果玩家點擊
↓
state = "up" → "catch" → "down"


結論:
使用者按下按鈕 → startGame() → 遊戲開始
先看「一定會發生的」主幹線,再看「可能發生的」次幹線
找入口的地方→addEventListener,onclick,fetch,setTimeout,setInterval,WebSocket,API

-------------------------------------------------------------------------
## 第四步:[對state三條線分析]
---------------------------------
### 出現鴨子"up":

- 時間線：
setTimeout(showTime)
↓
時間到
↓
callback()
"down"→"up"。誰改的?toUpEvent(){...,showTime}改的,誰安排?setTimeout安排

- 資料線：
callback()
↓
state.cells[i] = "up"
↓
render()

- 狀態線：
"down"→"up"

---------------------------------
### 鴨子被抓"catch":

- 事件線(時間線):/addEventListener()
↓
按鈕觸發
↓
callback()
"up"→"catch"。誰改的?getCount()改的,誰安排?addEventListener安排

- 資料線：
callback()
↓
state.cells[i] = "catch"
state.score++
↓
render()

- 狀態線：
"up"→"catch" 

---------------------------------
### 鴨子消失"down":

- 時間線：
setTimeout()
↓
時間到
↓
callback()
"up"→"down"。誰改的?toUpEvent(){...,delay * 1000}改的,誰安排?setTimeout安排
"catch"→"down"。誰改的?getCount(){...,1000}改的,誰安排?setTimeout安排

- 資料線：
callback
↓
state.cells[i] = "down"
↓
render()

- 狀態線：
"up"→"down"
"catch"→"down"

### note:

- State = 某個時間點，系統目前持有的資料或狀態。就算出現一次也算state

- 觀察→拆解→建模→預測→模擬

- state 更改=
{
Q:什麼時候改成(誰安排:setTimeout,誰改的:toUpEvent) for up？
什麼時候改成(誰安排:setTimeout,誰改的:toUpEvent) for down？
什麼時候改成(誰安排:addEventListener,誰改的:getCount) for catch？
A:toUpEvent → up，setTimeout → down，addEventListener→catch，setTimeout → down
}

-------------------------------------------------------------------------
## 第五步 [對function三條線分析]
---------------------------------
### function startGame()

- 資料線：
createInitialState()
↓
state.sec = 15
state.score = 0
state.cells 重設
↓
state.isPlaying = true

- 時間線:
按開始click
↓
startGame
│
├─setInterval
│   ↓
│  每秒倒數
│
├─setTimeout callback
│   ↓
│  spawnDuck
│
├─state.timers.push(t);

- 狀態線：
isPlaying

false
 ↓
true
 ↓
false

---------------------------------
### function spawnDuck()

- 資料線：
state.cells
↓
freeSpaces
↓
Math.random()
↓
spaceIndex
↓
freeSpaces[spaceIndex]

- 時間線：
setTimeout callback
↓
spawnDuck()執行

- 狀態線：
na

---------------------------------
### function toUpEvent()

- 資料線：
spaceIndex
↓
state.cells[spaceIndex]
↓
"up"
↓
render()
↓
setTimeout
↓
"down"
↓
render()

- 時間線：
spawnDuck()
↓
toUpEvent()
↓
up
↓
render()
↓
setTimeout callback
↓
down
↓
render()

- 狀態線：
down
↓
up
↓
down

### note:
- //
state.cells[i]="up"
render()
{
Q:state 怎麼被轉成畫面？
A:state.cells[i]裡的每一格,去找相對應(翻譯)的node.src圖片
}
- //
setTimeout(排程)/setInterval
{
Q:有沒有排成功？有無被執行？
A:在setTimeout函數內跟函數外console除錯
}
- //
誰呼叫function,function呼叫誰?
這function負責什麼功能？
改了哪些 state？
- //
DOM 只是畫面，真正的資料都存在 state

- //
















-------------------------------------------------------------------------