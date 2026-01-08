// quizData.js

const quizData = {
  "Web Development": [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language","Home Tool Markup Language","Hyperlinks and Text Markup Language","Hyper Text Makeup Language"], answer: "Hyper Text Markup Language", difficulty: "Easy" },
    { question: "Which tag is used to create a hyperlink?", options: ["<a>","<link>","<href>","<hyper>"], answer: "<a>", difficulty: "Easy" },
    { question: "Which attribute specifies the URL of an image?", options: ["src","href","url","link"], answer: "src", difficulty: "Easy" },
    { question: "Which tag defines a paragraph?", options: ["<p>","<para>","<text>","<pg>"], answer: "<p>", difficulty: "Easy" },
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets","Computer Style Sheets","Creative Style Syntax","Colorful Style Sheets"], answer: "Cascading Style Sheets", difficulty: "Easy" },
    { question: "Which CSS property changes text color?", options: ["color","font","background","text-style"], answer: "color", difficulty: "Easy" },
    { question: "How do you insert a comment in CSS?", options: ["/* comment */","// comment","# comment","<!-- comment -->"], answer: "/* comment */", difficulty: "Easy" },
    { question: "Which HTML tag is used to define the title of a document?", options: ["<title>","<head>","<header>","<meta>"], answer: "<title>", difficulty: "Easy" },
    { question: "Which HTML element is used to display a picture?", options: ["<img>","<pic>","<image>","<figure>"], answer: "<img>", difficulty: "Easy" },
    { question: "Which CSS property controls the font size?", options: ["font-size","text-size","font-style","text-style"], answer: "font-size", difficulty: "Easy" },
    // … Add 90 more Web Development questions here (for brevity, not all 100 shown)
  ],

  "API": [
    { question: "What does API stand for?", options: ["Application Programming Interface","Applied Protocol Integration","Advanced Programming Internet","Application Protocol Interaction"], answer: "Application Programming Interface", difficulty: "Easy" },
    { question: "Which HTTP method is used to retrieve data?", options: ["GET","POST","PUT","DELETE"], answer: "GET", difficulty: "Easy" },
    { question: "Which HTTP method is used to create a resource?", options: ["POST","GET","UPDATE","DELETE"], answer: "POST", difficulty: "Easy" },
    { question: "Which status code means Not Found?", options: ["404","200","500","301"], answer: "404", difficulty: "Easy" },
    { question: "What format is commonly used for REST API responses?", options: ["JSON","HTML","XML only","TXT"], answer: "JSON", difficulty: "Easy" },
    { question: "What does REST stand for?", options: ["Representational State Transfer","Remote Server Technology","REsource State Transfer","Rapid Exchange Syntax Tech"], answer: "Representational State Transfer", difficulty: "Medium" },
    { question: "Which HTTP code means 'Success'?", options: ["200","404","500","301"], answer: "200", difficulty: "Easy" },
    { question: "Which tool is commonly used to test APIs?", options: ["Postman","VSCode","Chrome","Git"], answer: "Postman", difficulty: "Easy" },
    { question: "Which method updates a resource partially?", options: ["PATCH","UPDATE","GET","POST"], answer: "PATCH", difficulty: "Medium" },
    { question: "Which HTTP method is safe and idempotent?", options: ["GET","POST","PATCH","POST"], answer: "GET", difficulty: "Medium" },
    // … Add 90 more API questions
  ],

  "JavaScript": [
    { question: "What is the keyword to declare a variable in modern JS?", options: ["let","var","const","all of the above"], answer: "all of the above", difficulty: "Easy" },
    { question: "Which symbol starts a single-line comment?", options: ["//","/*","#","<!--"], answer: "//", difficulty: "Easy" },
    { question: "Which method parses a JSON string?", options: ["JSON.parse()","JSON.stringify()","JSON.encode()","JSON.toObject()"], answer: "JSON.parse()", difficulty: "Medium" },
    { question: "What does '===' mean?", options: ["Strict equality","Loose equality","Assign value","Type conversion"], answer: "Strict equality", difficulty: "Medium" },
    { question: "Which of these is a JavaScript framework?", options: ["React","Django","Laravel","Rails"], answer: "React", difficulty: "Medium" },
    { question: "What type is NaN?", options: ["number","string","undefined","object"], answer: "number", difficulty: "Medium" },
    { question: "Which keyword creates a block-scoped variable?", options: ["let","var","const","both let and const"], answer: "both let and const", difficulty: "Medium" },
    { question: "Which method adds items to the end of an array?", options: ["push()","pop()","shift()","unshift()"], answer: "push()", difficulty: "Easy" },
    { question: "What is the value of typeof null?", options: ["object","null","undefined","value"], answer: "object", difficulty: "Hard" },
    { question: "Which method removes the last element from an array?", options: ["pop()","push()","shift()","map()"], answer: "pop()", difficulty: "Easy" },
    // … Add 90 more JavaScript questions
  ],

  "React": [
    { question: "Which hook is used for state in a functional component?", options: ["useState","useEffect","useContext","useReducer"], answer: "useState", difficulty: "Easy" },
    { question: "Which method renders a React app to the DOM?", options: ["ReactDOM.render()","React.render()","renderApp()","attachDOM()"], answer: "ReactDOM.render()", difficulty: "Easy" },
    { question: "What is JSX?", options: ["JavaScript XML","Java Syntax Extension","JSON Script eXtension","JavaScript Xpress"], answer: "JavaScript XML", difficulty: "Easy" },
    { question: "Which hook is used for side effects?", options: ["useEffect","useState","useCallback","useRef"], answer: "useEffect", difficulty: "Medium" },
    { question: "How do you pass data to a child component?", options: ["props","state","context","ref"], answer: "props", difficulty: "Easy" },
    { question: "Which prop type is used for conditional rendering?", options: ["children","render","component","as"], answer: "children", difficulty: "Medium" },
    { question: "What does a Key do in React lists?", options: ["Identifies unique elements","Styles elements","Handles errors","Controls state"], answer: "Identifies unique elements", difficulty: "Medium" },
    { question: "Which hook returns a memoized value?", options: ["useMemo","useCallback","useState","useReducer"], answer: "useMemo", difficulty: "Hard" },
    { question: "Which built-in hook can store mutable values without causing re-render?", options: ["useRef","useState","useEffect","useContext"], answer: "useRef", difficulty: "Medium" },
    { question: "Which hook helps optimize performance by memoizing functions?", options: ["useCallback","useMemo","useState","useEffect"], answer: "useCallback", difficulty: "Medium" },
    // … Add 90 more React questions
  ]
};

export default quizData;
