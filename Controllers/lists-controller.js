let router = require('express').Router();
let { models } = require('../db');
let validateSesh = require('../middleware/validate-session');

//create a list
router.post('/add-list', validateSesh, async (req, res) => {
    let list = await models.list.create({
        name: req.body.name,
    });
    //create a shopping list
    let shoppingList = await models.shoppingList.create();
    let categories = await models.categories.create()
    categories.addCategories(shoppingList);
    list.addShoppingList(shoppingList);
    let user = await models.user.findOne({
        where: { id: req.user.id }
    });
    user.update({})
    user.addList(list)
        .then(function listCreated() {
            res.status(200).json({
                message: `list added to database`,
            });
        }
        )
        .catch(err => res.status(500).json({ error: err }))
})

//view all by user
router.get('/view-all',validateSesh, (req, res) => {
    models.list.findAll({ where: {userId: req.user.id}, order: [['id', 'ASC']]} )
        .then(lists => {
            if (lists.length > 0) {
                res.status(200).json(lists);
            } else {
                res.status(420).json([]);
            }
        })
        .catch(err => res.status(500).json(err))
});


//get all questions per list
router.get('/view-list/:listId', async (req, res) => {
    try {
        const list = await models.list.findByPk(req.params.listId, { include: models.question, order:  [['id', 'ASC']]});
        /* SELECT questions.question FROM questions
INNER JOIN lists ON questions."listId" = lists.id
WHERE lists.id = 3; */
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
router.put('/edit/:list', (req, res) => {
    const listEdit = {
        name: req.body.name
    }
    models.list.update(listEdit, { where: { id: req.params.list } })
        .then(updated => {
            if (updated > 0) {
                res.status(200).json({ message: 'list updated.' })
            } else {
                res.status(500).json({ message: 'list not found, no updates performed.' })
            }
        })
        .catch(err => res.status(500).json(err))
})

//delete a list
router.delete('/delete/:list', (req, res) => {
    models.list.destroy({ where: { id: req.params.list } })
        .then(deleted => {
            if (deleted > 0) {
                res.status(200).json({ message: 'list deleted.' })
            } else {
                res.status(500).json({ message: 'list does not exist.' })
            }
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router;