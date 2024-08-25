import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as CdkPoc from "../lib/cdk-poc-stack";

// example test. To run these tests, uncomment this file along with the
// example resource in lib/cdk-poc-stack.ts
test("SQS Queue Created", () => {
  //   const app = new cdk.App();
  //     // WHEN
  //   const stack = new CdkPoc.CdkPocStack(app, 'MyTestStack');
  //     // THEN
  //   const template = Template.fromStack(stack);
  //   template.hasResourceProperties('AWS::SQS::Queue', {
  //     VisibilityTimeout: 300
  //   });
});

test("Lambda Function Created", () => {
  const app = new cdk.App();
  const stack = new CdkPoc.CdkPocStack(app, "MyTestStack");
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::Lambda::Function", {
    Architectures: ["arm64"],
  });
});
