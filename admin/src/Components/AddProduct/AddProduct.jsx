import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

import all_products from '../productAssets/all_product';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""});

  const imageHandler = (e) => 
  {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };


  const Add_Product = async () => {
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);
        //upload image to server
    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData,
    })
    .then((resp) => resp.json())
    .then((data) => { responseData = data });
      //uploading product data to server
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);

      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {
        data.success ? alert("Product Added") : alert("Failed");
      });
    }
  };
  
  
 

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" placeholder="Type Product here" name='name' />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" placeholder="Type here" name='old_price' />
        </div>

        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" placeholder="Type here" name='new_price' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className='addproduct-itemfield'>
        <label htmlFor='file-input'>
          <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' />
        </label>
        <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
      </div>

      <button onClick={() => { Add_Product() }} className='addproduct-btn'>ADD</button>
       {/* <button onClick={() => { Add_All_Product() }} className='addproduct-btn'>ADD_All_Product</button>  */}
    </div>
  );
};

export default AddProduct;