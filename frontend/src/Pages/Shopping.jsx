import React,{useRef} from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular';
import Offers from '../Components/Offers/Offers';
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/NewsLetter/NewsLetter';
const Shopping = () => {

  const newCollectionsRef=useRef(null);

  const scrollToNewCollections=()=>{
    newCollectionsRef.current?.scrollIntoView({behavior:'smooth'});
  }

  return (
    <div className='shopping'>
        <Hero onLatestClick={scrollToNewCollections}/>
        <Popular/>
        <Offers onLatestClick={scrollToNewCollections}/>
        <div ref={newCollectionsRef}>
        <NewCollections/>
        </div>
        {/* <NewsLetter/> */}
        
    </div>
  )
}
export default Shopping;
