var express = require('express');
const { getAllUsers, findUserById, addUser, UpdateUserId, patchAll, DeleteAll } = require('../database/users');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res) {
  const users = await getAllUsers()
  res.send(users);
});

router.post('/', async function (req, res) {
  const userz = await addUser(req.body);
  res.json(userz);
});

router.get('/:id', async function (req, res) {
  const user = await findUserById(req.params.id)
  res.send(user);
});

router.put('/:id',async function (req, res) {
  const updateUser = await UpdateUserId(req.params.id)
  res.send(updateUser);
});

router.patch('/:id', async function (req, res) {
  await patchAll(req.body, +req.params.id);
  const user = await findUserById(req.params.id)
  res.send(user);
});

router.delete('/:id', async function (req, res) {
  const deleteUser = await DeleteAll(req.params.id)
  res.send(deleteUser);
});

module.exports = router;
