FROM node:current-alpine3.19
WORKDIR /usr/src/app
COPY package*.json ./
RUN --mount=type=cache,target=/usr/src/app/.npm\
    npm set cache /usr/src/app/.npm &&\  
    npm ci --only=production
USER node
COPY --chown=node:node / .
EXPOSE 4000
CMD [ "node", "index.js" ]