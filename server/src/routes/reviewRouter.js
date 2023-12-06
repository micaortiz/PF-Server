const { Router } = require("express");
const { postReview } = require("../controllers/reviewController/postReview");
const reviewRouter = Router();

// Create
reviewRouter.post('/', postReview)
// All reviews

// Delete 












module.exports = reviewRouter;