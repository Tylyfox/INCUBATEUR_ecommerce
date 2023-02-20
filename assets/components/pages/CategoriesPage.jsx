import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/categoriesPage.css';

const CategoriesPage = (props) => {

    const [categories, setCategories] = useState([]);

    useEffect(()=> {
        axios.get("https://127.0.0.1:8000/api/categories")
        .then(response =>response.data['hydra:member'])
        .then(data => setCategories(data));
    }, []);

    return ( 
        <>
        <div className='table'>
            <section className='tableHeader'>
                 <h1>Liste des catégories</h1>
            </section>
            <section className='tableBody'>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nom</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(categorie => (
                            <tr>
                            <td>{categorie.id}</td>
                            <td>{categorie.name}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </section> 
        </div>
        </>
    );
}
 
export default CategoriesPage;