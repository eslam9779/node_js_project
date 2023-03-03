const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { checkToken } = require("../auth/token_validation")
const router = express.Router();
const { getProducts, addUser, getUser, getUserById, updateUser, getDataByName, getDataBySeller,
    addOrder, getAllOrders, getOrderById, deleteOrder} = require('../controllers/user');


//register
router.post("/register", (req, res, next) => {
    var user = req.body;
    addUser(user).then(([rows]) => {
        res.status(200).json({ message: " Registered Successfully" });
    }).catch((err) => {
        res.status(422).json({ error: err });
    });
});
//////////////////////////////////////////////////////////////////////////////////////////////
//login
router.post("/login", (req, res, next) => {

    const { email, password } = req.body;

    //Check if the user exists in the database
    getUser(email).then(result => {
        if (result[0].length === 0) {
            res.status(404).json({ message: 'Wrong Email' });
        } else {
            const user = result[0][0];

            const isPasswordMatch = bcryptjs.compareSync(password, user.password);

            if (isPasswordMatch) {
                const payload = { email: user.email };
                const token = jwt.sign(payload, 'secretkeyeslam', { expiresIn: '1h' });
                res.status(200).json({ message: " login successfully", token: token });
            } else {
                res.status(401).json({ message: ' Password or Email not valid !!' });
            }
        }
    })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get products
router.get("/", (req, res, next) => {
    getProducts().then(([rows]) => {
        res.status(200).json(rows);
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get user by id 
router.get("/profile/:id", checkToken, (req, res, next) => {
    var { id } = req.params;
    getUserById(id).then(([rows]) => {
        res.status(200).json(rows);
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// update user by id 
router.put("/profile/:id", checkToken, (req, res, next) => {
    var { id } = req.params;
    var user = req.body;
    updateUser(id, user).then(([rows]) => {
        res.status(200).json({ message: " Updated Successfully" });
    }).catch((err) => {
        res.status(422).json({ massage:"Error" });
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// get products by name
router.get("/search/products/:name", checkToken, (req, res, next) => {
    var { name } = req.params;
    getDataByName(name).then(([rows]) => {
        res.status(200).json(rows);
    }).catch((err) => {
        res.status(500).json({ massage: err.massage });
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////

// get products by seller 
router.get("/search/products/seller/:seller", checkToken, (req, res, next) => {
    var { seller } = req.params;
    getDataBySeller(seller).then(([rows]) => {
        res.status(200).json(rows);
    }).catch((err) => {
        res.status(500).json({ massage: err.massage });
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////

// add new order 
router.post("/order/", checkToken, (req, res, next) => {
    var order = req.body;
    addOrder(order).then(([rows]) => {
        res.status(200).json({ message: " Order Created Successfully" });
    }).catch((err) => {
        res.status(422).json({ massage: err.massage });
    });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////

// get All orders
router.get("/order/", checkToken, (req, res, next) => {
    var { user_id } = req.body;
    getAllOrders(user_id).then(([rows]) => {
        res.status(200).json(rows);
    }).catch((err) => {
        res.status(500).json({ massage: err.massage });
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////

// get order by id 
router.get("/order/:id", checkToken, (req, res, next) => {
    var { id } = req.params;
    getOrderById(id).then(([rows]) => {
        res.status(200).json(rows);
    }).catch((err) => {
        res.status(500).json({ massage: err.massage });
    });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// delete order 
router.delete("/order/:id", checkToken, (req, res, next) => {
    var { id } = req.params;
    deleteOrder(id).then(([rows]) => {
        res.status(200).json({ message: "  Order Deleted Succsessfully" });
    }).catch((err) => {
        res.status(422).json({ massage: err.massage });
    });
});


module.exports = router;