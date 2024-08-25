import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NagSuppressions } from "cdk-nag";

export class CdkPocStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkPocQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const lambdaFunction = new lambda.Function(this, "MyFunction", {
      // Update the latest runtime to satisfy AwsSolutions-L1
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: "app.lambda_handler",
      code: lambda.Code.fromAsset("./my_function"),
      architecture: lambda.Architecture.ARM_64,
    });
    NagSuppressions.addResourceSuppressionsByPath(
      this,
      // Path gotten from "Error at ..."
      `/${this.stackName}/MyFunction/ServiceRole/Resource`,
      [
        {
          id: "AwsSolutions-IAM4",
          reason: "The Lambda basic execution role is ok for demo purposes.",
          appliesTo: [
            "Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
          ],
        },
      ]
    );

    new cdk.CfnOutput(this, "LambdaARN", {
      value: lambdaFunction.functionArn,
      description: "The ARN of the Lambda function",
    });
  }
}
