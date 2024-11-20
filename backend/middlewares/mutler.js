// middlewares/mutler.js
import multer from 'multer';

const storage = multer.memoryStorage(); // You can also specify a disk storage if needed
const upload = multer({ storage });

// Exporting the single file upload middleware
export const singleUpload = upload.single('file'); // 'file' should match the field name in your form data
