const util = require('../../helpers/util');

exports.upload = (req, res) => {
  try{
    const { originalname, size } = req.file;
    res.status(200).json({
      name: originalname,
      size: size,
      dataURL: util.storageUrlBuilder(originalname)

    })
  }catch(error){
    console.log(error);
    res.status(500).json("Internal server error")
  }
};
