FROM node:12.20.0-alpine3.10 as build
ARG APP
WORKDIR /app
COPY package*.json ./
COPY workspace.json ./
COPY jest* ./
COPY tsconfig*.json ./
COPY nx.json ./
RUN npm install
COPY ./apps/${APP} ./apps/${APP}/
RUN npm run -- build ${APP}  --prod


FROM node:12.20.0-alpine3.10
ARG APP
ARG PORT
WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm install --only=production
COPY --from=build /app/dist/apps/${APP} ./
EXPOSE ${PORT}
CMD [ "node", "main.js" ]

