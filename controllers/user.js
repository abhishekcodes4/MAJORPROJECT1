const User = require("../modules/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.signUp = async (req , res) =>{
    try{
        let {username , email , password} = req.body;
        const newUser = new User({email , username});
        const registeredUser = await User.register(newUser , password);
        console.log(registeredUser);
        req.flash("success" , "Registration successful! Welcome to Wanderlust.");
        res.redirect("/listing");
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.logIn = async (req , res) =>{
    req.flash("success" , "Login successful. Welcome to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
}

module.exports.logOut = (req , res , next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success" , "You logout successfully!");
        res.redirect("/listing");
    })
}