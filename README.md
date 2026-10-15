# AWS-DevOps-D1-01
A walkthrough of the first task in DevOps Domain 1 Task 

# AWS DevOps CI/CD Pipeline Project

A hands-on project demonstrating how to build a Continuous Integration and Continuous Delivery (CI/CD) workflow using AWS services and GitHub.

The project automates application validation and deployment across Development, Staging, and Production environments, with manual approval gates and email notifications to support controlled releases.

## Project Overview

The goal of this project is to implement a deployment pipeline that takes application code from a GitHub repository, validates it through AWS CodeBuild, and deploys it to separate environments using AWS Elastic Beanstalk.

The workflow also incorporates manual approval stages and Amazon SNS notifications before promoting releases through the environments.

## Architecture

```text
Developer
   |
   v
GitHub Repository
   |
   v
AWS CodePipeline — Source
   |
   v
AWS CodeBuild — Build & Validation
   |
   v
Elastic Beanstalk — Development
   |
   v
Manual Approval + SNS Notification
   |
   v
Elastic Beanstalk — Staging
   |
   v
Manual Approval + SNS Notification
   |
   v
Elastic Beanstalk — Production
```

CodePipeline orchestrates the workflow, CodeBuild validates the application and generates the build artifact, and Elastic Beanstalk hosts the application in separate environments.

## AWS Services and Tools

| Service / Tool | Purpose |
|---|---|
| GitHub | Source code management and version control |
| AWS CodePipeline | Orchestrates the CI/CD workflow |
| AWS CodeBuild | Runs build and validation commands |
| AWS Elastic Beanstalk | Deploys and runs the web application |
| Amazon SNS | Sends email notifications for manual approvals |
| AWS IAM | Controls permissions between AWS services |
| AWS CloudWatch | Supports monitoring and environment health alarms |
| Git | Tracks changes and pushes commits to GitHub |
| Node.js | Provides the runtime and JavaScript syntax validation |

## Pipeline Stages

### 1. Source — GitHub

The pipeline connects to the GitHub repository and monitors the configured branch for code changes.

A new commit triggers a pipeline execution.

### 2. Build — AWS CodeBuild

CodeBuild executes the commands defined in `buildspec.yml`.

The build checks that required application files exist, validates the JSON syntax of `package.json`, checks the JavaScript syntax of `server.js`, and verifies the expected release identifier when that check is included in the buildspec.

If a required check fails, the build fails and the pipeline stops before proceeding to subsequent deployment stages.

Successful builds provide the artifact used by downstream deployment actions.

### 3. Development Deployment

The pipeline deploys the build artifact to the Development environment in AWS Elastic Beanstalk.

This environment provides an initial place to verify that the application deploys and runs as expected.

### 4. Approval Before Staging

A manual approval action pauses the pipeline until an authorized reviewer approves the release.

Amazon SNS is configured to notify subscribers about the approval request.

### 5. Staging Deployment

After approval, the pipeline deploys the build artifact to the Staging environment.

Staging provides an additional environment for reviewing the application before production release.

### 6. Approval Before Production

A second manual approval gate provides an opportunity to review the staging deployment before promoting the release to Production.

SNS email notifications support the approval workflow.

### 7. Production Deployment

After the required approval, CodePipeline deploys the build artifact to the Production environment.

Using the same build artifact across environments helps ensure that the release promoted to Production is the one already validated by CodeBuild and deployed to the earlier environments.

## Build Specification

The `buildspec.yml` file defines the commands executed by CodeBuild.

The project uses it to:

- Select a compatible Node.js runtime.
- Confirm that required application files exist.
- Validate `package.json` syntax.
- Check `server.js` syntax.
- Run an optional release-identifier check.
- Specify the files included in the build artifact.

The build specification can be extended with automated tests, dependency installation, linting, security scanning, and additional quality checks as the application evolves.

## Deployment Configuration

The Production Elastic Beanstalk environment was configured with deployment settings intended to support safer releases, including:

- Rolling deployments with an additional batch.
- A 30% deployment batch size.
- Health checks respected during deployment.
- A configured health threshold of `Degraded`.

These settings support controlled deployments, but they do not by themselves guarantee automatic restoration of the previous application version after every deployment failure.

## Repository Structure

```text
AWS-DevOps-D1-01/
├── README.md
├── index.html
├── package.json
├── server.js
└── buildspec.yml
```

The structure above represents the expected core application files. Additional files may be present in the repository.

| File | Description |
|---|---|
| `README.md` | Project documentation |
| `index.html` | Web application interface |
| `package.json` | Node.js application metadata and start script |
| `server.js` | Node.js HTTP server |
| `buildspec.yml` | CodeBuild instructions and artifact configuration |

## How to Run Locally

### Prerequisites

- Git
- Node.js and npm

### Clone the repository

```bash
git clone https://github.com/olajutemot/AWS-DevOps-D1-01.git
cd AWS-DevOps-D1-01
```

### Run the application

```bash
npm start
```

Open the local address configured by the application, typically:

```text
http://localhost:8080
```

If the application uses a different port, use the port specified in `server.js`.

## Testing the Pipeline

To test the workflow:

1. Make a small change to `index.html`.
2. Commit and push the change to the configured GitHub branch.
3. Monitor the pipeline execution in AWS CodePipeline.
4. Confirm that CodeBuild completes successfully.
5. Verify the Development deployment.
6. Review the SNS notification and approve the release to Staging.
7. Verify the Staging deployment.
8. Review the second approval request and approve the release to Production.
9. Confirm the final application version in the Production environment.

If a build or deployment fails, inspect the relevant action's logs before retrying.

## Security and Cost Considerations

- Follow the principle of least privilege when assigning IAM permissions.
- Keep AWS credentials, access keys, and other secrets out of the repository.
- Use approval gates to control promotion to Production.
- Monitor environment health and deployment failures.
- Review the costs of Elastic Beanstalk environments, EC2 instances, storage, logs, and other provisioned resources.
- Delete practice resources that are no longer required to avoid unnecessary charges.

## Key Learning Outcomes

This project provided practical experience with:

- Git-based source control and automated pipeline triggers.
- CI/CD orchestration using AWS CodePipeline.
- Build validation and artifact handling using AWS CodeBuild.
- Multi-environment deployments with AWS Elastic Beanstalk.
- Manual approval workflows and Amazon SNS notifications.
- IAM service roles and cross-service permissions.
- Deployment health settings and release verification.
- Troubleshooting build failures and AWS access-denied errors.

## Future Improvements

Potential enhancements include:

- Adding automated unit and integration tests.
- Introducing code quality and security scanning.
- Using AWS Systems Manager Parameter Store or AWS Secrets Manager for application secrets.
- Implementing more comprehensive deployment rollback and recovery procedures.
- Adding infrastructure as code using AWS CloudFormation or Terraform.
- Improving observability through CloudWatch dashboards, alarms, and structured logs.

## Acknowledgements

This project was completed as part of hands-on AWS DevOps learning, with a focus on understanding CI/CD concepts and applying them using AWS services.

---

**Author:** Timilehin Olajutemo

**Project:** AWS DevOps CI/CD Pipeline

**Repository:** [AWS-DevOps-D1-01](https://github.com/olajutemot/AWS-DevOps-D1-01)

