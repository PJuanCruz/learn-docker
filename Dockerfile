FROM node:15
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "${NODE_ENV}" = "development" ]; \
      then npm install; \
      else npm install --only=production; \
    fi

COPY . .
# ENV PORT 4000
EXPOSE 4000
CMD [ "npm", "start" ]