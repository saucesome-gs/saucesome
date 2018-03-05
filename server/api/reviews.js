const router = require('express').Router();
const Reviews = require('../db/models/review');
module.exports = router;

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin){
    const err = Error('Unauthorized')
    err.status = 401;
    throw err
  }
  next();
}

// const isLoggedIn

router.get('/', (req, res, next) => {
  Reviews.findAll({ include: [{ all: true }]})
  .then(review => res.json(review))
  .catch(next);
});

router.get('/:reviewid', (req, res, next) => {
  Reviews.findById(req.params.reviewid).then(review => {
    if(review === null) return res.status(404).send();
    else res.json(review);
  });
});

router.post('/', (req, res, next) => {
  Reviews.create(req.body)
  .then(review => res.status(201).json(review))
  .catch(next);
});

router.put('/:reviewid', (req, res, next) => {
  Reviews.findById(req.params.reviewid)
  .then(review => review.update(req.body))
  .then(updatedProduct => res.json(updatedProduct))
  .catch(next);
});

router.delete('/:reviewid', (req, res, next) => {
  Reviews.destroy({
    where: {
      id: req.params.reviewid
    }
  })
  .then(() => res.sendStatus(204))
  .catch(next);
})

