let router = require('express').Router();
let { models } = require('../db');
let validateSesh = require('../Middleware/validate-session');

//add a list
router.post('/add-list', validateSesh, async (req, res) => {
    let shoppingList = await models.shoppingList.create({
        name: req.body.name
    })
    let user = await models.user.findOne({
        where: { id: req.user.id }
    });

    user.addShoppingList(shoppingList)
        .then(function shoppingListAdded() {
            res.status(200).json({
                message: `List added.`,
            });
        }
        )
        .catch(err => res.status(500).json({ error: err }))
});


//add an item (long)
router.post('/add-long', validateSesh, async (req, res) => {
    let item = await models.shoppingList.create({
        item_name, quantity, category
    } = req.body);
    let user = await models.user.findOne({
        where: { id: req.user.id }
    });
    user.addShoppingList(item)
        .then(function itemAdded() {
            res.status(200).json({
                message: `Item added to list!`,
            });
        }
        )
        .catch(err => res.status(500).json({ error: err }))
});

//get all shopping lists
router.get('/all', validateSesh, (req, res) => {
    models.shoppingList.findAll({ where: { userId: req.user.id }, order: [['id', 'ASC']] })
        .then(shoppingList => {
            if (shoppingList.length > 0) {
                res.status(200).json(shoppingList);
            } else {
                res.status(420).json([]);
            }
        })
        .catch(err => res.status(500).json(err))
});

//get one specific shopping list items
router.get('/list/:id', async (req, res) => {
        try {
            const list = await models.shoppingList.findByPk(req.params.id, { include: models.item, order: [[models.item ,'order', 'ASC']] } );
            if (list) {
                res.status(200).json(list);
            } else {
                res.status(420).json([]);
            }
        } catch (err) {
            res.status(500).json(err);
        }
});

//update a list name
router.put('/edit/:id', (req, res) => {
    const listEdit = { name } = req.body;
    models.shoppingList.update(listEdit, { where: { id: req.params.id } })
        .then(updated => {
            if (updated > 0) {
                res.status(200).json({ message: 'List updated.' })
            } else {
                res.status(500).json({ message: 'List not found, no updates performed.' })
            }
        })
        .catch(err => res.status(500).json(err))
});

//update item bought
router.put('/update-item/:id', (req, res) => {
    const bought = req.body.bought;
    models.shoppingList.update(bought, { where: { id: req.params.id } })
            .then(updated => { res.status(200).json(updated) })
            .catch(err => res.status(500).json({message: err.message}))
});
//update item order
router.put('/update-item/:id', (req, res) => {
    const order = req.body.order;
    models.shoppingList.update(bought, { where: { id: req.params.id } })
            .then(updated => { res.status(200).json(updated) })
            .catch(err => res.status(500).json({message: err.message}))
});

//delete a list
router.delete('/delete/:id', (req, res) => {
    models.shoppingList.destroy({ where: { id: req.params.id } })
        .then(deleted => {
            if (deleted > 0) {
                res.status(200).json({ message: 'List deleted.' })
            } else {
                res.status(500).json({ message: 'List does not exist.' })
            }
        })
        .catch(err => res.status(500).json(err))

});

//delete checked items in list
router.delete('/delete-checked/', async (req, res) => {
    models.item.destroy({ where: { id: req.body.checked } })
        .then(deleted => {
            if (deleted > 0) {
                res.status(200).json({ message: 'Items deleted.' })
            }
        })
        .catch(err => res.status(500).json(err))
});

module.exports = router;