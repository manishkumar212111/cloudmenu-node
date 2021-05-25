var express = require('express')
var multer  = require('multer')
const router = express.Router();
const { userService } = require("../../services");
const ApiError = require('../../utils/ApiError');
const { BASE_URL } = require("../../config/config")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, "uploads-"+new Date().toISOString()+file.originalname)
    }
})
var upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), async (req, res) => {
    try{

      console.log(JSON.stringify(req.file),req.file, req.query)
    if(req.query.userId && req.query.type){
      if(req.query.type == 'logoUrl' || req.query.type == 'bannerUrl'){
        let user = await userService.getUserById(req.query.userId);
        if(!user){
          throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
        let style = user.style;
        style[req.query.type] = `${BASE_URL}${req.file.path}`;
        await userService.updateUserById(req.query.userId , {style})
      }
    }
    return res.send(`${BASE_URL}${req.file.path}`)
    } catch(err) {
      console.log(err)
    }
});

module.exports = router;