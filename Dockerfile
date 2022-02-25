FROM node:14 as build

ARG REACT_APP_STAGE="prod"
ARG REACT_APP_API_URL="https://api.instakash.net"
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_STAGE=$REACT_APP_STAGE
ENV REACT_APP_GOOGLE_ID="836395718088-46p17n2ajjs23ngp905mo3m8ehcscla2.apps.googleusercontent.com"
ENV REACT_APP_FB_PIXEL_ID="604139833479218"
ENV REACT_APP_MIGO_API="jMkxIGIHkdh4zIvM5YzvfJkg3muBTCaMG7BP1bBM8HUJxQQZUGuQn1x64YCS"
ENV REACT_APP_AWS_ACCESS_KEY="AKIASK3IUQPBCJ2DJUJH"
ENV REACT_APP_AWS_SECRET_KEY="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"
ENV REACT_APP_WS_URL="wss://ws.instakash.net"

WORKDIR  /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY ./ ./
RUN yarn build:prod

FROM nginx:1.21.5-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY container /
RUN \
  \
# changed nginx uid / gid to 48
  \
  sed -i -e 's/^nginx:x:[0-9]\+:[0-9]\+:/nginx:x:48:48:/' /etc/passwd \
  && sed -i -e 's/^nginx:x:[0-9]\+:/nginx:x:48:/' /etc/group \
  \
# Create cache directory
  \
  && mkdir -p \
      /var/cache/nginx/proxy_temp \
      /var/cache/nginx/client_temp \
      /var/cache/nginx/fastcgi_temp \
      /var/cache/nginx/scgi_temp \
      /var/cache/nginx/uwsgi_temp \
  \
# Change ownership so that nginx can write
  && chown -R nginx:nginx /etc/nginx/nginx.conf /etc/nginx/conf.d /var/cache/nginx

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]