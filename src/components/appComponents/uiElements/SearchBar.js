import React from 'react'
import 'font-awesome/css/font-awesome.min.css';
import { useSearchParams } from 'react-router-dom';
import { MdDateRange } from 'react-icons/md';
import { FaRegEye, FaRegEyeSlash, FaSearch } from 'react-icons/fa';
import { RiFilterOffLine } from 'react-icons/ri';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useForm } from '../../../hooks/useForm';

export const SearchBar = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const currentFilter = searchParams.get('filter') || 'ALL'
    const currentOrder = searchParams.get('order') || ''

    const [ formValues, handleInputChange ] = useForm({
        search: searchParams.get('search') || '',
    })

    const handleToDosClick = () => {
        setSearchParams({
            page: 1,
            filter: 'ALL',
        })

        handleInputChange({
            target: {
                name: 'search',
                value: '',
            }
        })
    }

    const handleMyDayClick = () => {
        setSearchParams({
            page: 1,
            filter: 'DAY',
        })

        handleInputChange({
            target: {
                name: 'search',
                value: '',
            }
        })
    }

    const handleOrderDateClick = () => {
        setSearchParams({
            page: 1,
            filter: currentFilter,
            order: (currentOrder === 'BY_DATE' ? '' : 'BY_DATE'),
            completed: searchParams.get('completed'),
            search: searchParams.get('search') || '',
        })
    }

    const handleHideCompletedClick = () => {
        setSearchParams({
            page: 1,
            filter: currentFilter,
            order: currentOrder,
            completed: (searchParams.get('completed') === 'false') ? 'true' : 'false',
            search: searchParams.get('search') || '',
        })
    }

    const handleSearchClick = () => {
        setSearchParams({
            page: 1,
            filter: currentFilter,
            order: currentOrder,
            completed: searchParams.get('completed'),
            search: formValues.search,
        })
    }

    return (
        <>
        <div className="searchBar__div">

            
            <input className="searchBar__bar" type="text" onChange={handleInputChange} name="search" value={formValues.search}/>

            <button className="btn btn-primary searchBar__btn" onClick={handleSearchClick}>
                <FaSearch />
            </button>

            <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 250 }}
                overlay={ <Tooltip id="button-tooltip-2" >{(searchParams.get('completed') === 'false') ? 'Show Completed' : 'Hide Completed'}</Tooltip> }
            >
                <button className="btn btn-primary searchBar__secondaryBtn" onClick={ handleHideCompletedClick }>
                    {
                        (searchParams.get('completed') === 'false') 
                            ? <FaRegEyeSlash />
                            : <FaRegEye />
                    }
                </button>
            </OverlayTrigger>

            <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 250 }}
                overlay={ <Tooltip id="button-tooltip-2" >Remove Filters</Tooltip> }
            >
            <button className="btn btn-primary searchBar__secondaryBtn" onClick={ handleToDosClick }>
                <RiFilterOffLine />
            </button>
            </OverlayTrigger>
        </div>
        
        <div className="searchBar__categories">
            <button className={`searchBar__selectionBtn ${(currentFilter === 'ALL' ? 'searchBar__active' : '')}`} onClick={ handleToDosClick }>To-Dos</button>
            <button className={`searchBar__selectionBtn ${(currentFilter === 'DAY' ? 'searchBar__active' : '')}`} onClick={ handleMyDayClick }>My Day</button>

            <OverlayTrigger
                placement="left"
                delay={{ show: 250, hide: 250 }}
                overlay={ <Tooltip id="button-tooltip-2" >Order by date</Tooltip> }
            >
                <div className={`searchBar__selectionCalendar ${(currentOrder === 'BY_DATE' ? 'searchBar__active' : '')}`} onClick={ handleOrderDateClick } >
                    <MdDateRange/>
                </div>
            </OverlayTrigger>

        </div>
        </>
    )
}
