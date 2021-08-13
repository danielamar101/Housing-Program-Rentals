"use strict";
var mongoose = require("mongoose");
var Invite = mongoose.model("Invites");

//POST - at least should be, isnt currently
exports.create_invite_code = function (req, res) {
  const new_invite = new Invite({
    invite_code: "natalie",
  });

  new_invite.save().then(() => {
    res.render("invite/success", {
      code: "invite_code",
    });
  }).catch(error => {
    console.log("Error saving invite code",error);
    res.render("invite/error");
  });
};
