# Catch state
---

A duck-catching game with gameplay similar to Whack-a-Mole.with **HTML, CSS, and Vanilla JavaScript** using a **State-driven architecture**.

---

## Demo

Coming Soon

---

## Features

- 3 × 3 game board
- Random duck spawning
- Mouse click interaction
- Countdown timer
- Score counter
- Automatic duck disappear
- Retry when target position is occupied

---

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6)

---

## Project Structure

```text
Catch-State
│
├── img
├── plugins
│   ├── state.js
│   └── style.css
├── index.html
├── README.md
└── docs
    └── state-analysis.md
```

---

## Game Flow

Start Button

↓

Start Timer

↓

Random Spawn Duck

↓

Click Duck

↓

Increase Score

↓

Duck Back to Down

↓

Game Over

---

## Learning Objectives

This project focuses on:

- State management
- Single Source of Truth
- Render-based UI updates
- Timer management
- Game flow control

---

## Project Series

This project is part of the **Catch Game** series.
```
text
Catch Event
      ↓
Catch State
      ↓
Catch React
```

---
## Documentation

This project includes a detailed analysis using my **Project Probe Process (PPP)** methodology.

### PPP Workflow

```text
1. Guess the State
        ↓
2. Find the Initial State and Event Sources
        ↓
3. Find the Entry Point
        ↓
4. state Analysis
        ↓
5. key Function Analysis
```

For a detailed analysis of this project, see:
- [State Analysis](docs/state-analysis.md)




---