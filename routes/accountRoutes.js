const { Router } = require("express");
const express = require("express");
const router = express.Router();
const auth = require("../auth");
const accountController = require("../controllers/accountController");

// get routes
router.get("/", auth.guardSaTC, accountController.index_get);
router.get("/login", auth.cookieMonster ,accountController.login_get);
router.get("/register", auth.cookieMonster ,accountController.register_get);
router.get("/create", auth.guardSaTC ,accountController.create_get);
router.get("/logout", accountController.logout_get);
router.get("/deleteTask/:id", accountController.deleteTask_get); //the post request does not work
router.get("/updateTask/:id", accountController.updateTask_get);

//post routes
router.post("/register", accountController.register_post);
router.post("/login", accountController.login_post);
router.post("/create", accountController.create_post);
router.post("/updateTask/:id", accountController.updateTask_post);





router.get("/read_account", auth.checking, accountController.readAccount);
router.post("/update_account", accountController.updateAccount);
router.post("/delete_account", accountController.deleteAccount);


module.exports = router;