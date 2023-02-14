# shop-vue-vuex-cloudfront

## Cloud setup

One time run:

```
npm install
cloudfront:update:build:deploy:nc
```

During development:

```
cloudfront:update:build:deploy:nc
```

Cloudfront (public) URL: http://db27n60o60d5z.cloudfront.net/

S3 (private) URL: http://farafonoff-aws-shop-fe-bucket.s3-website.us-east-2.amazonaws.com/

See `develop` branch for development

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
