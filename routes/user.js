const mongoose = require("mongoose");
const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = new express.Router();

// sign up route
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                status: "error",
                message: "please provide full information",
            });
        }
        const oldUser = await User.find({ email: email });
        if (oldUser.length != 0) {
            return res.status(400).json({
                status: "error",
                message: "User already registered",
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const saveUser = new User({
            name: name,
            email: email,
            password: hashPassword,
        });
        const data = await saveUser.save()
        return res.status(200).json({
            status: "success",
            data: data,
        });

    } catch (e) {
        return res.status(400).json({
            status: "error",
            message: e.message,
        });
    }
});

// log in route 
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "please provide full information",
            });
        }
        const loginUer = await User.find({ email: email });
        if (loginUer.length == 0) {
            return res.status(400).json({
                status: "error",
                message: "User Not Registered",
            });
        }
        const isValid = await bcrypt.compare(
            password,
            loginUer[0].password
        );
        if (!isValid) {
            return res.status(400).json({
                status: "error",
                message: "Wrong Password",
            });
        }
        const token = jwt.sign({ ...loginUer[0] }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });
        return res.status(200).json({
            status: "success",
            token: token,
        });

    } catch (e) {
        return res.status(400).json({
            status: "error",
            message: e.message,
        });
    }
})

module.exports = router;