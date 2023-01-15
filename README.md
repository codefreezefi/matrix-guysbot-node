# Guysbot for the Codefreeze Matrix homeserver

## Retrieving an access token

Retrieve an access token for your bot user account:

```bash
http -v POST https://<homeserver hostname>/_matrix/client/r0/login <<< '{"type":"m.login.password","user":"<username>","password":"<password>"}'
```

## Set up

```bash
npm ci
```

Configure these environment variables (e.g. by using [direnv](https://direnv.net/)). See [`.envrc.dist`](./.envrc.dist) for an example.

## Running

```bash
node main.js
```

Then invite the bot user to the rooms it should be active in. Only public and unencrypted rooms are supported.

## Running it on the homeserver

```bash
git clone https://github.com/codefreezefi/matrix-guysbot-node
cd matrix-guysbot-node
npm ci
sudo systemd-run --setenv=ACCESS_TOKEN=<access_token> --working-directory=${PWD} node main.js
```
