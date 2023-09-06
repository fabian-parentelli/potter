import { v2 as cloudinary } from 'cloudinary';
import config from './dotEnv.config.js'

cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret
});

const uploadToCloudinary = (req, res, next) => {
    if (!req.file) {
        return next(new Error('No se ha proporcionado una imagen.'));
    }

    cloudinary.uploader.upload_stream({ folder: 'photos' }, (error, result) => {
        if (error) {
            console.error('Error al cargar la imagen a Cloudinary:', error);
            return next(error);
        }

        req.cloudinaryUrl = result.secure_url;
        next();
    }).end(req.file.buffer);
};

export default uploadToCloudinary;