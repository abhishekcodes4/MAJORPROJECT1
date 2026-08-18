const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../modules/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../modules/review.js");
const { validateReview, isLoggedIn , isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js");

router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.creatReview));

router.delete("/:reviewId" , isLoggedIn , isReviewAuthor, wrapAsync(reviewController.deleteReview));
module.exports = router;