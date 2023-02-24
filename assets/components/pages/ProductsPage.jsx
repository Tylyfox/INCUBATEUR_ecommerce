import React, { useEffect, useState } from 'react';
import '../../styles/productsPage.css';
import Pagination from '../Pagination';
import SearchBar from '../SearchBar';
import ProductsAPI from "../services/productsAPI";
import img from'../../img/headphone.png';
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
                <SearchBar handleSearch={handleSearch} handleStyle={handleStyle} search={search}/>
                <div className="itemProduct">
                    {paginationProducts.map(product => (
                        <div className="card">
                            <div className="imgBox">
                                <img src={img} alt="picture" />
                            </div>
                            <div className="contentBox">
                                <div className="product">
                                <h3>{product.name}</h3>
                                <div className="price">
                                <h2>{product.price} €</h2>
                                </div>
                                </div>
                                <p>{product.shortDescription}</p>
                                <button><ion-icon name="basket-outline"></ion-icon></button>
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