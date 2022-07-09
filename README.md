# shop-vue-vuex-cloudfront

## Task 2
S3 bucket web-address: http://epam-clouddevcourse-static-hosting.s3-website-eu-west-1.amazonaws.com/

CloudFront URL: https://d1a769akh81yaf.cloudfront.net/
### Task 2 extras
`invalidatePaths` configuration option is implemented for the serverless-single-page-app-plugin to allow partial CloudFront distribution invalidation, see _serverless.yml_:
```
custom:
  invalidatePaths: '"/index.html"'
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
