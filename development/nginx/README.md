# Nginx

Nginx is used to handle routing from within Docker Compose. Currently it only points to the `frontend` service, but this allows us to add additional docker compose services later and always hit <https://dev.amisad.com>.

## How to setup test credentials

```sh
$ openssl genrsa -out server.key 4096
$ openssl req -new -key server.key -out server.csr
$ openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```
