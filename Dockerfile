FROM node:lts-alpine as build-stage
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
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
