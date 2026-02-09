import { useState, useEffect, useMemo } from 'react'; // useState를 여기서 가져옵니다.
import { NavLink } from 'react-router-dom';
import '../styles/ProductList.css';
import { useProduct } from '../context/ProductContext';

export default function Home() {
    const { product } = useProduct();

    // 배너 이미지 경로 배열
    const banners = [
        "public/images/banner1.jpg",
        "public/images/banner2.jpg",
        "public/images/banner3.jpg",
        "public/images/banner4.jpg",
        "public/images/banner5.jpg",
        "public/images/banner6.jpg"
    ];

    // require 대신 선언된 useState 사용
    const [currentIndex, setCurrentIndex] = useState(0);

    // 다음 슬라이드로 이동하는 함수
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    // 이전 슬라이드로 이동하는 함수
    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    // 5초 자동 재생 로직
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer); // 메모리 누수 방지
    }, [currentIndex]);

    // 홈 상품 리스트 랜덤하게 띄우기 위한 함수
    const shuffledProducts = useMemo(() => {
        console.log("상품을 새로 섞습니다!"); // 확인용
        return [...product].sort(() => Math.random() - 0.5);
    }, [product]); // 원본 product 데이터가 통째로 바뀌기 전까지는 다시 섞지 않음

    return (
        <div className="mainContainer">
            <div className="banner-container">
                <div className="banner">
                    {/* public 폴더 내 이미지는 /images/... 로 바로 접근 가능합니다 */}
                    <img src={banners[currentIndex]} alt="banner" width="1920" height="600" />
                </div>
                
                <button className="arrow left" onClick={prevSlide}>&#10094;</button>
                <button className="arrow right" onClick={nextSlide}>&#10095;</button>
            </div>

            <ul className="productUl">
                {shuffledProducts.map(({id, img, model, color, category, title, price}) => (
                    <li key={id}>
                        <NavLink to={'/productDetail?id=' + id}>
                            <img src={img} alt={title} className="thumbnail"/><br />
                            <span className="price-span">{price.toLocaleString()}</span><br />
                            <span className="model-span">model</span>{model}<br />
                            {title}<br />
                            {category} <br />
                            {color}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}