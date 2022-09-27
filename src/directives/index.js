
// 自定义指令
export const imageError = {
    // 指令会在dom插入到节点之后执行
    inserted(dom, options) {
        // options指令中变量的解释
        // dom当前指令作用的节点对象
        // 当图片地址错误时触发一个事件，onerror
        dom.onerror = function () {
            // 当图片地址错误时，会把指令配置的默认图片，设置为图片 
            dom.src = options.value
        }
    }
}