## Dependencies
* boot2docker
* docker-compose
* docker-osx-dev

```
> curl -o /usr/local/bin/docker-osx-dev https://raw.githubusercontent.com/brikis98/docker-osx-dev/master/src/docker-osx-dev
> chmod +x /usr/local/bin/docker-osx-dev
> docker-osx-dev install
```

## Install
```sh
> make install
```

### Development
```sh
> cd /project/dir
> docker-osx-dev
> docker-compose up
```

Running application
`http::/dockerhost:5000`
