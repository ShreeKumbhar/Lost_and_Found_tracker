const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find({});
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new item
router.post('/', async (req, res) => {
    const { name, description, contactNumber, type } = req.body;
    const newItem = new Item({
        name,
        description,
        contactNumber,
        type
    });

    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an item
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        await item.deleteOne(); // Use deleteOne() instead of remove()
        res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// PUT (Update) an item's status (e.g., mark as returned)
router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        item.isReturned = req.body.isReturned !== undefined ? req.body.isReturned : !item.isReturned; // Toggle or set explicitly

        const updatedItem = await item.save();
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;