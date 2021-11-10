---
title: Arkb 
---

<Block>

# Arkb
Arweave deploy that saves you cost

> For any questions and support queries regarding Arkb, We strongly recommend that you join our __[Discord Server]()__ as this is the hub of our developer community. Here you will find plenty of community devs and Textury team members available to help you out.

</Block>

<Block>

## Features

- No file size limit.
- No amount of files limit.
- Doesn't upload files that you have already uploaded.

</Block>

<Block>

## Installation

Arkb runs using NODEJS and NPM. You must have both installed on your machine for it to work.
<br/>
To use arkb in your terminal, you have to install it globally.

### Using NPM:
  ```sh
  npm install -g arkb
  ```

  <Example>
    npm install -g arkb
  </Example>

### Using YARN legacy:
  ```sh
  yarn global add arkb
  ```

  <Example>
    yarn global add arkb
  </Example>

> __Note:__ The installation of arkb needs node >=15.11.0 or you will get an error when using `arkb`. To manage multiple active nodejs, we recommend you have [nvm](https://github.com/nvm-sh/nvm) installed on your computer, then you can switch different to a different nodejs version in a simple command.

</Block>

<Block>

## Usage

Arkb is used in the command line.

### Deploy a folder

Quickly deploy a folder to the arweave network.

  <Example>
    # Deploy a folder 

    arkb deploy ./folder --wallet /path/to/my/wallet.json

  </Example>

</Block>

<Block>

## Arkb commands
# Balance

Gets the current balance of your wallet.

<Example>
  ```sh
  arkb balance --wallet /path/to/my/wallet.json
  ```

</Example>

If you have saved a wallet previously using the `wallet-save` or `ws` command, you don't need to pass the `--wallet` flag to this command.

<Example>
  ```sh
  arkb balance
  ```

</Example>

This would prompt you to input your password

</Block>

<Block>

# Deploy

Deploys a directory or file.

<Example>
  ```sh
  arkb deploy ./folder --wallet /path/to/my/wallet.json
  ```

</Example>

If you have saved a wallet previously using the `wallet-save` or `ws` command, you don't need to pass the `--wallet` flag to this command.

<Example>
  ```sh
  arkb deploy ./folder 
  ```

</Example>

This would prompt you to input your password

<br/>

This command can also be used with the `--gateway` flag. Incase you don't want to deploy to the mainnet.

<Example>
  ```sh
  arkb deploy ./folder --gateway http://localhost:1984
  ```

</Example>

</Block>

<Block>

# Help

Shows usage help for all arkb commands.

<Example>
  ```sh
  arkb help
  ```

</Example>

</Block>

<Block>

# Network

Gets the current network info.
<br/>
By default it uses the mainnet ([arweave.net](https://arweave.net)).

<Example>
  ```sh
  arkb network
  ```

</Example>

To change the network, the `--gateway` flag is used.

<Example>
  ```sh
  arkb network --gateway http://localhost:1984
  ```

</Example>

</Block>

<Block>

# Status

Checks the status of a transaction, using the transaction ID

<Example>
  ```sh
  arkb status <txid>
  ```

</Example>

Doing this checks the status of the transaction on the mainnet. To use another gateway use the `--gateway` flag.

<Example>
  ```sh
  arkb status <txid> --gateway http://localhost:1984
  ```

</Example>

</Block>

<Block>

# Version

Shows the current arkb version number.

<Example>
  ```sh
  arkb version 
  ```

</Example>

</Block>

<Block>

# Wallet Save

Saves a wallet, removes the need for using the `--wallet` flag.

<Example>
  ```sh
  arkb wallet-save /path/to/my/wallet.json
  ```
</Example>

</Block>

<Block>

# Wallet Forget 

Removes a previously saved wallet.

<Example>
  ```sh
  arkb wallet-forget
  ```
</Example>

</Block>

<Block>

# Wallet Export 

Exports a previously saved wallet.

<Example>
  ```sh
  arkb wallet-export
  ```
</Example>

</Block>

<Block>

# Transfer 

Send funds to an arweave wallet

<Example>
  ```sh
  arkb transfer <wallet_address> <amount> --wallet /path/to/my/wallet.json 
  ```
</Example>

If you have saved a wallet previously using the `wallet-save` or `ws` command, you don't need to pass the `--wallet` flag to this command.

<Example>
  ```sh
  arkb transfer <wallet_address> <amount> 
  ```

</Example>

This would prompt you to input your password

</Block>

<Block>

## Arkb flags

# --auto-confirm

Skips the confirm screen

  <Example>
    ```sh
    arkb deploy ./folder --auto-confirm
    ```

  </Example>

</Block>

<Block>

# --concurrency

Flag for multi thread, default is 5.

  <Example>
    ```sh
    arkb deploy ./folder --concurrency 10

    # Using the alias
    arkb deploy ./folder -c 10
    ```

  </Example>

</Block>

<Block>

# --debug

Display log messages

  <Example>
    ```sh
    arkb deploy ./folder --debug 
    ```

  </Example>

</Block>

<Block>

# --force

Force a redeploy of all the files

  <Example>
    ```sh
    arkb deploy ./folder --force 

    # Using the alias
    arkb deploy ./folder -f
    ```

  </Example>

</Block>

<Block>

# --gateway

Set the gateway hostname or ip address. This is used when you don't want to use `arweave.net` as gateway.

  <Example>
    ```sh
    arkb deploy ./folder --gateway http://localhost:1984 

    # Using the alias
    arkb deploy ./folder -g http://localhost:1984
    ```

  </Example>

</Block>

<Block>

# --help

Show arkb usage help.

  <Example>
    ```sh
    arkb --help

    # Using the alias
    arkb -h
    ```

  </Example>

</Block>

<Block>

# --ipfs-publish

Publish to Arweave+IPFS.

  <Example>
    ```sh
    arkb deploy ./folder --ipfs-publish
    ```

  </Example>

</Block>

<Block>

# --timeout

Set the request timeout.

  <Example>
    ```sh
    # 20s timeout
    arkb network --timeout 20000  

    # using alias
    arkb network -t 20000
    ```

  </Example>

</Block>

<Block>

# --use-bundler

Use the ans104 bundler.

  <Example>
    ```sh
    arkb deploy ./folder --use-bundler https://bundler.net
    ```

  </Example>

</Block>

<Block>

# --wallet

Set the key file path.

  <Example>
    ```sh
    arkb deploy ./folder --wallet /path/to/my/wallet.json

    # using alias
    arkb deploy ./folder -w /path/to/my/wallet.json
    ```

  </Example>

</Block>
