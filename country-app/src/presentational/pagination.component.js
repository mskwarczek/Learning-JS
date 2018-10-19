import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const Pagination = props => (
    <div>
        <span>Results on page: </span>
        <button onClick={props.setPages.bind(null, 5, 1)}>5</button>
        <button onClick={props.setPages.bind(null, 10, 1)}>10</button>
        <button onClick={props.setPages.bind(null, 15, 1)}>15</button><br/>
        <span>Page: {props.activePage}</span>
        <nav aria-label="Search result pages">
            <ul className="pagination">
                <li className="page-item"><button className="page-link" onClick={props.previousPage.bind()}>Previous</button></li>
                <li className="page-item"><button className="page-link" onClick={props.nextPage.bind()}>Next</button></li>
            </ul>
        </nav>
    </div>
);

export default Pagination;