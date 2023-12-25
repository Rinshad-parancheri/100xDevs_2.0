const express = require("express");
const app = express();
const adminMiddleware = require("../middleware/admin");
const mongoose = require('mongoose');
const db = require("../db/index");



app.use(express.json())



const userExist = async (userName) => {

    try {
        let user = await db.Admin.findOne({ userName });
        return (user) ? true : false;
    } catch (error) {
        throw new Error(`Error in userExist: ${error.message}`);
    }
}


app.post('/signup', async (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;

    try {
        const doesUserExist = await userExist(userName);

        if (doesUserExist) {
            res.status(409).json({ error: "User already exists" });
        } else {
            const admin = new db.Admin({
                userName,
                password
            });

            await admin.save();

            res.status(201).json({
                msg: "User created successfully"
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const passwordCheck = async (password) => {
    try {
        let user = await db.Admin.findOne({ password });
        return !!user;
    } catch (error) {
        throw new Error(`Error in userExist: ${error.message}`);
    }
}
app.post('/courses', async (req, res) => {
    let userName = req.headers["username"];
    let password = req.headers["password"];
    let title = req.body.title;
    let description = req.body.description;
    let price = req.body.price;
    let imageUrl = req.body.imageUrl;
    try {
        const doesUserExist = userExist(userName);
        if (doesUserExist) {
            let isPasswordCorrect = passwordCheck(password);
            if (isPasswordCorrect) {
                const course = new db.Course({
                    title,
                    description,
                    price,
                    imageUrl
                })

                await course.save()
                res.status(200).json({
                    "msg": `${course} is updated`
                })
            } else {
                res.status(404).send("incorrect password")
            }
        } else {
            res.status(404).send("user doesn't exist");
        }
    } catch {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).send("Server Error");

    }

});

app.get('/courses', (req, res) => {
     
});
// module.exports = router;