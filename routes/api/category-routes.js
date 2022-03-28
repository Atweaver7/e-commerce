const router = require('express').Router();
const { UPSERT } = require('sequelize/types/lib/query-types');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll(
    {
      include: {
        model: Product, attributes:['product_name']
      }
    }
  )
  .then(catData => res.json(catData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  
    Category.findOne({
      where: {
        id: req.params.id
      },
      include: {
        // be sure to include its associated Products
        model: Product,
        attributes: ['category_id']
      }
    }).then(catData => {
      if (!catData) {
        res.status(404).json({ message: 'No category with this ID found.'})
        return;
      }res.json(catData);
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
    })
});


router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then(catData => res.json(catData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  }).then(catData => {
    if (!catData) {
      res.json(404).json({ message: 'No category available with this ID.'})
      return;
    }res.json(catData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(catData => {
    if (!catData) {
      res.status(404).json({ message: 'No category available with this ID'})
      return;
    }res.json(catData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
