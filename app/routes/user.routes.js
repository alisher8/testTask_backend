const { verifySignUp } = require("../middleware");
const controller = require("../controllers/users.controller");
module.exports = function(app) {
app.use(function(req, res, next) {
res.header(
"Access-Control-Allow-Headers",
"x-access-token, Origin, Content-Type, Accept");
next();
});
app.post("/signup", [verifySignUp.checkDuplicateUsernameOrEmail], controller.signup);
app.post("/signin", controller.signin);
app.get("/logout", controller.logOut);
app.get("/info/:id", controller.getCurrentUser);
};