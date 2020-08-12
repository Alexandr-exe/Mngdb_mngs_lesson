const router = require('express').Router();
const { getUsers, findUser, createUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', findUser);
router.post('/', createUser);

module.exports = router;
