const Car = require('../models/Car'); // Assuming you have a Car model

// Create a new car entry
exports.createCar = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const images = req.files.map(file => file.path);
        const car = new Car({ title, description, tags, images, userId: req.user.id });
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCarsByUserId = async (req, res) => {
    try {
        const cars = await Car.find({ userId: req.user.id });
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCar = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const images = req.files ? req.files.map(file => file.path) : undefined;

        const updateFields = { title, description, tags };
        if (images) {
            updateFields.images = images;
        }

        const car = await Car.findByIdAndUpdate(req.params.id, updateFields, { new: true });
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
