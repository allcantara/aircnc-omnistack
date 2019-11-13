const User = require('../models/User');
const Spot = require('../models/Spot');

module.exports = {
    async index(req, res) {
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech });

        return res.json(spots)
    },

    async store(req, res) {
        const { filename } = req.file;
        const { company, price, techs } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if(!user) {
            return res.status(400).json({ erro: 'Este usuário não existe.'});
        }

        const spot = await Spot.create({
            image: filename,
            company,
            price,
            techs: techs.split(',').map(tech => tech.trim()),
            user: user_id,
        })

        return res.json(spot);
    },

    async destroy(req, res) {
        const { company } = req.body;

        const spots = await Spot.deleteOne({ company: company });

        return res.json(spots)
    },

    async show(req, res) {
        const { company } = req.body;

        const spots = await Spot.find({ company: company });

        return res.json(spots)
    }
}