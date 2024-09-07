ARG BUILDPLATFORM=arm64
FROM --platform=$BUILDPLATFORM public.ecr.aws/nginx/nginx:latest

ARG USES_SSL=${USES_SSL:-"false"}
ARG NGINX_CONFIG_PATH=${NGINX_CONFIG_PATH:-".docker/nginx/default.conf"}

RUN if [ "$USES_SSL" != "false" ] ; then \
      openssl dhparam -outform PEM -out /etc/ssl/certs/dhparam.pem 2048 \
    ; fi

COPY $NGINX_CONFIG_PATH /etc/nginx/conf.d/default.conf.template

CMD ["/bin/sh" , "-c" , "envsubst '$FRONTEND_HOST $FRONTEND_VITE_HOST $GO_HOST' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]

EXPOSE 80
