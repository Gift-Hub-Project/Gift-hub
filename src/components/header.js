import React, { useState } from "react";
import { Link } from "react-router-dom";
import { searchFunction } from './search.js';

const Header =({ isLoggedIn, setIsLoggedIn}) => {
    const token = window.localStorage.getItem("giftHub-token");

    const [searchInputQuery, setSearchInputQuery] = useState('');

    const [baskets, setBaskets]=useState([
        {id:1, text:'basket 1'},
        {id:2, text:'basket 2'}
    ]);

    const [searchResults, setSearchResults] =useState([]);
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchInputQuery(query);
        const results = searchFunction(query, baskets);
        setSearchResults(results)
    }
    const logout = () => {
        window.localStorage.getItem("giftHub-token");
        setIsLoggedIn(false);
    };

    return (
        <div>
            <header>
                <span className ="logo">GiftHub</span>
                <div className="headerlinks">
                <div id="search">
                    <label htmlFor="searchInput">
                        Find <i className="classsearch"></i>
                    </label>
                    <input 
                        id="searchInput" 
                        type="text" 
                        placeholder="Search"
                        calye ={searchInputQuery}
                        onChange={handleSearchChange}
                    ></input>
                  </div>
                  <ul hidden id="results">
                    {searchResults.map((basket) => (
                        <li key={basket.id} className="basket">
                        {basket.text}
                        </li>
                    ))}
                  </ul>
                  <Link to="/shoppingcart">Shopping Cart</Link>
                    {
                        isLoggedIn? (
                        <Link to="/" onClick ={logout}>Logout</Link>
                         ) : (
                        <Link to="/login">Login/Register</Link>
                         )
                    }
                </div>
            </header>
        </div>
    );
};

export default Header;