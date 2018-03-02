const router = require('express').Router();
const Products = require('../db/models/product');
module.exports = router;

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin){
    const err = Error('Unauthorized')
    err.status = 401;
    throw err
  }
  next();
}
router.get('/',  (req, res, next) => {
  Products.findAll()
  .then(product => res.json(product))
  .catch(next);
});

router.get('/:productid', (req, res, next) => {
  Products.findById(req.params.productid).then(product => {
    if(product === null) return res.status(404).send();
    else res.json(product);
  });
});

router.post('/', isAdmin, (req, res, next) => {
  console.log(req.body)
  Products.create(req.body)
  .then(product => res.status(201).json(product))
  .catch(next);
});

router.put('/:productid', isAdmin, (req, res, next) => {
  Products.findById(req.params.productid)
  .then(product => product.update(req.body))
  .then(updatedProduct => res.json(updatedProduct))
  .catch(next);
});

router.delete('/:productid', (req, res, next) => {
  Products.destroy({
    where: {
      id: req.params.productid
    }
  })
  .then(() => res.sendStatus(204))
  .catch(next);
})
