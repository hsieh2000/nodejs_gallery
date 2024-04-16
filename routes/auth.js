const express = require('express');
const router = express.Router();
const userModel = require("../models/userModel");
// 文字加密套件
const md5 = require("md5");

// 進入 註冊頁面
router.get("/register/", (req, res) => {
    res.render("auth", {func: "Sign Up"});
});

// 執行註冊功能
router.post("/register/", (req, res) => {
    //獲取請求體數據
    console.log(req.body);

    let {username, password} = req.body;
    userModel.findOne({username: username}).then((data) => {
        console.log(data);
        console.log(Boolean(data));
        if(data) {
            return res.render("jump", {msg: "User Already Exist"});
            
        }
        // 將 password 透過 md5 加密後覆蓋原本的密碼
        userModel.create({...req.body, password: md5(req.body.password)}).then(() => {
            // res.render("success", {msg: 'Register Success', url: '/login'});
            res.render("jump", {msg: "Register Success"});
        }).catch( () => {
            res.render("jump", {msg: "Unknown Register Fail"});
        });
    });
});

// 進入 登入頁面
router.get("/login/", (req, res) => {
    res.render("auth", {func: "Log in"});
});

// 登入
router.post("/login/", (req, res) => {
    let {username, password} = req.body;
    // 查詢單筆數據
    userModel.findOne({username: username, password: md5(password)}).then((data) => {
        console.log(data);
        console.log("hello world");
        // data 如果找不到返回 null
        if (!data) {
            return res.render("jump", {msg: "Wrong Username Or Password"});
        }

        // 寫入session
        req.session.username = data.username;
        req.session._id = data._id;
        
        res.cookie("username", req.session.username, {maxAge: 30*60*1000}); //設定cookie 存活時間（毫秒）

        // 響應登入
        res.render("jump", {msg: "Login Success"});


    }).catch( () => {
        res.status("500").send("Login Fail");
    });
});

// 退出登入
router.post("/logout/", (req, res) => {
    req.session.destroy(() => {
        res.render("jump", {msg:"Logout Success"});
    });
});

module.exports = router;
