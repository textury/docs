---
title: Blockweave
---

<Block>

# Blockweave

Blockweave is a JavaScript/TypeScript SDK to interact with the Arweave network (know as blockweave) and uploading data to the permaweb. It works in latest browsers and Node JS.

<br/>

Coming from [Arweave JS](https://npmjs.com/package/arweave)? See some key [differences](https://github.com/textury/blockweave/blob/dev/differences.md).

</Block>

<Block>

## Installation

### NPM

  <Example>
    # NPM
    npm install --save blockweave

    # Yarn legacy
    yarn add blockweave
  </Example>

</Block>

<Block>

### Bundles

Single bundle file (web only - use the NPM method if using Node).

  <Example>
    <!-- Latest -->
    <script src="https://unpkg.com/blockweave/dist/blockweave-web.js"></script>

    <!-- Latest, minified-->
    <script src="https://unpkg.com/blockweave/dist/blockweave-web.min.js"></script>

    <!-- Specific version -->
    <script src="https://unpkg.com/blockweave@1.0.0/dist/blockweave-web.js"></script>

    <!-- Specific version, minified -->
    <script src="https://unpkg.com/blockweave@1.0.0/dist/blockweave-web.min.js"></script>
  </Example>

</Block>

<Block>

## Initialization

### Node Module

  <Example>
    import Blockweave from 'blockweave';

    // If you want to connect directly to a gateway
    const blockweave = new Blockweave({url: 'https://arweave.net'});

    // Or without a gateway, it will select from the default list
    const blockweave = new Blockweave();
  </Example>

</Block>

<Block>

### Web Bundles

  <Example>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Hello world</title>
        <script src="https://unpkg.com/blockweave/dist/blockweave-web.js"></script>
        <script>
          const blockweave = new Blockweave();
          blockweave.network.getInfo().then(console.log);
        </script>
    </head>
    <body>

    </body>
    </html>
  </Example>

</Block>

<Block>

### Initialization options

Every one of these options are optional. If you have url, you don't need to set the host, port and protocol.


  <Example>
    {
      url: 'https://arweave.net', // Gateway URL
      host: 'arweave.net',// Hostname or IP address for a Arweave host
      port: 443,          // Port
      protocol: 'https',  // Network protocol http or https
      timeout: 20000,     // Network request timeouts in milliseconds
      logging: false,     // Enable network request logging
    }
  </Example>

</Block>

<Block>

## Usage

## Wallet and Keys

### Create a new wallet and private key

Here you can generate a new wallet address and private key (JWK), don't expose private keys or make them public as anyone with the key can use the corresponding wallet.

<br/>

Make sure they're stored securely as they can never be recovered if lost.

<br/>

Once AR has been sent to the address for a new wallet, the key can then be used to sign outgoing transactions.

  <Example>
    blockweave.wallets.generate().then((key) => {
    console.log(key);
      // {
      //     "kty": "RSA",
      //     "n": "3WquzP5IVTIsv3XYJjfw5L-t4X34WoWHwOuxb9V8w...",
      //     "e": ...
    });
    ```
  </Example>

</Block>

<Block>

###  Get the wallet address for a private key

  <Example>
    blockweave.wallets.jwkToAddress(key).then((address) => {
      console.log(address);
      //1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY
    });
  </Example>
  
</Block>

<Block>

### Get an address balance

Get the balance of a wallet address, all amounts by default are returned in [winston](https://docs.blockweave.org/developers/server/http-api#ar-and-winston).

  <Example>
    blockweave.wallets.getBalance('1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY').then((balance) => {
      let winston = balance;
      let ar = blockweave.ar.winstonToAr(balance);

      console.log(winston);
      //125213858712

      console.log(ar);
      //0.125213858712
    });
  </Example>
  
</Block>

<Block>

### Get the last transaction ID from a wallet

  <Example>
    blockweave.wallets.getLastTransactionID('1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY').then((transactionId) => {
      console.log(transactionId);
      //3pXpj43Tk8QzDAoERjHE3ED7oEKLKephjnVakvkiHF8
    });
  </Example>
  
</Block>

<Block>

## Transactions

Transactions are the building blocks of the Arweave permaweb, they can send [AR](https://docs.arweave.org/developers/server/http-api#ar-and-winston) betwen wallet addresses, or store data on the Arweave network.

<br/>

The create transaction methods create and return an unsigned transaction object. You must sign the transaction and submit it separeately using the `transactions.sign` and `transactions.submit` methods.

<br/>

__Modifying a transaction object after signing it will invalidate the signature__, causing it to be rejected by the network if submitted in that state. Transaction prices are based on the size of the data field, so modifying the data field after a transaction has been created isn't recommended as you'll need to manually update the price.

<br/>

The transaction ID is a hash of the transaction signature, so a transaction ID can't be known until its contents are finalised and it has been signed.

</Block>

<Block>

### Create a data transaction

Data transactions are used to store data on the Arweave permaweb. They can contain HTML or any arbitrary data and are served like webpages.

  <Example>
    let key = await blockweave.wallets.generate();

    // Plain text
    let transactionA = await blockweave.createTransaction({
        data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>'
    }, key);

    // Buffer
    let transactionB = await blockweave.createTransaction({
        data: Buffer.from('Some data', 'utf8')
    }, key);


    console.log(transactionA);
    // Transaction {
    //   format: 2,
    //   id: 'ReUohI9tEmXQ6EN9H9IkRjY9bSdgql_OdLUCOeMEte0',
    //   last_tx: 'Tk-0c7260Ya5zjfjzl4f6-W-vRO94qiqZMAScKBcYXc68v1Pd8bYfTbKWi7pepUF',
    //   owner: 'kmM4O08BJB85RbxfQ2nkka9VNO6Czm2Tc_IGQNYCTSXRzO...',
    //   tags: [],
    //   target: '',
    //   quantity: '0',
    //   data: 'c29tZSBkYXRh',
    //   data_size: '9',
    //   data_root: 'qwKZUl7qWpCEmB3cpONKTYOcSmnmhb-_s8ggMTZwCU4',
    //   data_tree: [],
    //   reward: '7489274',
    //   signature: 'JYdFPblDuT95ky7_wVss3Ax9e4Qygcd_lEcB07sDPUD_wNslOk...'
    // }
  </Example>

</Block>

<Block>

### Create a wallet to wallet transaction

Wallet to wallet transactions can facilitate payments from one wallet to another, given a target wallet and AR token quantity in Winston.

  <Example>
    let key = await blockweave.wallets.generate();

    // Send 10.5 AR to 1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY
    let transaction = await blockweave.createTransaction({
        target: '1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY',
        quantity: blockweave.ar.arToWinston('10.5')
    }, key);

    console.log(transaction);
    // Transaction {
    //   format: 2,
    //   id: 'v-n7hAc7cubeXSClh0beaOs1RjYFagyvpl2TkUOfbRg',
    //   last_tx: 'Tk-0c7260Ya5zjfjzl4f6-W-vRO94qiqZMAScKBcYXc68v1Pd8bYfTbKWi7pepUF',
    //   owner: 'kmM4O08BJB85RbxfQ2nkka9VNO6Czm2Tc_IGQNYCTSXRzOc6W9b...',
    //   tags: [],
    //   target: '1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY',
    //   quantity: '10500000000000',
    //   data: '',
    //   data_size: '0',
    //   data_root: '',
    //   data_tree: [],
    //   reward: '7468335',
    //   signature: 'DnUOYbRSkhI4ZXg5fpYDCwPv8yvM5toAneSx4Jlg0zjIocqPs8giPP...'
    // }
  </Example>

</Block>

<Block>

### Add tags to a transaction

Metadata can be added to transactions through tags, these are simple key/value attributes that can be used to document the contents of a transaction or provide related data.

<br/>

ARQL uses tags when searching for transactions.

<br/>

The `Content-Type` is a reserved tag and is used to set the data content type. For example, a transaction with HTML data and a content type tag of `text/html` will be served as a HTML page and render correctly in browsers, if the content type is set to `text/plain` then it will be served as a plain text document and not render in browsers.

  <Example>
    let key = await blockweave.wallets.generate();

    let transaction = await blockweave.createTransaction({
        data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>',
    }, key);

    transaction.addTag('Content-Type', 'text/html');
    transaction.addTag('key2', 'value2');

    console.log(transaction);
    // Transaction {
    //   format: 2,
    //   id: '',
    //   last_tx: 'Tk-0c7260Ya5zjfjzl4f6-W-vRO94qiqZMAScKBcYXc68v1Pd8bYfTbKWi7pepUF',
    //   owner: 'kmM4O08BJB85RbxfQ2nkka9VNO6Czm2Tc_IGQNYC...',
    //   tags: [
    //     Tag { name: 'Q29udGVudC1UeXBl', value: 'dGV4dC9odG1s' },
    //     Tag { name: 'a2V5Mg', value: 'dmFsdWUy' }
    //   ],
    //   target: '',
    //   quantity: '0',
    //   data: 'PGh0bWw-PGhlYWQ-PG1ldGEgY2hhcnNldD0iVVRGLTgiPjx0aXRsZT5IZWxsbyB3b3JsZCE8L3RpdGxlPjwvaGVhZD48Ym9keT48L2JvZHk-PC9odG1sPg',
    //   data_size: '88',
    //   data_root: 'GQunzmbwk2_JPU7oJOmLrTMvj8v_7BJaF0weyjVn5Nc',
    //   data_tree: [],
    //   reward: '7673074',
    //   signature: ''
    // }
  </Example>

</Block>

<Block>

### Sign a transaction

  <Example>
    let key = await blockweave.wallets.generate();

    let transaction = await blockweave.createTransaction({
        target: '1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY',
        quantity: blockweave.ar.arToWinston('10.5')
    }, key);

    await transaction.sign();

    console.log(transaction);
    // Transaction {
    //   format: 2,
    //   id: 'v-n7hAc7cubeXSClh0beaOs1RjYFagyvpl2TkUOfbRg',
    //   last_tx: 'Tk-0c7260Ya5zjfjzl4f6-W-vRO94qiqZMAScKBcYXc68v1Pd8bYfTbKWi7pepUF',
    //   owner: 'kmM4O08BJB85RbxfQ2nkka9VNO6Czm2Tc_IGQNYCTSXRzOc6W9b...',
    //   tags: [],
    //   target: '1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY',
    //   quantity: '10500000000000',
    //   data: '',
    //   data_size: '0',
    //   data_root: '',
    //   data_tree: [],
    //   reward: '7468335',
    //   signature: 'DnUOYbRSkhI4ZXg5fpYDCwPv8yvM5toAneSx4Jlg0zjIocqPs8giPP...'
    // }
  </Example>

</Block>

<Block>

### Submit a transaction

Submit transactions using `transaction.post()` which is suitable for small transactions or token transfers:

  <Example>
    let key = await blockweave.wallets.generate();

    let transaction = await blockweave.createTransaction({
        target: '1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY',
        quantity: blockweave.ar.arToWinston('10.5')
    }, key);

    // You can sign and post all in one.
    await transaction.signAndPost();

    // Or you can do both separately.
    await transaction.sign();
    const response = await transaction.post();

    console.log(response.status);
    // 200 : not to be confused with getStatus === 200, see note below**

    // HTTP response codes (200 - server received the transaction, 4XX - invalid transaction, 5XX - error)
  </Example>

__N.B__. The `200` response does not mean that the transaction has mined & confirmed, and that a txid can be used as if it's immutable. It just means that a node has received your transaction. See [Get a transaction status](###get-a-transaction-status) for more detail on how to correctly determine that your transaction has been mined & confirmed.

</Block>

<Block>

### Chunked uploading advanced options

You can resume an upload from a saved uploader object, that you have persisted in storage some using `JSON.stringify(uploader)` at any stage of the upload. To resume, parse it back into an object and pass it to `getUploader()` along with the transactions data.

  <Example>
    let data = fs.readFileSync('path/to/file.pdf'); // get the same data
    let resumeObject = JSON.parse(savedUploader); // get uploader object from where you stored it.

    let uploader = await blockweave.transactions.getUploader(resumeObject, data);
    while (!uploader.isComplete) {
      await uploader.uploadChunk();
    }
  </Example>

When resuming the upload, you must provide the same data as the original upload. When you serialize the uploader object with `JSON.stringify()` to save it somewhere, it will not include the data.

<br/>

You can also resume an upload from just the transaction ID and data, once it has been mined into a block. This can be useful if you didn't save the uploader somewhere but the upload got interrupted. This will re-upload all of the data from the beginning, since we don't know which parts have been uploaded.

  <Example>
    let data = fs.readFileSync('path/to/file.pdf'); // get the same data
    let resumeTxId = 'mytxid' // a transaction id for a mined transaction that didn't complete the upload.

    let uploader = await blockweave.transactions.getUploader(resumeTxId, data);
    while (!uploader.isComplete) {
      await uploader.uploadChunks();
      console.log(`${progress.pctComplete}% complete`);
    }
  </Example>

There is also an async iterator interface to chunk uploading, but this method means you'll need to ensure you are using a transpiler and polyfill for the asyncIterator symbol for some environments. (Safari on iOS in particular). This method takes the same arguments for uploading/resuming a transaction as `getUploader()` and just has a slightly shorter syntax.

  <Example>
    for await (const uploader of blockweave.transactions.upload(tx)) {
      console.log(`${uploader.pctComplete}% Complete`);
    }
    // done.
  </Example>

</Block>
