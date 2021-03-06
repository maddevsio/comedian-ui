FROM node:lts-alpine as build-stage

ARG VUE_APP_COMEDIAN_API_BASE_URL
ARG VUE_APP_SPRINT_REPORTER_API_BASE_URL
ARG VUE_APP_REPORTER_API_BASE_URL
ARG VUE_APP_ON_DUTY_BASE_URL

ENV VUE_APP_COMEDIAN_API_BASE_URL=$VUE_APP_COMEDIAN_API_BASE_URL
ENV VUE_APP_SPRINT_REPORTER_API_BASE_URL=$VUE_APP_SPRINT_REPORTER_API_BASE_URL
ENV VUE_APP_REPORTER_API_BASE_URL=$VUE_APP_REPORTER_API_BASE_URL
ENV VUE_APP_ON_DUTY_BASE_URL=$VUE_APP_ON_DUTY_BASE_URL

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY . .
#RUN npm install -g @vue/cli@latest
RUN yarn
RUN yarn build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
