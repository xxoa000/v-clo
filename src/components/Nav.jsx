import React, { useState } from 'react';
import Search from './Search';
import '../styles/Nav.css'
import '../styles/Search.css'
import { NavLink, useNavigate } from 'react-router-dom'


export default function Nav({isLogin, onLogout}) {
  const navigate = useNavigate()

  const [activeMenu, setActiveMenu] = useState(null);

  // 카테고리 데이터
  const categories = [
    { name: '모델', path: null , sub: ['하정', '다희', '순영', '병묵', '성준'] },
    { name: 'Outer', path:'/productList?category=outer' , sub: []},
    { name: 'Top', path:'/productList?category=top', sub: [] },
    { name: 'Bottom', path:'/productList?category=bottom', sub: []},
    { name: 'Dress', path:'/productList?category=dress', sub: []},
    { name: 'Accessory', path:'/productList?category=accessory', sub: []}]

  return (
    <div className="nav">
      {/* 1. 왼쪽: 로고 및 카테고리 영역 */}
      <div className="left-section">
        <div className="logo" onClick={() => navigate('/')}>V-CLO </div>
        <nav className="nav-section">
          <ul className="category-list">
            {categories.map((c) => (
              <li 
                key={c.name}
                className="category-item"
                onMouseEnter={() => setActiveMenu(c.name)}
                onMouseLeave={() => setActiveMenu(null)}
              >

                {/* navLink가 있으면 path로 이동, 없으면 이름만 출력 */}
                {c.path ? <NavLink to={c.path}>{c.name}</NavLink> : c.name}
                
                {/* 드롭다운 메뉴 */}
                {activeMenu === c.name && (
                  <ul className="dropdown-menu">
                    {c.sub.map((subItem) => (
                      <li key={subItem}>{subItem}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* 2. 오른쪽: 검색 및 유저 메뉴 */}
      <div className="right-section">
        <div className="search-container">
          <Search />
        </div>
        <div className="user-menu">
          { isLogin ? 
                <div><NavLink to='/' onClick={() => {onLogout()}}>로그아웃</NavLink></div>
                :
                <div><NavLink to='/login'>로그인</NavLink></div>
            }&nbsp;
            <div>{isLogin ? <NavLink to="/cart">🛒</NavLink> : <NavLink to="/login">🛒</NavLink>}</div>&nbsp;
            <div>{isLogin ? <NavLink to="/myPage">👤</NavLink> : <NavLink to="/login">👤</NavLink>}</div>&nbsp; 
        </div>
      </div>
    </div>
  );
}