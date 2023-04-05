const express = require('express')
const app = express()

const { mongoose } = require('./db/mongoose')

const bodyParser = require('body-parser')

// loading monggose modules

const { List, Task} = require('./db/models')

// load middleware
app.use(bodyParser.json())

// for lists crud

app.get('/lists', (req, res) => { // get all list
    List.find({}).then((lists) => {
        res.send(lists)
    }).catch((e) => {
        res.sendStatus(500)
        console.log("Failed to read list")
        console.log(e)
    })
})

app.post('/lists', (req, res) => { // add new list
    let title = req.body.title
    let newList = new List({
        title
    })
    newList.save().then((listDoc) => {
        res.send(listDoc)
    }).catch((e) => {
        res.sendStatus(500)
        console.log("Failed to add new list")
        console.log(e)
    })
})

app.patch('/lists/:id', (req, res) => { // update list
    List.findOneAndUpdate({ _id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200)
    }).catch((e) => {
        res.sendStatus(500)
        console.log("Failed to update a list")
        console.log(e)
    })
})

app.delete('/lists/:id', (req, res) => { // delete list
    List.findOneAndRemove({
        _id: req.params.id
    }).then((removedListDoc) => {
        res.send(removedListDoc)
    }).catch((e) => {
        res.sendStatus(500)
        console.log("Failed to delete a list")
        console.log(e)
    })
})

// for task of a specific list

app.get('/lists/:listId/tasks', (req, res) => { // get all tasks in a specific list
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks)
    }).catch((e) => {
        res.sendStatus(500)
        console.log("Failed to get tasks")
        console.log(e)
    })
})

app.get('/lists/:listId/tasks/:taskId',(req, res) => { // get one tasks
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task) => {
        res.send(task)
    })
})

app.post('/lists/:listId/tasks', (req, res) => { // add new task in a specific list
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    })
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc)
    }).catch((e) => {
        res.sendStatus(500)
        console.log("Failed to add a new task")
        console.log(e)
    })
})

app.patch('/lists/:listId/tasks/:taskId', (req, res) => { // update a specific task in a list
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200)
    }).catch((e) => {
        res.sendStatus(500)
        console.log("Failed to update  a specific task")
        console.log(e)
    })
})

app.delete('/lists/:listId/tasks/:taskId', (req, res) => { // delete specific task in a specific list
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc)
    }).catch((e) => {
        res.sendStatus(500)
        console.log("Failed to delete a specific task")
        console.log(e)
    })
})

app.listen(3000, () => {
    console.log("Server is listening at port 3000")
})
