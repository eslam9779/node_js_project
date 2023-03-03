const bcryptjs=require('bcryptjs');
const db = require('../utils/db');
const jwt = require('jsonwebtoken');
const { json } = require('express');




// Registration
function addUser(user){
    var salt = bcryptjs.genSaltSync(10);
    var hashedPassword = bcryptjs.hashSync(user.password, salt);
    return db.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, hashedPassword]);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// login
function getUser(email){
    return db.execute("SELECT * FROM users WHERE email = ?", [email]);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// get Products 
function getProducts(){
    return db.execute("SELECT * FROM products");
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// get user by id 
function getUserById(id){
    return db.execute("SELECT id, name, email FROM users WHERE id=?", [id]);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
// update user by id 
function updateUser(id, user){
    return db.execute("UPDATE users SET name=?, email=? WHERE id=?", [user.name, user.email, id]);
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// get Product by id 
function getDataByName(name){
    return db.execute("SELECT * FROM products WHERE name LIKE ?", ["%"+name+"%"]);
}
////////////////////////////////////////////////////////////////////////////////////////////////////
// get Products by seller name
function getDataBySeller(seller){
    return db.execute("SELECT * FROM products WHERE seller=?", [seller]);
}
//////////////////////////////////////////////////////////////////////////////////////////
// make Order  
function addOrder(order){
    return db.execute("INSERT INTO orders (created_date, product_id, user_id) VALUE (?, ?, ?)", [order.created_date, order.product_id, order.user_id]);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// get all orders 
function getAllOrders(user_id){
    return db.execute("SELECT * FROM orders WHERE user_id=?", [user_id]);
}
////////////////////////////////////////////////////////////////////////////////////////////////////

// get order by id  
function getOrderById(id){
    return db.execute("SELECT * FROM orders WHERE id=?", [id])
}
////////////////////////////////////////////////////////////////////////////////////////////////////
// delete order  
function deleteOrder(id){
    return db.execute("DELETE FROM orders WHERE id=?", [id]);
}
////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
    getProducts, 
    addUser, 
    getUser, 
    getUserById, 
    updateUser,  
    getDataByName,
    getDataBySeller,
    addOrder,
    getAllOrders,
    getOrderById,
    deleteOrder
};