$(document).ready(()=> {
    // 利用迴圈進行切版 
    for (let i = 0; i < 3; i++) {
        $(".container").append('<div class="row"></div>');
    }

    $(".row").each(function() {
        for (let i = 0; i < 3; i++) {
            if(i===1) {
                $(this).append('<div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mid"></div>');;
            } else {
                $(this).append('<div class="col-0 col-sm-0 col-md-3 col-lg-3 col-xl-3"></div>');
            }
            $(this).height(window.innerHeight/3);
        }
    });
 
    // 在最中間的 div 新增互動表單
    $($(".mid").get(1)).html(`
        <div class="loginForm">
            <form method="post" action="" id="auth">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">User</span>
                    </div>
                    <input type="text" name = "username" id = "item" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                </div>

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
                    </div>
                    <input type="password" name="password" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default">
                </div>
                <hr>
                <button class="btn btn-outline-success sent" type="submit"></button>
            </form>
        </div>
    `);

    // 判斷當前是屬於註冊或登入網址，區分功能與顯示內容
    if(location.pathname.replaceAll("/", "") === "register") {
        $(".sent").html("Sing Up");
        $("#auth").attr("action", "/register");
        $("#title").html("register");
    } else if(location.pathname.replaceAll("/", "") === "login") {
        $(".sent").html("Log In");
        $("#auth").attr("action", "/login");
        $("#title").html("login");
    }
});

