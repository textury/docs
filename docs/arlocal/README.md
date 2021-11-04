---
title: Arlocal 
---

<Block>

# Arlocal
Run a local Arweave gateway-like server.

> For any questions and support queries regarding Arlocal, We strongly recommend that you join our __[Discord Server]()__ as this is the hub of our developer community. Here you will find plenty of community devs and Textury team members available to help you out.

</Block>

<Block>

## Features

- Extremely fast compared to other options out there.
- Community built, open source and free.
- No need of external resources, only NodeJS + NPM.
- Test transactions, SmartWeave Contracts, GraphQL requests, NFT deployment and more.
- Works on Windows, Mac, Linux, Raspberry Pi, and pretty much everywhere as long as NodeJS is installed.

</Block>

<Block>

## Usage
Arlocal can be used as both a CLI tool and as a NodeJs library.

</Block>

<Block>

## CLI Tool
Make sure you already have NodeJS + NPM installed. To run `arlocal` it's as simple as doing an npx which means running the latest version available on [npmjs.com](https://npmjs.com).

> __Note:__ The installation of arlocal needs node >=15.14.0 or you will get an error when using `arlocal`. To manage multiple active nodejs, we recommend you have [nvm](https://github.com/nvm-sh/nvm) installed on your computer, then you can switch different to a different nodejs version in a simple command.

```sh
npx arlocal
```
That's it! You are running a local slim gateway on http://localhost:1984

<br/>

How about if I want to run it on another port?! It's as simple as doing:

```sh
npx arlocal 8080
```

This will start arlocal on port 8080.

<br/>

Other options: 

```sh
npx arlocal --hidelogs
```

Doing the above will hide logs from arlocal.


```sh
npx arlocal --persist
```

Doing the above will persist data(transactions) stored between restarts.


</Block>

<Block>

## NodeJs library

You can also use arlocal as a library on your own code. This is useful if you want to make sure everyone who tests your app has this instance installed.

```sh
# npm 
npm install --save-dev arlocal

# yarn legacy
yarn add -D arlocal
```

Then you can import it like any other node module.

  <Example>

    ```js
    import ArLocal from 'arlocal';

    (async () => {
      const arLocal = new ArLocal();

      // Start is a Promise, we need to start it inside an async function.
      await arLocal.start();

      // Your tests here...

      // After we are done with our tests, let's close the connection.
      await arLocal.stop();
    })();
    ```
  </Example>

<br/>
The ArLocal class has a few options, all of them are optional.

```js
new ArLocal(port= 1984, showLogs= true, dbPath= '.db', persist= false)

/*

port = What port to use for ArLocal.
showLogs = Should we show logs.
dbPath = folder where the db will be temporary stored.
persist = Whether or not data stored should be persisted among server restarts.

*/
```

</Block>

<Block>

## CLI usages

Arlocal CLI can be used with other tools like: 
- [arkb](https://npmjs.com/package/arkb)
- [blockweave](https://npmjs.com/package/blockweave)
- [arweave-js](https://npmjs.com/package/arweave)

  <Example>

    ```js
    // Using arweave-js
    import Arweave from 'arweave';

    const arweave = Arweave.init({
      host: 'localhost',
      port: 1984,
      protocol: 'http'
    });

    // Using blockweave
    import Blockweave from 'blockweave';

    const blockweave = Blockweave.init({
      host: 'localhost',
      port: 1984,
      protocol: 'http'
    });
    ```

    ```sh
    arkb deploy ./folder --gateway http://localhost:1984
    ```

  </Example>

</Block>

<Block>

## Sending transactions

Sending a new transaction is done just like with the default gateway, use ArweaveJS/Blockweave to create your transaction, sign and post it.

After this transaction is sent, to confirm (mine) your transactions, you need to hit the /mine endpoint. You can do this programmatically or by simply going to http://localhost:1984/mine.

You can also mine more than one block at a time by hitting /mine/{blocks}, this will increase the current blocks to the set blocks.

</Block>
