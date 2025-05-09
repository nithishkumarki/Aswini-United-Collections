const port=4000;
const express=require('express');
const app=express();//crating app instance
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const multer=require('multer');
const path=require('path');// to get aceess to backend directory
const cors=require('cors');

app.use(express.json());
app.use(cors());

// database connection with mongodb //mongo to express connection
mongoose.connect("mongodb+srv://nithishkumar:nithishkumar@cluster1.xaszr.mongodb.net/ecommerce");

//API Creation

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

//Image Storage Engine

const storageVariable=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)}
})

//previosu storage +new uploads
const upload=multer({storage:storageVariable})

//creating upload endpoint for image
app.use('/images',express.static('upload/images'))

app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//Schema for Crating Product

const Product=mongoose.model("Product",{
    id:{type:Number,required:true},
    name:{type:String,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true},
    new_price:{type:Number,required:true},
    old_price:{type:Number,required:true},
    date:{type:Date,default:Date.now},
    available:{type:Boolean,default:true}
})

app.post('/addproduct', async (req, res) => {
    try {
      let products = await Product.find({});
      let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
  
      const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
      });
  
      await product.save();
      res.json({ success: true, name: req.body.name });
    } catch (error) {
      console.error("Error saving product:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

//API for delete
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");

    res.json({
        success:true,
        name:req.body.name
    })
})

//Creating API for getting all products
app.get('/allproducts',async(req,res)=>{
    let allProducts=await Product.find({});
    console.log(allProducts);
    console.log("all products fetched");
    
    res.send(allProducts);
})

//Shema creating for user mode

const Users=mongoose.model('users',{
    name:{type:String,required:true},
    email:{type:String,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,},
    date:{type:Date,default:Date.now,}
})



//API for user registration
app.post('/signup',async(req,res)=>
{
    let check=await Users.findOne({email:req.body.email});
    if(check)
    {
        return res.status(400).json({sucess:false,error:"Email Already Exists"});
    }

    let cart={};
    for(let i=0;i<300;i++)
    {
        cart[i]=0;
    }
    const user=new Users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    });

    await user.save();

    const data={
        user:{
            id:user.id
        }
    }

    const token=jwt.sign(data,'secret_ecom');
    
    res.json({success:true,token})

})

//login API
app.post('/login',async(req,res)=>
    {
    let user=await Users.findOne({email:req.body.email});

    if(user)
    {
        const passCompare=req.body.password===user.password;
        if(passCompare)
        {
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else
        {
            res.json({success:false,error:"Invalid password"});
        }
        

    }
    else{
        res.json({success:false,errors:"email id not found"});
    }
}
)

// creating or new collection

app.get('/newcollections',async(req,res)=>
    {
    // last 8 products which were alled will be displayed
    let products=await Product.find({});
    let newCollection = products.slice(-12);
    console.log("NewColections Fecthed");
    res.send(newCollection);
})

//creating endpitn
app.get('/popularinwomen',async(req,res)=>{
    let products=await Product.find({category:"women"});
    let popular_in_women=products.slice(0,4);
    console.log("Popular i women fetcheed");
    res.send(popular_in_women);
})

//creating middleware to fetch user
const fetchUser=async(req,res,next)=>
{
     const token=req.header('auth-token');
     if(!token)
        {
            res.status(401).send({errors:"Please autendiacate using valid token"});
        }         
        else{
            try{
              const data=jwt.verify(token,'secret_ecom');
              req.user=data.user;
              next();
            }
            catch(error)
            {
                res.status(401).send({errors:"please authenticate using valid token"});
            }
        }
}

///createing endpoint for cadding product ub cart data

app.post('/addtocart',fetchUser, async(req,res)=>{
    console.log("added",req.body.itemId);
    // console.log(req.body,req.user);
    let userData=await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");

})

//creating to fill users prvious product in cart
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData=await Users.findOne({_id:req.user.id})
    res.json(userData.cartData);
});

app.post('/getuser',fetchUser,async(req,res)=>{
    console.log("GetUser");
    let userData=await Users.findOne({_id:req.user.id})
    console.log("User Data:", userData);
    res.json(userData);
})

//creating endponit to remove cart data
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userData=await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    {
        userData.cartData[req.body.itemId]-=1;

    }
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed");
})

//Payment
const Razorpay = require('razorpay');
const crypto = require('crypto');
const razorpay = new Razorpay({
    key_id: 'rzp_test_OqKM3VAcZ1O5bK',
    key_secret: 'EtC1e9X1cBsIPCQNxiNysxG8',
  });

  const Orders = mongoose.model("orders", {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
});

app.post('/updateorder', async (req, res) => 
{
    const { name, email, address, city, state, pincode } = req.body;
    const order = new Orders
    ({
        name,
        email,
        address,
        city,
        state,
        pincode
    });

    await order.save();
    res.json({ success: true });
});

app.get('/allOrders',async(req,res)=>
{
    try{
        console.log("Fetching all orders...");
        let allOrders=await Orders.find({});   
        console.log(allOrders); 
        res.send(allOrders);
    }
    catch(error)
    {
        console.log("Error fetching orders:", error);
        res.status(500).json({ error: "Internal server error" });
    }
   
});

app.post('/place-order',async(req,res)=>{
    const {amount}=req.body;
    const options
    =
    {
        amount:amount*100,
        currency:"INR", 
        receipt:`receipt_order_${Math.floor(Math.random()*10000)}`,
    }
    try
    {
         const order=await Razorpay.orders.create(options);
         res.json({success:true,order})
    }
    catch(err)
    {
        res.status(500).json({error:err.message});
    }

})
app.delete('/deleteorder/:name', async (req, res) => {
    try {
        const orderName = req.params.name;
        const deletedOrder = await Orders.findOneAndDelete({ name: orderName });

        if (deletedOrder) {
            res.json({ success: true, message: 'Order deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Order not found' });
        }
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


app.listen(port,(error)=>{
       if(!error)
       {
        console.log("Server Running on Port"+port);
       }
       else{
        console.log("Error : "+error);
       }
})