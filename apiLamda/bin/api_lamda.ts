#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApiLamdaStack } from '../lib/api_lamda-stack';

const app = new cdk.App();
new ApiLamdaStack(app, 'ApiLamdaStack', {
  env: { account: '647327271376', region: 'ap-south-1' },
});

