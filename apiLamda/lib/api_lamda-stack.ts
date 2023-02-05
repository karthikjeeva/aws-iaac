import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LamdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import * as iam from 'aws-cdk-lib/aws-iam';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';


export class ApiLamdaStack extends cdk.Stack {
  private api = new RestApi(this, 'HelloApi');
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloLamda = new LamdaFunction(this, 'helloLamda', {
      runtime: Runtime.NODEJS_16_X,
      code: Code.fromAsset(join(__dirname, '..', 'services', 'hello')), 
      handler: 'hello.main'
    })

    //api gateway lamda integration
    const helloLamdaIntegration = new LambdaIntegration(helloLamda);
    const helloLamdaResouce = this.api.root.addResource('hello');
    helloLamdaResouce.addMethod('GET', helloLamdaIntegration);

  
  }
}
