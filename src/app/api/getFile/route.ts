// src/app/api/upload/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { join } from 'path';
import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
// import { TaskCreate } from '@/lib/TaskOperations';

export const dynamic = "force-dynamic";

const s3Client = new S3Client({
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string,
    },
    region: 'auto',
});


export async function POST(req: NextRequest) {
    const formData = new FormData();
    const data = await req.formData();

    const key = data.get('filekey') as string;
    console.log(key);
    
    if (key) {
        const params = {
            Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME as string,
            Key: `${key}`,
        };
        try {
            const command = new GetObjectCommand(params);
            const data = await s3Client.send(command);
            var filename = params.Key.split('/')[1];
            const response = new NextResponse(data.Body as BodyInit)
            response.headers.set('content-type', data.ContentType as string);
            response.headers.set('content-disposition', `attachment; filename="${filename}"`);
            return response;

        } catch (err) {
            return NextResponse.json({ message: (err as Error).message }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: "File does not exist" }, { status: 404 });
    }

}