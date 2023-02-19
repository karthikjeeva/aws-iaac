import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { FunctionVersionUpgrade } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path';

export interface TableProps {
    tableName: string,
    primaryKey: string,
    createLambdaPath?: string,
    readLambdaPath?: string,
    updateLambdaPath?: string,
    deleteLambdaPath?: string,
}

export class GenericTable {
    private stack: Stack;
    private table: Table;
    private props: TableProps;

    private createLambda: NodejsFunction | undefined;
    private readLambda: NodejsFunction | undefined;
    private updateLambda: NodejsFunction | undefined;
    private deleteLambda: NodejsFunction | undefined;
    
    public createLambdaIntegration: LambdaIntegration;
    public readLambdaIntegration: LambdaIntegration;
    public updateLambdaIntegration: LambdaIntegration;
    public deleteLambdaIntegration: LambdaIntegration;

    public constructor( stack: Stack, props: TableProps) {
        this.stack = stack;
        this.props = props;
        this.initialize();
    }

    private initialize() {
        this.createTable();
        this.createLambdas();
        this.grantTableRights();
    }

    private createLambdas() {
        if (this.props.createLambdaPath) {
            this.createLambda = this.createSingleLamda(this.props.createLambdaPath);
            this.createLambdaIntegration = new LambdaIntegration(this.createLambda);
        }

        if (this.props.readLambdaPath) {
            this.readLambda = this.createSingleLamda(this.props.readLambdaPath);
            this.readLambdaIntegration = new LambdaIntegration(this.readLambda);
        }

        if (this.props.updateLambdaPath) {
            this.updateLambda = this.createSingleLamda(this.props.updateLambdaPath);
            this.updateLambdaIntegration = new LambdaIntegration(this.updateLambda);
        }

        if (this.props.deleteLambdaPath) {
            this.deleteLambda = this.createSingleLamda(this.props.deleteLambdaPath);
            this.deleteLambdaIntegration = new LambdaIntegration(this.deleteLambda);
        }
    }
    

    private createTable() {
        this.table = new Table(this.stack, this.props.tableName, {
            partitionKey: {
                name: this.props.primaryKey,
                type: AttributeType.STRING
            },
            tableName: this.props.tableName
        })
    }

    private createSingleLamda(lamdaName: string): NodejsFunction {
        const lamdaId = `${this.props.tableName}-${lamdaName}`;
        return new NodejsFunction(this.stack, lamdaId, {
            entry: (join(__dirname, '..',  'services', this.props.tableName, `${lamdaName}.ts`)),
            handler: 'handler',
            functionName: lamdaId,
            environment: {
                TABLE_NAME: this.props.tableName,
                PRIMARY_KEY: this.props.primaryKey
            }
        })
    }


    private grantTableRights() {
        if (this.createLambda) {
            this.table.grantWriteData(this.createLambda);
        } 

        if (this.readLambda) {
            this.table.grantReadData(this.readLambda);
        } 

        if (this.updateLambda) {
            this.table.grantWriteData(this.updateLambda);
        } 

        if (this.deleteLambda) {
            this.table.grantWriteData(this.deleteLambda);
        } 

    }
}