import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Code, Function as LamdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { GenericTable } from './GenericTable';
import { join } from 'path';

export class SpaceStack extends Stack {
    private api = new RestApi(this, 'spaceAPI');

    //private spacesTable = new GenericTable('SpacesTable', 'spaceId', this);
    private spacesTable = new GenericTable(this, {
        tableName: 'SpacesTable',
        primaryKey: 'spaceId',
        createLambdaPath: 'Create'
    });
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

        //Spaces API integration
        const spacesResources = this.api.root.addResource('spaces');
        spacesResources.addMethod('POST', this.spacesTable.createLambdaIntegration);

    }

    
}