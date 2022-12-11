const db = require("../models");
const Todo = db.todos;

//Create and Save a new Todo
exports.create = (req, res) => {
    //Validate a request
    if (!req.body.title){
        res.status(400).send({ message: "Content can not be empty!"});
        return;
    }

    //Create a Todo
    const todo = new Todo({
        title: req.body.title,
        description: req.description,
        status: req.body.status ? req.body.status: false
    });

    //Save a Todo in the database
    todo
    .save(todo)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Todo."
        });
    });

};

//Retrieve all Todos from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {$regex: new RegExp(title), $options: "i"} } : {};

    Todo.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some Error occurred while retrieving todos."
        });
    });
};

//Find a single Todo with an id
exports.findOne = (req, res) => {

    const id = req.params.id;

    Todo.findById(id)
    .then(data => {
        if (!data)
        res.status(404).send({ message: "Not found Todo with id " + id });
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({ message: "Error retrieving Todo with id=" + id });
    });
};

//update a Todo by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ 
            message: "Data to update cannot be empty!"
        });
    }

    const id = req.params.id;

    Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update with id=${id}. Maybe Todo was not found!`
            });
        }else res.send({ message: "Todo was updated Successfully."});
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Todo with id=" + id
        });
    });
};

//Delete all Todos from the database
exports.deleteAll = (req, res) => {

};

//Delete a Todo with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Todo.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`
            });   
        } else {
            res.send({
                message: "Todo was deleted successfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Todo with id=" + id
        });
    });
};

//Find all created todos
exports.findAllCreated = (req, res) => {

};