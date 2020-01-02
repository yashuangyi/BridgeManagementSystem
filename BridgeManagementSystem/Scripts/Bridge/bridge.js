layui.config({
    base: '/Scripts/Bridge/' //静态资源所在路径
}).use(['element','table','form','layer'], function () {
    var table = layui.table
        , form = layui.form
        , layer = layui.layer
        , element = layui.element;

    //表单
    var bridgeTable = table.render({//桥梁信息表
        elem: '#bridge'
        , height: 700
        , width: 1150
        , url: '/Bridge/ShowBridge'//数据接口
        , toolbar: 'default'//开启工具栏
        , page: true//开启分页
        , cols: [[
            { type: 'checkbox', fixed: 'left' }
            , { field: 'Id', title: "编号", width: 80, sort: true, fixed: 'left' }
            , { field: 'Name', title: "名称", width: 120 }
            , { field: 'Address', title: "地址", width: 250 }
            , { field: 'Unit', title: "管理单位", width: 350 }
            , { field: 'Type', title: "类型", width: 80 }
            , { fixed: 'right', width: 165, align: 'center', toolbar: '#bar' }
        ]]
    });

    //监听头部工具栏事件
    table.on('toolbar(bridge)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id)
            , data = checkStatus.data;//获取选中的数据
        switch (obj.event) {
            case 'add':
                layer.open({
                    title: '添加桥梁'
                    , type: 1
                    , area: ['400px', '350px']
                    , content: $("#bridgeInform").html()
                    , id: 'bridgeAdd-id'//防止重复打开
                    , btn: '添加'
                    , btnAlign: 'c'//按钮居中
                    , shade: 0//不显示遮罩
                    , yes: function (index,layero) {
                        var name = document.getElementById('name').value;
                        var address = document.getElementById('address').value;
                        var unit = document.getElementById('unit').value;
                        var type = document.getElementById('type').value;
                        $.ajax({
                            type: "post",
                            url: "/Bridge/AddBridge",
                            dataType: "json",
                            data: {
                                name: name
                                , address: address
                                , unit: unit
                                , type: type
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
                                        , content: '添加成功！'
                                    });
                                    bridgeTable.reload({//重载表单
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
                        , area: ['400px', '350px']
                        , content: $("#bridgeInform").html()
                        , id: 'bridgeEdit-all-id'//防止重复打开
                        , btn: '修改'
                        , btnAlign: 'c'//按钮居中
                        , shade: 0//不显示遮罩
                        , success: function () {
                            document.getElementById('name').value = data[0]['Name'];
                            document.getElementById('address').value = data[0]['Address'];
                            document.getElementById('unit').value = data[0]['Unit'];
                            document.getElementById('type').value = data[0]['Type'];
                        }
                        , yes: function (index, layero) {
                            var id = data[0]['Id'];
                            var name = document.getElementById('name').value;
                            var address = document.getElementById('address').value;
                            var unit = document.getElementById('unit').value;
                            var type = document.getElementById('type').value;
                            $.ajax({
                                type: "post",
                                url: "/Bridge/EditBridge",
                                dataType: "json",
                                data: {
                                    id: id
                                    , name: name
                                    , address: address
                                    , unit: unit
                                    , type: type
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
                                        bridgeTable.reload({//重载表单
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
                    layer.confirm('删除所选桥梁信息同时会删除其管养信息，确认删除？', { icon: 3, title: '提示信息' }, function (index) {
                        for (i = 0; i < data.length; i++) {
                            var id = data[i]['Id'];
                            var name = data[i]['Name'];
                            var address = data[i]['Address'];
                            var unit = data[i]['Unit'];
                            var type = data[i]['Type'];
                            var isOk = true;
                            $.ajax({
                                type: "post",
                                url: "/Bridge/DeleteBridge",
                                dataType: "json",
                                data: {
                                    id: id
                                    , name: name
                                    , address: address
                                    , unit: unit
                                    , type: type
                                },
                                success: function (data) {
                                    if (data.code == 200) {
                                        bridgeTable.reload({//重载表单
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
    table.on('tool(bridge)', function (obj) {
        var data = obj.data//获得当前行数据
            , layEvent = obj.event;//获得lay-event对应的值
        if (layEvent == 'detail') {//查看
            layer.open({
                title: '查看信息'
                , type: 1
                , area: ['400px', '350px']
                , content: $("#bridgeInform").html()
                , id: 'bridgeInform-id'//防止重复打开
                , btn: 'OK'
                , btnAlign: 'c'//按钮居中
                , shade: 0//不显示遮罩
                , success: function () {
                    document.getElementById('name').value = data['Name'];
                    document.getElementById('address').value = data['Address'];
                    document.getElementById('unit').value = data['Unit'];
                    document.getElementById('type').value = data['Type'];
                    $('#bridgeForm').find('input,textarea,select').attr('readonly', true);//设为只读
                }
                , yes: function (index,layero) {
                    layer.close(index);
                }
            });
        } else if (layEvent == 'del') {//删除
            layer.confirm('删除桥梁信息同时会删除其管养信息，确认删除？', { icon: 3, title: '提示信息' }, function (index) {
                //向服务端发送删除指令
                var id = data['Id'];
                var name = data['Name'];
                var address = data['Address'];
                var unit = data['Unit'];
                var type = data['Type'];
                $.ajax({
                    type: "post",
                    url: "/Bridge/DeleteBridge",
                    dataType: "json",
                    data: {
                        id: id
                        , name: name
                        , address: address
                        , unit: unit
                        , type: type
                    },
                    success: function (data) {
                        if (data.code == 200) {
                            obj.del();//删除对应行的DOM结构
                            layer.close(index);
                            layer.open({
                                title: 'Success'
                                , content: '删除成功！'
                            });
                            bridgeTable.reload({//重载表单
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
                , area: ['400px', '350px']
                , content: $("#bridgeInform").html()
                , id: 'bridgeEdit-id'//防止重复打开
                , btn: '修改'
                , btnAlign: 'c'//按钮居中
                , shade: 0//不显示遮罩
                , success: function () {
                    document.getElementById('name').value = data['Name'];
                    document.getElementById('address').value = data['Address'];
                    document.getElementById('unit').value = data['Unit'];
                    document.getElementById('type').value = data['Type'];
                }
                , yes: function (index, layero) {
                    var id = data['Id'];
                    var name = document.getElementById('name').value;
                    var address = document.getElementById('address').value;
                    var unit = document.getElementById('unit').value;
                    var type = document.getElementById('type').value;
                    $.ajax({
                        type: "post",
                        url: "/Bridge/EditBridge",
                        dataType: "json",
                        data: {
                            id: id
                            , name: name
                            , address: address
                            , unit: unit
                            , type: type
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
                                bridgeTable.reload({//重载表单
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