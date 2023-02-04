import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Duration, Expiration } from 'aws-cdk-lib';

export class BaseprojStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new s3.Bucket(this, 'MyFirstBucket', { lifecycleRules: [
      {
        expiration: Duration.days(5)
      }
    ] });
  }
}
