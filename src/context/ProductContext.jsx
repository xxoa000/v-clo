import { createContext, useContext, useState } from 'react';
import productData from '../data/Product.json'

//1. 컨텍스트 객체 생성
const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [product, setProduct] = useState(productData);

    return (
    <ProductContext.Provider value={{ product, setProduct }}>
        {children}
    </ProductContext.Provider>
)}//ProductProvider

export function useProduct() {
    const context = useContext(ProductContext);
    
    // context가 undefined라면 Provider 내부가 아니라는 뜻입니다.
    if (context === undefined) {
        throw new Error('useProduct는 ProductProvider 내부에서만 사용할 수 있습니다.');
    }
    return context;
}