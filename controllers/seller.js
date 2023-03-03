const bcryptjs=require('bcryptjs');
const db = require('../utils/db');
const jsonwebtoken = require('jsonwebtoken');
const { json } = require('express');


// Register
function addUser(user){
    var salt = bcryptjs.genSaltSync(10);
    var hashedPassword = bcryptjs.hashSync(user.password, salt);
    return db.execute('INSERT INTO sellers (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, hashedPassword]);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Login
function getUser(email){
    return db.execute("SELECT * FROM sellers WHERE email = ?", [email]);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// update seller by id 
function updateUser(id, user){
    return db.execute("UPDATE sellers SET name=?, email=? WHERE id=?", [user.name, user.email, id]);
}
///////////////////////////////////////////////////////////////////////////

// get Products by seller 
function getDataBySeller(seller){
    return db.execute("SELECT * FROM products WHERE seller=?", [seller]);
}
///////////////////////////////////////////////////////////////////////////
// add new Product 
function addProduct(product){
    return db.execute("INSERT INTO products (name, description, photo, creation_date, seller) VALUES (?,?,?,?,?)", [product.name, product.description, product.photo, product.creation_date, product.seller]);
}
///////////////////////////////////////////////////////////////////////////
// get products by id
function getProductsById(id){
    
     return db.execute("SELECT * FROM products WHERE id=?",[id]);
}

///////////////////////////////////////////////////////////////////////////
// update product 
function updateProduct(id, product){
    return db.execute("UPDATE products SET name=?, description=?, photo=? WHERE id=? AND seller=?", [product.name, product.description, product.photo, id, product.seller]);
}
///////////////////////////////////////////////////////////////////////////
// delete product 
function deleteProduct(id){
    return db.execute("DELETE FROM products WHERE id=?", [id]);
}
///////////////////////////////////////////////////////////////////////////


module.exports = {
    addUser, 
    getUser, 
    updateUser, 
    getDataBySeller,
    addProduct,
    getProductsById,
    updateProduct,
    deleteProduct
};

