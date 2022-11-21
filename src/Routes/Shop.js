import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { fetchCategoriesAsync } from "../Store/categories/categories.action";
import CategoriesPreview from './CategoriesPreview';
import Category from './Category';
import '../Styles/Shop.styles.scss';

const Shop = () => {

    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(fetchCategoriesAsync());
        }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview />}/>
            <Route path=':category' element={<Category />}/>
        </Routes>
    );
}

export default Shop;

