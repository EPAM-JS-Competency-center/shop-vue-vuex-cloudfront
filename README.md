# shop-vue-vuex-cloudfront

See `develop` branch for development

## Links to deployed app
[S3 Link](http://car-parts-manual.s3-website-us-east-1.amazonaws.com/) - 403 forbidden

[Cloudfront Link for manually created bucket](https://duq59gs8kboag.cloudfront.net/).

[Cloudfront link for automatically created bucket with serverless-single-page-app-plugin and automatic deployment with serverless-finch](https://d31qwwzbuo55t9.cloudfront.net).

## Project deploying to AWS
For deployment install and configure AWS CLI and Serverless framework with your
AWS credentials, edit serverless.yml if you want to specify
your specific name for AWS S3 bucket and then run:
```
npm run cloudfront:update:build:deploy:nc
```
Next times you can deploy your changes using command:
```
npm run cloudfront:build:deploy:nc
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
