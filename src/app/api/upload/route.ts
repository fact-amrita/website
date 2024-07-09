// src/app/api/upload/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { join } from 'path';
import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { TaskCreate } from '@/lib/TaskOperations';

export const dynamic = "force-dynamic";

const s3Client = new S3Client({
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string,
  },
  region: 'auto',
});

// Set up Multer storage
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = join(process.cwd(), 'public/uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Convert Multer to a Promise to use it with Next.js
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Function) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// export async function GET(req: NextRequest) {
//   const params = {
//     Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME as string,
//     Key: 'tasks/AI song.mp3',
//   };
//   try {
//     const command = new GetObjectCommand(params);
//     const data = await s3Client.send(command);
//     var filename = params.Key.split('/')[1];
//     const response = new NextResponse(data.Body)
//     response.headers.set('content-type', data.ContentType);
//     response.headers.set('content-disposition', `attachment; filename="${filename}"`);
//     return response;

//   } catch (err) {
//     return NextResponse.json({ message: err.message }, { status: 500 });
//   }
// }


// Export a named handler for the POST method
export async function POST(req: NextRequest) {

  // if (!req.headers.get('Authorization') || req.headers.get('Authorization') !== process.env.NEXT_PUBLIC_API_ENDPOINT_KEY) {

  const formData = new FormData();
  const data = await req.formData();

  const taskTitle = data.get('taskTitle') as string;
  const description = data.get('description') as string;
  const startDate = data.get('startDate') as string;
  const deadline = data.get('deadline') as string;
  const Duration = data.get('Duration') as string;
  const domain = data.get('domain') as string;
  const points = data.get('points') as string;
  const file = data.get('file') as File | null;

  var key: string | null = null;

  if (file) {

    const buffer = await file.arrayBuffer();

    const params = {
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME as string,
      Key: `tasks/${file.name}`,
      Body: Buffer.from(buffer),
      ContentType: file.type,
    };

    const command = new PutObjectCommand(params);

    try {
      const data = await s3Client.send(command);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
    key = params.Key;
    console.log(key);
  }

  var result = await TaskCreate(taskTitle, description, parseInt(points), domain, startDate, deadline, Duration, key);

  return NextResponse.json({ message: `Task successfully created with ID ${result}` });
  // } else {
  //   return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  // }
}

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};
