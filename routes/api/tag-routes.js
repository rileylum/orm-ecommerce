const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const { id } = req.params;
    const tagData = await Tag.findByPk(id, {
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const { tag_name } = req.body;
    const tagData = await Tag.create({
      tag_name
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const { id } = req.params;
    const { tag_name } = req.body;
    const tagData = await Tag.findByPk(id, {
      include: [{ model: Product }]
    });
    const updateData = await Tag.update({
      tag_name,
      products: tagData.products
    }, {
      where: {
        id
      }
    });
    res.status(200).json(`${updateData} row(s) updated`);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const { id } = req.params;
    const tagData = await Tag.destroy({
      where: {
        id
      }
    });
    res.status(200).json(`${tagData} row(s) deleted`);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
