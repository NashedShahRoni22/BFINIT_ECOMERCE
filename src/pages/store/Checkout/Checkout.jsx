import codIcon from "../../../assets/icons/cod-icon.png";
import stripeIcon from "../../../assets/icons/stipe.png";

const paymentMethods = [
  {
    icon: codIcon,
    title: "Cash On Delivery",
    value: "cod",
  },
  {
    icon: stripeIcon,
    title: "Online Payment (Stripe)",
    value: "stripe",
  },
];

export default function Checkout() {
  return (
    <section className="px-5 py-10 md:container md:mx-auto md:px-0 md:py-20">
      <div>
        <h2>Payment Method</h2>

        <div className="inline-flex items-center gap-2 border">
          {paymentMethods.map((method, i) => (
            <div key={i}>
              <h4>{method.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
