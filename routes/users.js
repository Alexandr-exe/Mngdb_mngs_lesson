const router = require('express').Router();
const { getUsers, findUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', findUser);
// router.patch('/', () => { });

module.exports = router;
