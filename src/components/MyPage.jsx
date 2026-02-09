import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiUser, FiShoppingBag, FiPackage, FiEdit3, FiArrowRight, FiHome, 
  FiDatabase, FiCheckCircle, FiHeart 
} from 'react-icons/fi';
import SideBar from '../components/SideBar';

export default function MyPage({ id, coupons, handleApplyCoupon }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('주문현황');
  const [showTracker, setShowTracker] = useState(false);
  const [wishlist, setWishlist] = useState([
    { id: 301, name: '실크 슬립 원피스', price: '39,000', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=200' },
    { id: 302, name: '트위드 미니 스커트', price: '42,000', img: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?q=80&w=200' },
    { id: 303, name: '벨벳 리본 블라우스', price: '35,000', img: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=200' }
  ]);

  // 최근 본 상품 데이터 복구
  const recentItems = [
    { id: 1, name: '슬림핏 스판 슬랙스', price: '32,800', img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=200' },
    { id: 2, name: '오버핏 셔츠 자켓', price: '45,500', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20210726_54%2F1627299946340toV0R_JPEG%2F28435835046502793_1134657658.jpg&type=sc960_832' },
    { id: 3, name: '린넨 셋업 베스트', price: '29,000', img: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=200' },
    { id: 4, name: '스트라이프 티셔츠', price: '18,000', img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=200' }
  ];

  const cancelData = [
    { id: 'C20260115-99', name: '오버핏 셔츠 자켓', status: '취소완료', date: '2026.01.15', img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20210726_54%2F1627299946340toV0R_JPEG%2F28435835046502793_1134657658.jpg&type=sc960_832' },
    { id: 'R20260110-88', name: '린넨 셋업 베스트', status: '반품접수', date: '2026.01.10', img: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=200' }
  ];

  const orderData = [
    { id: '20260202-000123', date: '2026.02.02', name: '[오늘출발] 보송폭닥 크롭 니트', status: '배송중', company: 'CJ대한통운', trackNo: '68623455902', img: 'https://images.unsplash.com/photo-1576185055363-6d7c88000919?q=80&w=200' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case '주문/배송조회':
        return (
          <div className="tab-box">
            <h4 className="tab-title">주문/배송조회</h4>
            {orderData.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-card-header"><span>{order.date}</span><span style={{ color: '#A67C52', fontWeight: 'bold' }}>{order.status}</span></div>
                <div className="order-card-body">
                  <img src={order.img} alt="prod" className="order-img" />
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 'bold' }}>{order.name}</div><div style={{ fontSize: '12px', color: '#888' }}>{order.company} {order.trackNo}</div></div>
                  <button className="track-btn" onClick={() => setShowTracker(true)}>배송조회</button>
                </div>
              </div>
            ))}
            {showTracker && (
              <div className="tracker-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                <div className="tracker-modal" style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', width: '90%', maxWidth: '600px', textAlign: 'center' }}>
                  <h3 style={{ marginBottom: '40px', fontSize: '22px' }}>실시간 배송 상태</h3>
                  <div className="step-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', padding: '0 20px' }}>
                    <div className="step" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', flex: 1 }}>
                      <FiCheckCircle size={32} color="#ccc" /><span style={{ fontSize: '16px', fontWeight: 'bold' }}>결제완료</span>
                    </div>
                    <div style={{ height: '2px', backgroundColor: '#eee', flex: 1, marginBottom: '30px' }}></div>
                    <div className="step" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', flex: 1, color: '#A67C52' }}>
                      <FiPackage size={32} /><span style={{ fontSize: '16px', fontWeight: 'bold' }}>배송중</span>
                    </div>
                    <div style={{ height: '2px', backgroundColor: '#eee', flex: 1, marginBottom: '30px' }}></div>
                    <div className="step" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', flex: 1 }}>
                      <FiHome size={32} color="#ccc" /><span style={{ fontSize: '16px', fontWeight: 'bold' }}>배송완료</span>
                    </div>
                  </div>
                  <button className="close-btn" onClick={() => setShowTracker(false)} style={{ marginTop: '40px', padding: '12px 30px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}>닫기</button>
                </div>
              </div>
            )}
          </div>
        );
      case '취소/반품/교환':
        return (
          <div className="tab-box">
            <h4 className="tab-title">취소/반품/교환 내역</h4>
            {cancelData.map(item => (
              <div key={item.id} className="order-card">
                <div className="order-card-header"><span>{item.date}</span><span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>{item.status}</span></div>
                <div className="order-card-body">
                  <img src={item.img} alt="cancel" className="order-img" />
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 'bold' }}>{item.name}</div><div style={{ fontSize: '12px', color: '#888' }}>처리 중입니다.</div></div>
                </div>
              </div>
            ))}
          </div>
        );
      case '최근 본 상품':
        return (
          <div className="tab-box">
            <h4 className="tab-title">최근 본 상품</h4>
            <div className="grid-4">
              {recentItems.map(item => (
                <div key={item.id} className="item-card">
                  <img src={item.img} alt="recent" className="item-img" />
                  <div style={{ padding: '8px', fontSize: '12px' }}>
                    <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                    <div style={{ color: '#A67C52' }}>{item.price}원</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case '찜한 상품':
        return (
          <div className="tab-box">
            <h4 className="tab-title">찜한 상품</h4>
            <div className="grid-4">{wishlist.map(item => (<div key={item.id} className="item-card" style={{ position: 'relative' }}><img src={item.img} alt="wish" className="item-img" /><FiHeart style={{ position: 'absolute', top: '8px', right: '8px', color: 'red', cursor: 'pointer' }} onClick={() => setWishlist(wishlist.filter(w => w.id !== item.id))} /><div style={{ padding: '8px' }}><div style={{ fontWeight: 'bold', fontSize: '12px' }}>{item.name}</div><div style={{ color: '#A67C52', fontSize: '12px' }}>{item.price}원</div></div></div>))}</div>
          </div>
        );
      default:
        return (
          <div className="status-card">
            <h4 style={{ marginBottom: '20px' }}>나의 주문현황</h4>
            <div className="status-grid">{[{ n: '결제완료', i: <FiDatabase />, c: 0 }, { n: '상품준비', i: <FiPackage />, c: 0 }, { n: '배송중', i: <FiArrowRight />, c: 1, active: true }, { n: '배송완료', i: <FiHome />, c: 0 }].map(item => (<div key={item.n} className="status-item" onClick={() => setActiveTab('주문/배송조회')}><div style={{ color: item.active ? '#A67C52' : '#333' }}>{item.i}</div><span>{item.n}</span><strong>{item.c}</strong></div>))}</div>
          </div>
        );
    }
  };

  return (
    <div className="container">
      <main className="inner">
        <section className="full-section" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '30px 0' }}>
          <div className="profile-card"><div className="avatar">{id ? id.substring(0, 1).toUpperCase() : 'U'}</div><div style={{ flex: 1 }}><h3 style={{ margin: 0 }}>{id}님</h3><span className="rank-badge">Silver Member</span></div><div className="point-summary"><div className="point-item">찜 <strong>{wishlist.length}</strong></div><div className="point-item">쿠폰 <strong>{coupons.length}</strong></div></div></div>
          {renderContent()}
          <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="list-card"><h4 className="card-header">쇼핑 정보</h4>{['주문/배송조회', '최근 본 상품', '찜한 상품', '취소/반품/교환'].map(m => (<div key={m} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: '13px', cursor: 'pointer', color: activeTab === m ? '#A67C52' : '#555' }} onClick={() => setActiveTab(m)}>{m} <FiArrowRight size={14} /></div>))}</div>
            <div className="list-card"><h4 className="card-header">쿠폰 사용</h4>{coupons.map(cp => (<div key={cp.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: '13px', cursor: 'pointer' }} onClick={() => handleApplyCoupon(cp)}><span style={{ color: '#A67C52' }}>{cp.name}</span><button style={{ padding: '4px 10px', backgroundColor: '#A67C52', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '11px' }}>적용</button></div>))}</div>
          </div>
        </section>
      </main>
    </div>
  );
}