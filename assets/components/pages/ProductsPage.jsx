import React, { useEffect, useState } from 'react';
import '../../styles/productsPage.css';
import Pagination from '../Pagination';
import ProductsAPI from "../services/productsAPI";

const ProductsPage = (props) => {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    //permet de récupérer tous les produits
    const fetchProducts = async () => {
        try {
            const data = await ProductsAPI.findAll()
            setProducts(data);
         } catch(error) {
             console.log(error.response)
         }
    }
    //au chargement du composant, on récupère les produits
    useEffect(() => {
        fetchProducts()
    },[]);

    //gestion du changment de page
    const handlePageChange = (page) => setCurrentPage(page);
    
    //gestion de la recherche de produit
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }
    //rend active ou inactive la barre de recherche
    const handleStyle = () => document.querySelector(".searchProducts").classList.toggle('active');
    //nombre de produits par page
    const itemsPerPage = 12;

    //filtrage des produits en fonction de la recherche
    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.name.toLowerCase().includes(search.toLowerCase())
    )
    
    //pagination des données
    const paginationProducts = Pagination.getData(
        filteredProducts, 
        currentPage, 
        itemsPerPage);

    return ( 
        <>
           <div className="productContainer">
                <div className="search">
                    <div className="searchProducts" >
                        <div className="icon" onClick={handleStyle}></div>
                        <div className="input">
                            <input type="text" onChange={handleSearch} value={search} id="mySearch" placeholder='Rechercher ...' />
                        </div>
                    </div>
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