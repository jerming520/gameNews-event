#############################
###import區
#############################
import os
import json
import requests
from bs4 import BeautifulSoup
#############################
###路徑設定
#############################
#
BASE_DIR = os.path.dirname(os.path.abspath(__file__)) 
# 
PROJECT_DIR = os.path.abspath(os.path.join(BASE_DIR, ".."))
#
print("Crawler directory:", BASE_DIR)
print("Project directory:", PROJECT_DIR)
# 
headers = {"User-Agent": "Mozilla/5.0"}
#############################
###核心函式
#############################
def crawl_site(config):
    # 
    print(f"🚀 開始爬取 {config['name']}")
    # 
    res = requests.get(config["url"], headers=headers, timeout=20)
    res.encoding = "utf-8"
    # 
    soup = BeautifulSoup(res.text, "html.parser")
    # 
    news_container = soup.find(
        config["container_tag"], class_=config["container_class"]
    )
    # 
    items = (
        news_container.find_all(config["item_tag"], class_=config["item_class"])[:10]
        if news_container
        else []
    )
    # 
    news_list = []
    # 
    for item in items:
        # 
        a_tag = item.find("a")
        href = a_tag.get("href") if a_tag else None
        #
        if config["link_prefix"]:
            link = config["link_prefix"] + href if href else "❌ 無連結"
            # print("==== DEBUG TRUE====")
            # print(config["name"])
            # print("prefix:", config["link_prefix"])
        else:
            link = href if href else "❌ 無連結"
            # print("==== DEBUG FALSE====")
            # print(config["name"])
            # print("prefix:", config["link_prefix"])
        # 
        img_tag = item.find("img")
        img_url = (
            (img_tag.get("data-original") or img_tag.get("src"))
            if img_tag
            else "❌ 無圖片"
        )
        # 
        title_tag = item.find(config["title_tag"], class_=config.get("title_class"))
        title = title_tag.get_text(strip=True) if title_tag else "❌ 無標題"
        # 
        news_list.append(
            {
                "title": title,
                "link": link,
                "image": img_url,
            }
        )
    # 
    output_dir = os.path.join(os.path.dirname(__file__), "..", config["folder"])
    #
    os.makedirs(output_dir, exist_ok=True)
    #
    output_path = os.path.join(output_dir, config["output"])
    # 
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(news_list, f, ensure_ascii=False, indent=2)
    # 
    print(f"✅ 完成 {config['name']}")
#############################
###各網站設定
#############################
sites = [
    #
    {
        # 
        "name": "ETtoday",
        "url": "https://game.ettoday.net/focus-2.php?topicId=333",
        # 
        "container_tag": "div",
        "container_class": "block_1",
        # 
        "item_tag": "div",
        "item_class": "box clearfix",
        # 
        "title_tag": "h3",
        "title_class": None,
        # 
        "link_prefix": "",
        # 
        "folder": "ettoday",
        "output": "ettoday_data.json",
    },
    #
    {
        "name": "GameApps",
        "url": "https://www.gameapps.hk/news",
        "container_tag": "div",
        "container_class": "col-xs-8",
        "item_tag": "div",
        "item_class": "media news-big-icon",
        "title_tag": "h3",
        "title_class": "media-heading",
        "link_prefix": "https://www.gameapps.hk",
        "folder": "gameapps",
        "output": "gameapps_data.json",
    },
    #
    {
        "name": "SETN",
        "url": "https://esport.setn.com/viewall",
        "container_tag": "div",
        "container_class": "conArea",
        "item_tag": "div",
        "item_class": "conBox newsItems",
        "title_tag": "h3",
        "title_class": None,
        "link_prefix": "https://esport.setn.com",
        "folder": "setn",
        "output": "setn_data.json",
    },
]
#############################
###主程式 
#############################
if __name__ == "__main__":
    for site in sites:
        crawl_site(site)
    print("\n🎉 全部新聞爬取完成")
#############################
### my note
#############################
#===============================
###import區
#os,json,requests,BeautifulSoup。
#===============================
###路徑設定
#crawler目錄,專案根目錄,偽裝成真人用戶。
#===============================
###核心函式(摘要) 
#顯示目前爬哪個網站
#發request,設定編碼
#HTML→DOM,soup類似JS的dom物件
#找外層container,一整塊HTML DOM"新聞列表區
#{items=,A if 條件 else B}={找每一筆成功執行取前10筆,失敗則執行[]}
#建立資料容器
#link處理:有a_tag→取href,沒有→None,避免報錯
#link處理:相對路徑:href = /news/123 , 要補https://www.gameapps.hk + /news/123
#link處理:絕對路徑,完整網址:href =https://game.ettoday.net/focus-2.php?topicId=333 , 不用補
#image處理:先拿data-original,沒有才拿src
#title處理:如果if 有設定 class:就找 tag + class ,否則 else:只找 tag
#title處理:如果有找到標題元素 → 取出文字並去除多餘空白,如果沒找到 → 給預設值 "❌ 無標題"
#存資料
#建立3個檔案夾folder放json檔案:ettoday,gameapps,setn
#輸出 JSON:意思為建立輸出資料夾路徑=TEST-WEBSITE/ettoday/
#輸出 JSON:如果資料夾不存在→建立 , 如果已存在→不報錯
#輸出 JSON:組完整檔案路徑:ettoday_data.json
#輸出 JSON:寫入 JSON
#寫入 JSON:完成
#===============================
###各網站設定
#ETtoday,GameApps,SETN。
#===============================
###主程式
#遍歷sites，並呼叫crawl_site(site)。
#===============================
#############################
### my note flow
#############################
#建立folder資料夾:setn,gameapps,ettoday
#############################
###import區
#(工具準備)
#import os
#import json
#import requests
#from bs4 import BeautifulSoup
#############################
###路徑設定
#避免路徑錯誤
#{crawler目錄}=/crawl_all=(如下:)
#BASE_DIR = os.path.dirname(os.path.abspath(__file__))。
#
#{專案根目錄}=/mygame-website-formal(可能不同gameNews)=(如下:)
#PROJECT_DIR = os.path.abspath(os.path.join(BASE_DIR, ".."))。
#
#headers{偽裝成真人用戶避免被網站擋}=(如下:)
#headers = {"User-Agent": "Mozilla/5.0"}。
#############################
###各網站設定
#############################
# sites = [
#     {
#         # 網站名稱 + 網址
#         "name": "ETtoday",
#         "url": "https://game.ettoday.net/focus-2.php?topicId=333",
#         # 外層區塊
#         "container_tag": "div",
#         "container_class": "block_1",
#         # 每一筆新聞
#         "item_tag": "div",
#         "item_class": "box clearfix",
#         # 標題位置
#         "title_tag": "h3",
#         "title_class": None,
#         # 補網址
#         "link_prefix": "",
#         # 輸出位置
#         "folder": "ettoday",
#         "output": "ettoday_data.json",
#     },
# ]
#############################
###主程式
#############################
#當執行crawler.py時，__name__等於"__main__"， 
#因此進入if判斷，然後{遍歷sites，並呼叫crawl_site(site)}。
# if __name__ == "__main__":
#     for site in sites:
#         crawl_site(site)
#############################
###核心函式
#############################
#{爬蟲核心函式}=(def crawl_site(config):)。
# 
#{顯示目前爬哪個網站}=(print(開始爬取{config['name']}"))。
# 
#{發request,設定編碼}=(如下:)
#res = requests.get(config["url"], headers=headers, timeout=20)
#res.encoding = "utf-8"。
#
#{HTML→DOM,soup類似JS的dom物件},document.querySelector()=(如下:)
#soup = BeautifulSoup(res.text, "html.parser")。
# 
#{找外層container,一整塊HTML DOM"新聞列表區"}=(news_container)(如下:)
#只找"第一個符合條件的元素"=(soup.find(...))
#標籤名稱"例如:div"(=config["container_tag"])
#class名稱=(class_=config["container_class"])
#news_container = soup.find(config["container_tag"], class_=config["container_class"])。 
# 
#{items=,A if 條件 else B}={找每一筆成功執行取前10筆,失敗則執行[]}=(如下:)
#找container(整個新聞區)=if news_container
#成功執行取前10筆=((news_container.find_all(config["item_tag"], class_=config["item_class"])[:10])
#失敗則執行=(else [])
#items = (news_container.find_all(config["item_tag"], class_=config["item_class"])[:10]
#if news_container
#else []
#)。
# 
#{建立資料容器}=(news_list = [])。 
# 
#{逐筆解析}=(for item in items:)。
#
#{link處理} 
#{有a_tag→取href,沒有→None,避免報錯}=(如下:)
#(href = a_tag.get("href") if a_tag else None)。
#  
#{相對路徑:href = /news/123 , 要補https://www.gameapps.hk + /news/123}
#{絕對路徑,完整網址:href =https://game.ettoday.net/focus-2.php?topicId=333 , 不用補} 
#目前網站: GameApps,link_prefix: https://www.gameapps.hk=(如下:)
#if config["link_prefix"]:
#   link = config["link_prefix"] + href if href else "❌ 無連結" 
#目前網站: ETtoday,link_prefix:空=(如下:)
#else:
#   link = href if href else "❌ 無連結"。 
# 
#{image處理} 
#{先拿data-original,沒有才拿src}=(如下:)
#img_tag.get("data-original") or img_tag.get("src")。 
# 
#{title處理} 
#{如果if 有設定 class:就找 tag + class ,否則 else:只找 tag}=(如下:)
#title_tag = item.find(config["title_tag"], class_=config.get("title_class"))。 
#
#{如果有找到標題元素 → 取出文字並去除多餘空白,如果沒找到 → 給預設值 "❌ 無標題"}=(如下:) 
#title = title_tag.get_text(strip=True) if title_tag else "❌ 無標題。 
# 
#{存資料}
#news_list.append(
#   {
#       "title": title,
#       "link": link,
#       "image": img_url,
#   }
#)。
#
#{建立3個檔案夾folder放json檔案:ettoday,gameapps,setn}  
#
#{輸出 JSON} 
#__file__等於crawl-all/crawler.py
#os.path.dirname(__file__)取資料夾：crawl-all/ 
#上一層等於"..",所以crawl-all/ → 回上一層 → TEST-WEBSITE/ 
#config["folder"]等於"folder": "ettoday"
#os.path.join("crawl-all", "..", "ettoday")
#在專案根目錄（TEST-WEBSITE）下,建立一個資料夾（例如 ettoday） 
#{意思為建立輸出資料夾路徑=TEST-WEBSITE/ettoday/}(如下:)
#output_dir = os.path.join(os.path.dirname(__file__), "..", config["folder"])。  
# 
#{如果資料夾不存在→建立 , 如果已存在→不報錯}=(如下:)
#os.makedirs(output_dir, exist_ok=True)。 
# 
#{組完整檔案路徑:ettoday_data.json}=(如下:)
#output_path = os.path.join(output_dir, config["output"])。 
# 
#{寫入 JSON},ensure_ascii=False,中文正常 =(如下:)
#with open(output_path, "w", encoding="utf-8") as f:
#   json.dump(news_list, f, ensure_ascii=False, indent=2)。  
#
#{完成}
#   print(f"✅ 完成 {config['name']}")。  
# 
# 