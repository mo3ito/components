import axios from 'axios';

export default async function handler(req, res) {
  const {filename} = req.query;
  const DUMMY_URL =
    `https://minio.siraf.app/tickets/media/private/MessageFile/${filename}`;

  try {
    const response = await axios.get(DUMMY_URL, {
      responseType: 'stream',
    });
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');

    response.data.pipe(res);
  } catch (error) {
    console.error('error: ', error);
    res.status(500).send('Internal Server Error');
  }
}