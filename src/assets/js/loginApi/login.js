import {get, post, put,putParam,postParam} from '../global/get'
import qs from "qs";
//获取登录token
export function getUser(phoneNumber,passWord,verifyCode,smsCode) {
  const result = post('/api/Values/login',{
    "phoneNumber": phoneNumber,
    "passWord": passWord,
    "verifyCode": verifyCode,
    "smsCode":smsCode
  });
  return result;
}
//{refresh_token}刷新授权码
export function FreshToken(refresh_token) {
  const result = put('/api/Values/refresh_token/'+refresh_token,);
  return result;
}
//注册
export function reg(mobile,pwd1,code_img,code_phone,nickName,recommend) {
  const result = post('/api/Values/register',{
    "phoneNumber":mobile,
    "passWord": pwd1,
    "verifyCode": code_img,
    "smsCode": code_phone,
    "nickName": nickName,
    "recommend": recommend
  });
  return result;
}

//忘记密码
export function forgetLogin(mobile,pwd1,pwd2,SmsCode) {
  const result = put('/api/UserAssets/ForgetPassword',{
  /*{
    "Password": "string",
    "ConfirmPassword": "string",
    "phoneNumber": "string",
    "SmsCode": "string"
  }*/
    "Password":pwd1,
    "ConfirmPassword": pwd2,
    "phoneNumber":mobile,
    "SmsCode":SmsCode
  });
  return result;
}
//管理员登录前台获用户Token/
export function Admin(token) {
  const result = post('/api/Values/token/'+token);
  return result;
}
