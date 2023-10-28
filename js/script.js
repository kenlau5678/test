
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
        var pic = document.querySelectorAll(".pic")
        if(a=="true")
        {
            pic[0].style.visibility = "visible"
        }
        if(b=="true")
        {
            pic[1].style.visibility = "visible"
        }
        if(c=="true")
        {
            pic[2].style.visibility = "visible"
        }
        if(d=="true")
        {
            pic[3].style.visibility = "visible"
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



        
        //var entry = document.querySelector(".entry");
        //entry.style.visibility = "visible";
        var one = document.querySelector(".one")
        var two = document.querySelector(".two")
        var three = document.querySelector(".three")
        var four = document.querySelector(".four")

        one.style.display = "none"
        // var enterB = document.querySelector(".enter")
        // enterB.style.visibility = "visible";
        //扫码解析成功后按照自己的需求做后续的操作
        function onScanFailure(error) 
        {
            res.innerText = "扫码失败:\n" + error;
        }

        function onScanSuccess(decodedText, decodedResult) {
            reader.style.display = "none";
            res.innerText = "扫码成功结果:\n" + decodedText;
            
            var div = document.querySelectorAll(".divSquare")
            
        
            var get = document.querySelector(".get")
            if(decodedText== "1号拼图")
            {
                
                div[0].className = "divSquare red"
                reader.style.display = "none"
                get.style.visibility = "visible";
                entry.style.visibility = "visible";
                entry.dataset.indexNumber = 1;
                window.localStorage.setItem('1', "true")
            }
            if(decodedText== "2号拼图")
            {
                
                div[1].className = "divSquare yellow"
                window.localStorage.setItem('2', "true")
                reader.style.display = "none"
                entry.style.visibility = "visible";
                get.style.visibility = "visible";
                entry.dataset.indexNumber = 2;
            }
            if(decodedText== "3号拼图")
            {
                
                div[2].className = "divSquare blue"
                window.localStorage.setItem('3', "true")
                reader.style.display = "none"
                entry.style.visibility = "visible";
                get.style.visibility = "visible";
                entry.dataset.indexNumber = 3;
            }
            if(decodedText== "4号拼图")
            {
                div[3].className = "divSquare green"
                window.localStorage.setItem('4', "true")
                reader.style.display = "none"
                entry.style.visibility = "visible";
                get.style.visibility = "visible";
                entry.dataset.indexNumber = 4;
  
            }
        }


        // one.onclick = function(){
        //     var i =  one.dataset.indexNumber;
        //     var ran = Math.round(Math.random());
        //     if(ran ==1 ){
        //         //location.reload();
        //         window.location.href = i+'a'+'.html';
        //         //this.style.display = 'none';
        //     }
        //     else{
        //         //location.reload();
        //         window.location.href = i+'b'+'.html';
        //         //this.style.display = 'none';
        //     }
        // }



        one.onclick = function(){
            var ran = Math.round(Math.random());
            if(ran ==1 ){
                //location.reload();
                window.location.href = '1a.html';
                //this.style.display = 'none';
            }
            else{
                //location.reload();
                window.location.href = '1b.html';
                //this.style.display = 'none';
            }
        }
        two.onclick = function(){
            var ran = Math.round(Math.random());
            if(ran ==1 ){
                //location.reload();
                window.location.href = '2a.html';
                //this.style.display = 'none';
            }
            else{
                //location.reload();
                window.location.href = '2b.html';
                //this.style.display = 'none';
            }
        }
        three.onclick = function(){
            var ran = Math.round(Math.random());
            if(ran ==1 ){
                //location.reload();
                window.location.href = '3a.html';
                //this.style.display = 'none';
            }
            else{
                //location.reload();
                window.location.href = '3b.html';
                //this.style.display = 'none';
            }
        }
        four.onclick = function(){
            var ran = Math.round(Math.random());
            if(ran ==1 ){
                //location.reload();
                window.location.href = '4a.html';
                //this.style.display = 'none';
            }
            else{
                //location.reload();
                window.location.href = '4b.html';
                //this.style.display = 'none';
            }
        }

        //扫码解析失败后按照自己的需求做后续的操作

/*
        onInit();
        function onInit(){
             var addrFrom = localStorage.getItem("addrFrom");
             if(addrFrom){
                localStorage.removeItem("addrFrom");
             }else{
                 history.go(-2);//这个是关键，点击A页面返回自己跳转到A的上一页
               }
         } */




         