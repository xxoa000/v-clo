import React from 'react';

function QnA() {
  return (
    <div style={{ padding: '40px 20px', textAlign: 'center' }}>
      <div style={{ borderBottom: '2px solid #333', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>Q&A (0)</h3>
        <button style={{ padding: '8px 16px', background: '#333', color: '#fff', border: 'none', cursor: 'pointer' }}>상품문의하기</button>
      </div>
      <div style={{ padding: '60px 0', color: '#999' }}>
        <p>등록된 문의사항이 없습니다.</p>
        <p style={{ fontSize: '12px' }}>상품에 대해 궁금한 점이 있다면 언제든 문의해주세요!</p>
      </div>
    </div>
  );
}

export default QnA;