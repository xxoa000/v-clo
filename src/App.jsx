import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Header from './components/Header'
import Nav from './components/Nav'
import Section from './components/Section'
import Footer from './components/Footer'

import Login from './components/Login'
import FindId from './components/FindId';
import FindPassword from './components/FindPassword';
import Join from './components/Join';



import ProductDetail from './components/ProductDetails';

import PayMent from './components/PayMent';
import './styles/SideBar.css'
import SideBar from './components/SideBar';



function App() {
  const navigate = useNavigate(); //Hook useNavigate 정의
  
  useEffect(() => { // 테스트용 회원정보 (아이디, 패스워드)
    if (!localStorage.getItem('userInfo')) {
    localStorage.setItem('userInfo'
      , JSON.stringify([
        {userName:'에드민', userId:'admin', userPassword:'1234', userPhone:'01111111111', userBirth:'2012-01-01'
          , userSmsAccept:'Y', userEmail:'aaaa@naver.com', userEmailAccept:'Y', userReferrerId:'에드민'},
        {userName:'브이클로', userId:'vclo', userPassword:'55555', userPhone:'05555555555', userBirth:'1940-12-31'
          , userSmsAccept:'Y', userEmail:'aaaa@naver.com', userEmailAccept:'Y', userReferrerId:'admin'},
      ]))}
    if (!localStorage.getItem('cartItems')) {
    localStorage.setItem('cartItems'
      , JSON.stringify([
        { id: 101, name: '보송폭닥 크롭 니트', price: 22800, count: 1, img: 'https://images.unsplash.com/photo-1576185055363-6d7c88000919?q=80&w=200' }
      ]))}
    }, []);


  const [cartItems, setCartItems]  = useState(JSON.parse(localStorage.getItem('cartItems')) || []);

  const cartInput = (product) => {
    setCartItems([...cartItems, { ...product }]);
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, { ...product }]))
    
  }


  const [loginInfo, setLoginInfo] = useState({isLogin:false, id:'', password:''}); //로그인 상태관리 객체 정의
  const {isLogin, id, password} = loginInfo; //로그인 상태관리 구조분해

  const [otpInfo, setOtpInfo] = useState({isOtp:false, myOtp:''}); //인증번호 랜덤 6자리 생성 (alert로 표시)
  const {isOtp, myOtp} = otpInfo;

  if(!isLogin) {
    const loginCheck = JSON.parse(sessionStorage.getItem('loginInfo'));
    
    
    if(loginCheck != null) {  //로그인 여부 확인
      console.log(`로그인 상태..`)
      setLoginInfo({
        isLogin: true, id: loginCheck.id, password: loginCheck.password
      });
    } else console.log('로그인하세요')
  }//if_else 

  const onLoginSubmit = (id, password) => { //로그인 (아이디, 패스워드) submit
    const joinCheck = JSON.parse(localStorage.getItem('userInfo'))
    .find(({userId, userPassword}) => (userId===id && userPassword===password));

    if(joinCheck) {
      const loginCheck = ({
        isLogin: true, id: joinCheck.userId, password: joinCheck.userPassword
      });
      sessionStorage.setItem('loginInfo', JSON.stringify(loginCheck));
      setLoginInfo(loginCheck);
      navigate('/');
    } else {
      alert('아이디 또는 패스워드를 확인하세요.');
      navigate('/login');
    }
  }//onLoginSubmit

  const onLogout = () => { //로그아웃 상태로 변환
    sessionStorage.clear();
    setLoginInfo({isLogin:false, id:'', password:''})
  }//onLogout

  const onPhoneSubmit = (phone) => { // 휴대전화 인증
    const phoneCheck = JSON.parse(localStorage.getItem('userInfo'))
    .find(({userPhone}) => (userPhone===phone));

    if(phoneCheck) {
      const newOtp =String(Math.floor(Math.random() * 1000000) + 1000000).substring(1, 7);
      setOtpInfo({...otpInfo, myOtp: newOtp});
      alert(`본인인증번호는 [${newOtp}]입니다. 정확히 입력해주세요`);
      console.clear();
      console.log(`본인인증번호는 [${newOtp}]입니다. 정확히 입력해주세요`);
    }//if
  }//onPhoneSubmit

  const [findId, setFindId] = useState('');
  const onOtpSubmit = (otp, phone) => { //otp 확인
    if(otp===myOtp) {
      alert(`인증완료`)
      setOtpInfo({...otpInfo, isOtp:true}) //인증 이후 화면전환

    const joinCheck = JSON.parse(localStorage.getItem('userInfo'))
    .find(({userPhone}) => (userPhone===phone));
    setFindId(joinCheck.userId);
    } else alert(`인증 번호가 올바르지 않습니다. 다시 입력해 주세요.`);
  }//onCheckOtpSubmit

  const onJoinSubmit = (name, id, password, phone, birth, smsAccept, email, emailAccept, referrerId) => 
    {
      const join = JSON.parse(localStorage.getItem('userInfo'))

      const nameCheck = /^[가-힣]{2,}$/.test(name); //한글만 허용 (최소 2자 이상) [ㅂㄴ => X, 글자로 입력]
      const idCheck = /^[a-zA-Z0-9]{5,15}$/.test(id); //대소문자 영문과 숫자만 허용 (5~15자)
      
      const phoneCheck = phone.length===11 //11자인 경우 혀용
      let joinCheck = false;
      if(nameCheck && phoneCheck && idCheck) { //id, phone, id 각각 규칙에 맞게 작성됬다면 실행
        joinCheck = join.some(({userName, userId, userPhone}) => userName===name || userId===id || userPhone===phone); 
      } // 기본 정보에 id, phone, id 중 하나라도 중복된다면 true 반환
      
      const passwordCheck = /^(?=.*[a-zA-Z])(?=.*\d).{3,}$/.test(password); //영문,숫자 조합이여야 true (3자 이상)
      
      const emailCheck = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(email); //@ 앞뒤 특수문자,한글 제외, @ 뒤에 마침표(.)가 정확히 하나만 존재 + 9글자 이상
      
      const referrerIdCheck = join.some(({userId}) => userId===referrerId || referrerId==''); //추천인 확인
      const error = [{check: nameCheck, rsn:'이름: 한글로만 입력하세요'}, {check: idCheck, rsn:'아이디는 영문과 숫자만 사용가능 5글자 이상 입력해야합니다'}
        , {check: passwordCheck, rsn: '패스워드: 영문으로 입력하시고, 숫자 1글자 이상을 포함 바랍니다'}, {check: phoneCheck, rsn:'잘못된 전화번호 형식입니다.'}
        , {check: !joinCheck, rsn:'이미 회원가입된 아이디, 전화번호 입니다.'},  {check: emailCheck, rsn:'잘못된 이메일 형식입니다.'}
        , {check: referrerIdCheck, rsn:'유효하지 않은 추천인입니다.'}]

      //회원정보 넣기 (!joinCheck && referrerIdCheck && acceptCheck)
      if(!joinCheck && passwordCheck && emailCheck && referrerIdCheck) {
        join.push({userName: name, userId: id, userPassword: password, userPhone: phone, userBirth: birth
                  , userSmsAccept: smsAccept, userEmail: email, userEmailAccept: emailAccept, userReferrerId: referrerId});
        localStorage.setItem('userInfo', JSON.stringify(join))
        alert(`회원가입 성공`)
        navigate('/login');
      } else {
        for(const {check, rsn} of error) {
          {check ? '' : alert(rsn)}
        }
      } //if_else
  }//onJoinSubmit
  
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const selectedIds = cartItems.map(item => item.id);
  const selectedProductTotal = cartItems.filter(item => selectedIds.includes(item.id)).reduce((acc, cur) => acc + (cur.price * cur.count ), 0);

  const discountAmount = selectedProductTotal * appliedDiscount;
  const deliveryFee = (selectedProductTotal >= 80000 || selectedProductTotal === 0) ? 0 : 3000;
  const finalTotal = selectedProductTotal - discountAmount + deliveryFee;

  const handleAddToCart = (product) => {
    if (cartItems.find(item => item.id === product.id)) {
      
      alert('이미 장바구니에 있는 상품입니다.');
      return;
    }
    cartInput(product);
    alert('장바구니에 상품을 담았습니다.');
  };

  const handleApplyCoupon = (coupon) => {
    if (coupon.name.includes('50%')) {
      setAppliedDiscount(0.5);
      alert('50% 할인이 적용되었습니다!');
    } else {
      setAppliedDiscount(0.1);
      alert('쿠폰이 적용되었습니다.');
    }
  };

  return (
    <Routes>
      {/* 기본 화면: 헤더, 네브, 바디 다 보여주고 싶을 때 */}
      <Route path="*" element={
        <div className='app-container'>
          <div className='sticky-top'>
            <Header />
            <Nav isLogin={isLogin} onLogout={onLogout} />
          </div>
          <Section isLogin={isLogin} id={id} handleApplyCoupon={handleApplyCoupon} handleAddToCart={handleAddToCart} 
                    appliedDiscount={appliedDiscount} selectedIds={selectedIds} selectedProductTotal={selectedProductTotal} setCartItems={setCartItems}
                    discountAmount={discountAmount} deliveryFee={deliveryFee} finalTotal={finalTotal} cartInput={cartInput} cartItems={cartItems}/>
          <SideBar isLogin={isLogin}/>
          <Footer />
        </div>
      } /> 
      
      {/* 로그인 화면: 깔끔하게 로그인 컴포넌트만! */}
      <Route path="/login/*" element={<Login onLoginSubmit={onLoginSubmit}/>} />
      <Route path="/login/find-id" element={<FindId onPhoneSubmit={onPhoneSubmit} onOtpSubmit={onOtpSubmit} otpInfo={otpInfo} setOtpInfo={setOtpInfo} findId={findId}/>} />
      <Route path="/login/find-password" element={<FindPassword onPhoneSubmit={onPhoneSubmit} onOtpSubmit={onOtpSubmit} otpInfo={otpInfo} setOtpInfo={setOtpInfo} findId={findId}/>} />
      <Route path="/login/join" element={<Join onJoinSubmit={onJoinSubmit}/>} />



      {/* 장바구니, 마이페이지 */}
      
      
      <Route path="/payMent" element={loginInfo.isLogin ? <PayMent finalTotal={finalTotal}/> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App