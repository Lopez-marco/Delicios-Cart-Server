let router = require('express').Router();
let { models } = require('../db');
let validateSesh = require('../Middleware/validate-session');

//add an item (quick)
router.post('/add-quick', validateSesh, async (req, res) => {
    let item = await models.item.create({
        item_name: req.body.item_name
    });
    let shoppingList = await models.shoppingList.findOne({
        where: { id: req.body.shoppingListId }
    });
    shoppingList.addItem(item)
        .then(function itemAdded() {
            res.status(200).json({
                message: `Item added to list!`,
            });
        }
        )
        .catch(err => res.status(500).json({ error: err }))
})

//add an item (long)
router.post('/add-long', validateSesh, async (req, res) => {
    let item = await models.item.create({
        item_name, quantity
    } = req.body);
    let shoppingList = await models.shoppingList.findOne({
        where: { id: req.body.shoppingListId }
    });
    shoppingList.addItem(item)
        .then(function itemAdded() {
            res.status(200).json({
                message: `Item added to list!`,
            });
        }
        )
        .catch(err => res.status(500).json({ error: err }))
});

//add category
router.post('/add-category', async (req, res) => {
    let category = await models.categories.findOne({
        where: { id: req.body.categoryId }
    }); 
    let item = await models.item.findOne({
        where: { id: req.body.itemId }
    });
    item.setCategory(category.id)
        .then(function categoryAdded() {
            res.status(200).json({
                message: `Category added to item`,
            });
        }
        )
        .catch(err => res.status(500).json({ error: err }))
})

// //get all items
// router.get('/',validateSesh, async (req, res) => {
//     let shoppingList = await models.shoppingList.findOne({
//         where: { id: req.body.shoppingListId }
//     });
//     models.item.findAll({ where: {id: req.shoppingList.id}, order: [['order', 'ASC']]} )
//         .then(items => {
//             if (items.length > 0) {
//                 res.status(200).json(items);
//             } else {
//                 res.status(420).json([]);
//             }
//         })
//         .catch(err => res.status(500).json(err))
// });

//update an item
router.put('/edit/:item', (req, res) => {
    const itemEdit = {
        item_name, quantity, category
    } = req.body;
    models.item.update(itemEdit, { where: { id: req.params.item } })
        .then(updated => {
            if (updated > 0) {
                res.status(200).json({ message: 'Item updated.' })
            } else {
                res.status(500).json({ message: 'Item not found, no updates performed.' })
            }
        })
        .catch(err => res.status(500).json(err))
})

//update item bought(bool) property 
router.put('/update-item/:id', (req, res) => {
    const itemEdit = { bought } = req.body;

    models.item.update(itemEdit, { where: { id: req.params.id } })
        .then(updated => { res.status(200).json(updated) })
        .catch(err => res.status(500).json(err))
})

//update item order 
router.put('/update-item/:id', (req, res) => {
    const itemEdit = { order } = req.body;

    models.item.update(itemEdit, { where: { id: req.params.id } })
        .then(updated => { res.status(200).json(updated) })
        .catch(err => res.status(500).json(err))
})

//delete an item
router.delete('/delete/:item', (req, res) => {
    models.item.destroy({ where: { id: req.params.item } })
        .then(deleted => {
            if (deleted > 0) {
                res.status(200).json({ message: 'Item deleted.' })
            } else {
                res.status(500).json({ message: 'Item does not exist.' })
            }
        })
        .catch(err => res.status(500).json(err))
})




module.exports = router;