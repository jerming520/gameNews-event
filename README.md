# gameNews Event
---
A game news website with HTML, CSS, Vanilla JavaScript, and Python using an Event-driven architecture.

News data is crawled from multiple game news websites with Python, stored as JSON files, and rendered dynamically on the frontend.

---
##Demo

Coming Soon

---
## Features

Crawl news data from ETtoday, GameApps, and SETN

Store crawled news data in JSON files

Automatically update news data with GitHub Actions

Load JSON data with the Fetch API

Dynamically render news cards

Open selected news in a Bootstrap Modal

Mouse click interaction

Event delegation for dynamically generated news cards

Responsive layout

Link to the Catch game

---
## Tech Stack

HTML5

CSS3

JavaScript (ES6)

Python

Bootstrap

Fetch API

JSON

Requests

Beautiful Soup

GitHub Actions

---
## Project Structure

gameNews-Event
│
├── .github
│   └── workflows
│       └── update_news.yml
│
├── catch
│
├── crawl-all
│   └── crawler.py
│
├── ettoday
│   └── ettoday_data.json
│
├── gameapps
│   └── gameapps_data.json
│
├── js
│   └── main.js
│
├── media
│
├── plugins
│
├── setn
│   └── setn_data.json
│
├── docs
│   └── event-analysis.md
│
├── index.html
└── README.md

---
## News Flow

News Websites

↓

Python Crawler

↓

Store News Data in JSON

↓

Fetch JSON Data

↓

Load News Data

↓

Render News Cards

↓

Click News

↓

Open Modal

↓

Close Modal

---
## Learning Objectives

This project focuses on:

Event-driven programming

Web scraping with Python

JSON data processing

Fetch API

DOM manipulation

Dynamic DOM rendering

Event delegation

Bootstrap Modal interaction

Automated data updates with GitHub Actions

Application flow control

---
## Project Series

This project is part of the gameNews series.

gameNews Event
      ↓
gameNews State
      ↓
gameNews React

---
## Documentation

This project includes a detailed analysis using my **Project Probe Process (PPP)** methodology.

---
## PPP Workflow

1. Guess the State
        ↓
2. Find State, Initial Values, Event Sources, Data Sources, and Render
        ↓
3. Find the Entry Point
        ↓
4. State Analysis
        ↓
5. Key Function Analysis

For a detailed analysis of this project, see:
- [Event Analysis](docs/event-analysis.md)





















































































































---