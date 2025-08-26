import { Link } from "react-router";

const pricingPlans = [
  {
    title: "Bronze Package",
    overview: "Core payroll essentials for businesses operating in one state.",
    price: "$45.00",
    perEmployee: "$3 each employee",
    billingCycle: "monthly",
    scope: "Single state",
    includesContractors: true,
    features: ["Direct deposit", "Employee portal"],
    highlight: false,
  },
  {
    title: "Silver Package",
    overview:
      "Advanced payroll with time tracking, hiring/onboarding, and basic benefits.",
    price: "$60.00",
    perEmployee: "$6 each employee",
    billingCycle: "monthly",
    scope: "Multi state",
    includesContractors: true,
    features: [
      "Direct deposit",
      "Employee portal",
      "Time tracking",
      "Hiring & onboarding",
      "Employee benefits offered",
    ],
    highlight: true,
  },
  {
    title: "Gold Package",
    overview:
      "Comprehensive multi-state payroll plus onboarding, benefits, and HR-ready tools.",
    price: "$125.00",
    perEmployee: "$10 each employee",
    billingCycle: "monthly",
    scope: "Multi state",
    includesContractors: true,
    features: [
      "Direct deposit",
      "Employee portal",
      "Time tracking",
      "Hiring & onboarding",
      "Employee benefits offered",
    ],
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-10 bg-[#F9FAFB] py-10 md:py-16">
      <div className="md:container md:mx-auto">
        <h2 className="text-primary font-playfair text-center text-4xl font-bold">
          Simple, Transparent Pricing
        </h2>
        <p className="mx-auto mt-4 w-full max-w-2xl text-center text-pretty text-[#4B5563]">
          Choose the plan that fits your business needs. All plans include core
          payroll processing and tax filing.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`text-primary relative rounded-lg border bg-white p-6 shadow-sm ${
                plan.highlight
                  ? "border-custom-blue border-2"
                  : "border-gray-200"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[#C3E9D6] px-4 py-1 text-sm font-semibold">
                  BEST VALUE
                </div>
              )}
              <h3 className="text-primary text-lg font-bold">{plan.title}</h3>
              <p className="mt-2 text-sm text-balance text-[#4B5563]">
                {plan.overview}
              </p>

              <div className="mt-4 flex flex-col items-baseline gap-2 md:flex-row">
                <span className="text-primary text-3xl font-bold">
                  {plan.price}/mo
                </span>
                <span className="text-sm text-gray-500">
                  {plan.perEmployee}
                </span>
              </div>

              <Link
                to="/"
                className={`border-custom-blue text-primary mt-6 block w-full rounded-full border px-4 py-2 text-center text-sm font-medium transition-all duration-200 ease-linear active:scale-95 ${plan.highlight ? "bg-primary hover:bg-primary-hover text-white" : "bg-white hover:bg-teal-50"}`}
              >
                Get started
              </Link>

              <ul className="mt-6 space-y-2 text-sm text-gray-600">
                {/* Core scope info */}
                <li className="flex items-start">
                  <span className="text-custom-blue mr-2">•</span>
                  {plan.scope}
                </li>
                {plan.includesContractors && (
                  <li className="flex items-start">
                    <span className="text-custom-blue mr-2">•</span>
                    Includes Contractors
                  </li>
                )}
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-custom-blue mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
