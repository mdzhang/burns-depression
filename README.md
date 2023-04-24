# Burns Depression

See subdirectory READMEs.

| Domain |
| ----------- |
| [frontend](./frontend/README.md) |
| [backend](./backend/README.md) |
| [infrastructure](./infrastructure/README.md) |
| [mobile](./mobile/README.md) |

## Development

1. Edit `/etc/hosts` to have `127.0.0.1 dev.amisad.com`
1. Start with docker:
    ```sh
    docker-compose up -d
    ```
1. Go to <https://dev.amisad.com/>
1. If <https://dev.amisad.com/>'s certificate is not trusted:
    - run `open 'development/nginx/server.crt'`
    - double click on certificate in Keychain Access and set "Trust" to "Always Trust"
