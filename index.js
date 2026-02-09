import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 뒤에 .js나 .jsx를 붙이지 않아도 자동으로 찾습니다.
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);