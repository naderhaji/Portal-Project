FROM node:16 as builder

WORKDIR /app

COPY package.json .

#COPY package-lock.json .

#COPY .npmrc .

RUN npm install  --legacy-peer-deps


COPY . .


RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/LMS-Project-Front /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
#COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# When the container starts, replace the env.json with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/environments/config.template.json > /usr/share/nginx/html/assets/environments/config.json && nginx -g 'daemon off;'"]



