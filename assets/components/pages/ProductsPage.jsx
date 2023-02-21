import React,{useEffect, useState} from 'react';
import axios from 'axios';
import '../../styles/productsPage.css';

const ProductsPage = (props) => {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=> {
        axios.get("https://127.0.0.1:8000/api/produits")
        .then(response =>response.data['hydra:member'])
        .then(data => setProducts(data))
        .catch(error=> console.log(error.response));;
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const itemsPerPage = 10;
    const pagesCount = Math.ceil(products.length / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    
    const start= currentPage * itemsPerPage - itemsPerPage;
    const paginationProducts = products.slice(start, start + itemsPerPage);

    return ( 
        <>
           <div className="productContainer">
                <div className="itemProduct">
                    {paginationProducts.map(product => (
                        <div className="card">
                   <div className="imageBox">
                        <img src={product.mainPicture} alt="mainPicture" />
                   </div>
                   <div className="content">
                        <div className="contentBox">
                            <h3>{product.name}</h3>
                            <div className="contentDetails">
                                <p className='titleDetail'>Catégorie</p>
                                <p>{product.category.name}</p>
                                <p className='titleDetail'>Prix</p>
                                <p>{product.price} €</p>
                                <p className='titleDetail'>Description</p>
                                <p>{product.shortDescription}</p>
                            </div>
                            <div className="contentLink">
                                <ul>
                                    <li key="panierLogo" style={{"--i":"1"}}><a href="#"><ion-icon name="basket-outline"></ion-icon></a></li>
                                    <li key="plusLogo" style={{"--i":"2"}}><a href="#"><ion-icon name="arrow-forward-outline"></ion-icon></a></li>
                                </ul>
                            </div>
                        </div>
                   </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    <ul>
                        <li key="prev" className={currentPage === 1 && "disabled"}>
                            <button onClick={() => handlePageChange(currentPage - 1)} className="prev" disabled={currentPage === 1 && "disabled"}>
                                <ion-icon name="chevron-back-circle-outline"></ion-icon>
                            </button>
                        </li>
                        {pages.map(page => <li key={page}>
                                                <button onClick={()=> handlePageChange(page)} className={"pageNumber" + (currentPage === page && " active")}>
                                                    {page}
                                                </button>
                                            </li>
                        )}
                        <li key="next" className={currentPage === pagesCount && "disabled"}>
                            <button onClick={() => handlePageChange(currentPage + 1)} className='next' disabled={currentPage === pagesCount && "disabled"} >
                                <ion-icon name="chevron-forward-circle-outline"></ion-icon>
                            </button>
                        </li>    
                    </ul>    
                </div>
            </div>
        </> 
    );
}
 
export default ProductsPage;