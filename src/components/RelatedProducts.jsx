import React from 'react';
import { useProduct } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const RelatedProducts = ({ currentId, handleAddToCart }) => {
  const { product } = useProduct();
  const navigate = useNavigate();

  // 현재 상품 제외 -> 랜덤 섞기 -> 4개 추출 
  const randomList = [...product]
    .filter(item => String(item.id) !== String(currentId))
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return (
    <div style={{ padding: '40px 0' }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
        함께 많이 본 상품들
      </h3>
      
      <div style={{ display: 'flex', gap: '15px' }}>
        {randomList.map((item) => (
          <div key={item.id} style={{ width: '25%' }} onClick={() => {handleAddToCart(item); navigate('/cart');} }>
            {/* 이미지 영역 */}
            <div style={{ borderRadius: '10px', overflow: 'hidden', backgroundColor: '#f5f5f5', aspectRatio: '3/4' }}>
              <img 
                src={item.img} 
                alt={item.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            {/* 정보 영역 (이름, 가격 자동 반영) */}
            <div style={{ marginTop: '10px' }}>
              <p style={{ fontSize: '14px', color: '#333', margin: '0 0 5px 0' }}>
                {item.title}
              </p>
              <p style={{ fontSize: '15px', fontWeight: 'bold' }}>
                {item.price.toLocaleString()}원
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;