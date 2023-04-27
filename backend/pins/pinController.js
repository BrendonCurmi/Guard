const mongoose = require("mongoose");

const PinTemplate = require("./pins.model");

/**
 * Retrieves all accounts, excluding pw field.
 */
exports.getAllPins = async (req, res) => {
    const data = await PinTemplate.find().select("-pin");
    requestCatch({ "pins": data }, res);
};


exports.createPins = (req, res) => {
    new PinTemplate({
        title: req.body.title,
        pin: req.body.pin
    })
        .save()
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
exports.deletePin = async (req, res) => {
    try {
        // PinTemplate.findOne({ _id: req.params.id }, (err, result) => {
        //     const swap = new TrashTemplate(result.toJSON());
        //     result.remove();
        //     swap.save();
        // });
        res.status(200).json({ message: "ok" });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
};

exports.getPinById = async (req, res) => {
    const data = await PinTemplate.findById(req.params.id).select("-pin");
    requestCatch(data, res);
};

exports.updateById = async (req, res) => {
    const data = PinTemplate.findByIdAndUpdate(req.params.id, req.body)
        .then(data => {
            res.sendStatus(204);
        }).catch(err => {
            console.log(err);
            res.status(400).json({ message: err.message });
        });
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
 * while updating account's lastAccess property.
 * @param req the request.
 * @param res the response.
 * @returns {Promise<void>}
 */
exports.getCredentialsById = async (req, res) => {
    const data = await PinTemplate.findOneAndUpdate({ _id: req.params.id }, { lastAccess: Date.now() }).select("pin");
    requestCatch(data, res);
};
