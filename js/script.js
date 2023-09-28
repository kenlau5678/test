
   //方式一使用库的ui
        // var resultContainer = document.getElementById('qr-reader-results');
        // var lastResult, countResults = 0;

        // function onScanSuccess(decodedText, decodedResult) {
        //     if (decodedText !== lastResult) {
        //         ++countResults;
        //         lastResult = decodedText;
        //         document.getElementById('qr-reader-results').innerText = lastResult;
        //         // Handle on success condition with the decoded message.
        //         console.log(`Scan result ${decodedText}`, decodedResult);
        //     }
        // }

        // var html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 300 });
        // html5QrcodeScanner.render(onScanSuccess);
        // var resultContainer = document.getElementById('qr-reader-results');
        // var lastResult, countResults = 0;


        //1.Html5QrcodeScanner是js提供的ui; 2.Html5Qrcode是自定义面板
        let html5QrCode = new Html5Qrcode("reader"); 
        let reader = document.getElementById("reader");
        let res = document.getElementById('qr-reader-results');
        let uploadInput = document.getElementById('upload-input');
        let config = { fps: 10, qrbox: { width: 300, height: 280 } }; //扫一扫相关设置
        

        var a = window.localStorage.getItem('1')
        var b = window.localStorage.getItem('2')
        var c = window.localStorage.getItem('3')
        var d = window.localStorage.getItem('4')


        var div = document.querySelectorAll(".divSquare")
        if(a=="true")
        {
            div[0].className = "divSquare red"
            
            
        }
        if(b=="true")
        {
            div[1].className = "divSquare yellow"
        }
        if(c=="true")
        {
            div[2].className = "divSquare blue"
        }
        if(d=="true")
        {
            div[3].className = "divSquare green"
        }


        //使用本地文件
        function useLocal() {
            reader.style.display = "none";
            res.innerText = "";
            uploadInput.addEventListener("change", (e) => {
                if (e.target.files.length == 0) {
                    return;
                }
                const imageFile = e.target.files[0];
                html5QrCode
                    .scanFile(imageFile, true)
                    .then((decodedText) => {
                        res.innerText = "扫码成功结果:\n" + decodedText;
                    })
                    .catch((err) => {
                        res.innerText = "扫码失败:\n" + error;
                    });
            });
        }

       //相机授权
        function useCamera() {
            reader.style.display = "block";
            res.innerText = "";
            Html5Qrcode.getCameras()
                .then((devices) => {
                    if (devices && devices.length) {
                        let cameraId = "";
                        if (devices.length == 1) {
                            cameraId = devices[0].id; //前置摄像头
                        } else {
                            cameraId = devices[1].id;  //后置摄像头
                        }
                        if (cameraId) {
                            startWithCameraId(cameraId);
                        }
                    } else {
                        startWithoutCameraId();
                    }
                })
                .catch((err) => {
                    console.log("没有获取摄像头设备...");
                });
        }

        //带相机ID扫描
        function startWithCameraId(cameraId) {
            html5QrCode
                .start(
                    { deviceId: { exact: cameraId } },
                    config,
                    onScanSuccess,
                    onScanFailure
                )
                .catch((err) => {
                    console.log("通过摄像头扫码异常....", err);
                });
        }

        //不带相机ID扫描,允许传递约束来代替相机设备 ID
        function startWithoutCameraId() {
            //environment 表示后置摄像头  换成user则表示前置摄像头
            html5QrCode.start(
                { facingMode: "environment" } || {
                    facingMode: { exact: "environment" },
                },
                config,
                onScanSuccess,
                onScanFailure
            );
        }
        var content = document.querySelectorAll(".content")
        var first = document.querySelector(".first")
        //扫码解析成功后按照自己的需求做后续的操作
        function onScanSuccess(decodedText, decodedResult) {
            reader.style.display = "none";
            res.innerText = "扫码成功结果:\n" + decodedText;
            var div = document.querySelectorAll(".divSquare")
            if(decodedText== "1号拼图")
            {
                div[0].className = "divSquare red"
                
                content[0].style.display = "block"
                first.style.display = "none"
                return 0;
               
            }
            if(decodedText== "2号拼图")
            {
                div[1].className = "divSquare yellow"
                window.localStorage.setItem('2', "true")
                return 0;
            }
            if(decodedText== "3号拼图")
            {
                div[2].className = "divSquare blue"
                window.localStorage.setItem('3', "true")
                return 0;
            }
            if(decodedText== "4号拼图")
            {
                div[3].className = "divSquare green"
                window.localStorage.setItem('4', "true")
                return 0;
            }
        }

        //扫码解析失败后按照自己的需求做后续的操作
        function onScanFailure(error) {
            res.innerText = "扫码失败:\n" + error;
        }

        onInit();
        function onInit(){
             var addrFrom = localStorage.getItem("addrFrom");
             if(addrFrom){
                localStorage.removeItem("addrFrom");
             }else{
                 history.go(-2);//这个是关键，点击A页面返回自己跳转到A的上一页
               }
         }

         