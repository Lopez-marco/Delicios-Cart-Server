let router = require('express').Router();
let { models } = require('../db');
let validateSession = require('../Middleware/validate-session');


//Add a coupon
router.post('/addcoupon', validateSession, async (req, res) => {
    let coupon = await models.coupons.create({
        coupon: req.body.coupon
    });
    let user = await models.user.findOne({
        where: { id: req.user.id }
    });
    user.addCoupon(coupon)
        .then(function itemAdded() {
            res.status(200).json({
                message: `Cuopon added!`,
            });
        }
        )
        .catch(err => res.status(500).json({ error: err }))
})

//Delete Coupon

router.delete('/delete/:id', validateSession, (req, res) => {
    models.coupons.destroy({ where: { id: req.params.id } })
        .then(deleted => {
            if (deleted > 0) {
                res.status(200).json({ message: 'Coupon deleted.' })
            } else {
                res.status(500).json({ message: 'Coupon does not exist.' })
            }
        })
        .catch(err => res.status(500).json(err))
})

///Get all Coupons

router.get('/addedcoupons', validateSession, (req, res) => {
    models.coupons.findAll({ where: { userId: req.user.id }, order: [['id', 'ASC']] })
        .then(items => {
            if (items.length > 0) {
                res.status(200).json(items);
            } else {
                res.status(420).json([]);
            }
        })
        .catch(err => res.status(500).json(err))
});

module.exports = router;

