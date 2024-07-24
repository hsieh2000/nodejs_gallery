// mongoDB 的網域設定檔，預設端口是27017，dbName命名為gallery
// 以 docker 容器化時要將 DBHOST 改成 mongo 的 image 名稱
module.exports = {
    DBHOST: "127.0.0.1",
    DBPORT: 27017,
    DBNAME: 'gallery',  
  };