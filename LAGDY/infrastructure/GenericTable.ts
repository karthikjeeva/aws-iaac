import { Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';

export class GenericTable {
    name: string;
    primaryKey: string;
    stack: Stack;
    table: Table;

    public constructor(name: string, primaryKey: string, stack: Stack) {
        this.name = name;
        this.primaryKey = primaryKey;
        this.stack = stack;
        this.initialize();
    }

    private initialize() {
        this.createTable();
    }

    private createTable() {
        this.table = new Table(this.stack, this.name, {
            partitionKey: {
                name: this.primaryKey,
                type: AttributeType.STRING
            },
            tableName: this.name
        })
    }
}