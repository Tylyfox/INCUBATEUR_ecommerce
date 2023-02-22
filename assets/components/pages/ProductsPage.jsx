import React,{useEffect, useState} from 'react';
import axios from 'axios';
import '../../styles/productsPage.css';
import Pagination from '../services/Pagination';

const ProductsPage = (props) => {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(()=> {
        axios.get("https://127.0.0.1:8000/api/produits")
        .then(response =>response.data['hydra:member'])
        .then(data => setProducts(data))
        .catch(error=> console.log(error.response));;
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    }
    const itemsPerPage = 12;

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.name.toLowerCase().includes(search.toLowerCase())
    )

    const paginationProducts = Pagination.getData(
        filteredProducts, 
        currentPage, 
        itemsPerPage);

    return ( 
        <>
           <div className="productContainer">
                <div className="search">
                    <form action="">
                        <input type="text" onChange={handleSearch} value={search} className="" placeholder='Rechercher ...' />
                    </form>
                </div>
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
                {itemsPerPage < filteredProducts.length && 
                    <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredProducts.length} onPageChanged={handlePageChange}/>
                }
            </div>
        </> 
    );
}
 
export default ProductsPage;