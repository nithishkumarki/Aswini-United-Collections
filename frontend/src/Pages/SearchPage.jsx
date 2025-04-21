import React from 'react'
import './CSS/SearchPage.css'
const SearchPage = () =>
{
  return (
    <div className='search-page'>
        <div className='search-page-title'>
      <h1 >Search Page</h1>
        </div>
        <div className='search-page-input'>
      <input  type="text" placeholder='Search by product name'/>
      <hr/>
        </div>
    </div>

  )
}

export default SearchPage