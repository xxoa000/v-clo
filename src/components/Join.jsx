import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../styles/Join.css'

export default function Join({onJoinSubmit}) {
    const navigate = useNavigate();
    const now = new Date();
    // selectYear 태그
    const year = [];
    for(let i=now.getFullYear()-14, j=0; i>=1940; i--, j++) {
        year[j] = i ;
    }
    const selectYear = year.map((c) => <option key={c}>{c}</option>);
    // selectMonth 태그
    const month = [];
    for(let i=1; i<13; i++) {
        month[i-1] = i;
    }
    const selectMonth = month.map((c) => <option key={c}>{c}</option>);
    // selectDay 태그
    const day = [];
    for(let i=1; i<32; i++) {
        day[i-1] = i;
    }
    const selectDay = day .map((c) => <option key={c}>{c}</option>);

    

    const [name, setName] = useState('');
    const handleName = (e) => {
        const nameCheck = e.target.value;
        setName(nameCheck);
    }

        const [id, setId] = useState('');
        const handleId = (e) => {
        const idCheck = e.target.value;
        setId(idCheck);
    }
    
    const [passwordF, setPasswordF] = useState('');
    const handlePasswordF = (e) => {
        const passwordFCheck = e.target.value;
        setPasswordF(passwordFCheck);
    }
    const [passwordS, setPasswordS] = useState('');
    const handlePasswordS = (e) => {
        const passwordSCheck = e.target.value;
        setPasswordS(passwordSCheck);
    }
    let password = '';
    if(passwordF===passwordS) {
        password = passwordF;
    }
    
    // 휴대전화 입력
    const [frontPhone, setFrontPhone] = useState('010');
    const handleFrontPhoneChange = (e) => {
        const frontPhoneCheck = e.target.value;
        setFrontPhone(frontPhoneCheck);
    }
    const [middlePhone, setMiddlePhone] = useState('');
    const handleMiddlePhoneChange = (e) => {
        const middlePhoneCheck = e.target.value.replace(/[^0-9]/g,'');
        setMiddlePhone(middlePhoneCheck);
    }
    const [backPhone, setBackPhone] = useState('');
    const handleBackPhoneChange = (e) => {
        const backPhoneCheck = e.target.value.replace(/[^0-9]/g,'');
        setBackPhone(backPhoneCheck);
    }
    // let phone = '';
    // if(middlePhone.length===4 && backPhone.length===4) {
    let phone = frontPhone + middlePhone + backPhone;
    // }
    
    // 생일
    const [birthYear, setBirthYear] = useState(String(now.getFullYear()-14));
    const handleBirthYear = (e) => {
        const birthYearCheck = e.target.value;
        setBirthYear(birthYearCheck);
    }
    const [birthMonth, setBirthMonth] = useState('1');
    const handleBirthMonth = (e) => {
        const birthMonthCheck = e.target.value;
        setBirthMonth(birthMonthCheck);
    }
    const [birthDay, setBirthDay] = useState('1');
    const handleBirthDay = (e) => {
        const birthDayCheck = e.target.value;
        setBirthDay(birthDayCheck);
    }
    let birth = '';
    let monthLength=''
    let dayLength=''
    if(birthMonth.length===1) {monthLength='0'}
    if(birthDay.length===1) {dayLength='0'}
    birth = birthYear + '-' + monthLength + birthMonth + '-' + dayLength + birthDay;
    
    const [smsAccept, setSmsAccept] = useState('');
    const handleSmsAccept = (e) => {
        const smsAcceptCheck = e.target.value;
        setSmsAccept(smsAcceptCheck);
    }
    
    const [frontEmail, setFrontEmail] = useState('');
    const handleFrontEmail = (e) => {
        const frontEmailCheck = e.target.value;
        setFrontEmail(frontEmailCheck);
    }
    const [backEmail, setBackEmail] = useState('');
    const handleBackEmail = (e) => {
        const BackEmailCheck = e.target.value;
        setBackEmail(BackEmailCheck);
    }
    let email = '';
    if(frontEmail.length>3 && backEmail.length>4) {
        email = frontEmail + '@' + backEmail;
    }

    const [emailAccept, setEmailAccept] = useState('');
    const handleEmailAccept = (e) => {
        const emailAcceptCheck = e.target.value;
        setEmailAccept(emailAcceptCheck);
    }
    
    const [referrerId, setReferrerId] = useState('');
    const handleReferrerId = (e) => {
        const referrerIdCheck = e.target.value;
        setReferrerId(referrerIdCheck);
    }
    
    return (
    <div className="Join-container">
        <header>
            <div className='backBtn' onClick={() => {navigate(-1);}}><IoChevronBack /></div>
            <h2>회원가입</h2>
        </header>
        <section>
            <form onSubmit={(e) => {
                                        e.preventDefault();
                                        onJoinSubmit(name, id, password, phone, birth, smsAccept, email, emailAccept, referrerId);
                                        }}>
                <div className="name">이름 <input className="name-input" type="text" onChange={(e) => {handleName(e);}} value={name}/></div> 
                <div className="id">아이디 <input className="id-input" type="text"  onChange={(e) => {handleId(e);}} value={id}/></div>
                <div className="passwordF">비밀번호 <input className="passwordF-input" type="password"  onChange={(e) => {handlePasswordF(e);}} value={passwordF}/></div>
                <div className="passwordS">비밀번호 확인 <input className="passwordS-input" type="password"  onChange={(e) => {handlePasswordS(e);}} value={passwordS}/></div>
                <div className="phone">휴대폰 번호
                    <select className="phone-select"  onChange={(e) => {handleFrontPhoneChange(e);}} value={frontPhone}>
                        <option>010</option>
                        <option>011</option>
                        <option>016</option>
                        <option>017</option>
                    </select>
                    <input className="middlePhone-input" type="text" value={middlePhone} maxLength={4}
                        onChange={(e) => handleMiddlePhoneChange(e)}/>
                    <input className="backPhone-input" type="text" value={backPhone} maxLength={4} 
                        onChange={(e) => handleBackPhoneChange(e)}/>
                </div>
                <div className="birth">생년월일
                    <select className="birthYear-select" onChange={(e) => {handleBirthYear(e);}} value={birthYear}>
                        {selectYear}    
                    </select>
                    <select className="birthMonth-select" onChange={(e) => {handleBirthMonth(e);}} value={birthMonth}>
                        {selectMonth}    
                    </select>
                    <select className="birthDay-select" onChange={(e) => {handleBirthDay(e);}} value={birthDay}>
                        {selectDay}    
                    </select>
                </div>
                <div className="smsAccept accept">SMS,KAKAO 수신여부 
                    <input className="smsAccept-Y" type="radio" name="sms" onChange={(e) => {handleSmsAccept(e)}} value='Y' checked/>예
                    <input className="smsAccept-N" type="radio" name="sms" onChange={(e) => {handleSmsAccept(e)}} value='N'/>아니요
                </div>
                <div className="email">이메일 
                    <input className="frontEmail-input" type="text" onChange={(e) => {handleFrontEmail(e)}} value={frontEmail}/>
                    <span>@</span>
                    <input className="backEmail-input" type="text" onChange={(e) => {handleBackEmail(e)}} value={backEmail}/>
                </div>
                <div className="emailAccept accept">메일수신여부 
                    <input className="emailAccept-Y" type="radio" name="email" onChange={(e) => {handleEmailAccept(e)}} value='Y' checked/>예 
                    <input className="emailAccept-N" type="radio" name="email" onChange={(e) => {handleEmailAccept(e)}} value='N'/>아니요
                    </div>
                <div className="referrerId">추천인아이디 <input type="text"  onChange={(e) => {handleReferrerId(e)}} value={referrerId}/></div>
                <input className="saveBtn" type="submit" value='저장'/><input className="resetBtn" type="reset" value='취소'/>
            </form>
        </section>
    </div>
    );
}//Join