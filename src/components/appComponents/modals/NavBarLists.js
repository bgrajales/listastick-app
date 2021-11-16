import React from 'react'

export const NavBarLists = ({ show }) => {
    return (
        <div className={`nav__modal animate__animated animate__slideInLeft ${(!show) ? 'd-none' : ''}`}>
            <div className="nav__expandedListBkg">
                <h1>Categories</h1>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="New Category" />
                    <button className="btn btn-outline-secondary" type="button">Add List</button>
                </div>        
                <div>
                <ul>
                    <li>
                        <p>General</p>
                    </li>
                    <li>
                        <p>Work</p>
                    </li>
                </ul>
                </div>
                <div>
                    <h5>Remove filters</h5>
                    <button className="btn btn-primary"></button>
                </div>
            </div>
        </div>
    )
}
