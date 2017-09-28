## How to start:

1. Install dependencies
npm install

2. build scripts
npm start : run develpoment environment
npm run build : run production environment and build production bundle

Now you can visit your site by: localhost:3000

Note : Suggest install cnpm.
Install cnpm ISO
npm install cnpm -g --registry=https://registry.npm.taobao.org


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

## Folder Structure

```
my-app/
  README.md
  node_modules/
  package.json
  config/
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, or Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can find config files in config folder.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

##How to build test environment to test API

1. Update hosts : add lines `127.0.0.1 test.mijia.mi.srv` to hosts.
   scripts: vim /etc/hosts

2. Update nginx conf: copy below configration to nginx.conf.
   scripts: vim /usr/local/etc/nginx/nginx.conf
```
  upstream test.mijia.mi.srv {
      server 127.0.0.1:4008;
      keepalive 64;
  }
  server {
          listen       80;
          server_name  test.mijia.mi.srv;
          error_log /usr/local/etc/nginx/logs/error.log;
          location / {
              proxy_set_header   X-Real-IP        $remote_addr;
              proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
              proxy_set_header   Host             $http_host;
              proxy_set_header   X-NginX-Proxy    true;
              proxy_set_header   Connection "";
              proxy_http_version 1.1;
              proxy_pass         http://test.mijia.mi.srv;
          }
          location /src {
                  proxy_set_header   X-Real-IP        $remote_addr;
                  proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
                  proxy_set_header   Host             mijia.mi.srv;
                  proxy_set_header   X-NginX-Proxy    true;
                  proxy_set_header   Connection "";
                  proxy_http_version 1.1;
                  proxy_pass http://mijia.mi.srv;
          }
      }
```
3. Now you can visit the website via: http://test.mijia.mi.srv:4008