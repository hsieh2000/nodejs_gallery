$("#cfolder").on("click", (event)=> {
    let prom = prompt("input something");
    console.log(prom);
    console.log("cfolder/"+prom);

    // 使用 JavaScript 的 fetch 函式發送 GET 請求
    let params = {
    command: 'create',
    name: prom
    };

    if(!!prom) {
        fetch(`${window.location.pathname}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
            })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));

        // 因為 fetch 是用 async 方式傳送請求，所以 後端的任何 res. 方法都無法使頁面重新渲染，需要透過前端重新載入頁面
        // 且不知為何不能直接接在 fetch 後，需要以判斷式觸發
        if(true) {
            window.location.reload();
        }
    }
});

// 原始的 folder delete 方法
// $("#dfolder").on("click", (event)=> {
//     let prom = prompt("input something");
//     console.log(prom);

//     let params = {
//     command: 'delete',
//     name: prom
//     };

//     // 使用 JavaScript 的 fetch 函式發送 POST 請求
//     fetch(`${window.location.pathname}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(params)
//         })
//     .then(response => response.json())
//     .then(data => console.log('Success:', data))
//     .catch(error => console.error('Error:', error));
// });

$(document).ready(function() {
    $(".folder").each(function() {
        let X = `<span class="X_folder align-baseline text-center link-warning"><b>X</b></span>`;
        $(this).append(X);
        });

    $(".X_folder").click(function() {
        let con = confirm("Are you sure you want to delete this folder?");

        let prev = $(this).prev();
        console.log(prev.attr("href").replace("1222", "media"));

        let params = {
            command: 'delete',
            name: prev.attr("href").replace("1222", "media")
            };

        console.log(params)

        if (con) {
            fetch(`${window.location.pathname}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
                })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch(error => console.error('Error:', error));
            
            // 重新整理頁面
            window.location.reload();
            return true
        } else {
            console.log("Delete cancel");
            return false
        }

    });
});

