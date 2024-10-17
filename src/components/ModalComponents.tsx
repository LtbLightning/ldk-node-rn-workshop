import React from 'react';
import {ReceiveModal} from './ReceiveModal';
import {InvoiceModal} from './InvoiceModal';
import {OpenChannelModal} from './OpenChannelModal';
import {PaymentModal} from './PaymentModal';
import {Node} from 'ldk_node';

interface ModalComponentsProps {
  showReceiveModal: boolean;
  showInvoiceModal: boolean;
  showChannelModal: boolean;
  showPaymentModal: boolean;
  receiveAmount: string;
  invoice: string;
  selectedPaymentIndex: number;
  node: Node | undefined;
  closeReceiveModal: () => void;
  closeInvoiceModal: () => void;
  closeChannelModal: () => void;
  closePaymentModal: () => void;
  handleReceive: (amount: string) => Promise<void>;
  openChannelCallback: (params: any) => Promise<void>;
}

export const ModalComponents: React.FC<ModalComponentsProps> = ({
  showReceiveModal,
  showInvoiceModal,
  showChannelModal,
  showPaymentModal,
  receiveAmount,
  invoice,
  selectedPaymentIndex,
  node,
  closeReceiveModal,
  closeInvoiceModal,
  closeChannelModal,
  closePaymentModal,
  handleReceive,
  openChannelCallback,
}) => {
  return (
    <>
      <ReceiveModal
        visible={showReceiveModal}
        amount={receiveAmount}
        onClose={closeReceiveModal}
        onReceive={handleReceive}
      />
      <InvoiceModal
        visible={showInvoiceModal}
        onClose={closeInvoiceModal}
        invoice={invoice}
      />
      {showChannelModal && (
        <OpenChannelModal
          openChannelCallback={openChannelCallback}
          cancelCallback={closeChannelModal}
        />
      )}
      {showPaymentModal && (
        <PaymentModal
          index={selectedPaymentIndex}
          hide={closePaymentModal}
          node={node}
        />
      )}
    </>
  );
};
