# REST API for posting & commenting

This is a REST API built on AWS via IaC with Serverless Framework.
Serverless Framework will deploy the following resources to AWS:

- Amazon DynamoDB for storing the data
- AWS Lambda for FaaS
- Amazon API Gateway for the API Endpoints

Changes are deployed to dev and prod using separate GitHub Actions workflows making use of reusable workflow

The production (prod) and development(dev) environments in this repo are separate AWS Regions in the same AWS Account but in real world scenarios, you would have them in seperate AWS accounts for proper isolation.

The GitHub Actions Workflows will deploy to separate AWS Regions as an easy way to simulate the workflow.

---

# Entities

[x] User
[x] Post
[x] Comment

#### User

-
-
-
-

#### Post

-
-
-
-

#### Comment

-
-
-
- ***

## **Access Patterns**

#### Users

- create users
- get user
- delete user

#### Posts

- create posts
- get posts by user
- get all posts by users

#### Comments

- create comment on post
- get all comments on post

---

## **Setup**

Clone this repo to your desktop and run `npm install` to install all the dependencies.

You might want to look into `config.json` to make change the port you want to use and set up a SSL certificate.

---

## **Instructions to deploy**

- Clone this repo:

```
  https://github.com/FonNkwenti/user-posts-comments-api.git
```

- Install dependencies

```
cd user-posts-comments-api && npm install
```

- Set the AWS credentials for your prod and dev environments in your GitHub Actions Secrets

_paste image from GitHub Actons_

<br />

- switch to dev branch to commit your changes which will automatically trigger the GitHub CI/CD to deploy to the dev environment.

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

## Deployment Output

**Insert Image of GitHub Actions Workflows**
**Insert Image of the various Jobs**
**Insert Image of Serverless deploy logs**

Your API Endpoints will be available in the GitHub Actions Logs

```
paste output of your endpoints here

```

## Project Status

> Project is: *in progress* I will continue adding more functionality as I continue to learn and experiment

---

## Room for improvement

- API Gateway Authorizer Function for AuthO or AWS Cognito
- Multi Stage deployments with GitHub Actions
- Unit, mock, integration tests with JEST

---
