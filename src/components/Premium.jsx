import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState, useEffect } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/premium/verify`, { withCredentials: true });
      setIsUserPremium(res.data.isPremium || false);
    } catch (err) {
      console.error("Error verifying premium user:", err);
    }
  };

  const handleBuyClick = async (type) => {
    if (isUserPremium) return;

    try {
      const order = await axios.post(
        `${BASE_URL}/api/payment/create`,
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = order.data;
      const options = {
        key: keyId,
        amount,
        currency,
        name: "DevTinder",
        description: "Connect with other developers",
        order_id: orderId,
        prefill: {
          name: `${notes.firstName} ${notes.lastName}`,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: { color: "#6366F1" },
        handler: () => verifyPremiumUser(),
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error("Error creating payment:", err);
    }
  };

  const planCard = (title, price, benefits, gradient, isPopular = false) => (
    <div
      className={`w-full max-w-sm rounded-2xl shadow-lg overflow-hidden border border-gray-700 flex flex-col text-white transform transition hover:scale-105 ${gradient}`}
    >
      <div className="flex-1 flex flex-col justify-between p-6">
        <div>
          {isPopular && (
            <span className="inline-block px-3 py-1 mb-3 text-sm font-semibold rounded-full bg-yellow-400 text-gray-900">
              Most Popular
            </span>
          )}
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">{title}</h2>
            <span className="text-xl font-semibold">{price}</span>
          </div>
          <ul className="mt-6 flex flex-col gap-3 text-sm">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-green-400 font-bold">✔️</span> {b.replace(/^✔️ /, "")}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => handleBuyClick(title.toLowerCase())}
          className={`btn btn-primary btn-block mt-6 py-3 rounded-lg font-semibold ${
            isUserPremium ? "bg-gray-600 cursor-not-allowed hover:bg-gray-600" : ""
          }`}
          disabled={isUserPremium}
        >
          {isUserPremium ? "Already Premium" : "Subscribe"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-6 justify-center m-10 p-6">
      {isUserPremium && (
        <div className="w-full text-center mb-6 text-green-400 font-bold text-xl">
          🎉 You are a Premium Member!
        </div>
      )}

      {planCard(
        "Silver",
        "₹149",
        ["Valid for 3 months", "Free chat", "100 connection requests", "Blue tick"],
        "bg-gradient-to-b from-gray-700 to-gray-800"
      )}

      {planCard(
        "Gold",
        "₹199",
        ["Valid for 9 months", "Free chat", "300 connection requests", "Blue tick"],
        "bg-gradient-to-b from-yellow-600 to-yellow-700",
        true
      )}

      {planCard(
        "Diamond",
        "₹499",
        ["Valid for 12 months", "Free chat", "Infinite connection requests", "Blue tick", "Premium support"],
        "bg-gradient-to-b from-cyan-600 to-cyan-700"
      )}
    </div>
  );
};

export default Premium;
