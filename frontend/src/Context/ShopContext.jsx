import React,{createContext, useEffect, useState} from "react";
export const ShopContext=createContext(null);

const getDefaultCart=()=>
{
      let cart={};
      
      for(let index=0;index<300+1;index++)
      {
           cart[index]=0;
      }
      return cart;
}



const ShopContextProvider=(props)=>
{
      
      const [all_product,setAll_Product]=useState([]);

      const [cartItems,setCartItems]=useState(getDefaultCart());

      const [userData,setUserDetails]=useState([]);

      useEffect(()=>{
         fetch('http://localhost:4000/allproducts')
         .then((response)=>response.json())
         .then((data)=>setAll_Product(data))



         if(localStorage.getItem('auth-token'))
         {
            fetch('http://localhost:4000/getcart',{
                  method:'POST',
                  headers:{
                        Accept:'application/form-data',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Conten-Type':'application/json',

                  },
                  body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data)); 
            
            fetch('http://localhost:4000/getuser',{
                  method:'POST',
                  headers:{
                        Accept:'application/form-data',
                        'auth-token':`${localStorage.getItem('auth-token')}`,
                        'Conten-Type':'application/json',

                  },
                  body:"",      
            })
            .then((response)=>response.json())
            .then((data)=>setUserDetails(data));
            
         }

      },[])

       console.log("got the user"+userData.name);
      
      const addToCart=(itemId)=>
      { 
             if(!localStorage.getItem('auth-token'))
             {
                  alert("Please Login to add items to cart");
                  return;     
             }
            
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));

            // console.log(cartItems);
            if(localStorage.getItem('auth-token'))
            {
                  fetch('http://localhost:4000/addtocart',{
                        method:'POST',
                        headers:{
                              Accept:'application/form-data',
                              'auth-token':`${localStorage.getItem('auth-token')}`,
                              'Content-Type':'application/json',
                        },
                        body:JSON.stringify({"itemId":itemId})
                  })
                  .then((response)=>response.json())
                  .then((data)=>console.log(data));
            }
       }

       

      const removeFromCart=(itemId)=>
      { 
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
            if(localStorage.getItem('auth-token'))
            {
                  fetch('http://localhost:4000/removefromcart',{
                        method:'POST',
                        headers:{
                              Accept:'application/form-data',
                              'auth-token':`${localStorage.getItem('auth-token')}`,
                              'Content-Type':'application/json',
                        },
                        body:JSON.stringify({"itemId":itemId})
                  })
                  .then((response)=>response.json())
                  .then((data)=>console.log(data));
            }
       }

        const getTotalCartAmount=()=>
      {
            let totalAmount=0;
            for(const item in cartItems)
            {
                  if(cartItems[item]>0)
                  {
                        let itemInfo=all_product.find((product)=>product.id===Number(item));
                        totalAmount+=itemInfo.new_price*cartItems[item];
                  }
            }
            return totalAmount;
        }

        const getTotalCartItems=()=>
       {
            let totalItems=0;
            for(const item in cartItems)
            {
                  if(cartItems[item]>0)
                  {
                        totalItems+=cartItems[item];
                  }
            }
            return totalItems;
        }

      const contextValue={getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,userData};

         
      return(
            <ShopContext.Provider value={contextValue}>
                 {props.children}
           </ShopContext.Provider>
          )
}

export default ShopContextProvider
