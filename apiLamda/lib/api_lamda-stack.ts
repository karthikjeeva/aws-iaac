import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LamdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import * as iam from 'aws-cdk-lib/aws-iam';


export class ApiLamdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   /*  new iam.Role.fr(this, 'cdk-hnb659fds-cfn-exec-role-647327271376-ap-south-1', {
      assumedBy: new iam.ServicePrincipal('cloudformation.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          'AWSLambda_FullAccess',
        ),
      ],
    }); */

    iam.Role.fromRoleArn(this,'AWSLambda_FullAccess', 'arn:aws:iam::647327271376:instance-profile/cdk-hnb659fds-cfn-exec-role-647327271376-ap-south-1');
    

    const helloLamda = new LamdaFunction(this, 'helloLamda', {
      runtime: Runtime.NODEJS_16_X,
      code: Code.fromAsset(join(__dirname, '..', 'services', 'hello')), 
      handler: 'hello.main'
    })

  
  }
}
