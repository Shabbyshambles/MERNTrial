const express = require("express");
const cors = require("cors");
const Mongoose = require("mongoose");
const app = express();
const FoodModel = require("./models/Food");


app.use(express.json());
app.use(cors());
app.use("/static", express.static("C://Users/rschm/frontend/frontend/src"));

Mongoose.connect("mongodb+srv://ShabbyShambles:!Sphinxrev@cluster0.tygxp.mongodb.net/Food?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});

app.get("/SignIn", async(req, res) => {
    
})

app.get("/read", async(req, res) => {
    FoodModel.find({}, (err, result) => {
        if(err) {
            res.send(err);
        }

        res.send(result);
    })
})



app.put("/update", async(req, res) => {

    const newFoodName = req.body.newFoodName
    const id = req.body.id
    
    try {
      await FoodModel.findById(id, (err, updatedFood) =>{
          console.log(newFoodName);
          updatedFood.foodName = newFoodName;
          updatedFood.save();
          res.send("updated");
      })
    }catch(err){
        console.log(err);
    }

});

app.post("/insert", async(req, res) => {

    const foodName = req.body.foodName
    const days = req.body.days
    const food = new FoodModel({foodName: foodName, DaysSinceEaten: days})
    
    try {
      await food.save();
      res.send("data inserted chief!")
    }catch(err){
        console.log(err);
    }

});



app.delete("/delete/:id", async(req, res) => {
    console.log("Deleting");
    const id = req.params.id;
    await FoodModel.findByIdAndRemove(id).exec();
    res.send("Deleted");
});
app.listen(8800, ()=> {
    console.log("Server running on port 8800...");
});
