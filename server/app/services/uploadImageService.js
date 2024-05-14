const { OSS } = require('ali-oss');
const { v4: uuidv4 } = require('uuid');

// 初始化阿里云 OSS 客户端
const client = new OSS({
    region: 'your-region', // 替换为你的 OSS 区域
    accessKeyId: 'your-access-key-id', // 替换为你的 OSS Access Key ID
    accessKeySecret: 'your-access-key-secret', // 替换为你的 OSS Access Key Secret
    bucket: 'your-bucket-name' // 替换为你的 OSS Bucket 名称
});

class UploadImageService {
    // 上传图片并返回签名直传 URL 的函数
    static async uploadWithSignedUrl(filename) {
        try {
            const ext = filename.split('.').pop(); // 获取文件扩展名
            const key = `upload/images/${uuidv4()}.${ext}`; // 构造文件在 OSS 上的路径和文件名

            // 生成上传图片的签名直传 URL
            const putSignedUrl = await client.signatureUrl(key, {
                method: 'PUT',
                expires: 600, // 设置 URL 的过期时间
            });

            // 生成获取图片的签名直传 URL
            const getSignedUrl = await client.signatureUrl(key, {
                method: 'GET',
                expires: 600, // 设置 URL 的过期时间
            });

            return { success: true, key, putSignedUrl, getSignedUrl };
        } catch (error) {
            console.error('Error:', error);
            return { success: false, error: 'Internal Server Error' };
        }
    }


}

module.exports = UploadImageService;