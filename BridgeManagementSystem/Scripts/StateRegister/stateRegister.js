layui.config({
    base: '/Scripts/stateRegister/' //静态资源所在路径
}).use(['element', 'form', 'layer'], function () {
    var form = layui.form
        , layer = layui.layer
        , element = layui.element;

    //加载选择框选项
    $.ajax({
        type: "get",
        url: "/StateRegister/ShowChoice",
        dataType: "json",
        data: {

        },
        success: function (data) {
            if (data.code == 200) {
                $.each(data.choice, function (index, choice) {
                    $('#bridge_id').append(new Option(choice));//往下拉菜单里添加元素
                })
                form.render();//菜单渲染，加载内容
            }
        }
    })

    //提交按钮
    $(document).ready(function () {
        $("#submit").click(function () {
            var bridgeName = document.getElementById("bridge_id").value;
            var time = document.getElementById("time").value;
            var objPop = document.getElementsByName("topPart");
            for (var i = 0; i < objPop.length; i++) {
                if (objPop[i].checked) {
                    var topPart = objPop[i].value;
                    break;
                }
            }
            var objBottom = document.getElementsByName("topPart");
            for (var i = 0; i < objBottom.length; i++) {
                if (objBottom[i].checked) {
                    var bottomPart = objBottom[i].value;
                    break;
                }
            }
            var objLeft = document.getElementsByName("topPart");
            for (var i = 0; i < objLeft.length; i++) {
                if (objLeft[i].checked) {
                    var leftPart = objLeft[i].value;
                    break;
                }
            }
            var objRight = document.getElementsByName("topPart");
            for (var i = 0; i < objRight.length; i++) {
                if (objRight[i].checked) {
                    var rightPart = objRight[i].value;
                    break;
                }
            }
            $.ajax({
                url: "/StateRegister/Submit",
                dataType: "json",
                type: "post",
                data: {
                    bridgeName: bridgeName,//桥梁ID+名字
                    time: time,
                    topPart: topPart,
                    bottomPart: bottomPart,
                    leftPart: leftPart,
                    rightPart: rightPart,
                },
                success: function (res) {
                    if (res.code == 401) {
                        layer.open({
                            title: 'Warning'
                            , content:'有必填项未填！'
                        })
                    }
                    if (res.code == 404) {
                        layer.open({
                            title: 'Warning'
                            , content: '登记失败，不能重复登记同一桥梁同一年份的信息！'
                        });
                    }
                    if (res.code == 200) {
                        layer.open({
                            title: 'Success'
                            , content: '登记成功！'
                        });
                    }
                },
                error: function () {
                    alert("出错了。。");
                }
            });
        });
    });
});