const express = require("express");
const router = express.Router();

/*router.post("/test", (req, res) => {
    const test = new AccountTemplate({
        site: req.body.site,
        title: req.body.title,
        pw: req.body.pw
    });
    test.save()
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(400).json({ message: err.message });
        });
});*/

const accountController = require("./accountController");

router.route("/accounts").get(accountController.getAllAccounts);

router.route("/account").post(accountController.createAccount);

router.route("/account/:id")
    .get(accountController.getAccountById)
    .put(accountController.updateById)
    .delete(accountController.deleteAccount);

router.route("/account/:id/credentials")
    .get(accountController.getCredentialsById);

router.route("/search/:str")
    .get(accountController.searchByString);

module.exports = router;
