const mongoose = require("mongoose");

const AccountTemplate = require("./accounts.model");
const TrashTemplate = require("../trash/trash.model");

/**
 * Retrieves all accounts, excluding pw field.
 */
exports.getAllAccounts = async (req, res) => {
    const data = await AccountTemplate.find().select("-pw");
    requestCatch(data, res);
};


exports.createAccount = (req, res) => {
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
};


/**
 * Deletes account with specified id.
 * @param req the request.
 * @param res the response.
 * @returns {Promise<void>} Returns HTTP 200 if successful;
 * Otherwise HTTP 410 if unsuccessful.
 */
exports.deleteAccount = async (req, res) => {
    try {
        AccountTemplate.findOne({ _id: req.params.id }, (err, result) => {
            const swap = new TrashTemplate(result.toJSON());
            /*
            swap._id = mongoose.Types.ObjectId()
            swap.isNew = true
            */

            result.remove();
            swap.save();
        });

        // await AccountTemplate.findByIdAndDelete(req.params.id);
        //
        // const successful = await AccountTemplate.countDocuments({ _id: req.params.id }) === 0;
        // const code = successful ? 200 : 400;
        // const message = successful ? "successful" : "unsuccessful";
        // res.status(code).json({ message });

        res.status(200).json({ message: "ok" });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }

    // await request(AccountTemplate.findOne({ _id: req.params.id }), (product) => {
    //     return product.remove();
    // }, res, {
    //     success: ""
    // });
};

exports.getAccountById = async (req, res) => {
    const data = await AccountTemplate.findById(req.params.id).select("-pw");
    requestCatch(data, res);
};

exports.updateById = async (req, res) => {
    const data = AccountTemplate.findByIdAndUpdate(req.params.id, req.body)
        .then(data => {
            res.sendStatus(204);
        }).catch(err => {
            console.log(err);
            res.status(400).json({ message: err.message });
        })
    ;

    //(err, doc) => {
    //         console.log(doc);
    //         if (!doc) res.sendStatus(404);
    //         else if (err) res.status(500).json({ message: err.message })
    //         else res.status(204).json({ message: "joe" });
    //     }
    // requestCatch(data, res);
};


const request = async (promise, action, res, messages) => {
    if (!messages) {
        messages = { success: "Successful", unsuccessful: "Unsuccessful", notFound: "Not Found" };
    }
    promise
        .then(value => {
            if (value) {
                action(value)
                    .then(value => {
                        console.log("1");
                        res.status(200).json({ messages: messages.success, value: value });
                    })
                    .catch(err => {
                        console.log("2");
                        res.status(400).json({ messages: messages.success, err: err.message });
                    });
            } else {
                console.log("3");
                res.status(404).json({ messages: messages.notFound });
            }
        })
        .catch(err => {
            console.log("4");
            res.status(500).json({ messages: messages.success, err: err.message });
        });

    // const value = await promise;
    // if (value) {
    //     const val = await action(value);
    //
    // } else {
    //
    // }
};

const requestCatch = (data, res) => {
    try {
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};





/**
 * Retrieves only the credentials of the specified account,
 * while updating account's lastUsed property.
 * @param req the request.
 * @param res the response.
 * @returns {Promise<void>}
 */
exports.getCredentialsById = async (req, res) => {
    const data = await AccountTemplate.findOneAndUpdate({ _id: req.params.id }, { lastUsed: Date.now() }).select("pw");
    requestCatch(data, res);
};

exports.searchByString = async (req, res) => {
    let str = { "$regex": req.params.str };
    await AccountTemplate.find({
        $or: [
            { "site": str },
            { "title": str },
            { "email": str },
            { "username": str }
        ]
    }).then(data => {
        res.status(201).json(data);
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
};
