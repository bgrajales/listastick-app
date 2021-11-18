import React from 'react'
import 'font-awesome/css/font-awesome.min.css';
import icons from '../../assets/icons/index'
import { useSearchParams } from 'react-router-dom';


export const SearchBar = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const currentFilter = searchParams.get('filter') || 'ALL'
    const currentOrder = searchParams.get('order') || ''

    const handleToDosClick = () => {
        setSearchParams({
            page: 1,
            filter: 'ALL',
        })
    }

    const handleMyDayClick = () => {
        setSearchParams({
            page: 1,
            filter: 'DAY',
        })
    }

    const handleOrderDateClick = () => {
        setSearchParams({
            page: 1,
            filter: currentFilter,
            order: 'BY_DATE',
            completed: searchParams.get('completed'),
        })
    }

    const handleHideCompletedClick = () => {
        setSearchParams({
            page: 1,
            filter: currentFilter,
            order: currentOrder,
            completed: (searchParams.get('completed') === 'false') ? 'true' : 'false',
        })
    }


    return (
        <>
        <div className="searchBar__div">

            <input className="searchBar__bar" type="text" />

            <button className="btn btn-primary searchBar__btn">Search</button>
            <button className="btn btn-primary searchBar__secondaryBtn"><img src={ icons.eye } alt="Hide Completed" onClick={ handleHideCompletedClick }/></button>
            <button className="btn btn-primary searchBar__secondaryBtn"><img src={ icons.removeFilter } alt="Remove Filters" onClick={ handleToDosClick } /></button>

        </div>
        
        <div className="searchBar__categories">
            <button className={`searchBar__selectionBtn ${(currentFilter === 'ALL' ? 'searchBar__active' : '')}`} onClick={ handleToDosClick }>To-Dos</button>
            <button className={`searchBar__selectionBtn ${(currentFilter === 'DAY' ? 'searchBar__active' : '')}`} onClick={ handleMyDayClick }>My Day</button>
            <button className={`searchBar__selectionBtn ${(currentOrder === 'BY_DATE' ? 'searchBar__active' : '')}`} onClick={ handleOrderDateClick }>Order by Date</button>
        </div>
        </>
    )
}
