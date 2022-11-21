import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../Store/categories/categories.selector';
import Spinner from '../components/spinner/Spinner';
import '../Styles/Category.styles.scss';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {
                isLoading ? <Spinner />
                    :
                    (
                        <div className='category-container'>
                            {
                                products && products.map((product) => 
                                    <ProductCard key={product.id} product={product} />)
                            }
                        </div>
                    )
            }
        </>
    );
}

export default Category;