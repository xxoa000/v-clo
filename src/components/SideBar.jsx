import React, { useState } from 'react';
import { 
  FiSearch, FiHeart, FiMessageCircle, 
  FiChevronUp, FiChevronDown, FiRotateCcw, FiX 
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../styles/SideBar.css'; 

export default function SideBar({ wishlist, isLogin }) {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null); 
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchText, setSearchText] = useState('');
  
  // 선택된 필터들을 저장하는 객체 상태 (필터 고정 기능)
  const [selectedFilters, setSelectedFilters] = useState({
    컬러: '',
    타입: '',
    배송: '',
    주요소재: '',
    FIT: '',
    무드: ''
  });

  const [ranges, setRanges] = useState({ 가격: 50, 할인율: 20, 총기장: 50, 가슴단면: 50, 소매기장: 50 });

  const filterData = {
    컬러: ['화이트', '블랙', '네이비', '베이지', '차콜'],
    타입: ['베이직', '유니크', '오피스', '데일리', '스트릿'],
    배송: ['새벽배송', '당일출고', '일반배송'],
    주요소재: ['코튼', '캐시미어', '린넨', '데님', '폴리에스터'],
    FIT: ['슬림핏', '스탠다드', '루즈핏', '오버핏'],
    무드: ['러블리', '모던', '시크', '빈티지', '페미닌'],
  };

  // 필터 클릭 시 선택/해제 로직
  const handleFilterClick = (category, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      // 이미 선택된 걸 누르면 해제, 아니면 새로운 값 선택
      [category]: prev[category] === value ? '' : value
    }));
  };

  const handleSidebarClick = (menuType, externalUrl = null) => {
    if (!isLogin) {
        alert('로그인 후 이용 가능합니다.');
        navigate('/login');
      return;
    }
    
    if (externalUrl) {
      window.open(externalUrl, "_blank");
    } else {
      setActiveMenu(activeMenu === menuType ? null : menuType);
    }
  };

  return (
    <div className="smart-sidebar-container">
      <div className="sidebar-icons">
        <div className={`icon-wrapper ${activeMenu === 'search' ? 'active' : ''}`} onClick={() => handleSidebarClick('search')}>
          <FiSearch size={24} />
          <span className="tooltip">스마트<br />서치</span>
        </div>
        <div className={`icon-wrapper ${activeMenu === 'mypick' ? 'active' : ''}`} onClick={() => handleSidebarClick('mypick')}>
          <FiHeart size={24} />
          <span className="tooltip">마이픽</span>
        </div>
        <div className="icon-wrapper" onClick={() => handleSidebarClick(null, "https://talk.naver.com/")}>
          <FiMessageCircle size={24} style={{ color: '#03C75A' }} />
        </div>
        <div className="icon-wrapper" onClick={() => handleSidebarClick(null, "https://pf.kakao.com")}>
          <div className="kakao-icon">ch</div>
        </div>
        
        <div className="scroll-controls">
          <div className="icon-wrapper" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}><FiChevronUp size={20} /></div>
          <div className="icon-wrapper" onClick={() => window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'})}><FiChevronDown size={20} /></div>
        </div>
      </div>

      {activeMenu && (
        <div className={`sidebar-overlay-content ${activeMenu}`}>
          <button className="overlay-close" onClick={() => setActiveMenu(null)}><FiX size={24} /></button>
          
          {/* 1. 스마트 서치 */}
          {activeMenu === 'search' && (
            <div className="menu-inner search-menu">
              <h3>스마트 서치</h3>
              <div className="search-bar-input-group">
                <input 
                  type="text" 
                  value={searchText} 
                  onChange={(e) => setSearchText(e.target.value)} 
                  placeholder="찾으시는 스타일 입력" 
                />
                <FiSearch className="inner-search-icon" />
              </div>

              <div className="filter-scroll-area">
                {Object.keys(filterData).map(title => (
                  <div key={title} className="filter-section">
                    <div className="filter-header" onClick={() => setActiveFilter(activeFilter === title ? null : title)}>
                      {title} <span className="selected-val">{selectedFilters[title]}</span>
                      <span>{activeFilter === title ? '−' : '+'}</span>
                    </div>
                    {activeFilter === title && (
                      <div className="sub-options">
                        {filterData[title].map(opt => (
                          <button 
                            key={opt} 
                            className={`opt-btn ${selectedFilters[title] === opt ? 'active-filter' : ''}`}
                            onClick={() => handleFilterClick(title, opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="range-filter-group">
                  <h4>사이즈/가격 디테일</h4>
                  {['가격', '할인율', '총기장', '가슴단면', '소매기장'].map(name => (
                    <div key={name} className="range-filter">
                      <div className="range-label">
                        <span>{name}</span>
                        <span>{ranges[name]}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={ranges[name]} 
                        onChange={(e) => setRanges({...ranges, [name]: e.target.value})} 
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="reset-btn" onClick={() => {
                setSearchText('');
                setSelectedFilters({컬러:'', 타입:'', 배송:'', 주요소재:'', FIT:'', 무드:''});
                setRanges({가격:50, 할인율:20, 총기장:50, 가슴단면:50, 소매기장:50});
              }}>
                <FiRotateCcw /> 필터 초기화
              </button>
            </div>
          )}

          {/* 2. 마이픽 (찜한 상품 리스트) */}
          {activeMenu === 'mypick' && (
            <div className="menu-inner mypick-menu">
              <h3>마이픽 <span className="count">{wishlist?.length || 0}</span></h3>
              <div className="wish-list-sidebar">
                {wishlist && wishlist.length > 0 ? (
                  wishlist.map((item, idx) => (
                    <div key={item.id || idx} className="wish-item-mini">
                      <div className="wish-img-box">
                        <img src={item.img || item.image} alt={item.name} />
                      </div>
                      <div className="wish-info">
                        <p className="name">{item.name}</p>
                        <strong className="price">
                          {typeof item.price === 'number' ? item.price.toLocaleString() : item.price}원
                        </strong>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-wish">
                    <FiHeart size={40} />
                    <p>마이페이지에서 찜한 상품이<br/>여기에 표시됩니다.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}