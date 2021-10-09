FROM node:14 

WORKDIR /app 

COPY package.json /app/

COPY package-lock.json /app/

RUN npm install 

COPY . /app/

ENV MONGODB_URL_V2="mongodb://projetdb:eAqSYCSXaDtETvqU@cluster0-shard-00-00.xf6ie.mongodb.net:27017,cluster0-shard-00-01.xf6ie.mongodb.net:27017,cluster0-shard-00-02.xf6ie.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-bp5d2v-shard-0&authSource=admin&retryWrites=true&w=majority"
ENV ACTIVATION_TOKEN_SECRET ='Rum[Xp\9Q(.ZGyxc`"JTkE8>8?A4,LfHrrXxY2\Wc%R8>dnn!'
ENV ACCESS_TOKEN_SECRET = "7[b<jCa'_]RE&4._KqqJDY-/*Zz`#2`erzUJcZ8B7^R^[`sPkS"
ENV REFRESH_TOKEN_SECRET = "rK*5J(EGH3V>Ly5tR.5Ne/:M7q83}&5\qn-='#{ksr@!h)9FQH\5/mV.(gy/"
ENV CLIENT_URL = "http://localhost:3000"

EXPOSE 5000

CMD [ "node","serveur.js" ]