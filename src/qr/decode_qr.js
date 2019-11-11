const decodeImage = require('jimp').read;
const qrcodeReader = require('qrcode-reader');

encode_base64=bitmap=>new Buffer(bitmap).toString('base64')
decode_base64=(src)=>new Buffer(src, 'base64')
img2bitmap=async(file_name)=>{
    let d=await  decodeImage(file_name)
    return d.bitmap
}
bitmap2url=(bitmap,cb=console.log)=>{
    decodeQR = new qrcodeReader();
    decodeQR.callback=cb
    decodeQR.decode(bitmap)
}

