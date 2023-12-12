const { Router } = require("express");
const { postReview } = require("../controllers/reviewController/postReview");
const reviewRouter = Router();

// Create
reviewRouter.post('/create', postReview)
// All reviews

// Delete 












module.exports = reviewRouter;