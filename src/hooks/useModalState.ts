import {useState} from 'react';

export const useModalState = () => {
  const [showChannelModal, setShowChannelModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(0);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoice, setInvoice] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');

  return {
    showChannelModal,
    setShowChannelModal,
    showPaymentModal,
    setShowPaymentModal,
    selectedPaymentIndex,
    setSelectedPaymentIndex,
    showReceiveModal,
    setShowReceiveModal,
    showInvoiceModal,
    setShowInvoiceModal,
    invoice,
    setInvoice,
    receiveAmount,
    setReceiveAmount,
  };
};
