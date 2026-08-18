const Listing = require("../modules/listing");
// const { replaceOne } = require("../modules/review");

module.exports.index = async (req , res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs" , {allListings});  
};

module.exports.renderNewForm = (req , res) =>{
    console.log(req.user);
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req , res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("owner");
    if(!listing){
        req.flash("error", "The listing you are looking for does not exist.");
        return res.redirect("/listing");
    }
    console.log(listing);
    res.render("listings/show.ejs" , {listing});
}

module.exports.createListing = async (req , res, next) =>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url , filename};
    await newListing.save();    
    req.flash("success" , "New listing creadted succsessfully");
    console.log(newListing);
    res.redirect("/listing"); 
}

module.exports.editListing = async (req,res) =>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "The listing you are looking for does not exist.");
        return res.redirect("/listing");
    }
    res.render("listings/edit.ejs" , {listing });
}

module.exports.updateListing = async(req , res) =>{
    let {id} = req.params;
    let newListing = await Listing.findByIdAndUpdate(id , {...req.body.listing});

    if( typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = {url , filename};
        await newListing.save();    
    }
    req.flash("success" , "Listing updating");
    res.redirect(`/listing/${id}`);
}

module.exports.deleteListing = async(req , res) => {
    let {id} = req.params;
    let deleteData = await Listing.findByIdAndDelete(id);
    req.flash("success" , "Listing Deleted");
    console.log(deleteData);
    res.redirect("/listing");
}