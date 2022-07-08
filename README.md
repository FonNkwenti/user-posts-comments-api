# Serverless REST API for creating users, posts and comments

This is a REST API deployed to AWS via IaC with Serverless Framework. Serverless Framework will deploy the following resources to AWS:

Amazon DynamoDB for storing the data
AWS Lambda for FaaS
Amazon API Gateway for the API Endpoints

There is a reusable GitHub Actions workflow called `reusable-workflows.yml which is referenced the other workflows which will deploy the app to other environments. The `dev-dev.yml`workflow will deploy the app to the dev environment when you trigger it with a`git push`in the`dev branch`and the`prod-main`will deploy to the prod environment when there is a`git push`trigger in the`main branch`. To deploy to a dev account, you need to provide the access keys of the account in the secrets section of the GitHub Actions Workflow. To deploy to the prod environment, you should provide the access keys of an account in the prod AWS account.

The production (prod) and development(dev) environments in this repo are separate AWS Regions in the same AWS Account but in real world scenarios, you would have them in seperate AWS accounts for proper isolation.

</b >

---

## Entities

- [x] User
- [x] Post
- [ ] Comment

## Setup

```bash
npm install
```

## **Instructions to deploy**

- Clone this repo:

```
  https://github.com/FonNkwenti/user-posts-comments-api.git
```

- Install dependencies

```
cd user-posts-comments-api && npm install
```

- Set the AWS credentials for the GitHub Actions in the Settings/Secrets/Actions Secrets in the GitHb repo. The `dev-dev.yml` and `prod-main.yml` workflows will use these secrets.

```
DEV_AWS_ACCESS_KEY_ID
DEV_AWS_SECRET_ACCESS_KEY

PROD_AWS_ACCESS_KEY_ID
PROD_AWS_SECRET_ACCESS_KEY
```

<br />

- switch to dev branch to commit your changes which will automatically trigger the GitHub Actions CI/CD to deploy to the dev environment.

```
git checkout -b dev
git add .
git commit -m 'initial commit to dev'
git push --set-upstream origin dev

```

- switch to main branch to deploy to prod

```
git checkout main
git merge dev
git commit -m 'initial commit to prod'
git push -u origin main

```

---

<br />

You should see a similar output in the Workflows deployed for either dev or prod when there is a `git push'. The output contains the outputs from the `serverless deploy` command which includes the API endpoints amongst other things.

```bash
/usr/bin/docker run --name cd98f4184ece882e748ea8e45c59c22451203_c068d8 --label 4cd98f --workdir /github/workspace --rm -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY -e INPUT_ARGS -e HOME -e GITHUB_JOB -e GITHUB_REF -e GITHUB_SHA -e GITHUB_REPOSITORY -e GITHUB_REPOSITORY_OWNER -e GITHUB_RUN_ID -e GITHUB_RUN_NUMBER -e GITHUB_RETENTION_DAYS -e GITHUB_RUN_ATTEMPT -e GITHUB_ACTOR -e GITHUB_WORKFLOW -e GITHUB_HEAD_REF -e GITHUB_BASE_REF -e GITHUB_EVENT_NAME -e GITHUB_SERVER_URL -e GITHUB_API_URL -e GITHUB_GRAPHQL_URL -e GITHUB_REF_NAME -e GITHUB_REF_PROTECTED -e GITHUB_REF_TYPE -e GITHUB_WORKSPACE -e GITHUB_ACTION -e GITHUB_EVENT_PATH -e GITHUB_ACTION_REPOSITORY -e GITHUB_ACTION_REF -e GITHUB_PATH -e GITHUB_ENV -e GITHUB_STEP_SUMMARY -e RUNNER_OS -e RUNNER_ARCH -e RUNNER_NAME -e RUNNER_TOOL_CACHE -e RUNNER_TEMP -e RUNNER_WORKSPACE -e ACTIONS_RUNTIME_URL -e ACTIONS_RUNTIME_TOKEN -e ACTIONS_CACHE_URL -e GITHUB_ACTIONS=true -e CI=true -v "/var/run/docker.sock":"/var/run/docker.sock" -v "/home/runner/work/_temp/_github_home":"/github/home" -v "/home/runner/work/_temp/_github_workflow":"/github/workflow" -v "/home/runner/work/_temp/_runner_file_commands":"/github/file_commands" -v "/home/runner/work/user-posts-comments-api/user-posts-comments-api":"/github/workspace" 4cd98f:4184ece882e748ea8e45c59c22451203 deploy --stage prod --region us-east-1
Deploying sls-crud-api to stage prod (us-east-1)
endpoints:
  POST - https://y0cvaxz2h7.execute-api.us-east-1.amazonaws.com/prod/user
  GET - https://y0cvaxz2h7.execute-api.us-east-1.amazonaws.com/prod/user/{id}
  DELETE - https://y0cvaxz2h7.execute-api.us-east-1.amazonaws.com/prod/user/{id}
  POST - https://y0cvaxz2h7.execute-api.us-east-1.amazonaws.com/prod/post
  PUT - https://y0cvaxz2h7.execute-api.us-east-1.amazonaws.com/prod/post/{id}
  DELETE - https://y0cvaxz2h7.execute-api.us-east-1.amazonaws.com/prod/post/{id}
functions:
  createUser: sls-crud-api-prod-createUser (85 kB)
  getUser: sls-crud-api-prod-getUser (85 kB)
  deleteUser: sls-crud-api-prod-deleteUser (85 kB)
  createPost: sls-crud-api-prod-createPost (85 kB)
  updatePost: sls-crud-api-prod-updatePost (85 kB)
  deletePost: sls-crud-api-prod-deletePost (85 kB)
✔ Service deployed to stack sls-crud-api-prod (95s)
```

## Usage

With the generated API endpoints, you should be able to perform the following calls

**User**

- create a user
- get a user
- delete a user

**Post**

- create a post
- update a post
- delete a post

---

</br>

## Project Status

> Project is: *in progress* 
> More access patterns will eventually updated such:

#### Access Patterns

- get all posts by a user
- create comments
- view comments for each post

#### More Functionality

- Unit tests
- Integration tests
- Multi environment CI/CD with approvals
- Cognito
- local development

---

## Room for improvement

- API Gateway Authorizer Function for AuthO or AWS Cognito
- Multi Stage deployments with GitHub Actions
- Unit, mock, integration tests with JEST
- ***
