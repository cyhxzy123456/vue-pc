import {get, post, put,getPages,putParam,postParam,postPage} from '../global/get'
import qs from 'qs'
// 获取系统配置信息
export function GetAll() {
  const result = get('/api/WebSiteInfo/Index');
  return result;
}
// 获取网站配置开关信息
export function GetConfig() {
  const result = get('/api/WebSiteInfo/WebSiteConfig');
  return result;
}

//获取sysConfig配置
export function GetsysConfig(code) {
  const result = get('/api/StockCommon/GetSysConfig/'+code);
  return result;
}
//获取网站提现配置信息
export function GetDrawInfo() {
  const result = get('/api/WebSiteInfo/WebCashInfo');
  return result;
}
//banner根据callindex获取广告，包括banner和有情链接
export function getBanner(callIndex) {
  const result = get('/api/ArticleShows/GetadBycallIndex',{
    callIndex:callIndex,
  });
  return result;
}
//获取图形验证码
export function getImgCode() {
  const result = get('/api/verifyCode/getCode');
  return result;
}
//获取注册和忘记密码短信验证码
export function getRegCode(phone,verifyCode,callIndex,phoneValidate) {
  const result = postParam('/api/Values/sendcode',{
    phone:phone,verifyCode:verifyCode,callIndex:callIndex,phoneValidate:phoneValidate
  });
  return result;
}
//判断短信验证码是否正确 注册不用判断。
export function JudgeSmsCode(phone,smsCode) {
  const result = postParam('/api/Values/JudgeSmsCode',{
    phone:phone,smsCode:smsCode
  });
  return result;
}
//协议
export function getProtocol(callIndex,accountId,userId,productListId,day_rate,borrowmoney,benjin,total_money,warnmoney,openLineMoney,gdmoney) {
  const result = post('/api/ArticleShows/GetAgreeMent',
    {
      "callIndex": callIndex,
      "accountId": accountId,
      "userId": userId,
      "productListId":productListId,
      "keyValues": {
        "{day_rate}": day_rate,
        "{borrowmoney}": borrowmoney,
        "{benjin}": benjin,
        "{total_money}":total_money,
        "{warnmoney}": warnmoney,
        "{openLineMoney}":openLineMoney,
        "{gdmoney}":gdmoney,
       /* "Total_Rate": "string",
        "GEM_Rate": "string",*/
      }
    });
  return result;
}
//发送登录后的验证码，包括提现密码的修改设置，登录密码的修改设置
export function getPhoneCode(callIndex,imgcode) {
  const result = postParam('/api/UserAssets/UpdatePwdSendCode/sendcode',{
    callIndex:callIndex,verifyCode:imgcode
  });
  return result;
}
//修改密码判断短信验证码是否正确(不知道真正手机号)
export function VerifyCode(smsCode) {
  const result = postParam('/api/UserAssets/JudgeSmsCode/JudgeSmsCode',{
    smsCode:smsCode
  });
  return result;
}
//加盟
// 招商加盟留言
export function Join(phoneNumber,name,remark,verifyCode,company,sex,address,content) {
  const result = post('/api/AccountApply/JoinAccounts',{
    "phoneNumber":phoneNumber,
    "name": name,
    "company": company,
    "sex": sex,
    "address": address,
    "content": content,
    "remark": remark,
    "verifyCode": verifyCode
  });
  return result;
}

