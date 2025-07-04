import multer from "multer";
import path from "path";
import md5 from "md5";

// Profile
const storageProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/profile");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = md5(file.originalname);
        const ext = path.extname(file.originalname);
        const fileName = file.fieldname + "-" + uniqueSuffix + ext;
        req.body.profileImage = fileName;
        cb(null, fileName);
    }
});

export const uploadProfile = multer({
    storage: storageProfile,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        }
        else {
            cb(new Error("Only image file allowed"));
        }
    }
});


// Post
const storagePost = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/posts");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = md5(file.originalname);
        const ext = path.extname(file.originalname);
        const fileName = file.fieldname + "-" + uniqueSuffix + ext;
        req.body.postImage = fileName;
        cb(null, fileName);
    }
});

export const uploadPost = multer({
    storage: storagePost,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        }
        else {
            cb(new Error("Only image file allowed"));
        }
    }
});
