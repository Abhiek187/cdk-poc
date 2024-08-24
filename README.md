# cdk-poc

Testing out the AWS CDK

## Installing Locally

The AWS CLI, SAM CLI, & Node are required to be installed.

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
