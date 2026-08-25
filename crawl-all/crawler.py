#############################
###import區
import os
import json
import requests
from bs4 import BeautifulSoup
#############################
###路徑設定
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
if __name__ == "__main__":
    for site in sites:
        crawl_site(site)
    print("\n🎉 全部新聞爬取完成")
# 