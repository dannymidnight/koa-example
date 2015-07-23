# Base docker image for a development VM

FROM mhart/alpine-iojs

RUN apk --update add bash rsync python make gcc g++

# Add startup scripts
ADD docker/web/scripts/env.sh /env.sh
ADD docker/web/scripts/my_init.sh /sbin/my_init

# Add relative node_modules path
ENV PATH=node_modules/.bin:$PATH

ENTRYPOINT ["/sbin/my_init"]
