const Listing = require("../modules/listing.js");
const Review = require("../modules/review.js");

module.exports.creatReview = async (req, res) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    console.log(newReview);
    await listing.save();
    req.flash("success" , "Review created!");
    console.log(newReview);
    res.redirect(`/listing/${id}`);
}

module.exports.deleteReview = async (req , res) => {
    let {id , reviewId} = req.params;
    await Listing.findByIdAndUpdate(id , {$pull: {reviews: reviewId}});
    let ans = await Review.findByIdAndDelete(reviewId);
    req.flash("success" , "Review Deleted");
    console.log(ans);
    res.redirect(`/listing/${id}`);
}