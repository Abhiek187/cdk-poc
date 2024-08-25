# cdk-poc

[![CDK CI/CD](https://github.com/Abhiek187/cdk-poc/actions/workflows/cdk.yml/badge.svg)](https://github.com/Abhiek187/cdk-poc/actions/workflows/cdk.yml)
[![CodeQL](https://github.com/Abhiek187/cdk-poc/actions/workflows/codeql.yml/badge.svg)](https://github.com/Abhiek187/cdk-poc/actions/workflows/codeql.yml)

Testing out the AWS CDK

## Installing Locally

The AWS CLI, SAM CLI, & Node are required to be installed. Docker is also required if testing locally using SAM.

Install the CDK:

```bash
npm i -g aws-cdk
```

Create a new CDK app (must be run in a non-empty directory):

```bash
cdk init app --language typescript # any language could be chosen, but going with typescript since Node is required
```

Bootstrap the CDK environment so stacks can be deployed on AWS:

```bash
# The account number can be gotten by running aws sts get-caller-identity
# The default region can be gotten by running aws configure get region
cdk bootstrap aws://ACCOUNT_NUMBER/REGION
```

This will create a CloudFormation stack called CDKToolkit with the following resources:

- An SSM parameter for the bootstrap version
- IAM roles to handle deployments
- A private repository in ECR to hold container assets (ensure this doesn't exceed 100 MB)
- An S3 bucket to store CloudFormation templates & other resources (objects are automatically deleted after 1 year)

You can view the CloudFormation template used by adding `--show-template` to the bootstrap command. This command will need to be run every once in a while to ensure the latest bootstrap template is used.

## Running Tests

Run `npm test` to execute all the unit tests. Note that the app must be built using `npm run build` before running all the tests to capture all changes.

## Running SAM Commands

To test or build constructs using SAM, synthesize a CloudFormation template without copying assets. Then point SAM to the generated template:

```bash
cdk synth --no-staging
sam local [invoke|start-api|start-lambda] -t ./cdk.out/CdkPocStack.template.json
sam build -t ./cdk.out/CdkPocStack.template.json
```

Note that `sam deploy` isn't supported for the CDK. Run `cdk deploy` instead.

## CDK Commands

```bash
cdk version # get the current version
cdk init app --language LANGUAGE # create a new CDK app for a given language
cdk bootstrap # configure AWS to support CDK templates
cdk list # list all the stacks in the app
cdk deploy # deploy a stack
cdk destroy # delete a stack
cdk docs # view the CDK docs
cdk diff # compare the local and deployed stack
cdk synth # generate a CloudFormation template based on the construct
```

For more info on the CDK, check out the [docs](https://docs.aws.amazon.com/cdk/api/v2/).

# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template
