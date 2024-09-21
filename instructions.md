# Instructions

This workshop focuses on building the functionalities of a basic Lightning Network node/wallet using React Native and the `ldk_node` library. Generally, a Lightning wallet is seen as a spending wallet since it enables instant and low-fee payments, but it has some operational considerations different from a regular on-chain wallet.

## Starting point

### Head start

The UI components, state management, and necessary controllers have already been implemented to save time. Your task will be to integrate and update the existing code with the `ldk_node` functionality.

#### Lightning Development Kit (LDK)

A lot goes into creating a full Lightning Network node, so luckily for us, an implementation for a full functional node build with the [Lightning Development Kit](https://lightningdevkit.org) is available in another library called [LDK Node](https://github.com/lightningdevkit/ldk-node).

To add LDK Node to an app, you can simply run `yarn add ldk-node` or add `ldk_node": "git+https://github.com/LtbLightning/ldk-node-rn.git` to the dependencies in the `package.json` file of your project manually:

```yaml
dependencies:
  # Other dependencies...
  ldk_node: ^0.2.2-dev
```

> [!NOTE]
> If you cloned this repository, the `ldk_node` package is already added to the dependencies in the [`package.json`](./package.json) file and is ready to be used.

> [!NOTE]
> The minSdkVersion in the [`android/app/build.gradle`](./android/app/build.gradle) file is also changed to 23 already. Also the iOS platform version in [`ios/Podfile`](./ios/Podfile) is set to 14.0. These are the minimum versions required by the `ldk_node` package to work.

### Run the app

Start the app to make sure the provided code is working. You should see the user interface of the app, but it is based on hardcoded data and does not really permits you to do much yet.

### Environment Setup

Ensure that you have the following set up:

- **React Native** environment
- **ldk_node** package installed (via `npm` or `yarn`)
- Configure Android/iOS versions with appropriate SDK configurations.

For iOS, ensure the iOS platform version is set to 12.0 and for Android, the minSdkVersion is 23 in the build configuration.

## Key Functionalities

### 1. Setting up the Lightning Node

The Lightning Node is the backbone of this application. The `buildNode` function initializes the node using a mnemonic for key generation, sets the Esplora server, the Rapid Gossip Sync source, and configures Just-in-Time (JIT) channels.

- **Mnemonic**: A new mnemonic is generated or provided by the user.
- **Esplora server**: This is set to `https://mutinynet.ltbl.io/api`.
- **RGS**: Rapid Gossip Sync is set to `https://mutinynet.ltbl.io/snapshot` for faster syncing.
- **JIT channels**: LSPS2 JIT channel functionality is configured to allow receiving payments even without inbound liquidity.

```typescript
const buildNode = async (mnemonic: string) => {
  const builder = await new Builder().fromConfig(config);

  await builder.setEntropyBip39Mnemonic(mnemonic);
  await builder.setEsploraServer('https://mutinynet.ltbl.io/api');
  await builder.setGossipSourceRgs('https://mutinynet.ltbl.io/snapshot');
  await builder.setLiquiditySourceLsps2(
    '44.219.111.31:39735',
    '0371d6fd7d75de2d0372d03ea00e8bacdacb50c27d0eaea0a76a0622eff1f5ef2b',
    'JZWN9YLW',
  );

  const nodeObj: Node = await builder.build();
  await nodeObj.start();
};
```

### 2. Generating a New Wallet

To generate a new Lightning wallet, a mnemonic is either provided by the user or auto-generated. This mnemonic is then used to initialize the node.

```typescript
export const MnemonicView = ({
  buildNodeCallback,
}: {
  buildNodeCallback: Function;
}) => {
  const [mnemonic, setMnemonic] = useState('');

  return (
    <View>
      <Text>Enter Mnemonic</Text>
      <TextInput multiline value={mnemonic} onChangeText={setMnemonic} />
      <Button title="Start Node" onPress={() => buildNodeCallback(mnemonic)} />
    </View>
  );
};
```

### 3. Opening a Channel

Users can open a Lightning channel using the `OpenChannelModal`. The user must provide the necessary details (nodeId, IP address, port, and amounts) to open the channel.

```typescript
export const OpenChannelModal = ({openChannelCallback, cancelCallback}) => {
  const [channelDetails, setChannelDetails] = useState({
    nodeId: '',
    ip: '',
    port: '',
    amount: '',
    counterPartyAmount: '',
  });

  const updateDetails = (key: any, value: any) => {
    setChannelDetails(prev => ({...prev, [key]: value}));
  };

  return (
    <ModalView>
      <TextInput
        placeholder="Node ID"
        onChangeText={e => updateDetails('nodeId', e)}
      />
      <TextInput
        placeholder="IP Address"
        onChangeText={e => updateDetails('ip', e)}
      />
      <TextInput
        placeholder="Port"
        onChangeText={e => updateDetails('port', e)}
      />
      <TextInput
        placeholder="Amount in sats"
        onChangeText={e => updateDetails('amount', e)}
      />
      <TextInput
        placeholder="Counterparty Amount"
        onChangeText={e => updateDetails('counterPartyAmount', e)}
      />
      <Button
        title="Submit"
        onPress={() => openChannelCallback(channelDetails)}
      />
    </ModalView>
  );
};
```

### 4. Sending and Receiving Payments

Payments are handled through the `PaymentModal`. Users can either send or receive payments. The `receiveViaJitChannel` method is used to ensure payments can be received even without inbound liquidity.

```typescript
const handleReceive = async (amount: string) => {
  if (node && amount) {
    const invoice = await node.receiveViaJitChannel(
      satsToMsats(parseInt(amount, 10)),
      'test',
      3600,
    );
    console.log('Invoice generated:', invoice);
  }
};
```

### 5. Invoice Generation

When generating invoices, the `handleReceiveBolt11Payment` method creates a BOLT11 invoice. For JIT channels, `receiveViaJitChannel` is invoked.

```typescript
const handleReceiveBolt11Payment = async (amount: string) => {
  const invoice = await node.receiveViaJitChannel(
    satsToMsats(parseInt(amount, 10)),
    'test',
    3600,
  );
  setInvoice(JSON.stringify(invoice));
};
```

### 6. Rapid Gossip Sync (RGS)

Everytime you (re)start a Lightning node, it needs to sync and verify the latest channel graph data of the network (commonly referred to as "gossip") to know the current state of the Lightning Network and how to route payments.
This can take a couple of minutes, which on a mobile phone, where the app and thus node is started and stopped frequently, can be a bit annoying when you want to make a payment quickly.

One solution that is applied by some mobile Lightning Network node wallets today is not having the gossip data on the device, but instead offloading the calculation of routing payments to a server. This approach however has some downsides, like privacy concerns, since the server will know all the payments of its users, and the need to trust the server to not manipulate the route calculation.

A better solution is to use a Rapid Gossip Sync server. This server serves a compact snapshot of the gossip network that can be used to bootstrap a node. This way the node can directly start with a recent snapshot of the network graph and calculate routes itself, without the need to pass payment recipient information to a server.

To learn more about Rapid Gossip Sync and its intricacies, check out the [docs](https://lightningdevkit.org/blog/announcing-rapid-gossip-sync/).

LDK Node already has all the Rapid Gossip Sync client functionality implemented as you can see in the original [rust-lightning code](https://github.com/lightningdevkit/rust-lightning/blob/main/lightning-rapid-gossip-sync/src/lib.rs).

We just need to use it in our app by configuring the url of the Rapid Gossip Sync server we want to use. There are a couple of LSPs that provide Rapid Gossip Sync servers. Here are some examples for different networks you can use for development:

- https://mutinynet.ltbl.io/snapshot for the Mutinynet Signet
- https://testnet.ltbl.io/snapshot for Testnet
- https://rapidsync.lightningdevkit.org/snapshot for Mainnet

Now add the url of the network you want to use to the node builder function:

```typescript
await builder.setGossipSourceRgs('https://mutinynet.ltbl.io/snapshot');
```

If you now run the app and compare the printed logs to the logs when no RGS is used, you should see a significant improvement in the time it takes to sync the network graph and see that in just the seconds of the node starting up, it has up to date information about a lot of nodes and channels. This gives the node the information it needs to calculate routes for payments itself, without having sync some minutes at every startup, and also without having to pass private payment recipient information to a third party to offload the routing calculations, as some wallets do. With RGS, the node can do it all itself, privately and quickly.

### 7. JIT channels with LSPS2

The next feature we will implement is the Just-In-Time (JIT) channels with LSPS2. This feature allows a wallet to receive a Lightning payment without having inbound liquidity yet. The LSP will open a zero-conf channel when a payment for the wallet reaches the node of the LSP and pass the payment through this channel. So the channel is created just in time when it is needed as the name suggests. A fee is generally deducted from the amount by the LSP for this service.

Various Liquidity Service Providers and Lightning wallets and developers are working on an open standard for this feature called [LSPS2](https://github.com/BitcoinAndLightningLayerSpecs/lsp/tree/main/LSPS2). Having a standard for this feature will make it easier for wallets to integrate with different LSPs and for LSPs to provide this service to different wallets, without the need for custom integrations for each wallet-LSP pair. This gives users more choice and competition in the market.

LDK Node already has the LSPS2 client functionality implemented and we can again just use it in our app by configuring the LSPS2 compatible LSP we want to use.

### 8. Just-In-Time (JIT) Channels

JIT channels enable receiving payments without pre-existing inbound liquidity.

```typescript
await node.receiveViaJitChannel(satsToMsats(amount), 'Payment Memo', 3600);
```

### 9. `onChainBalance`

This function retrieves the total on-chain balance of the node's wallet.

```typescript
const onChainBalance = async () => {
  await node?.syncWallets();
  const balance = await node?.totalOnchainBalanceSats();
  console.log('On-chain balance:', balance);
};
```

### 10. `newOnchainAddress`

This function generates a new on-chain address for receiving funds.

```typescript
const newOnchainAddress = async () => {
  let addr = await node?.newOnchainAddress();
  console.log('New on-chain address:', addr?.addressHex);
};
```

### 11. `openChannelCallback`

This function opens a new Lightning channel by providing necessary parameters such as the node ID, IP address, and amounts.

```typescript
const openChannelCallback = async (params: ChannelParams) => {
  const addr = new NetAddress(params.ip, parseInt(params.port));
  let opened = await node?.connectOpenChannel(
    params.nodeId,
    addr,
    parseInt(params.amount),
    satsToMsats(parseInt(params.counterPartyAmount)),
    null,
    true,
  );
  console.log('Channel opened:', opened);
};
```

### 12. `listChannels`

This function lists all currently open Lightning channels.

```typescript
const listChannels = async () => {
  const list = await node?.listChannels();
  console.log('Channels:', list);
};
```

### 13. `handleReceive`

This function generates a BOLT11 invoice for receiving payments via Just-in-Time (JIT) channels.

```typescript
const handleReceive = async (amount: string) => {
  const invoice = await node.receiveViaJitChannel(
    satsToMsats(parseInt(amount, 10)),
    'Test Memo',
    150,
  );
  console.log('Invoice generated:', invoice);
};
```

### 14. `testChannelConfig`

This function sets specific channel configurations, including forwarding fees and cltv expiry delta.

```typescript
const testChannelConfig = async () => {
  let channelConfig = await new ChannelConfig().create();
  await channelConfig.setAcceptUnderpayingHtlcs(true);
  await channelConfig.setCltvExpiryDelta(150);
  await channelConfig.setForwardingFeeBaseMsat(4000);
  console.log('Channel config set:', channelConfig);
};
```

### 15. Utility Functions: `satsToMsats` and `mSatsToSats`

These utility functions are used to convert between different units (satoshis and millisatoshis).

```typescript
export const satsToMsats = (sats: number) => sats * 1000;
export const mSatsToSats = (mSats: number) => mSats / 1000 + 'sats';
```

## Additional Resources

These are the main functions and their roles in managing a Lightning Network node using the React Native app.

### 9. `Button`

This is a customizable button component for UI interactions.

```typescript
export const Button = ({loading, style, title, ...rest}) => {
  return (
    <TouchableOpacity style={{...styles.btn, ...style}} {...rest}>
      <Text style={{color: 'white', fontSize: 17}}>{title}</Text>
    </TouchableOpacity>
  );
};
```

### 10. `Header`

This is the header component that displays the logos and title of the app.

```typescript
export const Header = () => {
  return (
    <View
      style={{
        ...styles.row,
        paddingHorizontal: 25,
        marginTop: Platform.OS === 'ios' ? -20 : 0,
      }}>
      <Image
        source={require('./assets/reactnative_logo.png')}
        style={styles.img}
        resizeMode="contain"
      />
      <Text style={{fontWeight: '700', fontSize: 15, textAlign: 'center'}}>
        {'Demo App \n Ldk Node RN Workshop'}
      </Text>
      <Image source={require('./assets/ldk_logo.png')} style={styles.img} />
    </View>
  );
};
```

### 11. `IconButton`

This component renders a small button with customizable styles, mainly used for actions like 'Send', 'Receive', etc.

```typescript
export const IconButton = ({onPress, title, style, disabled}) => {
  return (
    <TouchableOpacity
      style={{...styles.smallButton, ...style}}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}>
      <Text style={{color: disabled ? '#7F8C8D' : 'black'}}>{title}</Text>
    </TouchableOpacity>
  );
};
```

### 12. `ModalView`

This component handles modal popups used in the application for dialogs and user input.

```typescript
export const ModalView = props => {
  return (
    <Modal transparent={true}>
      <View style={styles.modelContainer}>
        <View style={styles.modalView}>{props.children}</View>
      </View>
    </Modal>
  );
};
```

### 13. `BoxRow`

This component is used to display a key-value pair in the form of a box row, often used to show node information.

```typescript
export const BoxRow = ({title, value, color}) => {
  return (
    <View style={styles.boxRow}>
      <Text
        style={{
          ...styles.boldNormal,
          color: color ?? 'black',
        }}>{`${title}: `}</Text>
      <Text selectable style={{color: color ?? 'black', fontSize: 12}}>
        {value}
      </Text>
    </View>
  );
};
```

### 14. `InvoiceModal`

This component displays a modal with the generated Lightning invoice.

```typescript
export const InvoiceModal = ({visible, onClose, invoice}) => {
  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.invoiceModal}>
          <Text style={styles.title}>Invoice</Text>
          <Text selectable style={[styles.invoiceText, {textAlign: 'left'}]}>
            {invoice}
          </Text>
          <Button style={styles.fullWidthBtn} title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};
```

### 15. `ReceiveModal`

This modal component handles receiving payments via Lightning Network, allowing the user to input the amount.

```typescript
export const ReceiveModal = ({visible, onClose, onReceive}) => {
  const [amount, setAmount] = useState('');

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View style={styles.receiveModal}>
          <Text style={styles.title}>Receive via Lightning</Text>
          <TextInput
            style={styles.input}
            placeholder="Amount in sats"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <Button
            style={styles.fullWidthBtn}
            title={amount.length === 0 ? 'Close' : 'Receive'}
            onPress={() => {
              Keyboard.dismiss();
              onReceive(amount);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
```

---

## What's next?

After successfully implementing the Lightning wallet, you can experiment with additional functionalities such as payment history and real-time updates.
