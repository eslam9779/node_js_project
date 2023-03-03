const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {checkToken} = require("../auth/token_validation")
const router = express.Router();
const { addUser, getUser, updateUser, getDataBySeller, addProduct, getProductsById, updateProduct, deleteProduct}=require('../controllers/seller');



// Registeration
router.post("/register", (req, res, next)=>{
    var user = req.body;
    addUser(user).then(([rows])=>{
        res.status(200).json({message: " Registered Successfully"});
    }).catch((err)=>{
        res.status(422).json({massage: err.massage});
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// login
router.post("/login", (req, res, next) => {

    const { email, password } = req.body;

    //Check if the user exists in the database
    getUser(email).then(result => {
        if (result[0].length === 0) {
            res.status(404).json({ message: 'Invalid email' });
        } else {
            const user = result[0][0];

            const isPasswordMatch = bcryptjs.compareSync(password, user.password);

            if(isPasswordMatch){
                const payload = {email: user.email };
                const token = jwt.sign(payload, 'secretkeyeslam', { expiresIn: '1h' });
                res.status(200).json({message: " login Successfully", token: token });
            } else {
                res.status(401).json({ message: 'Password Or Email Not Valid !!' });
            }
        }
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////

// update seller data by id 
router.put("/profile/:id", checkToken, (req, res, next)=>{
    var {id} = req.params;
    var user = req.body;
    updateUser(id, user).then(([rows])=>{
        res.status(200).json({message: " Updated Successfully"});
    }).catch((err)=>{
        res.status(422).json({massage: err.massage});
    });
});

///////////////////////////////////////////////////////////////////////////

// get products by seller 
router.get("/product/:seller", checkToken, (req, res, next)=>{
    var {seller} = req.params;
    getDataBySeller(seller).then(([rows])=>{
        res.status(200).json(rows);
    }).catch((err)=>{
        res.status(500).json({massage: err.massage});
    });
});
///////////////////////////////////////////////////////////////////////////

// add new product 
router.post("/product/", checkToken, (req, res, next)=>{
    var product = req.body;
    addProduct(product).then(([rows])=>{
        res.status(200).json({message: "  New Product Created Successfully"});
    }).catch((err)=>{
        res.status(422).json({massage: err.massage});
    });
});
///////////////////////////////////////////////////////////////////////////


// update product 
router.put("/product/:id", checkToken, (req, res, next)=>{
    var {id} = req.params;
    var product = req.body;
    updateProduct(id, product).then(([rows])=>{
        res.status(200).json({message: " Product Updated Successfully"});
    }).catch((err)=>{
        res.status(422).json({massage: err.massage});
    });
});
//////////////////////////////////////////////////////////////////////////////
// get products by id
router.get("/search/product/:id",checkToken,(req, res, next)=>{
    var {id}=req.params
    getProductsById(id).then(([rows])=>{
        res.status(200).json(rows);
    }).catch((err)=>{
        res.status(500).json({massage: "Error "});
    });
});

///////////////////////////////////////////////////////////////////////////
// delete product 
router.delete("/product/:id", checkToken, (req, res, next)=>{
    var {id} = req.params;
    deleteProduct(id).then(([rows])=>{
        res.status(200).json({message: " Product Deleted Successfully"});
    }).catch((err)=>{
        res.status(422).json({massage: err.massage});
    });
});




module.exports = router;