// 讓 mongodb 與 express 連接，在 bin/www 中導入 這個 db.js檔
const {DBHOST, DBPORT, DBNAME} = require("../config/config.js");

module.exports = function (success) {
    // 判斷 error 為其設置默認值
    if(typeof error !== 'function') {
        error = () => {
            console.log("MongoDB Initialize Failed");
        }
    }

    const mongoose = require("mongoose");
    
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

    mongoose.connection.once("open", () => {
        console.log("MongoDB Connect Successful");
        success();
    });

    mongoose.connection.once("error", () => {
        console.log("MongoDB Connection Error");
        error();
    });
}