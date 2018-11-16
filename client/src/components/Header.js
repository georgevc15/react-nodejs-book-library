import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
    <header className="navbar navbar-bright navbar-fixed-top" role="banner">
    <div className="container">
      <div className="navbar-header">
        <Link to="/" className="navbar-brand">List Books</Link>
        <Link to="/addbook" className="navbar-brand">Add books</Link>
      </div>
    </div>
    </header>
);

export default Header;