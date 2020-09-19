const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname, '../../public/images/products'))
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
      })
       
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
        cb(null, true);
      } else {
          file.error = true;
          req.file = file;
        cb(null, false);
        return cb(new Error('Debes ingresar una imagen válida (jpeg, jpg, png, gif)'));
      }
    }
  });


module.exports = upload;