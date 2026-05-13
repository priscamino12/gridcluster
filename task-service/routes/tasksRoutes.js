const express = require("express");

const Task = require("../models/Tasks");

const router = express.Router();

router.post("/", async (req, res) => {

  console.log(req.body);

  try {

    const task = await Task.create(req.body);

    res.status(201).json(task);

  } catch(error){

    res.status(500).json({
      message: error.message
    });

  }

});

router.get("/", async (req, res) => {

  try {

    const tasks = await Task.find();

    res.json(tasks);

  } catch(error){

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;