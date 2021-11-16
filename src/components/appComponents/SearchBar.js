import React from 'react'
import 'font-awesome/css/font-awesome.min.css';
import icons from '../../assets/icons/index'


export const SearchBar = () => {
    return (
        <>
        <div className="searchBar__div">

            <input className="searchBar__bar" type="text" />

            <button className="btn btn-primary searchBar__btn">Search</button>
            <button className="btn btn-primary searchBar__secondaryBtn"><img src={ icons.eye } alt="Hide Completed" /></button>
            <button className="btn btn-primary searchBar__secondaryBtn"><img src={ icons.removeFilter } alt="Remove Filters"/></button>

        </div>
        
        <div className="searchBar__categories">
            <button className="searchBar__selectionBtn searchBar__active">To-Dos</button>
            <button className="searchBar__selectionBtn">My Day</button>
            <button className="searchBar__selectionBtn">Order by Date</button>
        </div>
        </>
    )
}
