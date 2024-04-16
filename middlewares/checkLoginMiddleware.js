// 判斷是否用戶登錄
let checkLoginMiddleware =(req, res, next) =>  {
    console.log(`req.session.username:${req.session.username}`);
    if(!req.session.username) {

      return res.redirect("/login/");
    }
    next();
  }

module.exports = checkLoginMiddleware;