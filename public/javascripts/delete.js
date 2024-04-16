$(document).ready(function() {
    $(".component").each(function() {
        let X = `<span class="X align-baseline text-center link-warning"><b>X</b></span>`;
        $(this).append(X);
        });

    $(".X").click(function() {
        let con = confirm("Are you sure you want to delete this file?");
        if (con) {
            console.log("Delete success");
            $(".container").append(`<form id="del" action="" method="post"></form>`);

            // 前一個兄弟元素 (".video") 或 (".img")
            let prev = $(this).prev();
            let path;
            if ($(prev).prop("tagName") == "VIDEO") {
                path = $(prev.children().get(0)).attr("src").slice(0, -6);

            } else if ($(prev).prop("tagName") == "IMG") {
                path = $(prev.get(0)).attr("src");
            }

            $("#del").attr("action", "/del"+path);
            $("#del").submit();
            $("#del").remove();
            return true
        } else {
            console.log("Delete cancel");
            return false
        }
    });
});





