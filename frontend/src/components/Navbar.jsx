import React from "react";
import "./Navbar.css";

function Navbar() {
    return (
      <>
      <nav className='container'>
      <div className='logo'>
          <img src="/images/sales_logo.png" alt="logo" />
      </div>
      <ul className='nav-list'>
          <li>Menu</li>
          <li>Location</li>
          <li>About</li>
          <li>Contact</li>
      </ul>
      </nav>
      </>
    )
  }
  
  export default Navbar;