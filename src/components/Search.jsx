import {useState, useRef, useEffect} from 'react'
import {useNavigate, NavLink} from 'react-router-dom'
import { useProduct } from '../context/ProductContext';


export default function Search() {
    const [textVal,setTextVal] = useState(''); /* 검색어 입력 이벤트용 선언*/
    const [open, setOpen] = useState(false); /* 검색창에 포커스가 있을때만 연관검색창이 뜨도록 */

    const navigate = useNavigate(); /* 검색 결과로 주소 이동용*/
    const { product } = useProduct(); /* 상품 data 가져오기 */
    const searchRef = useRef(null);

    //외부 클릭 감지
    useEffect(()=> {
        const clickOutside = (e) => {
          if (searchRef.current && !searchRef.current.contains(e.target)) {
            setOpen(false);
          }
        };//clickOutside
        document.addEventListener('mousedown', clickOutside);
        return () => document.removeEventListener('mousedown',clickOutside);
    },[]);//useEffect

    /* 검색창: 엔터, 혹은 버튼을 누르면 검색주소로 이동하는 이벤트 */
    const onClickSubmit = () => {
        if (textVal.trim() === "") return; 
        const query = textVal.toLowerCase();
        navigate(`/productList?query=${query}&page=1`);
        setOpen(false);
    }

    /* 검색단어와 일치하는 연관상품들을 검색창 아래에 띄워주는 기능 */
    const searchItem = product
        .filter( ({ title })=>
            title.toLowerCase().includes(textVal.toLowerCase())
    ).map( ({ id, title }) => (
        <li key={id} className="search-li">
            <NavLink to={`/productDetail?id=${id}`} className="nav-link">
                {title} 
            </NavLink>
        </li>
    ));

    return (
    <div id= "search" ref={searchRef}>
        <div id = "searchDiv">
            <input type = "text"
                value = {textVal}
                onChange = {(e) => {
                    setTextVal(e.target.value); //검색어 입력할때마다 글자 자동 리랜더링
                    if (e.target.value.trim() !== '' && !open) setOpen(true);
                }} 
                onKeyDown = {(e) => {
                    if(e.key=='Enter') onClickSubmit();
                    // 엔터를 쳐도 주소 이동
                }}
                onFocus = {() => {
                    if (textVal.trim() !== '') setOpen(true);
                }}
            />
            <button className="search-icon" onClick={onClickSubmit}> {/* 버튼을 누르면 주소 이동*/}
                <img className="icon" 
                    src="/public/images/to-look-for-icon-brown.jpg" 
                    alt="search-icon" height="25"
                />
            </button>
        </div>

        {/* 검색단어가 있을때만 연관상품창 띄움 */}
        <div>
            {open && textVal.trim() !== "" && (
                <ul className="searchLi">
                    {searchItem}
                </ul>
            )}
        </div>
    </div>
)}//Search
