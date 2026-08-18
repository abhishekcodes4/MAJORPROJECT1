const Listing = require("./modules/listing");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./modules/review.js");
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");



module.exports.isLoggedIn = (req ,res ,next) => {
    // console.log(req.pathreq.originalUrl);/
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "You must be logged in to create a new listing.");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
} 


module.exports.isOwner = async (req, res ,next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error" , "You are not the owner of this listing");
        return res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.validateListing = (req , res , next) => {
    let {error} = listingSchema.validate(req.body);

    if(error){
        let erMsg = error.details.map((el) => el.message).join(",");
        console.log(erMsg);
        throw new ExpressError(400 , erMsg);
    }else{
        next();
    }
}

module.exports.validateReview = (req , res , next) => {
    let {error} = reviewSchema.validate(req.body);

    if(error){
        let erMsg = error.details.map((el) => el.message).join(",");
        console.log(erMsg);
        throw new ExpressError(400 , erMsg);
    }else{
        next();
    }
}

module.exports.isReviewAuthor = async (req, res ,next) =>{
    let {id , reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error" , "You are not the Author of this review");
        return res.redirect(`/listing/${id}`);
    }
    next();
}