import {get, post, put,getPages,putParam,postParam,postPage} from '../global/get'
//获取产品类型
export function ProductType() {
  const result = get('/api/StocksMatch/Product/Index');
  return result;
}
//获取产品详情
export function ProductDetail(productType) {
  const result = get('/api/StocksMatch/Product/Get_ProductByType/'+productType);
  return result;
}
//提交产品
export function CommitProduct(productListId,principalInput,matchMoney,ManagementFee,profitDistribution,minDay) {
  const result = post('/api/StocksMatch/Userborrow/ApplyBorrow',
    {
      "productListId": productListId,
      "principalInput": principalInput,
      "matchMoney": matchMoney,
      "ManagementFee": ManagementFee,
      "profitDistribution": profitDistribution,
      "minDay": minDay
    });
  return result;
}

//判断是否开启免息
export function IsOpenFree() {
  const result = get('/api/StocksMatch/Product/GetLockFree/');
  return result;
}

//mom申请借款
export function CommitMom(productListId,principalInput,matchMoney,ManagementFee,profitDistribution,minDay) {
  const result = post('/api/MOMUserborrow/ApplyBorrow',
    {
      "productListId": productListId,
      "principalInput": principalInput,
      "matchMoney": matchMoney,
      "ManagementFee": ManagementFee,
      "profitDistribution": profitDistribution,
      "minDay": minDay
    });
  return result;
}
