const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
 Tag.findAll({
   include: {
     model: Product,
     through: ProductTag
   }
 }).then(tagData => res.json(tagData))
 .catch(err => {console.log(err);
  res.status(500).json(err);
});
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [{
      model: Product,
      through: ProductTag
      
    }]
  }).then(tagData => res.json(tagData))
  .catch(err => {console.log(err);
   res.status(500).json(err);
  })
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  }).then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
  // create a new tag
});

router.put('/:id', (req, res) => {
  Tag.update(req.body,{
    where:{
     id: req.params.id
    },

    
  }).then(tagData => res.status(200).json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })

  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }) 
});

module.exports = router;
