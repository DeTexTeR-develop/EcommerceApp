const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + '.jpeg');
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startWith('image')) {
        cb(null, true)
    } else {
        cb({
            message: "Unsupported file format"
        }, false);
    }
}
const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 2000000 }
});

const productImgSize = async (req, res, next) => {
    if (!req.files) return next();
    await Promise.all(req.files.map(async (files) => {
        await sharp(file)
            .resize(300 * 300)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/images/products/${file.file}`)
    }));
    next();
};

const blogsImgSize = async (req, res, next) => {
    if (!req.files) return next();
    await Promise.all(req.files.map(async (files) => {
        await sharp(file)
            .resize(300 * 300)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/images/blogs/${file.file}`)
    }));
    next();
}

module.exports = { uploadPhoto, productImgSize, blogsImgSize };