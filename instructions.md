
# Instructions

This workshop focuses on building the functionalities of a basic Lightning Network node/wallet using React Native and the `ldk_node` library. Generally, a Lightning wallet is seen as a spending wallet since it enables instant and low-fee payments, but it has some operational considerations different from a regular on-chain wallet.

## Starting point

### Head start

The UI components, state management, and necessary controllers have already been implemented to save time. Your task will be to integrate and update the existing code with the `ldk_node` functionality.

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
export const MnemonicView = ({ buildNodeCallback }: { buildNodeCallback: Function }) => {
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
export const OpenChannelModal = ({ openChannelCallback, cancelCallback }) => {
  const [channelDetails, setChannelDetails] = useState({
    nodeId: '',
    ip: '',
    port: '',
    amount: '',
    counterPartyAmount: '',
  });

  const updateDetails = (key: any, value: any) => {
    setChannelDetails(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ModalView>
      <TextInput placeholder="Node ID" onChangeText={e => updateDetails('nodeId', e)} />
      <TextInput placeholder="IP Address" onChangeText={e => updateDetails('ip', e)} />
      <TextInput placeholder="Port" onChangeText={e => updateDetails('port', e)} />
      <TextInput placeholder="Amount in sats" onChangeText={e => updateDetails('amount', e)} />
      <TextInput placeholder="Counterparty Amount" onChangeText={e => updateDetails('counterPartyAmount', e)} />
      <Button title="Submit" onPress={() => openChannelCallback(channelDetails)} />
    </ModalView>
  );
};
```

### 4. Sending and Receiving Payments

Payments are handled through the `PaymentModal`. Users can either send or receive payments. The `receiveViaJitChannel` method is used to ensure payments can be received even without inbound liquidity.

```typescript
const handleReceive = async (amount: string) => {
  if (node && amount) {
    const invoice = await node.receiveViaJitChannel(satsToMsats(parseInt(amount, 10)), 'test', 3600);
    console.log('Invoice generated:', invoice);
  }
};
```

### 5. Invoice Generation

When generating invoices, the `handleReceiveBolt11Payment` method creates a BOLT11 invoice. For JIT channels, `receiveViaJitChannel` is invoked.

```typescript
const handleReceiveBolt11Payment = async (amount: string) => {
  const invoice = await node.receiveViaJitChannel(satsToMsats(parseInt(amount, 10)), 'test', 3600);
  setInvoice(JSON.stringify(invoice));
};
```

### 6. Rapid Gossip Sync (RGS)

RGS is used to sync the Lightning Network graph quickly, improving the startup performance of your node.

```typescript
await builder.setGossipSourceRgs('https://mutinynet.ltbl.io/snapshot');
```

### 7. Just-In-Time (JIT) Channels

JIT channels enable receiving payments without pre-existing inbound liquidity.

```typescript
await node.receiveViaJitChannel(satsToMsats(amount), 'Payment Memo', 3600);
```

---

## What's next?

After successfully implementing the Lightning wallet, you can experiment with additional functionalities such as payment history and real-time updates.
