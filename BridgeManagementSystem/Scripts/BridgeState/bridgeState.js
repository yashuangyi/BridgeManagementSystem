layui.config({
    base: '/Scripts/BridgeState/' //静态资源所在路径
}).use(['element', 'table'], function () {
    var table = layui.table
        , element = layui.element;

    var bridgeStateTable = table.render({//桥梁管养信息表
        elem: '#bridgeState'
        , height: 700
        , width: 1150
        , url: '/BridgeState/ShowBridgeState'//数据接口
        , toolbar: 'default'//开启工具栏
        , page: true//开启分页
        , cols: [[
            { type: 'checkbox', fixed: 'left' }
            , { field: 'Id', title: "编号", width: 80, sort: true, fixed: 'left' }
            , { field: 'BridgeName', title: "桥梁名称", width: 120 }
            , { field: 'Time', title: "年份", width: 100, sort: true }
            , { field: 'LeftPart', title: "左幅健康情况", width: 150 }
            , { field: 'RightPart', title: "右幅健康情况", width: 150 }
            , { field: 'TopPart', title: "上部结构健康情况", width: 150 }
            , { field: 'BottomPart', title: "下部结构健康情况", width: 150 }
            , { fixed: 'right', width: 165, align: 'center', toolbar: '#bar' }
        ]]
    });

    //监听头部工具栏事件
    table.on('toolbar(bridgeState)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id)
            , data = checkStatus.data;//获取选中的数据
        switch (obj.event) {
            case 'add':
                layer.open({
                    title: 'Warning'
                    , content: '请在“管养信息登记”处登记！'
                });
                break;
            case 'update':
                if (data.length == 0) {
                    layer.msg('请选中一行再执行更新操作！');
                } else if (data.length - 1) {
                    layer.msg('只能同时更新一行数据！');
                } else {
                    layer.open({
                        title: '修改信息'
                        , type: 1
                        , area: ['600px', '350px']
                        , content: $("#bridgeStateInform").html()
                        , id: 'bridgeStateEdit-all-id'//防止重复打开
                        , btn: '修改'
                        , btnAlign: 'c'//按钮居中
                        , shade: 0//不显示遮罩
                        , success: function () {
                            document.getElementById('name').value = data[0]['BridgeName'];
                            document.getElementById('time').value = data[0]['Time'];
                            document.getElementById('top').value = data[0]['TopPart'];
                            document.getElementById('bottom').value = data[0]['BottomPart'];
                            document.getElementById('left').value = data[0]['LeftPart'];
                            document.getElementById('right').value = data[0]['RightPart'];
                        }
                        , yes: function (index, layero) {
                            var id = data[0]['Id'];
                            var time = document.getElementById('time').value;
                            var topPart = document.getElementById('top').value;
                            var bottomPart = document.getElementById('bottom').value;
                            var leftPart = document.getElementById('left').value;
                            var rightPart = document.getElementById('right').value;
                            $.ajax({
                                type: "post",
                                url: "/BridgeState/EditBridgeState",
                                dataType: "json",
                                data: {
                                    id: id
                                    , time: time
                                    , topPart: topPart
                                    , bottomPart: bottomPart
                                    , leftPart: leftPart
                                    , rightPart: rightPart
                                },
                                success: function (data) {
                                    if (data.code == 401) {
                                        layer.open({
                                            title: 'Warning'
                                            , content: '有必填项未填！'
                                        });
                                    }
                                    if (data.code == 200) {
                                        layer.open({
                                            title: 'Success'
                                            , content: '修改成功！'
                                        });
                                        bridgeStateTable.reload({//重载表单
                                            where: {

                                            }
                                            , page: {
                                                curr: 1
                                            }
                                        });
                                        layer.close(index);
                                    }
                                }
                            });
                        }
                    });
                }
                break;
            case 'delete':
                if (data.length == 0) {
                    layer.msg('请至少选中一行再执行删除操作！');
                } else {
                    layer.confirm('确认删除？', { icon: 3, title: '提示信息' }, function (index) {
                        for (i = 0; i < data.length; i++) {
                            var id = data[i]['Id'];
                            var isOk = true;
                            $.ajax({
                                type: "post",
                                url: "/BridgeState/DeleteBridgeState",
                                dataType: "json",
                                data: {
                                    id: id
                                },
                                success: function (data) {
                                    if (data.code == 200) {
                                        bridgeStateTable.reload({//重载表单
                                            where: {

                                            }
                                            , page: {
                                                curr: 1
                                            }
                                        });
                                    }
                                },
                                error: function () {
                                    isOk = false;
                                }
                            });
                        }
                        if (isOk) {
                            layer.open({
                                title: 'Success'
                                , content: '删除成功！'
                            });
                        }
                    });
                }
                break;
        };
    });

    //监听行工具事件
    table.on('tool(bridgeState)', function (obj) {
        var data = obj.data//获得当前行数据
            , layEvent = obj.event;//获得lay-event对应的值
        if (layEvent == 'detail') {//查看
            layer.open({
                title: '查看信息'
                , type: 1
                , area: ['600px', '350px']
                , content: $("#bridgeStateInform").html()
                , id: 'bridgeStateInform-id'//防止重复打开
                , btn: 'OK'
                , btnAlign: 'c'//按钮居中
                , shade: 0//不显示遮罩
                , success: function () {
                    document.getElementById('name').value = data['BridgeName'];
                    document.getElementById('time').value = data['Time'];
                    document.getElementById('top').value = data['TopPart'];
                    document.getElementById('bottom').value = data['BottomPart'];
                    document.getElementById('left').value = data['LeftPart'];
                    document.getElementById('right').value = data['RightPart'];
                    $('#bridgeStateForm').find('input,textarea,select').attr('readonly', true);//设为只读
                }
                , yes: function (index, layero) {
                    layer.close(index);
                }
            });
        } else if (layEvent == 'del') {//删除
            layer.confirm('确认删除？', { icon: 3, title: '提示信息' }, function (index) {
                //向服务端发送删除指令
                var id = data['Id'];
                var name = data['Name'];
                var address = data['Address'];
                var unit = data['Unit'];
                var type = data['Type'];
                $.ajax({
                    type: "post",
                    url: "/BridgeState/DeleteBridgeState",
                    dataType: "json",
                    data: {
                        id: id
                    },
                    success: function (data) {
                        if (data.code == 200) {
                            obj.del();//删除对应行的DOM结构
                            layer.close(index);
                            layer.open({
                                title: 'Success'
                                , content: '删除成功！'
                            });
                            bridgeStateTable.reload({//重载表单
                                where: {

                                }
                                , page: {
                                    curr: 1
                                }
                            });
                        }
                    }
                });
            });
        } else if (layEvent == 'edit') {//编辑
            layer.open({
                title: '修改信息'
                , type: 1
                , area: ['600px', '350px']
                , content: $("#bridgeStateInform").html()
                , id: 'bridgeStateEdit-id'//防止重复打开
                , btn: '修改'
                , btnAlign: 'c'//按钮居中
                , shade: 0//不显示遮罩
                , success: function () {
                    document.getElementById('name').value = data['BridgeName'];
                    document.getElementById('time').value = data['Time'];
                    document.getElementById('top').value = data['TopPart'];
                    document.getElementById('bottom').value = data['BottomPart'];
                    document.getElementById('left').value = data['LeftPart'];
                    document.getElementById('right').value = data['RightPart'];
                }
                , yes: function (index, layero) {
                    var id = data['Id'];
                    var time = document.getElementById('time').value;
                    var topPart = document.getElementById('top').value;
                    var bottomPart = document.getElementById('bottom').value;
                    var leftPart = document.getElementById('left').value;
                    var rightPart = document.getElementById('right').value;
                    $.ajax({
                        type: "post",
                        url: "/BridgeState/EditBridgeState",
                        dataType: "json",
                        data: {
                            id: id
                            , time: time
                            , topPart: topPart
                            , bottomPart: bottomPart
                            , leftPart: leftPart
                            , rightPart: rightPart
                        },
                        success: function (data) {
                            if (data.code == 401) {
                                layer.open({
                                    title: 'Warning'
                                    , content: '有必填项未填！'
                                });
                            }
                            if (data.code == 200) {
                                layer.open({
                                    title: 'Success'
                                    , content: '修改成功！'
                                });
                                bridgeStateTable.reload({//重载表单
                                    where: {

                                    }
                                    , page: {
                                        curr: 1
                                    }
                                });
                                layer.close(index);
                            }
                        }
                    });
                }
            });
        }
    });
});