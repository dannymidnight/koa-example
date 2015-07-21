FROM mhart/alpine-iojs

RUN apk --update add bash rsync

# Add startup scripts
ADD docker/web/scripts/env.sh /env.sh
ADD docker/web/scripts/my_init.sh /sbin/my_init

# Add relative node_modules path
ENV PATH=node_modules/.bin:$PATH

ENTRYPOINT ["/sbin/my_init"]
