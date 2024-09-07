import express from 'express';
import axios from 'axios';
import multer from 'multer';
import fs from 'fs';
import FormData from 'form-data';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true}));
app.use(bodyParser.urlencoded({extended:true}));

const port = 3000;

const flaskApiUrl = 'http://localhost:5000/predict';

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const sendImageToFlask = async (filePath) => {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const response = await axios.post(flaskApiUrl, formData, {
      headers: formData.getHeaders()
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error sending image to Flask API:', error);
    return { error: 'Failed to process image' };
  }
};

app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  const filePath = req.file.path;

  try {
    const prediction = await sendImageToFlask(filePath);

    fs.unlinkSync(filePath);

    res.json(prediction);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Node.js backend listening on port ${port}`);
});
