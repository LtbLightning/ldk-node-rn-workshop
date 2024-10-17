import {Builder, Config, Node} from 'ldk_node';
import {
  ChannelDetails,
  NetAddress,
  PublicKey,
} from 'ldk_node/lib/classes/Bindings';
import RNFS from 'react-native-fs';
import {Platform} from 'react-native';
import {addressToString} from 'ldk_node/lib/utils';
import {satsToMsats} from '../utils';
import {ChannelParams} from '../types';

let docDir =
  RNFS.DocumentDirectoryPath + '/NEW_LDK_NODE/' + `${Platform.Version}/`;
let host = Platform.OS === 'ios' ? '0.0.0.0' : '0.0.0.0';
let esploraServer = `https://mutinynet.ltbl.io/api`;

export class WalletService {
  private node: Node | undefined;

  async buildNode(
    mnemonic: string,
  ): Promise<{nodeId: string; listeningAddress: string}> {
    // TODO: Implement the buildNode method
    // 1. Set up configuration:
    //    - Define storage path (use RNFS.DocumentDirectoryPath)
    //    - Set network to 'signet'
    //    - Configure listening address (use Platform.OS to determine host and port)
    // 2. Create and configure the node builder:
    //    - Set esplora server
    //    - Set gossip source
    //    - Set entropy BIP39 mnemonic
    //    - Configure LSP (Lightning Service Provider)
    // 3. Build and start the node
    // 4. Return the node ID and listening address
  }

  async getOnChainBalance(): Promise<number | undefined> {
    // TODO: Implement the getOnChainBalance method
    // 1. Check if the node is initialized
    // 2. Sync the node's wallets
    // 3. Retrieve and return the total on-chain balance in satoshis
    // 4. Handle potential errors
  }

  async getNewOnchainAddress(): Promise<string | undefined> {
    // TODO: Implement the getNewOnchainAddress method
    // 1. Check if the node is initialized
    // 2. Generate a new on-chain address using the node
    // 3. Return the address as a hex string
    // 4. Handle potential errors
  }

  async openChannel(params: ChannelParams): Promise<void> {
    // TODO: Implement the openChannel method
    // 1. Check if the node is initialized
    // 2. Create a NetAddress from the provided IP and port
    // 3. Call the node's connectOpenChannel method with:
    //    - Node ID
    //    - NetAddress
    //    - Channel amount in satoshis
    //    - Push amount to counterparty in millisatoshis
    //    - Channel configuration (null for default)
    //    - Announce channel flag (true)
    // 4. Handle potential errors
  }

  async listChannels(): Promise<Array<ChannelDetails> | undefined> {
    // TODO: Implement the listChannels method
    // 1. Check if the node is initialized
    // 2. Return the list of channels from the node
    // 3. Handle potential errors
  }

  async closeChannel(
    channelId: string,
    counterpartyNodeId: string,
  ): Promise<void> {
    // TODO: Implement the closeChannel method
    // 1. Check if the node is initialized
    // 2. Call the node's closeChannel method with:
    //    - Channel ID (as an object with channelIdHex property)
    //    - Counterparty node ID
    // 3. Handle potential errors
  }

  async receiveBolt11Payment(amount: string): Promise<string | undefined> {
    // TODO: Implement the receiveBolt11Payment method
    // 1. Check if the node is initialized
    // 2. Convert amount from satoshis to millisatoshis
    // 3. Generate a BOLT11 invoice using the node's receiveViaJitChannel method:
    //    - Amount in millisatoshis
    //    - Description (e.g., 'test')
    //    - Expiry time in seconds (e.g., 3600 for 1 hour)
    // 4. Return the generated invoice
    // 5. Handle potential errors
  }

  getNode(): Node | undefined {
    return this.node;
  }
}
