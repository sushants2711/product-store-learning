import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+ file.originalname)
    }
})

const upload = multer({ storage ,
    limits: {
        fileSize: 10 * 1024 * 1024 
    }
})

export default upload