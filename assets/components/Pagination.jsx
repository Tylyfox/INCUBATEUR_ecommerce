import React from 'react';
import '../styles/pagination.css'

const Pagination = ({currentPage, itemsPerPage, length, onPageChanged}) => {

    const pagesCount = Math.ceil(length / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (   
        <div className="pagination">
            <ul>
                <li key="prev" className={currentPage === 1 && "disabled"}>
                    <button onClick={() => onPageChanged(currentPage - 1)} className="prev" disabled={currentPage === 1 && "disabled"}>
                        <ion-icon name="chevron-back-circle-outline"></ion-icon>
                    </button>
                </li>
                {pages.map(page => 
                    <li key={page}>
                        <button onClick={()=> onPageChanged(page)} className={"pageNumber" + (currentPage === page && " active")}>
                            {page}
                        </button>
                    </li>
                )}
                <li key="next" className={currentPage === pagesCount && "disabled"}>
                    <button onClick={() => onPageChanged(currentPage + 1)} className='next' disabled={currentPage === pagesCount && "disabled"} >
                        <ion-icon name="chevron-forward-circle-outline"></ion-icon>
                    </button>
                </li>    
            </ul>    
        </div> 
    );
}

Pagination.getData = (items, currentPage, itemsPerPage)=> {
    const start= currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
}
export default Pagination;