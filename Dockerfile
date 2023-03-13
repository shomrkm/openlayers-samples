FROM node:18.14-alpine

ENV PROJECT_ROOTDIR /usr/src/app

WORKDIR $PROJECT_ROOTDIR

RUN apk update && apk upgrade && apk add --no-cache git

COPY package.json tsconfig.json $PROJECT_ROOTDIR

RUN npm install

COPY . $PROJECT_ROOTDIR

EXPOSE 3000

# CMD ["yarn", "start"]
