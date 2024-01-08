const cloudinary = require('cloudinary').v2;
const fs = require('fs');



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});


const CloudinaryUplodImg = async (fileToUpload) => {
    try {
        const result = await cloudinary.uploader.upload(fileToUpload, {
            resource_type: 'auto'
        });
        return {
            url: result.secure_url
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = CloudinaryUplodImg;