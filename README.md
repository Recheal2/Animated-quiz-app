# Animated Quiz Application

An interactive and animated quiz application built with React, designed to provide an engaging learning experience through topic-based questions, difficulty selection, and smooth UI transitions.

---

## Overview

The Animated Quiz Application allows users to log in, select quiz difficulty levels, and complete timed quiz rounds with randomized questions. The app emphasizes clean UI design, animation, and proper state management to simulate a real-world educational platform.

This project was built as part of my journey to strengthen my frontend development skills and demonstrate my ability to build functional, interactive React applications.

---

## Why I Built This Project

I built this project to:

- Deepen my understanding of React component structure and state management
- Practice conditional rendering and dynamic data handling
- Improve debugging skills by resolving real runtime issues
- Create a portfolio-ready project that reflects real product behavior
- Gain confidence using Git and GitHub for version control

This project reflects how I approach problem-solving, user experience, and clean frontend architecture.

---

## Features

- User login and signup flow
- Profile page with progress tracking
- Difficulty-based quiz selection (Easy, Medium, Hard)
- Randomized questions per quiz session
- Animated transitions between questions
- Visual feedback for selected answers
- Responsive design for different screen sizes

---

## Technologies Used

- **React (JavaScript)**
- **Vite**
- **HTML5**
- **CSS3 (Animations & Layout)**
- **JavaScript (ES6+)**
- **Git & GitHub**

---

## Screenshots

> Screenshots showcasing the UI and functionality of the application.

Login page
<img width="675" height="585" alt="login" src="https://github.com/user-attachments/assets/ac975da8-ce87-4aea-9d43-e007955480cf" />


Profile page 
<img width="715" height="614" alt="profile" src="https://github.com/user-attachments/assets/15862fcd-4938-431d-aadf-01ebf6f68b78" />

 Selection page
 
<img width="716" height="572" alt="difficult" src="https://github.com/user-attachments/assets/2f92e9c6-e162-49e6-ab54-f70241a0e6f1" /> 


## Challenges & Solutions

### Blank Screen on Difficulty Selection
**Issue:**  
Selecting a difficulty caused the application to render a blank screen.

**Solution:**  
Implemented proper state checks and conditional rendering to ensure quiz data was available before rendering the quiz component.

---

### Git Push Errors
**Issue:**  
Encountered `src refspec main does not match any`.

**Solution:**  
Created an initial commit before pushing and verified the active branch.

---

### Git Author Identity Error
**Issue:**  
Git could not detect user identity during commits.

**Solution:**  
Configured global Git username and email.

---

## Project Structure

```plaintext
animated-quiz-app/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── LoginSignup.js
│   ├── Profile.jsx
│   ├── quizData.js
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
