const OSS = require('ali-oss');
const { default: axios } = require("axios");
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
// 初始化阿里云 OSS 客户端
const client = new OSS({
    region: 'oss-cn-shenzhen', // 替换为你的 OSS 区域
    accessKeyId: 'LTAI5tJv2C6KSgfcMmwVHPiK', // 替换为你的 OSS Access Key ID
    accessKeySecret: '7IqXSUlYUnGCCmYbMM86rmUW2QLOry', // 替换为你的 OSS Access Key Secret
    bucket: 'socialnexus' // 替换为你的 OSS Bucket 名称
});

class ImageService {
    // 上传图片并返回签名直传 URL 的函数
    static async upload(filename) {
        try {
            const ext = filename.split('.').pop(); // 获取文件扩展名
            const key = `upload/images/${uuidv4()}.${ext}`; // 构造文件在 OSS 上的路径和文件名
            // console.log('key:', key);

            // 生成上传图片的签名直传 putURL
            const putSignedUrl = await client.signatureUrl(key, {
                method: 'PUT',
                expires: 600, // 设置 URL 的过期时间
            });
            
            /*const putSignedUrl = await client.signatureUrl(key,
            {
                method: "PUT",
                "Content-Type": "application/x-www-form-urlencoded",
              });*/

            // // 生成获取图片的签名直传 URL
            // const getSignedUrl = await client.signatureUrl(key, {
            //     method: 'GET',
            //     // expires: 0, // 设置 URL 的过期时间
            // });
            // console.log('putSignedUrl:', putSignedUrl);
            // console.log('getSignedUrl:', getSignedUrl);
            
            // 不带签名的永久有效的getURL
            const getUrl = await ImageService.getUrl(key);


            return { key: key, putSignedUrl: putSignedUrl, getUrl: getUrl };
        } catch (error) {
            // console.error('Error:', error);

        }
    }

    static async getUrl(key) {
        try {
            // 获取对象的URL，不带签名
            const bucket='socialnexus' // 替换为你的 OSS Bucket 名称
            const imageUrl = `https://${bucket}.oss-cn-shenzhen.aliyuncs.com/${key}`;
            return imageUrl;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    static async saveImg(image){
        //console.log("debug image:",image)
        try{
            //console.log("debug image.originalname:",image.originalname)
            //获取putsignedurl
            const filename = image.originalname;
            const {key, putSignedUrl: putSignedUrl, getUrl: getUrl } = await ImageService.upload(filename);
            
            //用签名URL上传文件。
 /*         const axiosRes = await axios({
                url: putSignedUrl,
                method: "PUT",
                data: image.buffer,
              })
                .then((r) => console.log(r))
                .catch((e) => console.log("debug axios error",e));
            
            console.log('debug axiosRes:', axiosRes);
*/

            const response = await fetch(putSignedUrl, {
                method: 'PUT',
                body: image.buffer
            });

            if (response.ok) {
                console.log('File uploaded successfully!');
            } else {
                console.error('Failed to upload file:', response.statusText);
            }

            return getUrl;

        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }


}

module.exports = ImageService;