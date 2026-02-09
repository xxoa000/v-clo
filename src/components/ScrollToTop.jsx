import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname, search } = useLocation();

    //첫 랜더링시에 자동으로 최상단으로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname, search]);

    return null;
};//ScrollToTop

export default ScrollToTop;