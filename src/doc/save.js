async function test_save_kv(){
    let k,v,r;
    k="ccc"
    v=[1,2,3]
    r=await localforage.setItem(k,v)
    r=await localforage.getItem(k)
    r=await localforage.removeItem(k)
    r=await localforage.key(0) //'ccc'
    r=await localforage.keys()
    r=await localforage.iterate(console.log)
    r=await localforage.length()
    r=await localforage.clear()
}


