import {useSearchParams,NavLink} from 'react-router-dom';
import '../styles/ProductList.css';
import { useProduct } from '../context/ProductContext';


const SearchResult = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryValue = searchParams.get('query');
    return (
    <div className="searchResult">
        <hr /><br />
        <h3>"{queryValue}"검색 결과</h3>
        <br /><hr />
    </div>
)}//SearchResult

function Category() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { product } = useProduct();
    
    const onClickFilter = (key, value) => {
        if (value === 'all') setSearchParams({});
        else setSearchParams({ [key]:value });
    };

    return (
    <div className="main-box">
        <div className="category-box">
            <button className="category-btn" onClick={()=>{onClickFilter('category','all')}}>All</button>
            <button className="category-btn" onClick={()=>{onClickFilter('category','outer')}}>Outer</button>
            <button className="category-btn" onClick={()=>{onClickFilter('category','top')}}>Top</button>
            <button className="category-btn" onClick={()=>{onClickFilter('category','bottom')}}>Bottom</button>
            <button className="category-btn" onClick={()=>{onClickFilter('category','dress')}}>Dress</button>
            <button className="category-btn" onClick={()=>{onClickFilter('category','accessory')}}>Accessory</button>
        </div>   
        <div className="filter-box">
            <ul>
                <li>
                    <details><summary>모델 선택</summary>
                        <li className="model">하정</li>
                        <li className="model">병묵</li>
                        <li className="model">성준</li>
                        <li className="model">다희</li>
                        <li className="model">순영</li>
                    </details>
                </li>
                <li>신상품</li>
                <li>할인 상품</li>
                <li>추천 상품</li>
                <li>
                    <select>
                        <option>좋아요 순</option>
                        <option>리뷰 많은 순</option>
                        <option>판매량 순</option>
                    </select>
                </li>
                <li>
                    <select>
                    <option>가격 높은 순</option>
                    <option>가격 낮은 순</option>
                    </select>
                </li>
            </ul>
        </div>    
    </div>
)}//Category

export {SearchResult, Category};