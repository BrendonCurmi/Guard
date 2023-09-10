const TrashTemplate = require("./trash.model");
const Profile = require("../profile");

class TrashController extends Profile {
    constructor() {
        super(TrashTemplate, "trash");
    }

    /**
     * Deletes account with specified id.
     * @param req the request.
     * @param res the response.
     */
    deleteAccount = async (req, res) => {
        try {
            await TrashTemplate.findByIdAndDelete(req.params.id);

            const successful = await TrashTemplate.countDocuments({ _id: req.params.id }) === 0;
            const code = successful ? 200 : 400;
            const message = successful ? "successful" : "unsuccessful";
            res.status(code).json({ message });
        } catch (err) {
            res.status(500).json({ err: err.message });
        }
    };

    /**
     * Restores item from trash.
     */
    restoreFromTrash = (req, res) => {
        try {
            TrashTemplate.findOne({ _id: req.params.id }, (err, result) => {
                const data = result.toJSON();
                const type = data.type;
                const model = Profile.getTemplate(type);
                const swap = new model(data);
                swap.save();
                result.remove();
            });
            res.sendStatus(200);
        } catch (err) {
            res.status(500).json({ err: err.message });
        }
    };
}

module.exports = new TrashController();
