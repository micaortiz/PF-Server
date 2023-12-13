

const {
  postReviewHandler,
} = require("../../handlers/reviewHandler/postReviewHandler");


const postReview = async (req, res) => {
  try {
    const { UserId, reviewText, rating, productId } = req.body;
    const reviews = await postReviewHandler(
      UserId,
      reviewText,
      rating,
      productId
    );

    if (!reviews) return res.status(404).send("Reviews not found");
    console.log("Review created:", reviews);
    return res.status(201).json(reviews);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = {
  postReview
};
