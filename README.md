# shop-vue-vuex-cloudfront

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
For running Cypress e2e tests run:
```
npm run test:e2e:cypress
```

In order to run WDIO tests suites locally, first make sure app is up and running, so Webdriver may access it's elements.
Then run:
```
npm run test:e2e:wdio
```
By default, tests will be run in Chrome browser, but this can be changed by passing `process.env.CAPABILITY` env variable, with one from values below:

- localChrome
- localFirefox
- localSafari
- localEdge
- ciChrome
- ciFirefox

> make sure that selected browser is supported by your OS and installed on PS, and appropriate drivers installed in package.json before running tests

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
