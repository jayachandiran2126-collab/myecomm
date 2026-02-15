import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Smartphone, Building2 } from 'lucide-react';

interface CardPaymentFormProps {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  cardName: string;
  setCardName: (value: string) => void;
  expiryDate: string;
  setExpiryDate: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
}

export const CardPaymentForm: React.FC<CardPaymentFormProps> = ({
  cardNumber,
  setCardNumber,
  cardName,
  setCardName,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
}) => {
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="h-5 w-5 text-primary" />
        <span className="font-semibold text-card-foreground">Card Details</span>
        <div className="flex gap-2 ml-auto">
          <img src="https://img.icons8.com/color/32/visa.png" alt="Visa" className="h-6" />
          <img src="https://img.icons8.com/color/32/mastercard.png" alt="Mastercard" className="h-6" />
          <img src="https://img.icons8.com/color/32/rupay.png" alt="RuPay" className="h-6" />
        </div>
      </div>
      
      <div>
        <Label htmlFor="cardNumber" className="text-card-foreground">Card Number</Label>
        <Input
          id="cardNumber"
          type="text"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          maxLength={19}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="cardName" className="text-card-foreground">Name on Card</Label>
        <Input
          id="cardName"
          type="text"
          placeholder="JOHN DOE"
          value={cardName}
          onChange={(e) => setCardName(e.target.value.toUpperCase())}
          className="mt-1"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiryDate" className="text-card-foreground">Expiry Date</Label>
          <Input
            id="expiryDate"
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
            maxLength={5}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="cvv" className="text-card-foreground">CVV</Label>
          <Input
            id="cvv"
            type="password"
            placeholder="•••"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
            maxLength={4}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

interface UPIPaymentFormProps {
  upiId: string;
  setUpiId: (value: string) => void;
}

export const UPIPaymentForm: React.FC<UPIPaymentFormProps> = ({ upiId, setUpiId }) => {
  return (
    <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Smartphone className="h-5 w-5 text-primary" />
        <span className="font-semibold text-card-foreground">UPI Payment</span>
        <div className="flex gap-2 ml-auto">
          <img src="https://img.icons8.com/color/32/google-pay-india.png" alt="GPay" className="h-6" />
          <img src="https://img.icons8.com/color/32/phonepe.png" alt="PhonePe" className="h-6" />
          <img src="https://img.icons8.com/color/32/paytm.png" alt="Paytm" className="h-6" />
        </div>
      </div>
      
      <div>
        <Label htmlFor="upiId" className="text-card-foreground">UPI ID</Label>
        <Input
          id="upiId"
          type="text"
          placeholder="yourname@upi"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="mt-1"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Enter your UPI ID (e.g., yourname@paytm, yourname@oksbi)
        </p>
      </div>

      <div className="bg-accent/10 p-3 rounded-lg">
        <p className="text-sm text-card-foreground">
          You will receive a payment request on your UPI app. Approve it to complete the order.
        </p>
      </div>
    </div>
  );
};

interface NetBankingFormProps {
  selectedBank: string;
  setSelectedBank: (value: string) => void;
}

const popularBanks = [
  { id: 'sbi', name: 'State Bank of India', icon: '🏦' },
  { id: 'hdfc', name: 'HDFC Bank', icon: '🏦' },
  { id: 'icici', name: 'ICICI Bank', icon: '🏦' },
  { id: 'axis', name: 'Axis Bank', icon: '🏦' },
  { id: 'kotak', name: 'Kotak Mahindra Bank', icon: '🏦' },
  { id: 'pnb', name: 'Punjab National Bank', icon: '🏦' },
  { id: 'bob', name: 'Bank of Baroda', icon: '🏦' },
  { id: 'canara', name: 'Canara Bank', icon: '🏦' },
];

export const NetBankingForm: React.FC<NetBankingFormProps> = ({ selectedBank, setSelectedBank }) => {
  return (
    <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="h-5 w-5 text-primary" />
        <span className="font-semibold text-card-foreground">Net Banking</span>
      </div>
      
      <div>
        <Label className="text-card-foreground mb-3 block">Select Your Bank</Label>
        <div className="grid grid-cols-2 gap-2">
          {popularBanks.map((bank) => (
            <button
              key={bank.id}
              type="button"
              onClick={() => setSelectedBank(bank.id)}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedBank === bank.id
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:border-primary/50 text-card-foreground'
              }`}
            >
              <span className="text-sm font-medium">{bank.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-accent/10 p-3 rounded-lg">
        <p className="text-sm text-card-foreground">
          You will be redirected to your bank's secure website to complete the payment.
        </p>
      </div>
    </div>
  );
};

export const CODInfo: React.FC = () => {
  return (
    <div className="p-4 bg-muted/50 rounded-lg border border-border animate-fade-in">
      <div className="bg-accent/10 p-4 rounded-lg">
        <h4 className="font-semibold text-card-foreground mb-2">Cash on Delivery</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Pay with cash when your order arrives</li>
          <li>• Additional ₹40 COD charges may apply</li>
          <li>• Please keep exact change ready</li>
          <li>• Available for orders up to ₹50,000</li>
        </ul>
      </div>
    </div>
  );
};
