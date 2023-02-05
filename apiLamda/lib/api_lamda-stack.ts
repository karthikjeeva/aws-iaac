import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LamdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import * as iam from 'aws-cdk-lib/aws-iam';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';

import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class ApiLamdaStack extends cdk.Stack {
  //private api = new RestApi(this, 'HelloApi');
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   /*  const helloLamda = new LamdaFunction(this, 'helloLamda', {
      runtime: Runtime.NODEJS_16_X,
      code: Code.fromAsset(join(__dirname, '..', 'services', 'hello')), 
      handler: 'hello.main'
    }) */

    //api gateway lamda integration
    /* const helloLamdaIntegration = new LambdaIntegration(helloLamda);
    const helloLamdaResouce = this.api.root.addResource('hello');
    helloLamdaResouce.addMethod('GET', helloLamdaIntegration); */

    //webpack compiled lambda
    const helloLamdaWebpack = new LamdaFunction(this, 'helloLamdaWebpack', {
      runtime: Runtime.NODEJS_16_X,
      code: Code.fromAsset(join(__dirname, '..', 'build', 'tsLamda')), 
      handler: 'tsLamda.handler'
    })
  
    const s3ListPolicy = new PolicyStatement();
    s3ListPolicy.addActions('s3:ListAllMyBuckets');
    s3ListPolicy.addResources('*');
    helloLamdaWebpack.addToRolePolicy(s3ListPolicy);
  }
}
