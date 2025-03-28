import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { markTaskasComplete } from "@/lib/TaskOperations";

const s3Client = new S3Client({
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string,
    },
    region: 'auto',
});

export async function POST(req: NextRequest, { params }: { params: { factId: string, taskId: string } }) {
    const { factId, taskId } = params;

    const data = await req.formData();
    const file = data.get('file') as File | null;

    if (!file) {
        return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();

    const filenameArray = (file.name).split('.');
    const filename = taskId + '.' + filenameArray[filenameArray.length - 1];

    const bucketparams = {
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME as string,
        Key: `${factId}/${filename}`,
        Body: Buffer.from(buffer),
        ContentType: file.type,
    };

    const command = new PutObjectCommand(bucketparams);

    try {
        const data = await s3Client.send(command);

        await markTaskasComplete(factId, taskId, `${factId}/${filename}`);

        return NextResponse.json({ message: 'File uploaded', success: true });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: (err as Error).message }, { status: 500 });
    }

    return NextResponse.json({ "your ID": factId, "your task ID": taskId });
}