const DATA1 = require("./vid.js").DATA
const moment=require("moment")
const prefix="https://service-d6p7no2y-1252957949.ap-hongkong.apigateway.myqcloud.com/test/mongo"

const api={
  "add":prefix+"",
  "full":prefix+"/full",
  "click":prefix+"/click",
  "sync":prefix+"/sync",
  "weibo_token":prefix+"/weibo_token",
  "jeff1":prefix+"/mongo/jeff1",
  "jeff":"https://ttt-1252957949.cos.ap-hongkong.myqcloud.com/music/jeff1.json",
   "echo":"https://service-9rx17sto-1252957949.ap-hongkong.apigateway.myqcloud.com/release/douban/echo",
}


const today=()=>moment()
const weekday=()=>today().weekday()
const saturday=()=>today().add(weekday()-5,'days').format('YYYYMMDD')

const VID="76924631"
const cached_format=(vid=VID)=>({
  "_id": "5d2150cab27764000d108661",
  "vid": vid,
  "name": vid,
  "value": 1,
  "full": false,
  "click": 0,
  "cat": "library",
  "icon": "https://image.flaticon.com/icons/png/512/346/346167.png",
  "desc": ""
})
const cached_formats=(vids=[])=>vids.map(cached_format)

let is_json=(a=null)=>a ? a.constructor==Object || a.constructor ==Array :false
const Myheaders={
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0",
    "Accept-Language": "en-US,en;q=0.5",
    "Pragma": "no-cache",
    "Cache-Control": "no-cache",
}

const http=(method="GET",headers={})=>(u,d=null)=>fetch(u,{headers:{
    ...Myheaders,
    ...headers,
},method,body:is_json(d)?JSON.stringify(d):d})

const clean=()=>http("DELETE")(api.add)
const mig=()=>http("POST")(api.add,DATA1)

const get_urls_template=(vid=VID)=>[
    `https://weread.qq.com/wrpage/huodong/abtest/zudui?collageId=${vid}_${saturday()}&shareVid=${vid}&from=timeline&wrRefCgi=`,
    `https://yd.qq.com/wrpage/huodong/abtest/zudui?shareVid=${vid}`,
]

const parse_url=u=>new URL(u).searchParams.get('shareVid')

const test=()=>{
    let u=`https://yd.qq.com/wrpage/huodong/abtest/zudui?shareVid=${VID}`
    let vid=pares_url(u)
    let us=get_urls_template(vid)
    console.log(us)
}

const get1=async(url)=>{
    let u0=new URL(url)
     let uu=u0.searchParams.get('url')
     let {origin,pathname,host}=uu
     let headers={
         ...Myheaders,
         referer:origin,
         host,
     }
    let req=new Request(uu,{headers})
    return fetch(req)
}


module.exports = {
    api,
    is_json,
    http,
    mig,
    clean,
    cached_formats,
    get1,
}


