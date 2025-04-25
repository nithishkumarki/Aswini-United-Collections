import React from 'react'
import './Trending.css'
import {useState,useEffect} from 'react'
import Item from '../Item/Item'

const Trending = () => {
   //treding card  s
    const [trendingCards,setTrendingCards]=useState([]);
    
    useEffect(()=>{
        fetch('http://localhost:4000/newcollections').
        then((response)=>response.json()).
        then((data)=>setTrendingCards(data) )
    },[])
  return (
    <div className='trending'>
              
               <h1>TRENDING</h1>
               <hr />
               <div className='trending-cards'>
                    {trendingCards.slice(0,4).map((item,i)=>{
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                    })}
               </div>


    </div>
  )
}
export default Trending;
