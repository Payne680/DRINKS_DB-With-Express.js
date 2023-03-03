var express = require('express');
const { Op } = require("sequelize");
const User = require('../database/user');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res) {
  const users = await User.findAll()
  res.send(users);
});

router.post('/', async function (req, res) {
  const { firstName, lastName, emailAddress, phone, password } = req.body;
  const user = await User.create({
    firstName,
    lastName,
    emailAddress,
    phone,
    password,
    apiKey: Date.now()
  })
  res.send(user)
});

router.get('/:id', async function (req, res) {
  const user = await User.findByPk(req.params.id)
  res.send(user);
});

router.put("/:id", async function (req, res) {
  const { firstName, lastName, emailAddress, phone, password } =req.body;
  const user = await User.update({
    firstName,
    lastName,
    emailAddress,
    phone,
    password,
  },{
    where:{
      id:req.params.id
    }
  });
  res.send(user);
});

router.patch("/:id", async function (req, res) {
  const { firstName, lastName, emailAddress, phone, password } =req.body;
  const user = await User.update({
    firstName,
    lastName,
    emailAddress,
    phone,
    password,
  },{
    where:{
      id:req.params.id
    }
  });
  res.send(user);
});

router.delete('/:id', async function (req, res) {
   await User.destroy({
    where: {
      id: req.params.id,
    }
  })
  res.send("status: success");
});

module.exports = router;
