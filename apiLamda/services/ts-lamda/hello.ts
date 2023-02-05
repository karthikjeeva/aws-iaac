import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { S3 } from 'aws-sdk';

const s3Client = new S3();
//if we want to use any other aws resource use it using aws-sdk
async function handler (event: any, context: any) {
    const buckets = await s3Client.listBuckets().promise();
    return {
        statusCode: 200,
        body: 'Here are the list of buckets: ' + JSON.stringify(buckets.Buckets)
    }
}

export { handler }