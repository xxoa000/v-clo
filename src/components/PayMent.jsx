import React, { useState, useEffect } from 'react';
import '../styles/PayMent.css';
import { useNavigate } from 'react-router-dom';

export default function PayMent({finalTotal}) {
  const productPrice = finalTotal; 
  const [totalPoint, setTotalPoint] = useState(50000);
  const [coupon, setCoupon] = useState(0);
  const [point, setPoint] = useState(0); 
  const [pg, setPg] = useState('kakaopay.TC0ONETIME');
  const [payMethod, setPayMethod] = useState('card');
  const [agree, setAgree] = useState(false);

  const navigate = useNavigate();

  const totalDiscount = coupon + point;
  const finalPrice = Math.max(0, productPrice - totalDiscount);
  const reward = Math.floor(finalPrice * 0.01);

  useEffect(() => {
    // 포트원 초기화 (쇼핑몰을 구별하기 위해 부여되는 코드)
    if (window.IMP) window.IMP.init("imp73111002");
  }, []);


  const useAllPoint = () => {
    //상품 금액에서 쿠폰을 뺀 "남은 결제액"과 "보유 포인트" 중 더 작은 값 선택
    const maxUsableByPrice = Math.max(0, productPrice - coupon);
    const finalUse = Math.min(totalPoint, maxUsableByPrice);
    setPoint(finalUse);
  };

  // 숫자 제한 + 금액 초과 방지
  const handlePointChange = (e) => {
    // 숫자 이외의 문자 즉시 제거
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const value = Number(rawValue);
    
    // 최대 한도 계산 (보유 포인트와 남은 상품 금액 중 최솟값)
    const maxUsableByPrice = Math.max(0, productPrice - coupon);
    const finalLimit = Math.min(totalPoint, maxUsableByPrice);

    if (value > finalLimit) {
      if (value > totalPoint) {
        alert(`보유하신 포인트(${totalPoint.toLocaleString()}P)까지만 사용 가능합니다.`);
      } else {
        alert("할인 금액이 상품 금액을 초과할 수 없습니다.");
      }
      setPoint(finalLimit);
    } else {
      setPoint(rawValue === '' ? 0 : value);
    }
  };

  const doPay = () => {
    if (!agree) return alert("결제대행 서비스 이용약관에 동의해주세요.");
    
    // 결제 금액이 0원일 경우
    if (finalPrice === 0) {
      alert("전액 할인 결제로 결제가 완료되었습니다!");
      navigate('/myPage'); // 메인으로 이동하거나 완료 페이지로 이동
      return; 
    } else {alert("결제수단이 등록되어 있지 않습니다.");}

    const { IMP } = window;
    IMP.request_pay({
      pg: pg,
      pay_method: payMethod,
      merchant_uid: `ORD-${new Date().getTime()}`,
      name: "실크 원피스 외",
      amount: finalPrice,
    }, rsp => {
      if (rsp.success) {
        alert("결제가 완료되었습니다!");
        navigate('/');
      } else {
        alert(`결제 실패: ${rsp.error_msg}`);
      }
    });
  };

  return (
    <div className="payMent-container">
      <header className="main-header">
        <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>V-CLO</h1>
      </header>

      <main className="checkout-wrapper">
        <div className="section-title">ORDER & PAYMENT</div>

        {/* 배송 정보 */}
        <section className="checkout-card">
          <h3>배송 정보</h3>
          <div className="input-group">
            <input type="text" placeholder="받으시는 분 성함" className="input-field" />
            <input type="text" placeholder="연락처 (- 없이 입력)" className="input-field" />
            <input type="text" placeholder="배송지 주소" className="input-field" />
            <textarea placeholder="배송 요청사항을 입력해주세요 (선택)" className="input-field textarea"></textarea>
          </div>
        </section>

        {/* 할인 혜택 */}
        <section className="checkout-card">
          <h3>할인 혜택</h3>
          <div className="flex-row">
            <span className="label">쿠폰 선택</span>
            <span className="sub-info">사용 가능한 쿠폰 2장</span>
          </div>
          <select 
            className="input-field" 
            onChange={(e) => {
              const selectedCoupon = Number(e.target.value);
              setCoupon(selectedCoupon);
              // 쿠폰 변경 시 포인트가 상품가를 넘지 않도록 자동 조정
              const maxUsable = productPrice - selectedCoupon;
              setPoint(prev => Math.min(prev, maxUsable));
            }}
          >
            <option value="0">적용 안 함</option>
            <option value="5000">신규 회원 가입 쿠폰 (-5,000원)</option>
            <option value="10000">시즌 감사 쿠폰 (-10,000원)</option>
          </select>

          <div className="flex-row mt-20">
            <span className="label">포인트 사용</span>
            {/* 실시간 잔여 포인트 표시 */}
            <span className="sub-info">보유 {(totalPoint - point).toLocaleString()}P</span>
          </div>
          <div className="point-box">
            <input 
              type="text" 
              inputMode="numeric"
              className="input-field no-margin" 
              placeholder="0" 
              value={point === 0 ? '' : point}
              onChange={handlePointChange}
              onKeyDown={(e) => {
                if (['e', 'E', '+', '-', '.'].includes(e.key)) e.preventDefault();
              }}
            />
            <button className="btn-white" onClick={useAllPoint}>전체사용</button>
          </div>
        </section>

        <section className="checkout-card">
          <h3>결제 수단</h3>
          <div className="method-grid">
            <div className={`method-item ${pg.includes('kakaopay') ? 'active kakao' : ''}`} 
                 onClick={() => {setPg('kakaopay.TC0ONETIME'); setPayMethod('card');}}>
              <i className="fa-solid fa-comment"></i>
              <span>카카오페이</span>
            </div>
            <div className={`method-item ${pg.includes('tosspay') ? 'active toss' : ''}`} 
                 onClick={() => {setPg('tosspay.tosstest'); setPayMethod('card');}}>
              <span className="logo-t">T</span>
              <span>토스페이</span>
            </div>
            <div className={`method-item ${pg.includes('naverpay') ? 'active naver' : ''}`} 
                 onClick={() => {setPg('naverpay'); setPayMethod('card');}}>
              <span className="logo-n">N</span>
              <span>네이버페이</span>
            </div>
            <div className={`method-item ${pg.includes('inicis') ? 'active' : ''}`} 
                 onClick={() => {setPg('html5_inicis.INIpayTest'); setPayMethod('card');}}>
              <i className="fa-solid fa-credit-card"></i>
              <span>신용카드</span>
            </div>
          </div>
          <div className="agree-check">
            <input type="checkbox" id="agree" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <label htmlFor="agree">결제대행 서비스 이용약관 동의 (필수)</label>
          </div>
        </section>

        <section className="checkout-card summary">
          <div className="price-line">
            <span>상품 금액</span>
            <span>{productPrice.toLocaleString()}원</span>
          </div>
          <div className="price-line highlight-red">
            <span>할인 금액</span>
            <span>-{totalDiscount.toLocaleString()}원</span>
          </div>
          
          <div className="price-line total-price">
            <span>총 결제금액</span>
            <span className="gold-text">{finalPrice.toLocaleString()}원</span>
          </div>

          <div className="reward-banner">
            <span>구매 적립금 (1%)</span>
            <span className="bold">{reward.toLocaleString()}원 적립</span>
          </div>

          <button className="btn-pay" onClick={doPay}>
            {finalPrice === 0 ? '0원 결제하기' : '결제하기'}
          </button>
        </section>
      </main>
    </div>
  );
}