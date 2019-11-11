sqlite3 = require('sqlite3').verbose();
fs=require('fs')
R=require('ramda')


db = new sqlite3.Database(file_name);
query=(file_name,table)=>new Promise((f1,f2)=>
    db.all(`SELECT * FROM ${table}`,(e,d)=>e?f2(e):f1(d))
)

write=(file_name,d={})=>{
    d1=JSON.stringify(d,null,'\t')
    fs.writeFileSync(file_name,d1)
}


read=async ()=>{
    file_name="../../databases/76924631/WRReader"
    table="User"
    z=await query(file_name,table)
    z1=z.map(x=>R.pickAll(['name','userVid',"avatar"])(x))
    write("user.json",z)
    write("avatar.json",z1)
    return z1
}



