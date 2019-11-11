import h1 from './1.html'
import h2 from './admin.html'
import clock from './clock.html'
import zudui_history from './zudui_history.html'

import music from './music.html'
const WX="12118333142944404257"

const {
    api,
    is_json,
    http,
    mig,
    clean,
    cached_formats,
    get1,
}=require("./api")


const superagent=require("superagent")
const Router = require('./router')
const redirect_res=(u,code=301)=>Response.redirect(u,code)
const json_res=(d)=>new Response(JSON.stringify(d))
const html_res=(html_file)=>async (request)=> {
      const url = new URL(request.url)
      //https://weread.qing.workers.dev/tencent5689977789909307335.txt
      const headers ={ 'Content-Type': 'text/html' }

      if(/tencent/.test(url.pathname)) {
        return new Response(WX, { headers })
      }
      return new Response(html_file, { headers })
}


const {isArray } = Array
const DATA = require("./data.js").DATA
const DATA1 = require("./vid.js").DATA
//const jeff = require("./jeff.js").DATA

const cors_headers={
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,PUT,PATCH,TRACE,DELETE,HEAD,OPTIONS',
    'access-control-allow-headers': 'accept,accept-encoding,cf-connecting-ip,cf-ipcountry,cf-ray,cf-visitor,connection,content-length,content-type,host,user-agent,x-forwarded-proto,x-real-ip,accept-charset,accept-language,accept-datetime,authorization,cache-control,date,if-match,if-modified-since,if-none-match,if-range,if-unmodified-since,max-forwards,pragma,range,te,upgrade,upgrade-insecure-requests,x-requested-with,chrome-proxy,purpose,accept,accept-language,content-language,content-type,dpr,downlink,save-data,viewport-width,width',
    'access-control-max-age': '1728000',
}

const add_cors=r=>new Response(r.body,{...r,headers:{...cors_headers,...r.headers}})
const is_form=r=>/form/.test(r.headers.get('content-type'))
const is_weixin=request=>/MicroMessenger/i.test(request.headers.get('user-agent'))
const clone_body=async (r)=>is_form(r) ? await r.clone().formData() :await r.clone().text()

const add_qs=(u,o={})=>{
      Object.entries(o).map(x=>u.searchParams.append(...x))
      return u
}
const add_qs1=(u,o={})=>{
    let u1=new URL(u)
    add_qs(u1,o)
    return u1
}
const to_qs=(u="",o={})=>{
      let u1=new URL(u)
      return add_qs(u1,o)
}
const to_query=(o={})=>new URLSearchParams(o)

const post =(u,d)=>fetch(u,{method:"POST",body:d})
const post_f=(u,d={})=>fetch(u,{method:"POST",headers:{"Content-Type": "application/x-www-form-urlencoded",},body:to_query(d)}).then(x=>x.json())
const post_f1=async (url,data)=>{
          tk=await superagent.post(url).type('form').send(data)
          return JSON.parse(tk.text)
}
const get=async (u,d={})=>{
      let u1=add_qs1(u,d)
      let r=await http("GET")(u1)
      let rj=await r.json()
      return rj
}


const proxy=async (u,r)=>post(u,await clone_body(r))
const echo=async r=>new Response(await r.clone().formData(),{headers:r.headers})
const echo_headers=r=>new Response(JSON.stringify(Object.fromEntries([...r.headers])))


const login=async(uu)=>{
      let code=uu.searchParams.get('code')
      if(!code) return {}
      let token=await get(api.weibo_token,{code})
      return {code,...token}
}

const redirect1=async ({url})=>{
     const redirectmap = new Map([
         ['/login', ['/admin',login]],
     ])
     let u0=new URL(url)
     let {origin,pathname,host}=u0
     let pp=redirectmap.get(pathname)
     if (pp){
           let [p,fn]=pp
           let u1=new URL(origin);
           u1.pathname=p
           if (fn){
               let r=await fn(u0)
                add_qs(u1,r||{})
           }
           return [1,u1]
     }else{
         return [0,""]
     }
}


const proxy1=async ({url})=>{
     const proxy_list=[/qq/,]
     let p=proxy_list.some(x=>x.test(url))
     if (p){
        return [1,add_cors(await get1(url))]
        // return [1,json_res({url})]
     }else{
         return [0,""]
     }
}





async function handleRequest(request) {
     let [a,b]=await redirect1(request)
     if (a) return redirect_res(b)
     // if (a) return json_res({url:b})

  //   let [p1,p2]=await proxy1(request)
  //   if (p1) return p2


      const r = new Router()
      let w=is_weixin(request)
      let [index,admin,music1,clock1,zudui_history1]=[h1,h2,music,clock,zudui_history].map(html_res)
      r.get('/',index)
      r.get('/admin',admin)
      r.get('/clock',clock1)
      r.get('/zudui',zudui_history1)
      r.get('/music',music1)
      r.get('/jeff',()=>http("GET")(api.jeff)) //json_res(jeff)
      r.get('/jeff1',()=>http("GET")(`https://ttt-1252957949.cos.ap-hongkong.myqcloud.com/music/2.aac`)) //json_res(jeff)
      r.get('/list',req=>json_res(DATA))
      r.get('/list1',req=>json_res(DATA1))
      r.get('/list2',async req=>{
         let r1=await http("GET")(api.add)
         let r2=await r1.clone().json()
         return r2.errorCode ? json_res(DATA) : r1
      })
      r.get('/mig',mig)
      r.get('/clean',clean)
      r.post('/sync',async req =>{
            let d=await req.json()
            return http('POST')(api.sync,d)
      })
      r.post('/add',async req =>{
            let d=await req.json()
            return http("POST")(api.add,d)
      })
      r.post('/full',async req =>{
            let d=await req.json()
            return http('PUT')(api.full,d)
      })
      r.post('/click',async req =>{
            let d=await req.json()
            return http('PUT')(api.full,d)
      })
      //r.get("/login",login)
      r.get("/logout",async req=>{
            //https://weread.qing.workers.dev/login?code=002c60f68861106119467a95e37e6dd7
      })
      r.get("/proxy", async req=>{
          let {url,method,body}=req
          return get1(url)
      })
      r.get("/echo", async req=>{
          let {url,method,body}=req
          let u=new URL(url)
          let u1=u.searchParams.get("url")
          return http(method)(api.echo+"?url="+u1)
      })

      const resp =await r.route(request)
      return add_cors(resp)
}

addEventListener('fetch', event => {
      event.respondWith(handleRequest(event.request))
})



