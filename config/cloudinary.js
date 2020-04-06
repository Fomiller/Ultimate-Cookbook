var fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dpnaj92ox',
  api_key: '613258496435933',
  api_secret: 'qVNgOFcpy5NJLbXn1I42JU8491s'
});

function image() {
  cloudinary.uploader.upload("./public/assets/images/puppies.jpeg", function(error, result) {console.log(result, error)});
}

image();