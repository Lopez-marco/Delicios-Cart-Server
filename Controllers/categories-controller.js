let router = require('express').Router();
let { models } = require('../db');
let validateSession = require('../Middleware/validate-session');


//Add a category
router.post('/addCategory', validateSession, async (req, res) => {
    let category = await models.categorys.create({
        category: req.body.category
    });
    let user = await models.user.findOne({
        where: { id: req.user.id }
    });
    user.addCategory(category)
        .then(function itemAdded() {
            res.status(200).json({
                message: `Category added!`,
            });
        }
        )
        .catch(err => res.status(500).json({ error: err }))
})

module.exports = router;
