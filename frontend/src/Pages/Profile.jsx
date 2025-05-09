import React,{useContext,useState} from 'react'
import { ShopContext } from '../Context/ShopContext'
import bug from '../Components/Assets/bug.png'
import History from '../Components/Assets/History.png'
import './CSS/Profile.css'
function Profile()
{

  const {userData} = useContext(ShopContext);
  console.log(userData);
  const [sidebarStatus,setSidebarStatus]=useState('profileInfo')

  function setSidebarStatusProfileInfo()
  {
      setSidebarStatus('profileInfo')
      console.log('profileInfo');
    }
    function setSidebarStatusPurchaseHistory()
    {
      setSidebarStatus('purchaseHistory')
      console.log('purchaseHistory');
  }
  function profileInfoComponent()
  {
    return(
      <div className='profile-info'>
         <h2>About</h2>
        <hr style={{width:"100%"}}/>
        <div>Name:  {userData.name}</div>
        <hr style={{width:"100%"}}/>
        <div>Email:  {userData.email}</div>
        <hr style={{width:"100%"}}/>
      </div>
    )
  }
  function purchaseHistoryComponent()
  {
    return(
      <div className='purchasehistory'>
        Under Developement
      </div>
    )
  }

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      <hr style={{width:'100%'}}/>
      <div className='profile'>  
    <div className="sidebar">
      <div onClick={setSidebarStatusProfileInfo} className="sidebar-item">
          <img src={bug} alt="" />
          <p style={{color:'black'}}>ProfileInfo</p>
      </div>
      <div onClick={setSidebarStatusPurchaseHistory} className="sidebar-item">
          <img src={History} alt="" />
          <p style={{color:'black'}}>PurchaseHistory</p>
      </div>  
    </div>

    {sidebarStatus==='profileInfo' ?profileInfoComponent():purchaseHistoryComponent()} 
      </div>
    </div>
   
  )
}

export default Profile