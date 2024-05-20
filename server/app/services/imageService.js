const OSS = require('ali-oss');
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

            // 生成上传图片的签名直传 URL
            const putSignedUrl = await client.signatureUrl(key, {
                method: 'PUT',
                expires: 600, // 设置 URL 的过期时间
            });

            // 生成获取图片的签名直传 URL
            const getSignedUrl = await client.signatureUrl(key, {
                method: 'GET',
                expires: 86400, // 设置 URL 的过期时间
            });
            // console.log('putSignedUrl:', putSignedUrl);
            // console.log('getSignedUrl:', getSignedUrl);


            return { key: key, putSignedUrl: putSignedUrl , getSignedUrl: getSignedUrl};
        } catch (error) {
            // console.error('Error:', error);

        }
    }

    static async getUrl(key) {
        try {
            // 生成获取图片的签名直传 URL
            // console.log('key1:', key);
            const getSignedUrl = await client.signatureUrl(key, {
                method: 'GET',
                expires: 86400, // 设置 URL 的过期时间为1天
            });
            // console.log('getSignedUrl:', getSignedUrl);

            return getSignedUrl;
        } catch (error) {

        }
    }



}

module.exports = ImageService;