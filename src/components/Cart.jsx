import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiUser, FiShoppingBag, FiTrash2, FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi';
import { useProduct } from '../context/ProductContext';

export default function Cart({appliedDiscount, handleAddToCart, selectedIds, isLogin, id, handleApplyCoupon, setCartItems,
                                 selectedProductTotal, discountAmount, deliveryFee, finalTotal, cartItems}) {
  const navigate = useNavigate();
  const handleQuantityChange = (id, d) => {let cartItemsCheck = cartItems.map(array => array.id === id ? { ...array, count: Math.max(1, array.count + d) } : array)
                                            setCartItems(cartItemsCheck); 
                                            localStorage.setItem('cartItems', JSON.stringify([...cartItemsCheck]))
                                          }

  const handleRemoveItem= (id) => {let cartItemsCheck = cartItems.filter(array => array.id !== id)
                                    setCartItems(cartItemsCheck);
                                    localStorage.setItem('cartItems', JSON.stringify([...cartItemsCheck]))
                                  }
                                  
  
  const popularProducts = [
    { id: 901, name: "여리핏 루즈 가디건", price: 24500, img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=200", count: 1},
    { id: 902, name: "와이드 핀턱 슬랙스", price: 38000, img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=200", count: 1 },
    { id: 903, name: "데일리 베이직 티셔츠", price: 12000, img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=200", count: 1 },
    { id: 904, name: "모던 체크 재킷", price: 59000, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=200", count: 1 }
  ];


  
  // 적립 포인트 계산 (최종 결제 금액의 1%)
  const rewardPoints = Math.floor(finalTotal * 0.01);
  
  return (
    <div className="container">
      <main className="inner">
        <div className="cart-title">장바구니 ⓘ</div>
        <div className="cart-container">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item-row">
              <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => {
                selectedIds.includes(item.id) ? selectedIds = selectedIds.filter(i => i !== item.id) : selectedIds = [...selectedIds, item.id];
              }} className="checkbox" />
              <img src={item.img} alt="p" className="product-img" style={{ width: '60px', height: '75px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.title}</div>
                <div>{item.price.toLocaleString()}원</div>
              </div>
              <div className="quantity-control">
                <FiMinus onClick={() => handleQuantityChange(item.id, -1)} cursor="pointer" />
                <span style={{ margin: '0 10px' }}>{item.count}</span>
                <FiPlus onClick={() => handleQuantityChange(item.id, 1)} cursor="pointer" />
              </div>
              <FiTrash2 onClick={() => handleRemoveItem(item.id)} cursor="pointer" color="#ddd" />
            </div>
          ))}

          <div className="price-summary">
            <div className="price-row"><span>선택 상품 합계</span><span>{selectedProductTotal.toLocaleString()}원</span></div>
            {appliedDiscount > 0 && <div className="price-row" style={{ color: '#ff4d4f' }}><span>쿠폰 할인</span><span>- {discountAmount.toLocaleString()}원</span></div>}
            <div className="price-row"><span>배송비</span><span>{deliveryFee.toLocaleString()}원</span></div>
            
            {/* 포인트 적립 안내 추가 */}
            <div className="price-row" style={{ color: '#A67C52', fontSize: '13px', marginTop: '10px' }}>
              <span>구매 적립 포인트 (1%)</span>
              <span>+ {rewardPoints.toLocaleString()}P</span>
            </div>

            <div className="price-row" style={{ marginTop: '15px', paddingTop: '15px', borderTop: '2px solid #333' }}>
              <span style={{ fontWeight: 'bold' }}>최종 결제 금액</span>
              <span style={{ fontWeight: 'bold', fontSize: '24px', color: '#A67C52' }}>{finalTotal.toLocaleString()}원</span>
            </div>
          </div>

          <div className="order-btn-group">
            <NavLink to ='/payMent' className="btn-all" onClick={() => alert(`${finalTotal.toLocaleString()}원 주문이 완료되었습니다. ${rewardPoints}P가 적립될 예정입니다.`)}>주문하기</NavLink>
          </div>
        </div>

        <div className="popular-section" style={{ marginTop: '50px', paddingBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <FiShoppingCart color="#A67C52" />
            <h3 style={{ fontSize: '16px', margin: 0 }}>실시간 인기 급상승!</h3>
          </div>
          <div className="grid-4">
            {popularProducts.map(prod => (
              <div key={prod.id} className="pop-card">
                <img src={prod.img} alt="popular" className="pop-img" />
                <div style={{ padding: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', fontWeight: '500' }}>{prod.name}</div>
                  <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#A67C52' }}>{prod.price.toLocaleString()}원</div>
                  <button className="pop-add-btn" onClick={() => handleAddToCart(prod)}>+ 담기</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}