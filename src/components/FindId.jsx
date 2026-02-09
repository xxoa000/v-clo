import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {IoChevronBack} from 'react-icons/io5'

import '../styles/FindId.css'

export default function FindId({onPhoneSubmit, onOtpSubmit, otpInfo, setOtpInfo, findId}) {
    const navigate = useNavigate();

    // 휴대전화 입력
    const [phone, setPhone] = useState('');
    const handlePhoneChange = (e) => {
        const phonCheck = e.target.value.replace(/[^0-9]/g,'');
        setPhone(phonCheck);
    }

    // 인증번호 입력
    const [otp, setCheckOtp] = useState('');
    const handleOtpChange = (e) => {
        const otpCheck = e.target.value.replace(/[^0-9]/g,'');
        setCheckOtp(otpCheck);
    }

    const {isOtp} = otpInfo;

    return (
    <div className="FindId-container">
        <header>
            <div className='backBtn' onClick={() => {setOtpInfo({...otpInfo, isOtp:false}); navigate(-1);}}><IoChevronBack /></div>
            <br /><h2>{!isOtp ? '아이디 찾기' : '아이디 확인'}</h2>
        </header>
        {!isOtp ? 
        <section className="otp-false">
            <nav><div><span>휴대폰 번호 인증</span></div><div><span>실명 인증</span></div><div><span>이메일 인증</span></div></nav>
            
            <form onSubmit={(e) => {
                                        e.preventDefault();
                                        onPhoneSubmit(phone);
                                    }} className='phone-form'>
                <input className="phone-input input" type="tel" placeholder="휴대폰 번호" value={phone} maxLength={11} 
                        onChange={(e) => handlePhoneChange(e)}/>

                
                <input className="phoneBtn" type="submit" disabled={phone.length<11} value='인증 요청' /> 
                
            </form>
            <form onSubmit={(e) => {
                                        e.preventDefault(); 
                                        onOtpSubmit(otp, phone)
                                    }} className="otp_form">
                <input className="otp-input input" type="text" placeholder="인증번호" value={otp} maxLength={6}
                        onChange={(e) => handleOtpChange(e)}/>

                <input className="otpBtn" type="submit" disabled={otp.length<6} value='아이디 확인' />
            </form>
        </section>

        :

        <section  className="otp-true">
            <div>{findId}</div>
            <input className="otpBtn" onClick={() => {setOtpInfo({...otpInfo, isOtp:false}); navigate(-1);} } value='로그인'/>
        </section>
        }
        
    </div>
    );
}//FindId