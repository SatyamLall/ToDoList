const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dateTime = require(__dirname + "/date.js")

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect("mongodb+srv://admin-leodra:leodra25@cluster0.ovbjo.mongodb.net/todolistDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const itemsDateSchema = mongoose.Schema({
    name: String,
});

const itemsFamilySchema = mongoose.Schema({
    name: String,
});

const itemsSkillSchema = mongoose.Schema({
    name: String,
});

const itemsMeSchema = mongoose.Schema({
    name: String,
});

const ItemDate = mongoose.model("Date", itemsDateSchema);
const ItemFamily = mongoose.model("Family", itemsFamilySchema);
const ItemSkill = mongoose.model("Skill", itemsSkillSchema);
const ItemMe = mongoose.model("Me", itemsMeSchema);

app.get("/", function (req, res) {
    var currDay = dateTime.getDate();
    ItemDate.find({}, function (err, foundItems) {
        res.render("index", { listTitle: currDay, itemToAdd: foundItems });
    })
})

app.get("/family", function (req, res) {
    ItemFamily.find({}, function (err, foundItems) {
        res.render("index", { listTitle: "Family & Friends", itemToAdd: foundItems });
    })

})

app.get("/skill", function (req, res) {
    ItemSkill.find({}, function (err, foundItems) {
        res.render("index", { listTitle: "Build a Skill", itemToAdd: foundItems })
    })
})

app.get("/me", function (req, res) {
    ItemMe.find({}, function (err, foundItems) {
        res.render("index", { listTitle: "Me Time", itemToAdd: foundItems })
    })
})

app.post("/", function (req, res) {
    // console.log(req.body);
    if (req.body.submit === "Family & Friends") {
        const toAdd = new ItemFamily({
            name: req.body.newItem
        })
        toAdd.save();
        res.redirect("/family");
    }

    else if (req.body.submit === "Build a Skill") {
        const toAdd = new ItemSkill({
            name: req.body.newItem
        })
        toAdd.save();
        res.redirect("/skill");
    }

    else if (req.body.submit === "Me Time") {
        const toAdd = new ItemMe({
            name: req.body.newItem
        })
        toAdd.save();
        res.redirect("/me");
    }

    else {
        const toAdd = new ItemDate({
            name: req.body.newItem
        })
        toAdd.save();
        // itemDate.push(req.body.newItem);
        res.redirect("/");
    }
})

app.post("/delete", function (req, res) {
    console.log(req.body);
    const listName = req.body.listName;
    const id = req.body.checkbox;
    if (listName === "Family & Friends") {
        ItemFamily.findByIdAndDelete(id, function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Deleted : ", docs);
            }
        });
        res.redirect("/family");
    } else if (listName === "Build a Skill") {
        ItemSkill.findByIdAndDelete(id, function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Deleted : ", docs);
            }
        });
        res.redirect("/skill");
    } else if (listName === "Me Time") {
        ItemMe.findByIdAndDelete(id, function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Deleted : ", docs);
            }
        });
        res.redirect("/me");
    }
    else {
        ItemDate.findByIdAndDelete(id, function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Deleted : ", docs);
            }
        });
        res.redirect("/");
    }


})

app.listen(3000, function () {
    console.log("Server running on port 3000.");
})