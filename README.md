# My Personal Website

Created & hosted with a [Raspberry Pi](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/) on my home.

Visit [eSantini.com](https://esantini.com/) to see if it's running.

# NGINX

Reverse Proxy configured with [NGINX](https://www.nginx.com/) on ports 443 for a secure transfer protocol (https) with http2 & SSL.

File [nginx-sites-available](https://github.com/esantini/api/blob/main/nginx-sites-available) in api repo contains the current NGINX configuration.

# ReactJS

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Run Production

Run `yarn build` to create the `/build` folder.

If NGINX & port forward is configured correctly this should start serving the static files on the site.
