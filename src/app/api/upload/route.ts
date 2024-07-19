// src/app/api/upload/route.ts
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

export async function GET(req: NextRequest) {

  return NextResponse.json({ message: "Hey, this seems to work" }, { status: 200 });

}


// Export a named handler for the POST method
export async function POST(req: NextRequest) {


  const formData = new FormData();
  const data = await req.formData();
  const creator = data.get('creator') as string;
  // if (creator!=undefined || creator!=null) {

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

    const filenameArray = (file.name).split('.');
    const filename = taskTitle + '.' + filenameArray[filenameArray.length - 1];

    const params = {
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME as string,
      Key: `tasks/${filename}`,
      Body: Buffer.from(buffer),
      ContentType: file.type,
    };

    const command = new PutObjectCommand(params);

    try {
      const data = await s3Client.send(command);
    } catch (err) {
      console.error(err);
    }
    key = params.Key;
    console.log(key);
  }

  var result = await TaskCreate(taskTitle, description, parseInt(points), domain, startDate, deadline, Duration, creator, key);

  return NextResponse.json({ message: `Task successfully created with ID ${result}` });
  // } else {
  //   return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  // }
}

// Disable the default body parser
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
