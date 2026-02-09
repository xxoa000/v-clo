import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Review from '../components/Review.jsx';
import Qna from '../components/QnA.jsx';
import RelatedProducts from '../components/RelatedProducts.jsx';

import '../styles/Review.css';
import '../styles/ProductDetails.css';
import { useProduct } from '../context/ProductContext';

export default function ProductDetails({ isLogin, handleAddToCart }) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(2643);

    const withBase = (path) => import.meta.env.BASE_URL + path.replace(/^\/+/, '');

    const handleLike = () => {
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
        setIsLiked(!isLiked);
    };
    const [isSelected, setIsSelected] = useState(false); // 옵션 이미지 선택 기능

    const [query] = useSearchParams();
    const id = query.get('id');
    const navigate = useNavigate();

    const { product } = useProduct();
    const currentItem = product.find(item => String(item.id) === String(id));

    // --- [추천 상품 4개 랜덤 추출] ---
    const recommendedProducts = [...product]
        .filter(item => String(item.id) !== String(id) ) // 현재 상품 제외
        .sort(() => Math.random() - 0.5) // 무작위 섞기
        .slice(0, 4); // 4개만 선택
    // --------------------------------------------

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [tab, setTab] = useState('상품정보');
    const [mainImg, setMainImg] = useState(currentItem?.img || "");
    const [selectedOptionName, setSelectedOptionName] = useState(currentItem?.color?.[0] || "단일색상");
    const [selectedList, setSelectedList] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (currentItem) setMainImg(currentItem.img);
    }, [currentItem, id]);

    const selectSize = (size) => {
        const key = `${size}-${Date.now()}`; 
        const newItem = {
            key: key,
            optionName: selectedOptionName,
            size: size,
            price: currentItem?.price || 0,
            count: 1
        };
        setSelectedList([...selectedList, newItem]);
    };

    const changeCount = (key, delta) => {
        setSelectedList(prev => prev.map(item =>
            item.key === key ? { ...item, count: Math.max(1, item.count + delta) } : item
        ));
    };

    const removeItem = (key) => {
        setSelectedList(prev => prev.filter(item => item.key !== key));
    };

    const totalAmount = selectedList.reduce((acc, item) => acc + (item.price * item.count), 0);
    const detailBtnText = isDetailOpen ? "상세정보 닫기 ▲" : "상세정보 보기 ▼";

    const addCart = () => {
        if (selectedList.length === 0) return alert("옵션을 선택해주세요.");
        
        selectedList.forEach(item => {
        const productItem = {
            id: `${id}-${item.size}`, 
            name: currentItem?.title,
            price: item.price,
            img: currentItem?.img, 
            option: item.optionName,
            size: item.size,
            count: item.count
        };
        handleAddToCart(productItem);
        });
        navigate(isLogin ? '/cart' : '/login');
    };

    const goOrder = () => {
        if (selectedList.length === 0) return alert("옵션을 선택해주세요.");
        navigate(isLogin ? '/payMent' : '/login');
    };

    if (!currentItem) return null;

    return (
        <div className="product-details-page">
        <section className="container">
            <section className="product-top">
                <div className="product-image">
                    <img src={withBase(currentItem.img)} alt={currentItem.title} />
                </div>

                <div className="product-info">
                    <p className="product-code">상품번호: {id}</p>
                    <h2 className="product-name">{currentItem.title}</h2>

                    <div className="price-row">
                        <span className="original">{(currentItem.price * 1.3).toLocaleString()}원</span>
                        <span className="sale">{currentItem.price.toLocaleString()}원</span>
                        <span className="discount">{currentItem.discount || "24%"}</span>
                    </div>

                    <div className="badges">
                        <span className="badge">쿠폰할인</span>
                        <span className="badge">즉시출고</span>
                        <span className="badge">무료교환</span>
                    </div>

                    <div className="info-box">
                        <div className="info-row">
                            <div className="info-label">카드혜택</div>
                            <div className="info-value">무이자 혜택</div>
                        </div>
                        <div className="info-row">
                            <div className="info-label">배송예상</div>
                            <div className="info-value">
                                <span className="bold underline">12시 이전 주문시 오늘출발 가능</span>
                                <p className="sub-text2">02월 06일 (금) 도착 예정</p>
                            </div>
                        </div>
                    </div>

                    <div className="option-selection">
                        <div className="selection-row">
                            <div className="content">
                                <div className="mini-preview-box"
                                    onClick={() => setIsSelected(true)}
                                    style={{border: isSelected ? '2px solid #333' : '1px solid #e5e5e5'}}>
                                    <img src={withBase(currentItem.img)} alt="미리보기" />
                                    <span>{currentItem.title}</span>
                                </div>
                                <div className="size-buttons">
                                    {['S', 'M', 'L', 'XL'].map(size => (
                                    <button key={size} className="btn-size" onClick={() => selectSize(size)}>
                                        <img src={withBase("images/deliveryMan.jpg")} 
                                            className="icon-delivery" alt="delivery" />
                                            {size} [즉시출고]
                                    </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {selectedList.length > 0 && (
                    <div className="selected-items-list">
                        {selectedList.map(item => (
                        <div key={item.key} className="selected-item-box">
                            <div className="item-name">{item.size} 사이즈</div>
                            <div className="item-control-row">
                                <div className="count-btn-group">
                                    <button onClick={() => changeCount(item.key, -1)}>-</button>
                                    <span>{item.count}</span>
                                    <button onClick={() => changeCount(item.key, 1)}>+</button>
                                </div>
                                <div className="item-price-delete">
                                    <span>{(item.price * item.count).toLocaleString()}원</span>
                                    <button onClick={() => removeItem(item.key)} className="delete-x">✕</button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}

                    <div className="buy-section">
                    <div className="total-price-row">
                        <span>총금액</span>
                        <span className="price"><strong>{totalAmount.toLocaleString()}</strong>원</span>
                    </div>
                    <div className="action-group">
                        <div className="btn-icon" onClick={handleLike} style={{ cursor: 'pointer' }}>
                            <span className="icon" style={{ color: isLiked ? 'red' : '#ccc' }}>
                                {isLiked ? '♥' : '♡'}
                            </span>
                            <span className="count">{likeCount.toLocaleString()}</span>
                        </div>
                        <button className="btn-cart" onClick={addCart}>장바구니</button>
                        <div className="buy-wrap">
                            <button className="btn-buy" onClick={goOrder}>구매하기</button>
                        </div>
                    </div>
                    <div className="naver-pay-container">
                        <button className="naver-pay-main-btn" onClick={goOrder}>
                            <span className="n-logo">N</span>
                            <span className="txt">pay 구매</span>
                        </button>
                        <button className="naver-sub-btn">찜</button>
                        <button className="naver-sub-btn">
                            <span className="talk-icon">N</span>
                        </button>
                    </div>
                    <div className="naver-pay-event">
                        <span className="event-badge">이벤트</span>
                        <span className="event-txt">결제 최대혜택 10% 추가적립</span>
                    </div>
                    </div>
                </div>
            </section>

            <section className="product-detail-tabs">
                <ul className="tab-menu">
                    {['상품정보', '관련상품', '리뷰', 'Q&A', '배송/환불'].map(m => (
                        <li key={m} onClick={() => setTab(m)} 
                            className={tab === m ? 'active' : ''}>{m}
                        </li>
                    ))}
                </ul>
            </section>

            {tab === '상품정보' && (
            <div className="product-content-area">
                <section className="membership-section">
                    <div className="membership-header">
                        <h2 className="membership-title">Membership</h2>
                        <p className="membership-subtitle">멤버십 혜택</p>
                    </div>
                    <ul className="benefit-list">
                        {[
                            { id: '01', title: '첫 회원가입', desc: '중복 5천원 할인' },
                            { id: '02', title: '회원 등급별', desc: '최대 5만원 쿠폰' },
                            { id: '03', title: '최대 5% 적립', desc: '멤버십 적립금' },
                            { id: '04', title: '사이즈', desc: '1회 무료교환' },
                            { id: '05', title: '매월 1일 발급', desc: '무료배송 쿠폰' },
                        ].map((b) => (
                            <li key={b.id} className="benefit-item">
                                <span className="benefit-num">{b.id}</span>
                                <p className="benefit-txt">
                                    <strong>{b.title}</strong><br />
                                    {b.desc}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="product-bottom-toggle">
                    <button className="toggle-btn" 
                        onClick={() => setIsDetailOpen(!isDetailOpen)}>
                        {detailBtnText}
                    </button>
                    {isDetailOpen && (
                        <div className="details-content">
                            <img src={withBase(currentItem.img)} alt="상세이미지" />
                        </div>
                    )}
                </section>
            </div>
            )}

            {tab === '리뷰' && <Review />}
            {tab === '관련상품' && <RelatedProducts handleAddToCart={handleAddToCart}/>}
            {tab === 'Q&A' && <Qna />}
            {tab === '배송/환불' && <div style={{ padding: '50px', textAlign: 'center' }}>무료 배송 및 7일 이내 환불 가능합니다.</div>}

            <div className="recommend-area">
                <h3>추천 상품</h3>
                <ul className="product_list2">
                    {recommendedProducts.map((item) => (
                        <li className="product_item2" key={item.id}
                            onClick={() => {handleAddToCart(item); navigate('/cart');}}> 
                            <div className="product_box2">
                                <div className="img_area">
                                    <img src={withBase(item.img)} alt={item.title} />
                                </div>
                                <div className="info_area">
                                    <div className="price_top">
                                        <span className="discount">{item.discount || "SALE"}</span>
                                        <span className="origin_price">{(item.price * 1.5).toLocaleString()}</span>
                                    </div>
                                    <div className="sale_price">{item.price.toLocaleString()}원</div>
                                    <p className="item_name">{item.title}</p>
                                    <div className="item_tags">BEST | 오늘출발</div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    </div>
  );
}