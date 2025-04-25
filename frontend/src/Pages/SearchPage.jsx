import React from 'react'
import './CSS/SearchPage.css'
import Trending from '../Components/Trending/Trending'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item'
const SearchPage = () =>
{
     //hi
  const [searchText,setSearchText]=React.useState('');
  const {all_product}=React.useContext(ShopContext);

  const handleSearchText=(e)=>{
    setSearchText(e.target.value);
  };

  return (
    <div className='search-page'>
          
         <h1 >SEARCH</h1>
        <div className='search-page-input'>
        <input onChange={handleSearchText} value={searchText}  type="text" placeholder='Search by product name'/>
        <hr/>
        </div>

        <div className='search-page-products'>
         {
         searchText==""? 
         <Trending/>
         :
         all_product. map((item,i)=>{
          if(item.name.substring(0,searchText.length)===searchText)
          {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>   
          }
          else{
            return null;
          }
         })
         }
        </div>


    </div>

  )
}

export default SearchPage