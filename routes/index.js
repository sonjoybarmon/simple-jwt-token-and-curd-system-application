const express = require("express");
const mongoose = require("mongoose");
const { route } = require("../app");
const checkLogin = require("../middlewares/checkLogin");
const router = express.Router();
const todoSchema = require("../models/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

//get single todo item

router.get("/", checkLogin, async (req, res, next) => {
  try {
    const data = await Todo.find({});
    res.status(200).json({
      result: data,
      message: "Todo was get successfully",
    });
  } catch {
    res.status(500).json({
      error: "there was a server side error",
    });
  }
});

/* GET home page. */
// router.get("/", async (req, res, next) => {
//   await Todo.find({}, (err, data) => {
//     if (err) {
//       res.status(500).json({
//         error: "there was a server side error",
//       });
//     } else {
//       res.status(200).json({
//         result: data,
//         message: "Todo was get successfully",
//       });
//     }
//   });
// });
// post single data
router.post("/", async (req, res, next) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        message: "Todo was created successfully",
      });
    }
  });
});
//post multiple data
router.post("/all", async (req, res, next) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        message: "Todo was created successfully",
      });
    }
  });
});

// update single data
router.put("/:id", async (req, res, next) => {
  const result = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
      },
    },
    {
      new: true,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "there was a server side error",
        });
      } else {
        res.status(200).json({
          message: "Todo was updated successfully",
        });
      }
    }
  );
});
//delete single data
router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        message: "Todo was updated successfully",
      });
    }
  });
});

module.exports = router;
