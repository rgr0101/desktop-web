const Task = require('../models/taskModel');

const createTask = async (req, res) => {
    const { title, description } = req.body;

    const task = new Task({
        title,
        description,
        user: req.user.id,
    });

    await task.save();

    res.status(201).json(task);
};

const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
};

const getTaskById = async (req, res) => {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    
    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json(task);
};

const updateTask = async (req, res) => {
    const { title, description } = req.body;

    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { title, description },
        { new: true }
    );

    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json(task);
};

const deleteTask = async (req, res) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json({ message: 'Tarea eliminada con éxito' });
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
