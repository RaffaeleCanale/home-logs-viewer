FROM node:14
WORKDIR /etc/wx/

COPY package.json yarn.lock  ./

RUN yarn install

COPY assets/ assets/
COPY components/ components/
COPY layouts/ layouts/
COPY middleware/ middleware/
COPY pages/ pages/
COPY plugins/ plugins/
COPY static/ static/
COPY store/ store/
COPY templates/ templates/
COPY lib/ lib/

COPY nuxt.config.js config.env ./

RUN set -a && . ./config.env && yarn run build
CMD ["yarn", "start"]
