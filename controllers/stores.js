const Store = require('../models/Store')

// To get all the stores from the Database
exports.getStores = async (req, res, next) => {
    try {

        // To get all the stores from the database
        const stores = await Store.find();

        return res.status(200).json({
            success: true,
            count: stores.length,
            data: stores
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Server Error'
        });
    }
}


// To create Store in the database
exports.addStore = async (req, res, next) => {
    try {

        // To create store in the database
        const store = await Store.create(req.body);

        return res.status(200).json({
            success: true,
            data: store
        })

    } catch (error) {
        console.error(error);

        // If the store already exists in the database, it will show this message
        if(error.code === 11000) {
            res.status(400).json({
                error: 'This store already exists'
            });
        }

        res.status(500).json({
            error: 'Server Error'
        });
    }
}