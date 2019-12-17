import {get, post, put,getPages,putParam,postParam,postPage} from '../global/get'
import qs from 'qs'

//获取要展示的文章分类
export function GetClass() {
  const result = get('/api/ArticleShows/GetCategory/');
  return result;
}
//公告列表所有的列表都是这个接口，可以改变参数来请求不同的数据
export function getList(PageSize,PageIndex,callIndexValue) {
  const result = post('/api/ArticleShows/GetArticleByCallIndex',{
    "PageSize": PageSize,
    "PageIndex": PageIndex,
    "Sorts": [],
    "Conditions": [
      {
        "Conditions": [
          {
            "Key": "callIndex",
            "Value": callIndexValue,
            "WhereType": 0
          },
          {
            "Key": "accountsId",
            "Value": 0,
            "WhereType": 0
          }
        ],
        "ConditionType": "and"
      }
    ]
  });
  return result;
}
//新闻详情
export function getNoticeDetail(id) {
  const result = get('/api/ArticleShows/GetArticleById/'+id);
  return result;
}

//根据callIndex获取文章分类的下级
export function GetChild(callIndex) {
  const result = get('/api/ArticleShows/GetCategoryChildren',{
    callIndex:callIndex
  });
  return result;
}
