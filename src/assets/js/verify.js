import {Message} from "element-ui";

export default {
    resultCode(res,code){
        if (res.resultCode !== code) { //判断业务状态码
            Message.warning(res.resultCode + ' ' + res.message + ' ' + res.reason)
            return 0
        }
        return 1
    },
    showSuccess(message){
        Message.success(message + '成功')
    },
    showErr(message){
        Message.error(message + '失败')
    }
}
