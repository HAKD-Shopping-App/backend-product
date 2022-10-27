const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.get('/dashboard', (req, res) => {
    res.send('Dashboard')
})

//@desc Adding new user
//@route POST /adduser
router.post('/adduser', actions.addNew)
router.post('/addguide', actions.addGuide)
// router.post('/addpicture', actions.addpicture)

//@desc Authenticate a user
//@route POST /authenticate
router.post('/authenticate', actions.authenticate)

//@desc Get info on a user
//@route GET /getinfo
router.get('/getinfo', actions.getinfo)
router.post('/checkEmailAvailability', actions.checkEmailAvailability)

router.post('/activities', actions.addActivity)
router.get('/getactivities', actions.viewActivity)
router.get('/getactivities1', actions.viewActivity1)
router.get('/getactivities2', actions.viewActivity2)
router.get('/getactivities3', actions.viewActivity3)
router.get('/getactivities4', actions.viewActivity4)

router.post('/addhotels', actions.addHotel)
router.get('/viewhotels', actions.viewHotel)

router.get('/viewplans/:activity/:destination/:payment/:duration/:travellers/:start_date/:end_date', actions.viewPlan)
router.get('/viewplan/:planId/:guide', actions.viewTourPlan)
router.get('/viewTourplan', actions.viewTourPlan1)

router.get('/bookedPlan/:email', actions.bookedPlan)
router.get('/ongoingPlan/:email', actions.ongoingPlan)
router.get('/completedPlan/:email', actions.completedPlan)
router.get('/cancelledPlan/:email', actions.cancelledPlan)
router.post('/addplans', actions.addPlan)
router.post('/addbooking', actions.addBooking)
router.get('/viewbooking', actions.viewBookings)

router.get('/viewcabs', actions.viewCab)
router.post('/addcabs', actions.addCab)

router.get('/filterDestination/:activity', actions.filterDestination)
router.get('/user/:email', actions.user)

router.get('/viewGuide/:guide', actions.viewGuide)
router.get('/guideViewPlan/:id', actions.guideViewPlan)

router.get('/viewRequestedPlan/:id', actions.viewRequestedPlan)
router.get('/viewUpcomingPlan/:id', actions.viewUpcomingPlan)
router.get('/viewOngoingPlan/:id', actions.viewOngoingPlan)



module.exports = router