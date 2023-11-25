const { Category } = require("../db");

const postCategory = async (req, res) => {
  try {
    const { nameCat } = req.body;
    if (!nameCat) return res.status(400).send("Data is missing");

    const [newCat, created] = await Category.findOrCreate({
      where: {
        nameCat: nameCat,
      },
    });
    if (created) {
      return res.status(200).json(newCat);
    }
    return res.status(403).send("Category already exists");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = {
  postCategory,
};
