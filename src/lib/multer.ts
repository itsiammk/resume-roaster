import multer from 'multer';
import { NextApiRequest } from 'next';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

export const multerMiddleware = upload.single('resumeFile');

export function runMiddleware(req: NextApiRequest, middleware: any) {
  return new Promise((resolve, reject) => {
    middleware(req, {} as any, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
