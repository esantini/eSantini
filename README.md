# My Personal Website

Created & hosted with a [Raspberry Pi](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/) on my home.

Visit [eSantini.com](https://esantini.com/) to see if it's running.

# NGINX

Reverse Proxy configured with [NGINX](https://www.nginx.com/)

File `nginx-sites-available` contains current NGINX configuration with http2 & SSL to enable an encrypted and secure transfer protocol (https).

# Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Run Production

Run `yarn build` to create the `/build` folder.

At this point you can just run `serve -s build` but it won't restart when booting.

# Setup PM2

With PM2 you can keep serving both Front-End and API after device restarts

Install PM2 with `sudo yarn global add pm2`

### Configure PM2

Run `pm2 startup` and follow the instruction.

### Serve Build Files & Run API

Serve static files in `/build` folder:

```bash
pm2 serve -s build --name "e-santini"
```

Run the NodeJS API server:

```bash
NODE_ENV=production PORT=3001 pm2 start server.js
```

### Save Configuration

If your current configuration is working properly you should save it

Save your configurations `pm2 save`

View running processes `pm2 list`
View API logs `pm2 logs server`

More commands: [https://pm2.keymetrics.io/docs/usage/process-management/](https://pm2.keymetrics.io/docs/usage/process-management/)
