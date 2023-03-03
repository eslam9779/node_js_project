const {verify} =  require('jsonwebtoken');

module.exports = {

    checkToken: (req, res, next)=>{
        let token =req.get("authorization");
        if(token){
            token1 = token.slice(7);
            verify(token1, "secretkeyeslam", (err, decoded)=>{
                if(err){
                    res.json({message: err.message});
                }
                else{
                    next();
                }
            });
        }
        else{
            res.json({message: "Access Denied User has no Authority"});
        }
    }

}