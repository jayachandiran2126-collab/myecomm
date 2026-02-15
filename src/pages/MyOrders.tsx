import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MyOrders: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:5000/orders/${user.id}`)
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) return <p className="text-center mt-20">Login to view orders</p>;

  return (
    <div className="min-h-screen flex flex-col bg-green+100">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-2xl font-bold text-black mb-6">My Orders</h1>

        {loading && <p>Loading...</p>}

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-xl shadow">
              <div className="flex justify-between text-black font-semibold">
                <span>Order #{order.id}</span>
                <span>{new Date(order.created_at).toLocaleString()}</span>
              </div>

              <p className="mt-2 text-black">
                Payment: {order.payment_method}
              </p>

              <p className="text-black">
                Shipping: {order.address}, {order.city}
              </p>

              <div className="flex justify-between font-bold text-black mt-4">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyOrders;