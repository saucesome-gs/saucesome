const router = require('express').Router();
const { Order, OrderItem, User } = require('../db/models');
const nodemailer = require('nodemailer');
const secrets = require('../../secrets.js')

// mailing
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'saucesomegs@gmail.com',
      pass: secrets
    }
  });

var mailOptions = {
  from: 'saucesomegs@gmail.com',
  to: 'saucesomegs@gmail.com',
  subject: 'Thanks for your order!',
  text: 'That was easy!'
};

// transporter.sendMail(mailOptions, function(error, info){
//   console.log('password is ', secrets)
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

router.post('/', (req, res, next) => {
  Order.create({
    status: 'purchased'
  })
  .then(createdOrder => {
    const orderId = createdOrder.dataValues.id;
    req.body.map(orderItem => {
      OrderItem.create({
        orderId,
        productId: orderItem.productId,
        priceId: orderItem.priceId
      })
    })
  })
  .then(() => res.status(201).send('ORDER RECEIVED AND ORDER ITEMS DB\'D') )
  .catch(next)
})

router.put('/:orderId', (req, res, next) => {
  Order.update({
    status: 'purchased'
  }, {
    where: {id: req.params.orderId},
  })
  .then(updatedOrder => {
    res.status(200).json(updatedOrder)
  })
  .catch(next)
})

module.exports = router;

