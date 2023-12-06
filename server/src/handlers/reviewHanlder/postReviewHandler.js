const { User, Review } = require("../../db");

const postReviewHandler = async(reviewText, rating, UserId, email) =>{
    // const userFound = await User.findByPk(UserId, 
    //     // {
    //     // attributes: ['id', 'token', 'email']
    // // }
    // )
    const userFound = await User.findOne({
        where: {
            email: email,
        }
    })
    console.log(userFound);
    if(!userFound)
    throw Error('User not found')
    // return {error: 'User not found'}

  const review = await Review.create({
    UserId: userFound.id,
    reviewText: reviewText || "",
    rating: rating,
    productId: productId,/*  */
  });

    await userFound.addReview(review);

    return review




}
module.exports = {
    postReviewHandler
}