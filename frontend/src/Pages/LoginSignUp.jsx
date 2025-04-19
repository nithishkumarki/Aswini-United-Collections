import React,{useState} from 'react'
import './CSS/LoginSignUp.css'

const LoginSignUp = () => {

   const[state,setState]=useState("Login");

   const[formData,setFormData]=useState({
    name:"",
    password:"",
    email:""
   })

   const changeHandler=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
   }

   const login=async()=>
  {


    console.log("Function login",formData);

    
    let responseData;

    await fetch('http://localhost:4000/login', 
    {
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
     }).then((response)=>response.json()).then((data)=>responseData=data)

      if(responseData.success)
        {
          localStorage.setItem('auth-token',responseData.token);
          if (formData.email === 'admin@gmail.com' && formData.password === 'admin') {
            window.location.replace('http://localhost:5173/'); // Redirect to admin page
          } else {
            window.location.replace("/");
            // navigate('/'); // Redirect to the Shopping page
          }
          console.log(responseData.token);
        }
        else{

          alert(responseData.error);
        }
        


  }

  const signup=async()=>{

     console.log("Function Signup",formData);

      let responseData;

      await fetch('http://localhost:4000/signup',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'Content-Type':'application/json',

        },
        body: JSON.stringify(formData),

      })

      .then((response)=>response.json())
      .then((data)=>responseData=data)


      if(responseData.success)
      {
        localStorage.setItem('auth-token',responseData.token);
        window.location.replace("/");
      }
      else{
        alert(responseData.error);
      }
      
   }

  return (
    <div className='loginsignup'>

      <div className="loginsignup-container">

        <h1>{state}</h1>

        <div className="loginsignup-fields">

          {state==="Sign Up"?<input type="text" name="name" value={formData.name} onChange={changeHandler} id="" placeholder='Your Name' />:<></>}
          <input type="email" id="" name="email" value={formData.email} onChange={changeHandler} placeholder='Email Address' />
          <input type="password" value={formData.password} onChange={changeHandler} name="password" id="" placeholder='Password' />
        </div>

        <button onClick={()=>{state==="Login"?login():signup()}}  > Continue </button>

        {state==="Sign Up"? <p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState("Login")}}>Login</span></p> :
          <p className='loginsignup-login'>Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span> </p>}
        
       
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>


      </div>
    </div>
  )
}
export default LoginSignUp;

