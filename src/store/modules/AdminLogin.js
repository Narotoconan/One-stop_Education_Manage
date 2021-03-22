import LoginApi from "../../apis/modules/LoginApi"
import verify from "../../assets/js/verify"
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'
import CryptoJS from 'crypto-js'
import {Message} from "element-ui"

export default {
    state: {
        userPassword: null,
        userMessage: null,
        RandomKey: null,
        aesQuestData: null,
        RsaRandomKey: null,
        publicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCf5PqLyg9c70PVyEYqQqyr0AYq
ylQzh2dre46iEM/5wrVC2pAhtlUh4l4iIZQeN6CznLdilKpLVwr71Cgl+5zGV7NW
95auPgFGwLpSE3aDQ2VlpIkY+9yMhmT6SYdalHDlmqYXh7pE0zHKeI02zWej5JRi
LjOrx7KoW0KlL2xx9wIDAQAB
-----END PUBLIC KEY-----
`
    },
    mutations: {
        getRamNumber(state) {
            let result = '';
            for (let i = 0; i < 16; i++) {
                result += Math.floor(Math.random() * 16).toString(16);//获取0-15并通过toString转16进制
            }
            //默认字母小写，手动转大写
            state.RandomKey = result.toLowerCase();//另toLowerCase()转小写
        },
        toAes(state) {
            //AES加密
            //let aesText
            let cryptKey = CryptoJS.enc.Utf8.parse(state.RandomKey);

            state.aesQuestData = CryptoJS.AES.encrypt(state.userPassword, cryptKey, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
                iv: ''
            }).toString();
            //base64转化
            //state.aesQuestData = CryptoJS.enc.Utf8.parse(a);
            //state.aesQuestData = CryptoJS.enc.Base64.stringify(b);
        },
        toRsa(state) {
            let encrypt = new JSEncrypt();
            //设置公钥
            encrypt.setPublicKey(state.publicKey);
            //RSA加密
            state.RsaRandomKey = encrypt.encrypt(state.RandomKey).toString();
        },
    },
    actions: {
        adminLogin(context, payload) {
            context.state.userPassword = payload.password
            context.commit('getRamNumber');
            context.commit('toAes')
            context.commit('toRsa')
            payload.password = context.state.aesQuestData

            LoginApi.AdminLogin(payload, context.state.RsaRandomKey)
                .then(res => {
                    if (!verify.resultCode(res,1110)) return
                    Message.success('登录成功')
                    setTimeout(function () {
                        window.location.href = '/home'
                    }, 1000);
                }).catch(err => {
                    Message.error('登录失败')
                    console.log(err)
            })
        }
    },
    getters: {},
}
