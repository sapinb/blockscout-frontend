## To run locally

### Start blockscout backend

Clone blockscout repo 
https://github.com/blockscout/blockscout

In `docker-compose/docker-compose.yml`
services -> backend -> environment:

remove or comment out `ETHEREUM_JSONRPC_TRACE_URL`, `ETHEREUM_JSONRPC_WS_URL`

add 
```
INDEXER_DISABLE_INTERNAL_TRANSACTIONS_FETCHER: 'true'
INDEXER_DISABLE_PENDING_TRANSACTIONS_FETCHER: 'true'
```

Ensure rollup chainId matches
Ensure rollup sequencer/fullnode is bound to docker host port (or 0.0.0.0 for convenience)
Ensure port is correct (default 8545)

### 
Ensure nodejs 18 is available

Install dependencies through **yarn**
```bash
yarn install
```

Ensure .env is present

Generate ./public/envs.js
```bash
./deploy/scripts/make_envs_script.sh
```

Run in dev mode
```bash
yarn dev
```
