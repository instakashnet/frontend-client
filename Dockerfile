## Build Stage
FROM 160743850946.dkr.ecr.us-east-2.amazonaws.com/docker-library:node14-alpine as build
## Docker argunments for build:
ARG REACT_APP_STAGE="dev"
ARG REACT_APP_AWS_ACCESS_KEY="AWS_KEY"
ARG REACT_APP_AWS_SECRET_KEY="AWS_SECRET"
ARG REACT_APP_GOOGLE_ID="REACT_APP_GOOGLE_ID"
ARG REACT_APP_FB_PIXEL_ID="REACT_APP_FB_PIXEL_ID"
ARG REACT_APP_MIGO_API="REACT_APP_MIGO_API"
## Docker environment variables:
ENV REACT_APP_STAGE=$REACT_APP_STAGE
ENV REACT_APP_GOOGLE_ID=$REACT_APP_GOOGLE_ID
ENV REACT_APP_FB_PIXEL_ID=$REACT_APP_FB_PIXEL_ID
ENV REACT_APP_MIGO_API=$REACT_APP_MIGO_API
ENV REACT_APP_AWS_ACCESS_KEY=$REACT_APP_AWS_ACCESS_KEY
ENV REACT_APP_AWS_SECRET_KEY=$REACT_APP_AWS_SECRET_KEY
ENV REACT_APP_SENTRY_DSN="https://059a401127f74281b013b7a48238d535@o1108528.ingest.sentry.io/6309279"
ENV REACT_APP_FB_PIXEL_ID_MAIN="604139833479218"
ENV REACT_APP_FB_PIXEL_ID_WEBTILIA="138687183398089"
ENV REACT_APP_GTM_ID="GTM-MVR37S9"

RUN \
    apk update && \
    apk add build-base gcc wget git && \
    apk add --no-cache python3 py3-pip && \
    pip3 install --upgrade pip
WORKDIR  /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY ./ ./
RUN yarn build:$REACT_APP_STAGE
FROM 160743850946.dkr.ecr.us-east-2.amazonaws.com/docker-library:nginx-alpine
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
