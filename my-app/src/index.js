import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/*
    StrictMode는 리액트에서 제공하는 검사 도구라고 생각하면 될 것 같다.
    개발 모드일때만 디버그를 하며
    해당 태그로 감싸져 있는 부분은 자손까지 검사를 한다!
    안전하지 않은 생명주기를 가진 컴포넌트라든지, 권장되지 않는 부분이 있다든지 배포 후 문제가 될만한 이슈들을 미리 잡는 모드라고 보면 되겠다.
*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode><App /></React.StrictMode>
    // <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
