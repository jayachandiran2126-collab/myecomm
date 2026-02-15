import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import {
  ShoppingBag,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  Truck,
  Shield,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";

const Checkout: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [upiId, setUpiId] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingCost = total > 999 ? 0 : 99;
  const tax = Math.round(total * 0.18);
  const grandTotal = total + shippingCost + tax;

  const validateForm = () => {
    if (!fullName.trim()) return toast.error("Enter full name"), false;
    if (!email.includes("@")) return toast.error("Invalid email"), false;
    if (phone.length < 10) return toast.error("Invalid phone"), false;
    if (!address.trim()) return toast.error("Enter address"), false;
    if (!city.trim()) return toast.error("Enter city"), false;
    if (!state.trim()) return toast.error("Enter state"), false;
    if (pincode.length !== 6) return toast.error("Invalid pincode"), false;
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    if (!user?.id) return toast.error("Login first");

    setIsProcessing(true);

    try {
      await axios.post("http://localhost:5000/orders", {
        userId: user.id,
        customer: { name: fullName, email, phone },
        shippingAddress: { address, city, state, pincode },
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        paymentMethod,
        pricing: {
          subtotal: total,
          shippingCost,
          tax,
          codCharges: 0,
          grandTotal,
        },
      });

      clearCart();
      toast.success("Order placed successfully!");
      navigate("/order-success");
    } catch {
      toast.error("Order failed");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!items.length) {
    return (
      <div className="min-h-screen flex flex-col bg-green+100">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-black" />
            <h2 className="text-xl font-bold text-black">Cart is empty</h2>
            <Button onClick={() => navigate("/")} className="mt-4">
              Shop Now
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-1">
        <Button variant="ghost" onClick={() => navigate("/cart")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>

        <div className="grid lg:grid-cols-3 gap-6 mt-4">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-bold text-black flex gap-2">
                <Truck /> Shipping Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <Input value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="Full Name" />
                <Input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
                <Input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone" />
                <Input value={pincode} onChange={(e)=>setPincode(e.target.value)} placeholder="Pincode" />
              </div>

              <Textarea className="mt-4" value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Address" />

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <Input value={city} onChange={(e)=>setCity(e.target.value)} placeholder="City" />
                <Input value={state} onChange={(e)=>setState(e.target.value)} placeholder="State" />
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-lg font-bold text-black mb-4">Payment Method</h2>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                {[
                  { v: "card", icon: CreditCard, label: "Card" },
                  { v: "upi", icon: Smartphone, label: "UPI" },
                  { v: "netbanking", icon: Building2, label: "Net Banking" },
                  { v: "cod", icon: Wallet, label: "Cash on Delivery" },
                ].map(({ v, icon: Icon, label }) => (
                  <label key={v} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${paymentMethod === v ? "border-black bg-gray-100" : "border-gray-300"}`}>
                    <RadioGroupItem value={v} />
                    <Icon className="h-4 w-4 text-black" />
                    <span className="text-black">{label}</span>
                  </label>
                ))}
              </RadioGroup>

              {paymentMethod === "upi" && (
                <Input className="mt-4" placeholder="Enter UPI ID" value={upiId} onChange={(e)=>setUpiId(e.target.value)} />
              )}

              {paymentMethod === "netbanking" && (
                <select className="mt-4 border p-2 rounded w-full" value={selectedBank} onChange={(e)=>setSelectedBank(e.target.value)}>
                  <option value="">Select Bank</option>
                  <option>SBI</option>
                  <option>HDFC</option>
                  <option>ICICI</option>
                  <option>PNB</option>
                </select>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white p-6 rounded-xl shadow sticky top-4">
            <h2 className="text-lg font-bold text-black mb-4">Order Summary</h2>

            <div className="flex justify-between text-black">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between text-black">
              <span>Tax</span>
              <span>₹{tax}</span>
            </div>

            <div className="flex justify-between text-black font-bold mt-4 text-lg">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>

            <Button onClick={handlePlaceOrder} disabled={isProcessing} className="w-full mt-6">
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>

            <p className="text-xs text-center mt-3 text-gray-600 flex justify-center gap-1">
              <Shield className="h-4 w-4" /> Secure Payment
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;