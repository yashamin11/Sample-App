import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class RecruiterNavbar extends Component {

  render() {

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Sample App</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">

          <li className="navbar-item">
          <Link to="/recruiterprofile" className="nav-link">Profile</Link>
           </li>
          <li className="navbar-item">
          <Link className="nav-link" to="/" onClick={() => {
            localStorage.clear();
            window.location.href = "/"; }}>Logout</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}