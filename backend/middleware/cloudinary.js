const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for blog cover images
const blogStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'truenorth/blog',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 630, crop: 'fill', quality: 'auto' }],
  },
});

// Storage for testimonial avatars
const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'truenorth/avatars',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 200, height: 200, crop: 'fill', gravity: 'face', quality: 'auto' }],
  },
});

const uploadBlogImage = multer({ storage: blogStorage });
const uploadAvatar    = multer({ storage: avatarStorage });

module.exports = { cloudinary, uploadBlogImage, uploadAvatar };
