var product = require("../models/product");
var config = require("../config/dbconfig");

var functions = {

    getProducts: async function (req, res) {
        try {
          const products = await product.find();
          res.json(products);
        } catch (err) {
          res.send("Error" + err);
        }
      },
      getProductsMen: async function (req, res) {
        try {
          const products = await product.find({category:"men"});
          res.json(products);
        } catch (err) {
          res.send("Error" + err);
        }
      },
      getProductsWomen: async function (req, res) {
        try {
          const products = await product.find({category:"women"});
          res.json(products);
        } catch (err) {
          res.send("Error" + err);
        }
      },

    getProductById: async function (req, res) {
        try {
        var ObjectId = require("mongodb").ObjectId;

          const products = await product.find({_id:new ObjectId(req.params.id)});
          res.json(products);
        } catch (err) {
          res.send("Error" + err);
        }
      },

    addProduct: function (req, res) {
        if (
          !req.body.cat ||
          !req.body.bName ||
          !req.body.name ||
          !req.body.price ||
          // !req.body.band_colour ||
          !req.body.quantity 
          // || !req.body.seller

        ) {
          res.json({ success: false, msg: "Enter all fields" });
        } else {
          var newProduct = product({
            category: req.body.cat,
            brand: req.body.bName,
            product_name: req.body.name,
            price: req.body.price,
            band_colour: 'pink',
            quantity: req.body.quantity,
            seller: '635a70dc2365613f525238c9',
            
          });
          newProduct.save(function (err, newProduct) {
            if (err) {
              res.json({ success: false, msg: "Failed to save" });
            } else {
              res.json({ success: true, msg: "Successfully saved" });
            }
          });
        }
      },

    updateProduct: async function (req, res) {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = { new: true };

              const products = await product.findByIdAndUpdate(id, updates, options);
              if (!products) {
                throw createError(404, 'Product does not exist');
              }
              res.send(products);
            } catch (err) {
              res.send("Error" + err);
            }
          },
    decreaseQuantity: async function (req, res) {
      product.updateOne({ _id: req.body.id}, { $inc: {quantity:-1}}, function(
        err,
        result
      ) {
        if (err) {
          res.send(err);
        } else {
          res.json(result);
        }
      });
      
        
          },

    increaseQuantity: async function (req, res) {
            product.updateOne({ _id: req.params.id}, { $inc: {quantity:+(req.params.quantity)}}, function(
              err,
              result
            ) {
              if (err) {
                res.send(err);
              } else {
                res.json(result);
              }
            });
            
              
                },      

    deleteProduct: async function (req, res) {
            try {           
                const id = req.params.id;
    
                  const products = await product.findByIdAndDelete(id);
                  if (!products) {
                    throw createError(404, 'Product does not exist');
                  }
                  res.send(products);
                } catch (err) {
                  res.send("Error" + err);
                }
              },

    searchByCategory: async function (req,res){
        product.find({
          category: req.query['category']
        }, function(err,product){
            if(err) throw err
            if(!product){
                res.json({success:false})
            }
            else{
                res.json({success:true,products:product})
            }

        })
    }

};

module.exports = functions;
