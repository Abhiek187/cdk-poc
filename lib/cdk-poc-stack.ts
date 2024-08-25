import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from "aws-cdk-lib/aws-lambda";

export class CdkPocStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkPocQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const lambdaFunction = new lambda.Function(this, "MyFunction", {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: "app.lambda_handler",
      code: lambda.Code.fromAsset("./my_function"),
      architecture: lambda.Architecture.ARM_64,
    });

    new cdk.CfnOutput(this, "LambdaARN", {
      value: lambdaFunction.functionArn,
      description: "The ARN of the Lambda function",
    });
  }
}
