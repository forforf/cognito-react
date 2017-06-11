# cognito-react

Working Example  <http://cognito-react.joha.us/>

## What is this?

It’s a bare-bones, but fully functional web app that puts together several technologies:
* [AWS Cognito Service](https://aws.amazon.com/documentation/cognito/)
* [React](https://facebook.github.io/react/) / [Redux](http://redux.js.org/) /[redux-observable](https://redux-observable.js.org/)
* LocalStorage
* And for deployment: [AWS Code Pipelines](https://aws.amazon.com/codepipeline/)

It's mostly about getting access to the [AWS Javascript SDK](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/index.html) for Single Page Apps (SPA)

### Umm, ok?

Here's a [random person](https://dev.solteq.com/2017/02/24/aws-cognito-experiences/) from the internet who happens to provide background and explain some of the motivations. In case the link goes away in the future, basically it explains cognito, and that they found the premise intriguing, but implementation was way too hard, and examples too sparse.


## Using the App

Apologies in advance. I'm not great at UIs.

### Home: No Access to AWS yet 

First go to the home tab and notice that we don't have access to AWS resources. In this case we don't have access to the S3 Bucket.

You should see something like: 

```
Bucket: - Nothing Fetched Yet -
```

So let's go through the steps to get access to an S3 bucket

### Set up AWS Account

In the top right, there's a drop down menu under AWS ACCOUNT. We're going to be using that for the next few steps.

#### Settings (Optional)

Go to AWS ACCOUNT > Settings

This page is used to persist user information to (using Local Storage) so that we don't have to keep typing the same information over and over. It allows us to set the region, bucket name, user name and user email.

For the app to work, you don't want to change the region (us-east-1) or the bucket name (forforf-cognito-test).

However, feel free to add user name and a working email account. The email account is only to get a confirmation email with the code for finalizing the account.

So say you've got the form filled out like this:

```
us-east-1

forforf-cognito-test

MyUserName

myusername@example.com
```

Click "Submit" to save. Yeah, I know nothing changed or happened ... but it should have saved the information to local storage. 
Feel free to do a PR that provides some user feedback.

#### Registering

So let's register for Cognito. Go to AWS ACCOUNT > Register

The user name and email should be populated if you entered them in the settings above. Fill out the form and include the password you want to use for this account. 

Click "Submit"

If all goes well you should see the following messages:

```
Sign Up says Hi!
Creating Account ...
Account Created
```

You'll also receive an email with a confirmation code in a few moments.

#### Confirming

After receiving the confirmation email, go to AWS ACCOUNT > Confirm

Enter the code and submit, and you should get:

```
Confirm says Hi!
Confirming Account ...
Account confirmed
```

#### Signing In

Now we ready to actually sign in. Go to AWS ACCOUNT > Sign in

Fill out the form using the password you selected when registering, and after submitting you should get:

```
Sign In says Hi!
Signing in ...
Signed in
```

Now, let's see if it worked.

### Home

Go back to the home tab

You should now see something like: 

```
Bucket: forforf-cognito-test
cognito-test.txt
```

This shows the bucket these temporary credentials have access to, as well as all the objects in that bucket (just one).

Tada!!

Yeah, not very exciting, but the point being that temporary credentials have been assigned to a browser user and that user was able to access an AWS resource.

Refresh the browser and you'll see that access has been lost.

## Getting / Installing

Getting and setting up the app.

```
git clone https://github.com/forforf/cognito-react.git
npm install
```

Build a production release

```
npm build
```

## Continous Deployment Pipeline

The [example app](http://cognito-react.joha.us) lives in an S3 bucket and is built from this code  (specifically the code committed to CodeCommit) through AWS CodePipeline. There is no webserver at all.

## Development Notes

I used this project to learn about several things in parallel, React, Redux, react-observable, and Cognito. There are some rough edges in the code and this is not (ever) intended to be a full fledged app. It's more of a detailed getting started guide.

One thing that might be confusing when reading the source are the terms "Sign Up" vs "Register"

These terms are interchangeable for this app. The original term was "Sign Up", but this was too close to "Sign In" for me. Historically I was following the AWS Cognito naming, which uses the term "Sign Up", but I think "register" is a better term and I've migrated portions of the app in that direction, but not everything.  ¯\_(ツ)_/¯