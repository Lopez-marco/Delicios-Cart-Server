let router = require('express').Router();
const sequelize = require('../db');
let { models } = require('../db');
let validateSesh = require('../Middleware/validate-session');
let Op = require('sequelize').Op;


//Add a category
router.post('/add', validateSesh, async (req, res) => {
    let category = await models.categories.create({
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
});

//get All categories default and user
router.get('/all', validateSesh, async (req, res) => {
    // try {
    //     let defaultCategories = await models.categories.findAll({ where: { default: true }});
    //     let userCategories = await models.categories.findAll({ where: { userId: req.user.id }, order: [['id', 'ASC']] });
    //     if(defaultCategories && userCategories) {
    //         let allCategories = defaultCategories.concat(userCategories);
    //             res.status(200).json(allCategories)
    //     }
    // } catch (err) {
    //     res.status(500).json({ error: err })
    // }
    models.categories.findAll({
            where: {
                [Op.or]: [{default: true}, {userId: req.user.id}]
            }
        })
        .then((result) => {
            res.status(200).json(result);
        }
        )
        .catch(err => res.status(500).json({ error: err }))
});

//get all user categories
router.get('/all-user', validateSesh, (req, res) => {
    models.categories.findAll({ where: { userId: req.user.id }, order: [['id', 'ASC']] })
        .then(categories => {
            res.status(200).json(categories);
        })
        .catch(err => res.status(500).json(err))
});

//update a category
router.put('/edit/:id', (req, res) => {
    const categoryEdit = { name } = req.body;
    models.categories.update(categoryEdit, { where: { id: req.params.id } })
        .then(updated => {
            if (updated > 0) {
                res.status(200).json({ message: 'Category updated.' })
            } else {
                res.status(500).json({ message: 'Category not found, no updates performed.' })
            }
        })
        .catch(err => res.status(500).json(err))
})

//delete a category
router.delete('/delete/:id', (req, res) => {
    models.categories.destroy({ where: { id: req.params.id } })
        .then(deleted => {
            if (deleted > 0) {
                res.status(200).json({ message: 'Category deleted.' })
            } else {
                res.status(500).json({ message: 'Category does not exist.' })
            }
        })
        .catch(err => res.status(500).json(err))
})


module.exports = router;
