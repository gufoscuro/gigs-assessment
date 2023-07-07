FROM node:18.16-bullseye
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

RUN addgroup --gid 1500 lorenzo && \
    adduser --home /lorenzo -uid 1500 --gid 1500 lorenzo && \
    chown lorenzo:lorenzo /lorenzo

USER lorenzo:lorenzo

ENTRYPOINT [ "npm", "run", "start" ] 