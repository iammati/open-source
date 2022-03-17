ARG BASE_IMAGE
FROM $BASE_IMAGE

# Installing pnpm inside the web-container
# making sure to have the latest pnpm version and updating if possible
# and enable pre/post hooks for pnpm's run-script lifecycle.
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm &&\
    pnpm add -g pnpm &&\
    pnpm config set enable-pre-post-script true
