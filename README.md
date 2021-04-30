# aws-lambda-node-authorizer-auth0

[AWS API Gateway](https://aws.amazon.com/api-gateway/) Custom authorizer function with [Auth0](https://auth0.com/) example in [NodeJS](https://nodejs.org/en/)

### 🌍 Live demo

Here is the live demo: [roasted-thread.surge.sh](https://roasted-thread.surge.sh/)

### 🔨Build and Deploy

- Setup an [auth0 application](https://auth0.com/docs/applications).

```bash
cd /path/to/repo/
```

#### 💻 Backend

```bash
cd backend

export AWS_ACCESS_KEY_ID=<YOUR-AWS-ACCESS-KEY-ID>
export AWS_SECRET_ACCESS_KEY=<YOUR-AWS-SECRET-ACCESS-KEY>

npm install
```

- Get your `Domain` (under `applications->${YOUR_APP_NAME}->settings`) and plugin your `AUTH0_DOMAIN` in a new file called `secrets.json` (based on `secrets.example.json`).

- Get your `Certificate` (under `applications->${YOUR_APP_NAME}->settings->Show Advanced Settings->Certificates->DOWNLOAD CERTIFICATE`). Download it as `PEM` format and save it as a new file called `key.pem`

- Deploy the service with `npx serverless deploy` and grab the public and private endpoints.

#### 🖥 Frontend

```bash
cd frontend

npm install
```

- Get your `Client ID` (under `applications->${YOUR_APP_NAME}->settings`)

- Create files `.env.production` and `.env.development` with values fron auth0 and the deployed API endpoint

```
REACT_APP_API_BASE_URL=https://<apiendpoint>.execute-api.<region>.amazonaws.com/dev
REACT_APP_AUTH0_DOMAIN=<YOUR-AUTH0-DOMAIN>
REACT_APP_AUTH0_CLIENT_ID=<YOUR-APPLICATION-CLIENT-ID>
```

- Build and deploy Frontend to host of your choosing and make sure to configure the `Allowed Callback URL`, `Allowed Logout URLs` and `Allowed Web Origins` in your auth0 application in the [auth0 dashboard](https://manage.auth0.com). I used `https://roasted-thread.surge.sh/` for the demo.

```bash
npm run build

serve build
```

### 🗂 Resources

This example is based on [serverless examples](https://github.com/serverless/examples/tree/master/aws-node-auth0-cognito-custom-authorizers-api)

### 🥂 Contributing

Anyone and everyone is welcome to contribute.

### 🐞 Issues

Find a bug or want to request a new feature? Please let me know by submitting an issue.

### 🗝 Licensing

Licensed under the MIT License

A copy of the license is available in the repository's [LICENSE](LICENSE) file.
