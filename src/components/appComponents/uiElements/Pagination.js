import React from 'react'
import { useSearchParams } from 'react-router-dom';

export const Pagination = ({length}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = searchParams.get('page') || 1

    const maxPage = Math.ceil((length ? length : 0) / 10)    

    const handleNextPage = () => {
        setSearchParams({ 
          page: parseInt(currentPage) === maxPage 
                  ? maxPage 
                  : parseInt(currentPage) + 1, 
          filter: searchParams.get('filter'),
          order: searchParams.get('order'),
          completed: searchParams.get('completed')
        })
    }

    const handlePrevPage = () => {
        setSearchParams({ 
            page: parseInt(currentPage) <= 1
                    ? 1
                    : currentPage - 1, 
            filter: searchParams.get('filter'),
            order: searchParams.get('order'),
            completed: searchParams.get('completed')
        })
    }

    if (maxPage > 1) { 
      return (
        <div className="pagination__pagesNavigation">
            <ul className="pagination__ul">
                <li className={`pagination__pageItem`}>
                  <div className="pagination__pageLink" aria-label="Previous" onClick={ handlePrevPage }>
                    <span aria-hidden="true">«</span>
                  </div>
                </li>

                <li className={`pagination__pageItem`}>
                  <div className="pagination__pageLink" aria-label="Next" onClick={ handleNextPage }>
                    <span aria-hidden="true">»</span>
                  </div>
                </li> 
              
            </ul>
        </div>
      )
    } else {
      return null
    }
}
