const TrashTemplate = require("./trash.model");
const Profile = require("../profile");

class TrashController extends Profile {
    constructor() {
        super(TrashTemplate, "trash", ["pw", "pin"]);
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
}

module.exports = TrashController;
