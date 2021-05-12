var express = require('express')
var multer  = require('multer')
const router = express.Router();
const { userService } = require("../../services");
const ApiError = require('../../utils/ApiError');
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
    console.log(JSON.stringify(req.file), req.query)
    if(req.query.userId && req.query.type){
      if(req.query.type == 'logoUrl'){
        let user = await userService.getUserById(req.query.userId);
        if(!user){
          throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
        let style = user.style;
        style.logoUrl = `https://serene-springs-70492.herokuapp.com/${req.file.path}`;
        await userService.updateUserById(req.query.userId , {style})
      }
    }
    return res.send(`https://serene-springs-70492.herokuapp.com/${req.file.path}`)
});

module.exports = router;