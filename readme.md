# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
# starting aws cdk
1. download aws cli from site
2. Provided u already created root and iam user acount
3. run aws configure and give ur iam user account key, secret, region and o/p format(json)
4.give necessary permission to iam user after this u can list s3 or do anything based on permission to this account.
5. run npm i -g aws-cdk
6. Initiate new cdk project, cdk init app --language typescript
7. cdk synth  - Command to generate cdk template which will later used by aws.(similar to build o/p for prod). Note it also refreshes template after making change.You can compare to compiler.
8. cdk bootstrap to create new stack in our aws account
9. cdk deploy combines both above steps, cdk deploy -all/<name of stack>
10. cdk list, cdk diff - gives diff in tack whats deployed and local.
11.cdk doctor to troubleshoot
12. using cfnOutput we can see what is the o/p after deployment in terminal.