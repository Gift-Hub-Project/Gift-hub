import React, { useState } from "react";
import { Link } from "react-router-dom";
import searchFunction from './search.js';

const Header =({ isLoggedIn, setIsLoggedIn}) => {

    const [searchInputQuery, setSearchInputQuery] = useState('');

    const [baskets, setBaskets]=useState([
        {id:1, text:'mom'},
        {id:2, text:'dad'}
    ]);

    const [searchResults, setSearchResults] =useState([]);
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchInputQuery(query);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if(searchInputQuery.trim() ==="") {
            setSearchResults([]);
        } else{
            const results = searchFunction(searchInputQuery, baskets);
            setSearchResults(results);
        }
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
                    <form id="search" onSubmit ={handleSearchSubmit}>
                        <label htmlFor="searchInput">
                            Find <i className="classsearch"></i>
                        </label>
                        <input 
                            id="searchInput" 
                            type="text" 
                            placeholder="Search"
                            value={ searchInputQuery }
                            onChange={ handleSearchChange }
                        ></input>
                        <button type="submit">Search</button>
                    </form>
                    {searchResults.length > 0 && (
                        <ul id="results">
                            {searchResults.map((basket) => (
                                <li key={basket.id} className="basket">
                                {basket.text}
                                </li>
                            ))}
                        </ul>
                    )}
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