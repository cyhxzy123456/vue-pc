import {get, post, put,getPages,putParam,postParam,postPage} from '../global/get'
//获取今日限买股/api/StockCommon/GetLimitStock
export function Limit(PageSize,PageIndex) {
  const result = post('/api/StockCommon/GetLimitStock',{
    "PageSize": PageSize,
    "PageIndex": PageIndex,
    "Sorts": [],
    "Conditions": [],

  });
  return result;
}
//获取最新交易信息
export function GetTrade() {
  const result = get('/api/StockCommon/GetDealLatest'
  );
  return result;
}
//
// 获取最新盈利信息
export function GetLastProfit() {
  const result = get('/api/StockCommon/GetProfitLatest'
  );
  return result;
}
//交易(策略)记录列表
export function ProductList(PageSize,PageIndex,status,type) {
  let list=[]
  if(type==''){
    list.push({
      "Key": "status",
      "Value": status,
      "WhereType": 2
    })
  }
  else if(type==11){
    list.push({
        "Key": "status",
        "Value": status,
        "WhereType": 2
      },
      {
        "Key": "product_type",
        "Value": "11",
        "WhereType": 1
      })
  }else if(type==10){
    list.push({
        "Key": "status",
        "Value": status,
        "WhereType": 2
      },
      {
        "Key": "product_type",
        "Value": "10",
        "WhereType": 1
      })
  }else if(type==12){
    list.push( {
        "Key": "status",
        "Value": status,
        "WhereType": 2
      },
      {
        "Key": "product_type",
        "Value": "12",
        "WhereType": 1
      })
  }else if(type==13){
    list.push( {
        "Key": "status",
        "Value": status,
        "WhereType": 2
      },
      {
        "Key": "product_type",
        "Value": "13",
        "WhereType": 1
      })
  }else if(type==15){
    list.push( {
        "Key": "status",
        "Value": status,
        "WhereType": 2
      },
      {
        "Key": "product_type",
        "Value": "15",
        "WhereType": 1
      })
  } else if(type==16){
    list.push({
        "Key": "status",
        "Value": status,
        "WhereType": 2
      },
      {
        "Key": "product_type",
        "Value": "16",
        "WhereType": 1
      })
  }else{
    list.push({
        "Key": "status",
        "Value": status,
        "WhereType": 2
      },
      {
        "Key": "product_type",
        "Value": "30",
        "WhereType": 6
      },
      {
        "Key": "product_type",
        "Value": "40",
        "WhereType": 3
      })
  }
  const result = post('/api/StocksMatch/follow/Index',{
    "PageSize": PageSize,
    "PageIndex": PageIndex,
    "Sorts": [
      /*{
        "Key": "FIELD(status,22,24,25,23)",//排序字段
        "Sort": 0  // 0升序  1降序
      },*/
      {
        "Key": "FIELD(product_type,30,31,10,11,12,13,14,15,40)",//排序字段
        "Sort": 0  // 0升序  1降序
      },
      {
        "Key": "date_reg",//排序字段
        "Sort": 1  // 0升序  1降序
      }
    ],
    "Conditions": [
      {
        "Conditions": list,
        "ConditionType": "and",
      }
    ],

  });
  return result;
}
//根据borrowId获取未结算交易记录详细信息
export function ProductDetail(borrowId) {
  const result = get('/api/StocksMatch/follow/GetFollowDetailById/'+borrowId
  );
  return result;
}
//mom根据followId获取未结算交易记录详细信息
export function ProductDetailMom(followId) {
  const result = get('/api/MOMFollow/GetFollowDetailById/'+followId
  );
  return result;
}
//根据borrowId获取已结算交易记录详细信息
export function SettleDetail(borrowId) {
  const result = get('/api/StocksMatch/follow/GetFollowDetailHisById/'+borrowId
  );
  return result;
}
//盈利提取提交
export function GetProfit(id,money) {
  const result = post('/api/StocksMatch/Userborrow/ExtractProfit?borrowId='+id+'&money='+money,
  );
  return result;
}
//追加策略borrowMoney
export function AddContract(id,money,borrowMoney) {
  const result = post('/api/StocksMatch/Userborrow/AppendBorrow?borrowId='+id+'&money='+money+'&borrowMoney='+borrowMoney,
  );
  return result;
}
///api/StocksMatch/Product/GetProductDetailById/{Id}
//根据Id获取产品详细信息
export function IdDetail(id) {
  const result = get('/api/StocksMatch/Product/GetProductDetailById/'+id
  );
  return result;
}

// 追加保证金
export function GetAddMoney(id,money) {
  const result = post('/api/StocksMatch/Userborrow/AppendDeposit?borrowId='+id+'&money='+money,
  );
  return result;
}

//结算
export function Settle(id) {
  const result = postParam('/api/StocksMatch/Userborrow/ApplySettle',
    {borrowId:id}
  );
  return result;
}
//获取自选列表
export function GetMychoose(PageSize,PageIndex) {
  const result = post('/api/UserStock/GetPagerList',{
    "PageSize": PageSize,
    "PageIndex": PageIndex,
    "Sorts": [],
    "Conditions": []
  });
  return result;
}
// 添加自选股
export function AddMychoose(stockCode,stockName) {
  const result = post('/api/UserStock/Create',
    {
      "stockCode": stockCode,
      "stockName": stockName,
    });
  return result;
}
//删除自选
export function DeleteMychoose(id) {
  const result = post('/api/UserStock/Delete',
    [id]
  );
  return result;
}
//根据股票名称等查询股票{stockName}
//股票搜索下拉列表
export function SearchStock(stockName) {
  const result = get('/api/StocksMatch/StockTrade/GetStockByName/'+stockName,
    );
  return result;
}
//根据股票代码获取行情market
export function Market(stockCode) {
  const result = get('/api/StocksMatch/StockTrade/GetStock/'+stockCode,
  );
  return result;
}

//走势图接口
export function Quotations(type,stock_code) {
  const result = get('/api/StocksMatch/StockTrade/StockLineApi',
    {
      type:type,flag:0,stock_code:stock_code
    }
  );
  return result;
}
//买入
export function Buy(followId,stockCode,stockName,dealPrice,dealNumber) {
  const result = post('/api/StocksMatch/StockTrade/Buy',
    {
      "followId":followId,
      "stockCode": stockCode,
      "stockName": stockName,
      "dealPrice": dealPrice,
      "dealNumber": dealNumber
    }
  );
  return result;
}
//mom买入
export function BuyMom(followId,stockCode,stockName,dealPrice,dealNumber) {
  const result = post('/api/MOMStockTrade/Buy',
    {
      "followId":followId,
      "stockCode": stockCode,
      "stockName": stockName,
      "dealPrice": dealPrice,
      "dealNumber": dealNumber
    }
  );
  return result;
}

//股配获取最大可买数量/api/StocksMatch/StockTrade/GetMaxBuyNumber/{followId}/{dealPrice}
export function GetMax(followId,dealPrice,stockCode ) {
  const result = get('/api/StocksMatch/StockTrade/GetMaxBuyNumber/'+followId+ "/"+dealPrice+ "/"+stockCode ,
  );
  return result;
}
//mom获取最大可买数量
export function GetMaxMom(followId,dealPrice,stockCode) {
  const result = get('/api/MOMStockTrade/GetMaxBuyNumber/'+followId+ "/"+dealPrice+ "/"+stockCode,
  );
  return result;
}

//根据股票代码获取最大可卖数量/api/StocksMatch/StockTrade/GetMaxSellNumber/{followId}/{stockCode}/{substockid}
export function GetMaxSale(followId,dealPrice,substockid,stockid) {
  const result = get('/api/StocksMatch/StockTrade/GetMaxSellNumber/'+followId+ "/"+dealPrice+ "/"+substockid+ "/"+stockid,
  );
  return result;
}

//{followId}获取未结算持仓数据
export function GetPositionList(followId,PageSize,PageIndex) {
  const result = post('/api/StocksMatch/follow/GetStockById',
    {
      "PageSize": PageSize,
      "PageIndex": PageIndex,
      "Sorts": [],
      "Conditions": [
        {
          "Conditions": [
            {
              "Key": "followId",
              "Value": followId,
              "WhereType": 0
            }
          ],
          "ConditionType": "and"
        }
      ]
    }
  );
  return result;
}

export function GetPositionListMom(followId,PageSize,PageIndex) {
  const result = post('/api/MOMFollow/GetStockById',
    {
      "PageSize": PageSize,
      "PageIndex": PageIndex,
      "Sorts": [],
      "Conditions": [
        {
          "Conditions": [
            {
              "Key": "followId",
              "Value": followId,
              "WhereType": 0
            }
          ],
          "ConditionType": "and"
        }
      ]
    }
  );
  return result;
}
//卖票
export function Sale(followId,stockId,stockCode,stockName,dealPrice,dealNumber) {
  const result = post('/api/StocksMatch/StockTrade/Sell/',{
      "followId": followId,
      "stockCode":stockCode.concat(stockId),
      "stockName":stockName,
      "dealPrice": dealPrice,
      "dealNumber": dealNumber
    }
  );
  return result;
}

export function SaleMom(followId,stockId,stockCode,stockName,dealPrice,dealNumber) {
  const result = post('/api/MOMStockTrade/Sell',{
      "followId": followId,
      "stockCode":stockCode.concat(stockId),
      "stockName":stockName,
      "dealPrice": dealPrice,
      "dealNumber": dealNumber
    }
  );
  return result;
}
//当日成交
export function GetDealToday(followid,PageSize,PageIndex) {
  const result = post('/api/StocksMatch/FollowDeal/Index',
    {
      "PageSize": PageSize,
      "PageIndex": PageIndex,
      "Sorts": [{
        "Key": "id",
        "Sort": 1
      }
      ],
      "Conditions": [{
        "Conditions": [{
          "Key": "followid",
          "Value": followid,//传当前合约followId的值
          "WhereType": 1
        }
        ],
        "ConditionType": "and"
      }
      ]
    });
  return result;
}
//历史成交
export function GetDealHistory(followid,PageSize,PageIndex) {
  const result = post('/api/StocksMatch/FollowDeal/IndexHistory',
    {
      "PageSize": PageSize,
      "PageIndex": PageIndex,
      "Sorts": [{
        "Key": "id",
        "Sort": 1
      }
      ],
      "Conditions": [{
        "Conditions": [{
          "Key": "followid",
          "Value": followid,//传当前合约followId的值
          "WhereType": 1
        }
        ],
        "ConditionType": "and"
      }
      ]
    });
  return result;
}
//今日委托记录列表
export function GetApplyToday(followid,PageSize,PageIndex) {
  const result = post('/api/StocksMatch/FollowApply/Index',
  {
    "PageSize": PageSize,
    "PageIndex": PageIndex,
    "Sorts": [{
    "Key": "id",
    "Sort": 1
  }
  ],
    "Conditions": [{
    "Conditions": [{
      "Key": "followid",
      "Value": followid,//传当前合约followId的值
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
//今日委托记录列表(可撤单)
export function GetCancle(followid,PageSize,PageIndex) {
  const result = post('/api/StocksMatch/FollowApply/Index',
    {
      "PageSize": PageSize,
      "PageIndex": PageIndex,
      "Sorts": [{
        "Key": "id",
        "Sort": 1
      }
      ],
      "Conditions": [{
        "Conditions": [{
          "Key": "followid",
          "Value": followid,//传当前合约followId的值
          "WhereType": 1
        },
          {
            "Key": "deal_status",
            "Value": '0,4,6,9,11,100,101,102',//传当前合约followId的值deal_status
            "WhereType": 2
          }
        ],
        "ConditionType": "and"
      }
      ]
    }
  );
  return result;
}
//历史委托记录列表
export function GetApplyHistory(followid,PageSize,PageIndex) {
  const result = post('/api/StocksMatch/FollowApply/IndexHistory',
    {
      "PageSize": PageSize,
      "PageIndex": PageIndex,
      "Sorts": [{
        "Key": "id",
        "Sort": 1
      }
      ],
      "Conditions": [{
        "Conditions": [{
          "Key": "followid",
          "Value": followid,//传当前合约followId的值
          "WhereType": 1
        }
        ],
        "ConditionType": "and"
      }
      ]
    });
  return result;
}
//合约账户资金流水
export function GetFlowing(followid,PageSize,PageIndex) {
  const result = post('/api/StocksMatch/FollowApply/FollowMoneyList',
    {
      "PageSize": PageSize,
      "PageIndex": PageIndex,
      "Sorts": [{
        "Key": "id",
        "Sort": 1
      }
      ],
      "Conditions": [{
        "Conditions": [{
          "Key": "followid",
          "Value": followid,//传当前合约followId的值
          "WhereType": 1
        }
        ],
        "ConditionType": "and"
      }
      ]
    });
  return result;
}
//持仓的预结算额点击
export function GetFlowing2(stockid,PageSize,PageIndex) {
  const result = post('/api/StocksMatch/FollowApply/FollowMoneyList',
    {
      "PageSize": PageSize,
      "PageIndex": PageIndex,
      "Sorts": [
        {
          "Key": "id",
          "Sort": 1
        }
      ],
      "Conditions": [
        {
          "Conditions": [
            {
              "Key": "deal_type",
              "Value": "0,1,40,50",
              "WhereType": 2
            },
            {
              "Key": "stockid",
              "Value": stockid,
              "WhereType": 1
            }
          ],
          "ConditionType": "and"
        }
      ]
    });
  return result;
}
//交割单查询
export function DeliverInfo(authNo,followid,PageSize,PageIndex) {
  let array=[]
  if(followid==0){
    array=[
      {
        "Conditions": [
          {
            "Key": "auth_no",
            "Value": authNo,//传输入的委托编号
            "WhereType": 8
          }
        ],
        "ConditionType": "and"
      }
    ]
  }else{
    array=[
      {
        "Conditions": [
          /*{
            "Key": "auth_no",
            "Value": authNo,//传输入的委托编号
            "WhereType": 8
          },*/
          {
            "Key": "followid",
            "Value": followid,//传输入的委托编号
            "WhereType": 1
          }
        ],
        "ConditionType": "and"
      }
    ]
  }
  const result = post('/api/MasterDeal/GetMasterDealList',
    {
      "PageSize":PageSize,
      "PageIndex": PageIndex,
      "Sorts": [
        {
          "Key": "id",
          "Sort": 1
        }
      ],
      "Conditions": array
    }
  );
  return result;
}
//撤单cancle
export function Cancle(followApplyId) {
  const result = put('/api/StocksMatch/StockTrade/StockBack/'+followApplyId)
  return result;
}
export function CancleMom(followApplyId) {
  const result = put('/api/MOMStockTrade/StockBack/'+followApplyId)
  return result;
}

//mom获取历史持仓数据
export function GetStockHistory(followid,PageSize,PageIndex) {
  const result = post('/api/MOMFollow/GetStockHistory',
    {
      "PageSize": PageSize,
      "PageIndex": PageIndex,
      "Sorts": [{
        "Key": "id",
        "Sort": 1
      }
      ],
      "Conditions": [{
        "Conditions": [{
          "Key": "followid",
          "Value": followid,//传当前合约followId的值
          "WhereType": 1
        }
        ],
        "ConditionType": "and"
      }
      ]
    });
  return result;
}
