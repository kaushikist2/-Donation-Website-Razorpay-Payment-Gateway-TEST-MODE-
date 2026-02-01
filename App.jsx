import React, { useState } from "react";
import { Heart, PawPrint, Trash2 } from "lucide-react";

const causes = [
  {
    id: 1,
    name: "Rescue & Emergency Care",
    price: 1500,
    image: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
  },
  {
    id: 2,
    name: "Food & Nutrition",
    price: 1000,
    image: "https://images.unsplash.com/photo-1601758064226-0c3c4f0b07b2",
  },
  {
    id: 3,
    name: "Shelter & Warmth",
    price: 2000,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
  },
];

export default function AnimalShelterWebsite() {
  const [cart, setCart] = useState([]);
  const [showDonate, setShowDonate] = useState(false);

  const addDonation = (cause) => {
    setCart([...cart, cause]);
    setShowDonate(true);
  };

  const removeDonation = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_1234567890", // Razorpay TEST key
      amount: total * 100,
      currency: "INR",
      name: "PawCare Animal Shelter",
      description: "Animal Welfare Donation (Test Mode)",
      handler: function (response) {
        alert("Thank you for helping our animals! Payment ID: " + response.razorpay_payment_id);
        setCart([]);
        setShowDonate(false);
      },
      theme: { color: "#14532d" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* HERO */}
      <section className="px-6 py-20 text-center bg-gradient-to-b from-emerald-900 to-neutral-950">
        <PawPrint size={48} className="mx-auto mb-4 text-emerald-300" />
        <h1 className="text-4xl font-bold mb-4">PawCare Animal Shelter</h1>
        <p className="max-w-xl mx-auto text-neutral-300">
          We rescue, treat, and protect abandoned animals. Your donation gives
          them food, shelter, and a second chance at life.
        </p>
        <button
          onClick={() => setShowDonate(true)}
          className="mt-8 bg-white text-black px-8 py-3 rounded-full font-medium"
        >
          Donate Now
        </button>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-16 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">Why Your Help Matters</h2>
        <p className="text-neutral-400">
          Thousands of animals are abandoned every year. PawCare works with
          volunteers and vets to rescue injured animals, provide medical care,
          and help them find loving homes.
        </p>
      </section>

      {/* CAUSES */}
      <section className="px-6 py-16">
        <h2 className="text-3xl font-semibold text-center mb-10">Support a Cause</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {causes.map((cause) => (
            <div
              key={cause.id}
              className="bg-neutral-900 rounded-2xl overflow-hidden shadow-lg"
            >
              <img src={cause.image} className="h-56 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{cause.name}</h3>
                <p className="mt-2 font-bold">₹{cause.price}</p>
                <button
                  onClick={() => addDonation(cause)}
                  className="mt-4 w-full bg-white text-black py-2 rounded-xl"
                >
                  Donate
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DONATION SUMMARY */}
      {showDonate && (
        <section className="px-6 py-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Donation Summary</h2>

          {cart.length === 0 && (
            <p className="text-neutral-400">No donations selected yet.</p>
          )}

          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-neutral-400">₹{item.price}</p>
              </div>
              <button
                onClick={() => removeDonation(index)}
                className="text-red-400"
              >
                <Trash2 />
              </button>
            </div>
          ))}

          {cart.length > 0 && (
            <div className="mt-6">
              <p className="text-lg font-semibold">Total: ₹{total}</p>
              <button
                onClick={handlePayment}
                className="mt-4 w-full bg-white text-black py-2 rounded-xl font-medium"
              >
                Donate via Razorpay (Test Mode)
              </button>
            </div>
          )}
        </section>
      )}

      {/* FOOTER */}
      <footer className="text-center py-10 text-neutral-400 text-sm">
        Built with ❤ for animals • React + Tailwind • Razorpay Test Integration
      </footer>
    </div>
  );
}
