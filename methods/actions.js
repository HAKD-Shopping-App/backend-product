var User = require("../models/user");
var config = require("../config/dbconfig");

var functions = {
  addNew: async function (req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
      res.json({ success: false, msg: "Enter all fields" });
    } else {
      const userStatus = await User.findOne({
        email: req.body.email,
        user_role: "tourist",
      }).exec();
      if (userStatus) {
        res
          .status(403)
          .send({
            success: false,
            msg: "Email you entered is already registered",
          });
      } else {
        var newUser = User({
          user_role: "tourist",
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
      }
      newUser.save(function (err, newUser) {
        if (err) {
          res.json({ success: false, msg: "Failed to save" });
        } else {
          res.json({ success: true, msg: "Successfully saved" });
        }
      });
    }
  },



  addGuide: async function (req, res) {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.nic ||
      !req.body.address ||
      !req.body.contact_no ||
      !req.body.password ||
      !req.body.image ||
      !req.body.certification
    ) {
      res.json({ success: false, msg: "Enter all fields" });
    } else {
      const userStatus = await User.findOne({
        email: req.body.email,
        user_role: "guide",
      }).exec();
      if (userStatus) {
        res
          .status(403)
          .send({
            success: false,
            msg: "Email you entered is already registered",
          });
      } else {
        var newUser = User({
          user_role: "guide",
          name: req.body.name,
          email: req.body.email,
          nic: req.body.nic,
          address: req.body.address,
          contact_no: req.body.contact_no,
          password: req.body.password,
          image: req.body.image,
          certification: req.body.certification,
        });
      }
      newUser.save(function (err, newUser) {
        if (err) {
          res.json({ success: false, msg: "Failed to save" });
        } else {
          res.json({ success: true, msg: "Successfully saved" });
        }
      });
    }
  },

  checkEmailAvailability: function (req, res) {
    User.findOne(
      {
        email: req.body.email,
        user_role: req.body.user_role,
      },
      function (err, user) {
        if (err) throw err;
        if (!user) {
          res.json({ success: true });
        } else {
          res.json({ success: false });
        }
      }
    );
  },

  authenticate: function (req, res) {
    User.findOne(
      {
        email: req.body.email,
      },
      function (err, user) {
        if (err) throw err;
        if (!user) {
          res
            .status(403)
            .send({
              success: false,
              msg: "Authentication Failed, User not found",
            });
        } else {
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              var token = jwt.encode(user, config.secret);
              res.json({ success: true, token: token });
            } else {
              return res
                .status(403)
                .send({
                  success: false,
                  msg: "Authentication failed, wrong password",
                });
            }
          });
        }
      }
    );
  },
  getinfo: function (req, res) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      var token = req.headers.authorization.split(" ")[1];
      var decodedtoken = jwt.decode(token, config.secret);
      return res.json({ success: true, msg: decodedtoken.name });
    } else {
      return res.json({ success: false, msg: "No Headers" });
    }
  },

  addActivity: function (req, res) {
    if (!req.body.activity || !req.body.img) {
      res.json({ success: false, msg: "Enter all fields" });
    } else {
      var newActivity = Activity({
        activity: req.body.activity,
        img: req.body.img,
      });
      newActivity.save(function (err, newActivity) {
        if (err) {
          res.json({ success: false, msg: "Failed to save" });
        } else {
          res.json({ success: true, msg: "Successfully saved" });
        }
      });
    }
  },

  //     viewActivity: function (req, res){ Activity.find((err, docs) => {
  //         if (!err) {
  //             res.render("list", {
  //                 data: docs
  //             });
  //         } else {
  //             //console.log('Failed to retrieve the Course List: ' + err);
  //         }
  //     })
  // },

  user: async function (req, res) {
    try {
      const user = await User.find({email:req.params.email, user_role: "tourist"} );
      res.json(user);
    } catch (err) {
      res.send("Error" + err);
    }
  },

  viewActivity: async function (req, res) {
    try {
      const activities = await Activity.find();
      res.json(activities);
    } catch (err) {
      res.send("Error" + err);
    }
  },

  viewActivity1: async function (req, res) {
    try {
      const activity = await Plan.find({ activity: "Hiking" });
      res.json(activity);
    } catch (err) {
      res.send("Error" + err);
    }
  },

  viewActivity2: async function (req, res) {
    try {
      const activity = await Plan.find({ activity: "Ballooning" });
      res.json(activity);
    } catch (err) {
      res.send("Error" + err);
    }
  },

  viewActivity3: async function (req, res) {
    try {
      const activity = await Plan.find({ activity: "Kayaking" });
      res.json(activity);
    } catch (err) {
      res.send("Error" + err);
    }
  },

  viewActivity4: async function (req, res) {
    try {
      const activity = await Plan.find({ activity: "Surfing" });
      res.json(activity);
    } catch (err) {
      res.send("Error" + err);
    }
  },

  addHotel: function (req, res) {
    if (
      !req.body.hotelName ||
      !req.body.noOfRooms ||
      !req.body.location ||
      !req.body.manager ||
      !req.body.phnNo ||
      !req.body.img
    ) {
      res.json({ success: false, msg: "Enter all fields" });
    } else {
      var newHotel = Hotel({
        hotelName: req.body.hotelName,
        noOfRooms: req.body.noOfRooms,
        location: req.body.location,
        manager: req.body.manager,
        phnNo: req.body.phnNo,
        img: req.body.img,
      });
      newHotel.save(function (err, newHotel) {
        if (err) {
          res.json({ success: false, msg: "Failed to save" });
        } else {
          res.json({ success: true, msg: "Successfully saved" });
        }
      });
    }
  },

  viewHotel: async function (req, res) {
    try {
      const hotels = await Hotel.find();
      res.json(hotels);
    } catch (err) {
      res.send("Error" + err);
    }
  },

  viewBookings: async function (req, res) {
    try {
      const hotels = await Booking.find();
      res.json(hotels);
    } catch (err) {
      res.send("Error" + err);
    }
  },

  viewTourPlan: async function (req, res) {
    try {
      var ObjectId = require("mongodb").ObjectId;

     const plan = await Plan.find({ planId: req.params.planId });
      const guide = await User.find({ _id: new ObjectId(req.params.guide) });
      res.json({ plan, guide });
    } catch (err) {
      res.send("Error" + err);
    }
  },

  viewTourPlan1: async function (req, res) {
    try {
     
      res.json( await Plan.find());
    } catch (err) {
      res.send("Error" + err);
    }
  },

  bookedPlan: async function (req, res) {
    try {
     
     const booked = await Booking.find({ tourist: req.params.email, status: "Booked"});
     const plans = await Booking.find({ tourist: req.params.email,status: "Booked" },{planId: 1, _id:0});
     let temp = [];
     plans.forEach((element) => {
      temp.push(element['planId'])});
 

     const plans1 = await Plan.find({  planId: { $in: temp } });
      
      res.json({ booked, plans1});
    } catch (err) {
      res.send("Error" + err);
    }
  },

  ongoingPlan: async function (req, res) {
    try {
     
     const booked = await Booking.find({ tourist: req.params.email, status: "Ongoing"});
     const plans = await Booking.find({ tourist: req.params.email,status: "Ongoing" },{planId: 1, _id:0});
     let temp = [];
     plans.forEach((element) => {
      temp.push(element['planId'])});
 

     const plans1 = await Plan.find({  planId: { $in: temp } });
    
      
      res.json({ booked, plans1});
    } catch (err) {
      res.send("Error" + err);
    }
  },

  completedPlan: async function (req, res) {
    try {
     
     const booked = await Booking.find({ tourist: req.params.email, status: "Completed"});
     const plans = await Booking.find({ tourist: req.params.email, status: "Completed" },{planId: 1, _id:0});
     let temp = [];
     plans.forEach((element) => {
      temp.push(element.planId)
    });
      
     const plans1 = await Plan.find({  planId: { $in: temp } });
     
      res.json({ booked, plans1});
    } catch (err) {
      res.send("Error" + err);
    }
  },

  cancelledPlan: async function (req, res) {
    try {
     
     const booked = await Booking.find({ tourist: req.params.email, status: "Cancelled"});
     const plans = await Booking.find({ tourist: req.params.email,status: "Cancelled" },{planId: 1, _id:0});
     let temp = [];
     plans.forEach((element) => {
      temp.push(element['planId'])});
 

     const plans1 = await Plan.find({  planId: { $in: temp } });
      
      res.json({ booked, plans1});
    } catch (err) {
      res.send("Error" + err);
    }
  },

  viewPlan: async function (req, res) {
    // //console.log(req)
    // res.send(req.params.activity)
    const data = req.params.activity.slice(1, req.params.activity.length - 1);
    const arrayDat = data.split(", ");
    const data1 = req.params.destination.slice(
      1,
      req.params.destination.length - 1
    );
    const arrayDat1 = data1.split(", ");
    const data2 = req.params.payment.replace(/ .*/, "");

    // arrayDat.forEach(element => {
    //     // //console.log(element)
    // });
    // //console.log(typeof JSON.parse( req.params.activity))
    // //console.log($range: [ req.params.duration - 2, req.params.duration +2, 1 ])
    try {
      //     // //console.log(req.params.activity)
      const tourplans = await Plan.find({
        activity: { $in: arrayDat },
      }).find({
        destination: { $in: arrayDat1 },
      });
      // .find
      // ({
      //     payment_method: data2
      // })
      // .find
      // ({
      //     duration: req.params.duration
      //     // duration: {$range: [ req.params.duration - 2, req.params.duration +2, 1 ]}
      // }).find
      // ({
      //     // max_travellers: {$range: [ 1 , req.params.travellers, 1 ]}
      //     max_travellers: req.params.travellers
      // })
      // res.json(tourplans)
      //console.log(tourplans)
      let temp = [];
      let temp1 = [];

      tourplans.forEach((element) => {
        //console.log(element);
        //console.log(element.duration);
        //console.log(req.params.duration -2);
        //console.log(element.duration >= (req.params.duration -2));
        if (
          element.duration >= req.params.duration - 2 &&
          element.duration <= req.params.duration + 2 &&
          element.max_travellers >= req.params.travellers
        ) {
          if (element.payment_method == "Both") {
            temp.push(element);
          } else if (element.payment_method == "Card" && data2 == "Card") {
            temp.push(element);
          } else if (element.payment_method == "Cash" && data2 == "Cash") {
            temp.push(element);
          }
        }
      });
      //console.log("All filtered tour plans");
      // console.log(temp);
      await Promise.all(temp.map(async (element) => {
        //console.log("each element");
        console.log(element);
        //console.log(element.planId);
        //console.log(req.params.start_date);
        let end_date = new Date(req.params.end_date);
        //console.log(new Date(req.params.end_date))
        // +"T00:00:00.000+00:00"
        let start_date = new Date(req.params.start_date);
        // +"T00:00:00.000+00:00"
        console.log((end_date))
        console.log("ll")
        console.log((start_date))
        //console.log(typeof(new Date(req.params.end_date)))
        //console.log(typeof(req.params.end_date+ 'T00:00:00.000+00:00'))
        //console.log(new Date(req.params.end_date+ 'T00:00:00.000+00:00'))
        let current_date =new Date()

        const plans = await Booking.find({
          planId: element.planId,
        }).find({
          status: "Booked",
        // }).find({
        //     $and:
        //      [{ startDate: {
        //           '$gt':  current_date,
        //           '$gt':  current_date
        //       },

        //       endDate: {
        //           '$gt':  current_date,
        //           '$gt':  current_date
        //       }}]
        }).find({
              $or:
               [{ 
                
                startDate: {
                    '$gte':  start_date  
                },

                startDate: {
                  '$lte':  start_date  
              },

                startDate: {
                  '$lte':  end_date  
                },

                endDate: {
                    '$gte':  start_date,
                },

                endDate: {
                  '$lte':  end_date,
                },

                endDate: {
                  '$gte':  end_date,
                },
                

              }],  
                   
        })
        // .find({
        //       $and:
        //       [{ startDate: {
        //           '$lte':  end_date,
        //           '$gte':  start_date
        //       },
      
        //       endDate: {
        //           '$gte':  start_date,
        //           '$lte':  end_date,
        //       }}],
        // })
       
      
      
        //console.log("booking element");
        console.log("filtered")
        console.log(plans)
        console.log(current_date)
        console.log(start_date)
        // console.log("before push")
        if (plans.length == 0) {
          temp1.push(element);
        }
        // console.log(temp1)

        // if(plans==null)
        //console.log("available plans");
        //console.log(temp1);
      }));

      //console.log("available for booked plans");
      console.log(temp1);
      res.json(temp1);

      // //console.log(temp);
      // res.json(temp)
    } catch (err) {
      res.send("Error" + err);
    }
  },

  addPlan: async function (req, res) {
    if (
      !req.body.planId ||
      !req.body.planName ||
      !req.body.destination ||
      !req.body.rating ||
      !req.body.price ||
      !req.body.img ||
      !req.body.activity
    ) {
      res.json({ success: false, msg: "Enter all fields" });
    } else {
      var newPlan = Plan({
        planId: req.body.planId,
        planName: req.body.planName,
        destination: req.body.destination,
        rating: req.body.rating,
        price: req.body.price,
        activity: req.body.activity,
        img: req.body.img,
      });
      newPlan.save(function (err, newPlan) {
        if (err) {
          res.json({ success: false, msg: "Failed to save" });
        } else {
          res.json({ success: true, msg: "Successfully saved" });
        }
      });
    }
  },

  addBooking: async function (req, res) {
    if (!req.body.planId || !req.body.startDate || !req.body.endDate) {
      res.json({ success: false, msg: "Enter all fields" });
    } else {
      var newBooking = Booking({
        planId: req.body.planId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      });
      newBooking.save(function (err, newBooking) {
        if (err) {
          res.json({ success: false, msg: "Failed to save" });
        } else {
          res.json({ success: true, msg: "Successfully saved" });
        }
      });
    }
  },

  viewCab: async function (req, res) {
    try {
      const cab = await Cab.find();
      res.json(cab);
    } catch (err) {
      res.send("Error" + err);
    }
  },

  addCab: async function (req, res) {
    if (
      !req.body.driverName ||
      !req.body.rating ||
      !req.body.noReview ||
      !req.body.rate ||
      !req.body.vehicle ||
      !req.body.passsengers ||
      !req.body.city
    ) {
      res.json({ success: false, msg: "Enter all fields" });
    } else {
      var newCab = Cab({
        driverName: req.body.driverName,
        rating: req.body.rating,
        noReview: req.body.noReview,
        rate: req.body.rate,
        vehicle: req.body.vehicle,
        passsengers: req.body.passsengers,
        city: req.body.city,
      });
      newCab.save(function (err, newCab) {
        if (err) {
          res.json({ success: false, msg: "Failed to save" });
        } else {
          res.json({ success: true, msg: "Successfully saved" });
        }
      });
    }
  },
  
  filterDestination: async function (req, res) {
    // //console.log(req)
    // res.send(req.params.activity)
    const data = req.params.activity.slice(1, req.params.activity.length - 1);
    const arrayDat = data.split(", ");
    arrayDat.forEach((element) => {
      //console.log(element)
    });
    // //console.log(typeof JSON.parse( req.params.activity))
    // try{
    // //     // //console.log(req.params.activity)
    //     const tourplans = await Plan.find({

    //         activity:  { $in: arrayDat }
    // },).distinct("destination")
    //     res.json(tourplans)
    // }
    try {
      //     // //console.log(req.params.activity)
      const tourplans = await Plan.find(
        {
          activity: { $in: arrayDat },
        },
        { destination: 1, img: 1, _id: 0 }
      );

      let temp = [];
      let temp1 = [];

      tourplans.forEach((element) => {
        //console.log(element)
        //console.log(element.destination)
        // //console.log(element.destination.length)
        const data4 = element.destination;
        // const data3=data4.splice(2, 0).split(", ")
        // //console.log(data3)
        data4.forEach((element) => {
          //console.log(element)
        });

        data4.forEach((element1) => {
          array3 = { destination: element1, img: element.img };
          //console.log(array3)
          temp.push(array3);
        });

        temp1 = [temp[0]];

        temp.map((res, index) => {
          let isValueHave = false;
          temp.map((item, index2) => {
            if ((item.destination == res.destination && index != index2) || index ==0) {
              isValueHave = true;
            }
          });
          if (!isValueHave) {
            temp1.push(res);
          }
        });
      });

      //console.log(temp1);
      res.json(temp1);
    } catch (err) {
      res.send("Error" + err);
    }
  },

  viewGuide: async function (req, res) {
    try{
        const users = await User.find({email: req.params.guide})
        res.json(users)
    }
    catch(err){
        res.send('Error'+err)
    }
  },

  guideViewPlan: async function (req, res) {
      try {
        var ObjectId = require("mongodb").ObjectId;

        const plan = await Plan.find({ guideId: new ObjectId(req.params.id) });
        res.json(plan);
      } 
      catch (err) {
        res.send("Error" + err);
      }
    },


    viewRequestedPlan: async function (req, res) {
      try {
          var ObjectId = require("mongodb").ObjectId;
          const plan = await Plan.find({ guideId: new ObjectId(req.params.id) },{ planId: 1, _id: 0 });
          let temp = [];
          let temp1 = [];
          let temp3 = [];
  
          plan.forEach((element) => {
            temp.push(element.planId)
          });
               
          const plan1 = await Booking.find({planId: {$in:temp}, status: "Requested"});
  
          await Promise.all(plan1.map(async(element) => {
              const tourist = await User.find({email: element['tourist'], user_role: "tourist"});
              const plan2 = await Plan.find({ planId: element['planId']});
              console.log("plan..............")
              console.log(plan2)
              console.log("tourist..............")
              console.log(tourist)
              tourist.forEach((element) => {
                temp1.push(element)
                console.log(element)
              });
              console.log("temp2")
              console.log(temp1)
              plan2.forEach((element) => {
                temp3.push(element)
                console.log(element)
              });
              console.log("temp3")
              console.log(temp3)
              
              // console.log(tourist)
              //  console.log(temp3)
              //console.log(element,tourist,plan2)
          }));
          res.json({booking:plan1,plan:temp3,tourist:temp1});
          // console.log(tourist)
          // console.log(plan2)
          //console.log(temp2)
      } 
      catch (err) {
        res.send("Error" + err);
      }
    },

    viewUpcomingPlan: async function (req, res) {
      try {
          var ObjectId = require("mongodb").ObjectId;
          const plan = await Plan.find({ guideId: new ObjectId(req.params.id) },{ planId: 1, _id: 0 });
          let temp = [];
          let temp1 = [];
          let temp3 = [];
  
          plan.forEach((element) => {
            temp.push(element.planId)
          });
               
          const plan1 = await Booking.find({planId: {$in:temp}, status: "Booked"});
  
          await Promise.all(plan1.map(async(element) => {
              const tourist = await User.find({email: element['tourist'], user_role: "tourist"});
              const plan2 = await Plan.find({ planId: element['planId']});
              console.log("plan..............")
              console.log(plan2)
              console.log("tourist..............")
              console.log(tourist)
              tourist.forEach((element) => {
                temp1.push(element)
                console.log(element)
              });
              console.log("temp2")
              console.log(temp1)
              plan2.forEach((element) => {
                temp3.push(element)
                console.log(element)
              });
              console.log("temp3")
              console.log(temp3)
              
              // console.log(tourist)
              //  console.log(temp3)
              //console.log(element,tourist,plan2)
          }));
          res.json({booking:plan1,plan:temp3,tourist:temp1});
          // console.log(tourist)
          // console.log(plan2)
          //console.log(temp2)
      } 
      catch (err) {
        res.send("Error" + err);
      }
    },

    viewOngoingPlan: async function (req, res) {
      try {
          var ObjectId = require("mongodb").ObjectId;
          const plan = await Plan.find({ guideId: new ObjectId(req.params.id) },{ planId: 1, _id: 0 });
          let temp = [];
          let temp1 = [];
          let temp3 = [];
  
          plan.forEach((element) => {
            temp.push(element.planId)
          });
               
          const plan1 = await Booking.find({planId: {$in:temp}, status: "Ongoing"});
  
          await Promise.all(plan1.map(async(element) => {
              const tourist = await User.find({email: element['tourist'], user_role: "tourist"});
              const plan2 = await Plan.find({ planId: element['planId']});
              console.log("plan..............")
              console.log(plan2)
              console.log("tourist..............")
              console.log(tourist)
              tourist.forEach((element) => {
                temp1.push(element)
                console.log(element)
              });
              console.log("temp2")
              console.log(temp1)
              plan2.forEach((element) => {
                temp3.push(element)
                console.log(element)
              });
              console.log("temp3")
              console.log(temp3)
              
              // console.log(tourist)
              //  console.log(temp3)
              //console.log(element,tourist,plan2)
          }));
          res.json({booking:plan1,plan:temp3,tourist:temp1});
          // console.log(tourist)
          // console.log(plan2)
          //console.log(temp2)
      } 
      catch (err) {
        res.send("Error" + err);
      }
    },

    addBook: async function (req, res) {
      
        var newBook = Booking({
          planId: req.body.planId,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          status: "Booked",
          placedDate: req.body.placedDate,
          tourist: req.body.tourist,
          
        });
        newBook.save(function (err, newBook) {
          if (err) {
            res.json({ success: false, msg: "Failed to save" });
          } else {
            res.json({ success: true, msg: "Successfully saved" });
          }
        });
      
    },

};

module.exports = functions;
