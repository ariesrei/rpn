
# Using base image from mhart/alpine-node
FROM mhart/alpine-node

ADD . /app

WORKDIR /app

RUN npm i

EXPOSE 3000

CMD ["npm", "start"]