import {useSearchParams,NavLink} from 'react-router-dom';
import '../styles/ProductList.css';
import { useProduct } from '../context/ProductContext';
import {SearchResult, Category} from './SearchResult';
import SideBar from './SideBar';

export default function ProductList() {
    const [searchParams, setSearchParams] = useSearchParams();

    // 쿼리스트링의 키값을 받아오기
    const queryValue = 
        searchParams.get('query') || 
        searchParams.get('category') || 
        searchParams.get('model') || 
        searchParams.get('color') ||
        '';

    //쿼리스트링 키값과 일치하는 상품만 필터링
    const { product } = useProduct();
    let searchList = product.filter( ({model, color, category, title}) =>
        model.includes(queryValue) ||
        color.includes(queryValue) ||
        category.includes(queryValue) ||
        title.includes(queryValue)
    );//searchList

    // //검색할 때마다 보이는 상품리스트가 바뀌게 하고 싶으면 아래 변수 활성화 하기
    // const shuffledList = [...searchList].sort(() => Math.random() - 0.5);

    //필터링된 상품을 다시 맵 돌려서 랜더링
    searchList = searchList.map (({id, img, model, color, category, title, price})=> {
        return (
            <li key={id}>
            <NavLink to={'/productDetail?id='+id}>
            <img src={img} alt={title} className="thumbnail" /><br />
            <span className="price-span">{price.toLocaleString()}</span><br />
            <span className="model-span">model</span>{model}<br />
            {title}<br /><hr className="hr-line"/>
            <span className="category-span">{category}</span>&nbsp;
            {color}
            </NavLink></li>
        ); 
    });

    return (
    <>
        <SideBar/>
        {/* 서치 결과가 있을때만 검색결과 창을 상단에 띄움 */}
        {searchParams.get('query')!==null &&
            <SearchResult product={product} searchParams={searchParams} setSearchParams={setSearchParams}/>}
        <Category />
        
        {/* 상품 목록 */}
        <div className="product-box">
            <ul className="productUl">
                {searchList}
            </ul>
        </div>
    </>
)}//ProductList