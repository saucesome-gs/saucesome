const router = require('express').Router();
const Products = require('../db/models/products');
module.exports = router;

router.get('/', (req, res, next) => {
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

router.post('/', (req, res, next) => {
  Products.create(req.body)
  .then(product => res.status(201).json(product))
  .catch(next);
});

router.put('/:productid', (req, res, next) => {
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
