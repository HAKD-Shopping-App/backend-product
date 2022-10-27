var product = require("../models/product");
var config = require("../config/dbconfig");

var functions = {
  searchByCategory: function (req,res){
        product.find({
          category: req.query['category']
        }, function(err,products){
            if(err) throw err
            if(!products){
                res.json({success:false})
            }
            else{
                res.json({success:true,products:products})
            }
        })
    }

};

module.exports = functions;
