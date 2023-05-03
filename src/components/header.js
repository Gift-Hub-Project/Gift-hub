import React, { useState } from "react";
import { Link } from "react-router-dom";
import searchFunction from './search.js';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../css/header.css';

const Header =({ loginOut, setLoginOut}) => {

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
        window.localStorage.getItem("token");
        setLoginOut(false);
        //location.reload(true);
    };


    return (
        <div>
            <header id="header">
            <Link className="home" to='/'><span className ="logo">GiftHub</span></Link>
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
                        <button className= "searchbutton" type="submit">Search</button>
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
                    <Link className="occasionslink" to='/occasions'><FontAwesomeIcon icon={faGift}/></Link>
                    <Link className="shopcart" to="/shoppingcart"><FontAwesomeIcon icon={faCartShopping}/></Link>
                            
                        {
                            loginOut? (
                            <Link className="logout" to="/home" onClick ={logout}>Logout</Link>

                            ) : (
                            <Link className="register" to="/login">Login/Register</Link>
                            
                            )
                        }
                        <Link className="burger" to="/occasions"><FontAwesomeIcon icon={faBars}/></Link>
                        
                </div>
            </header>
        </div>
    );
};

export default Header;