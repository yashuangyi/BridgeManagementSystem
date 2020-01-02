layui.config({
    base: '/Scripts/Home/' //静态资源所在路径
}).use(['layer', 'element'], function () {
    var layer = layui.layer
        , element = layui.element;

    //加载事件
    layer.open({
        title: 'Welcome'
        , content: '欢迎使用桥梁管理系统！'
    });
});

function setSrc(path) {//修改iframe的读取路径并刷新
    //这一句必须在前面...
    document.getElementById("iframeMain").contentWindow.location.reload(true);
    var iframe = document.getElementById("iframeMain");
    iframe.src = path;
} 