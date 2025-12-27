import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg', 'image/jpg']
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error('Invalid file type'), false)
  }
})

export default upload