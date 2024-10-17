import React from 'react';
import {SafeAreaView, View, ImageBackground} from 'react-native';
import {MenuProvider} from 'react-native-popup-menu';
import {styles} from '../styles';
import {ModalComponents} from './ModalComponents';
import {Header} from './Header';
import {MnemonicView} from './MnemonicView';
import {MainContent} from './MainContent';
import {useWallet} from '../hooks/useWallet';
import {useModalState} from '../hooks/useModalState';

export const MainAppContent: React.FC = () => {
  const {
    started,
    nodeInfo,
    balance,
    onChainAddress,
    channels,
    walletService,
    buildNode,
    onChainBalance,
    newOnchainAddress,
    openChannel,
    listChannels,
    closeChannel,
    receiveBolt11Payment,
  } = useWallet();

  const modalState = useModalState();

  const handleMenuItemCallback = async (
    index: number,
    channelIndex: number,
  ) => {
    modalState.setSelectedPaymentIndex(index);
    if (index > 0) {
      modalState.setShowPaymentModal(true);
    } else {
      await closeChannel(channelIndex);
    }
  };

  const handleReceiveBolt11Payment = async (amount: string) => {
    const generatedInvoice = await receiveBolt11Payment(amount);
    if (generatedInvoice !== undefined) {
      modalState.setInvoice(generatedInvoice);
      modalState.setShowReceiveModal(false);
      modalState.setReceiveAmount('');
      modalState.setShowInvoiceModal(true);
    }
  };

  return (
    <MenuProvider>
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <View style={styles.container}>
          {!started ? (
            <MnemonicView buildNodeCallback={buildNode} />
          ) : (
            <MainContent
              balance={balance}
              nodeInfo={nodeInfo}
              onChainAddress={onChainAddress}
              onChainBalance={onChainBalance}
              newOnchainAddress={newOnchainAddress}
              openReceiveModal={() => modalState.setShowReceiveModal(true)}
              listChannels={listChannels}
              channels={channels || []}
              openChannelModal={() => modalState.setShowChannelModal(true)}
              handleMenuItemCallback={handleMenuItemCallback}
            />
          )}
        </View>
        <ModalComponents
          {...modalState}
          node={walletService.getNode()}
          closeReceiveModal={() => {
            modalState.setReceiveAmount('');
            modalState.setShowReceiveModal(false);
          }}
          closeInvoiceModal={() => modalState.setShowInvoiceModal(false)}
          closeChannelModal={() => modalState.setShowChannelModal(false)}
          closePaymentModal={() => modalState.setShowPaymentModal(false)}
          handleReceive={handleReceiveBolt11Payment}
          openChannelCallback={openChannel}
        />
      </SafeAreaView>
    </MenuProvider>
  );
};
