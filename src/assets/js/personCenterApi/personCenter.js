import {get, post, put,getPages,putParam,postParam,postPage} from '../global/get'
let dateFormat = require('dateformat')
//我的推广会员收益流水 分页列表(汇总)
export function GetTotal(startTime,endTime) {
  let list=[]
  if (startTime) {
    list.push( {
      "Key": "timeAdd ",
      "Value": dateFormat(startTime,"yyyy-mm-dd 00:00:00"),
      "WhereType": 9
    })
  }
  if (endTime) {
    list.push( {
      "Key": "timeAdd ",
      "Value": dateFormat(endTime,"yyyy-mm-dd 23:59:59"),
      "WhereType": 10
    })
  }

  const result = post('/api/UserExtension/indexsum',
    {
      "PageSize":1,
      "PageIndex": 1,
      "Sorts": [],
      "Conditions": [
        {
          "Conditions": list,
          "ConditionType": "and",
        }
      ]
    }

  );
  return result;
}
//我的推广会员
export function GetRefrenceList(PageSize,PageIndex,level) {
  const result = post('/api/UserExtension/GetRefrenceList?level='+level,
    {
      "PageSize":PageSize,
      "PageIndex": PageIndex,
      "Sorts": [],
      "Conditions": []
    }
  );
  return result;
}

//我的推广会员收益流水/api/UserExtension/GetRefrenceMoneyList
export function GetRefrenceMoneyList(PageSize,PageIndex) {
  const result = post('/api/UserExtension/GetRefrenceMoneyList',
    {
      "PageSize":PageSize,
      "PageIndex": PageIndex,
      "Sorts": [],
      "Conditions": [

      ]
    }
  );
  return result;
}
//获取用户信息
export function GetUserInfo() {
  const result = get('/api/UserAssets/UserInfo',{date:new Date()});
  return result;
}
//会员资金统计
export function GetUserMoney() {
  const result = get('/api/UserAssets/Index');
  return result;
}
//获取充值方式
// 获取可支付方式
export function GetRechargeType() {
  const result = get('/api/UserRecharge/Index',{
    accountsId:0
  });
  return result;
}
//提交充值
export function CommitRecharge(rechargeMoney,rechargeFrom,remark,id) {
  const result = post('/api/UserRecharge/Recharge',{
    "rechargeMoney": rechargeMoney,
    "rechargeNo": '',
    "rechargeFrom": rechargeFrom,
    "remark": remark,
    "rechargeId": id
  });
  return result;
}
//牛牛支付
export function CommitNiu() {
  const result = get('/api/PaymentControll/CashierPay',
    {return_uri:'http://139.224.113.43:8001/#/personCenter/user'});
  return result;
}
//网关支付WangGuan
//网银支付
export function WangGuan(pay_money) {
  const result = get('/api/PaymentControll/Xpay_NetPay',
    {pay_money:pay_money,return_uri:'http://139.224.113.43:8001/#/personCenter/wangGuan'});
  return result;
}
//找回提现密码
export function FindDrawing(pwd1,pwd2,phoneNumber) {
  const result = put('/api/UserAssets/ForgetPasswordTrans',{
      "Password": pwd1,
      "ConfirmPassword": pwd2,
      "phoneNumber":phoneNumber
    }
  );
  return result;
}
//提现提现
export function CommitDraw(cashMoney,cashBankName,cashPassword) {
  const result = post('/api/UserCash/UserCash',
    {
      "cashMoney": cashMoney,
      "cashBankName": cashBankName,
      "cashPassword": cashPassword
    });
  return result;
}
//提现记录
export function GetDrawList(PageSize,PageIndex) {
  const result = post('/api/UserCash/Index',
    {
      "PageSize":PageSize,
      "PageIndex": PageIndex,
      "Sorts": [
        {
          "Key": "id",
          "Sort": 1
        }
      ],
      "Conditions": []
    }
  );
  return result;
}
//提款撤回
export function CancleDraw(Id) {
  const result = put('/api/UserCash/UserCashCancel/'+Id)
  return result;
}

// 修改昵称
export function updateNickName(nickName) {
  const result = putParam('/api/UserAssets/UpdateNickName',{NickName:nickName});
  return result;
}
//实名认证
export function RealName(idCard,username,verifyCode) {
  const result = putParam('/api/UserAssets/UpdateNameTrue',
    {idCard:idCard,userName:username,verifyCode:verifyCode});
  return result;
}
// 修改登录密码
export function updateLogin(oldPassword,newPassword) {
  const result = put('/api/UserAssets/UpdatePassword',
    {
      "oldPassword":oldPassword,
      "newPassword": newPassword
    }
  );
  return result;
}
// 设置交易密码
export function setDrawing(pwd1,pwd2) {
  const result = put('/api/UserAssets/UpdatePasswordTrans', {
      "oldPassword": pwd1,
      "newPassword": pwd2
    }
  );
  return result;
}
//找回交易密码
export function findDrawing(pwd1,pwd2,code_img,code_phone) {
  const result = putParam('/api/TUser/FindTradePwd',{ pwd1:pwd1,pwd2:pwd2,code_img,code_phone}
  );
  return result;
}

//修改绑定手机发送验证码
export function MobilePhoneCode(verifyCode) {
  const result = post('/api/UserAssets/SendCode/'+verifyCode,
  );
  return result;
}
//修改绑定手机
export function UpdateMobile(newPhone,newSmsCode,verifyCode) {
  const result = put('/api/UserAssets/UpdatePhone', {
      "newPhone": newPhone,
      "newSmsCode": newSmsCode,
      "verifyCode": verifyCode
    }
  );
  return result;
}

//申请注销账号
export function Cancle() {
  const result = put('/api/UserAssets/ApplyCancellation',
  );
  return result;
}
//获取银行支持银行卡
export function GetBank() {
  const result = get('/api/UserBank/getchildrenbycallindex',
    {callIndex:'bank'});
  return result;
}
//绑定银行卡
export function AddBank(bankName,bankAddress,bankBranch,bankCard,phoneNumber) {
  const result = post('/api/UserBank/add',
    {
      "bankName":bankName,
      "bankAddress":bankAddress,
      "bankBranch": bankBranch,
      "bankCard": bankCard,
      "phoneNumber": phoneNumber
    }
  );
  return result;
}
//获取用户绑定的银行
export function GetBankList() {
  const result = get('/api/UserBank/getuserbank');
  return result;
}
//修改银行卡
export function UpdateBank(BankName,hcity,upbankname,bankCard,phoneNumber) {
  const result = put('/api/UserBank/Update',
    {
      "bankName":BankName,
      "bankAddress": hcity,
      "bankBranch": upbankname,
      "bankCard": bankCard,
      "phoneNumber": phoneNumber
    }
  );
  return result;
}
//评测列表获取
export function GetReview() {
  const result = get('/api/qaEvaluation/GetQuestionlist');
  return result;
}
//提交风险评测
export function CommitReview(AnswerList) {
  const result = post('/api/qaAnswer/SubmitAnswer',AnswerList);
  return result;
}

//律大大签署发起
export function GetAgreement(borrowId,contractType) {
  const result = post('/api/UserContract/Index',
    {borrowId:borrowId,contractType:contractType,returnUrl:"http://139.224.113.43:8001/#/agreen"});
  return result;
}
//律大大签署查看/api/UserContract/ContractView/{borrowId}/{contractType}
export function SeeAgreement(borrowId,contractType) {
  const result = get('/api/UserContract/ContractView/'+borrowId+'/'+contractType
  );
  return result;
}
//签署合同下载
export function DownAgreement(borrowId,contractType) {
  const result = post('/api/UserContract/ContractDownload/'+borrowId+'/'+contractType
  );
  return result;
}

//同步签署合同回调
export function BackAgreement(resultCode,resultDesc,contractID,customerType,customerID,timestamp,msgDigest) {
  const result = put('/api/UserContract/UserSignatureCallBack',{
      "resultCode": resultCode,
      "resultDesc": resultDesc,
      "contractID": contractID,
      "customerType": customerType,
      "customerID": customerID,
      "timestamp": timestamp,
      "msgDigest": msgDigest
    }
  );
  return result;
}
//会员资金明细列表
export function GetMoneyList(PageSize,PageIndex,date,type) {
  let array
  if(type==0){
    array = [
      {
        "Conditions": [
          {
            "Key": "timeAdd",
            "Value": "(DATE_FORMAT(DATE_ADD(CURDATE(),INTERVAL -"+date+" DAY),'%Y-%m-%d %H:%i:%s'))",
            "WhereType": 6
          },

          //31,32,110,105提现//30充值//61,62,63,67,98保证金//40,41借款明细//60利润提取//22,66,72管理费
          /*{
            "Key": "serviceType",
            "Value": type,
            "WhereType": 2
          }*/
        ],
        "ConditionType": "and"
      }
    ]
  }else{
    array = [
      {
        "Conditions": [
          {
            "Key": "timeAdd",
            "Value": "(DATE_FORMAT(DATE_ADD(CURDATE(),INTERVAL -"+date+" DAY),'%Y-%m-%d %H:%i:%s'))",
            "WhereType": 6
          },

          //31,32,110,105提现//30充值//61,62,63,67,98保证金//40,41借款明细//60利润提取//22,66,72管理费
          {
            "Key": "serviceType",
            "Value": type,
            "WhereType": 2
          }
        ],
        "ConditionType": "and"
      }
    ]
  }
  const result = post('/api/UserMoney/Index',
    {
      "PageSize": PageSize,
      "PageIndex": PageIndex,
      "Sorts": [
        {
          "Key": "id",
          "Sort": 1
        }
      ],
      "Conditions":array
    }
  );
  return result;
}
//意见反馈添加
export function CommitFeedBack(list) {
  const result = post('/api/wWorkOrder/Add?'+ 'api-version=2',list);
  return result;
}
//查询意见
export function GetFeedBack(pagesize,pageindex) {
  const result = post('/api/wWorkOrder/Index',
    {
      "PageSize":pagesize,
      "PageIndex":pageindex,
      "Sorts": [],
      "Conditions": []
    });
  return result;
}
//查询后台回复或则追加回复
export function GetManage(pagesize,pageindex,id) {
  const result = post('/api/wWorkOrder/IndexList',
    {
      "PageSize": pagesize,
      "PageIndex":pageindex,
      "Sorts": [],
      "Conditions": [
        {
          "Conditions": [
            {
              "Key": "pid",
              "Value": id, //这里传查询用户所有工单记录 的id
              "WhereType": 1
            }
          ],
          "ConditionType": "and"
        }
      ]
    }
  );
  return result;
}
//结束
export function OverFeedBack(id,score,comment) {
  const result = post('/api/wWorkOrder/End',{
    "id":id,"score":score,"comment":comment
  });
  return result;
}
//追加意见
export function Add(id,content,verifyCode) {
  const result = post('/api/wWorkOrder/Reply?'+ 'api-version=2',
    {"pid":id,"content":content,"verifyCode":verifyCode});
  return result;
}
