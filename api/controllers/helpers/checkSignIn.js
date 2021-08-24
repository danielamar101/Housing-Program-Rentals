

exports.checkSignIn = function (req, res,next){
    if(req.session.loggedIn){
       console.log("User is signed in.");
      next();     //If session exists, proceed to page
    } else {
       var err = new Error("Not logged in!");
       console.log(req.session.user);
       res.sendStatus(401);  //Error, trying to access unauthorized page!
    }
 };