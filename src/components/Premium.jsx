import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "DevTinder",
      description: "Connect to other developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex flex-wrap gap-6 justify-center m-10 p-6">
      {/* Silver */}
      <div className="w-full max-w-sm bg-gradient-to-b from-gray-200 to-gray-300 rounded-2xl shadow-lg overflow-hidden border border-gray-300 flex flex-col">
        <div className="flex-1 flex flex-col justify-between p-6">
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-800">Silver</h2>
              <span className="text-xl font-semibold text-gray-700">₹149</span>
            </div>
            <ul className="mt-6 flex flex-col gap-3 text-sm text-gray-700">
              <li>✔️ Valid for 3 months</li>
              <li>✔️ Free chat</li>
              <li>✔️ 100 connection requests</li>
              <li>✔️ Blue tick</li>
            </ul>
          </div>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-primary btn-block mt-6"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Gold */}
      <div className="w-full max-w-sm bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-2xl shadow-lg overflow-hidden border border-yellow-400 flex flex-col">
        <div className="flex-1 flex flex-col justify-between p-6">
          <div>
            <span className="badge badge-warning mb-2">Most Popular</span>
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-yellow-800">Gold</h2>
              <span className="text-xl font-semibold text-yellow-700">
                ₹199
              </span>
            </div>
            <ul className="mt-6 flex flex-col gap-3 text-sm text-yellow-900">
              <li>✔️ Valid for 9 months</li>
              <li>✔️ Free chat</li>
              <li>✔️ 300 connection requests</li>
              <li>✔️ Blue tick</li>
            </ul>
          </div>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-primary btn-block mt-6"
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Diamond */}
      <div className="w-full max-w-sm bg-gradient-to-b from-cyan-100 to-cyan-300 rounded-2xl shadow-lg overflow-hidden border border-cyan-300 flex flex-col">
        <div className="flex-1 flex flex-col justify-between p-6">
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-cyan-800">Diamond</h2>
              <span className="text-xl font-semibold text-cyan-700">₹499</span>
            </div>
            <ul className="mt-6 flex flex-col gap-3 text-sm text-cyan-900">
              <li>✔️ Valid for 12 months</li>
              <li>✔️ Free chat</li>
              <li>✔️ Infinite connection requests</li>
              <li>✔️ Blue tick</li>
              <li>💎 Premium support</li>
            </ul>
          </div>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-primary btn-block mt-6"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
