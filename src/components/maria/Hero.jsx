import {
  LuCircleCheckBig,
  LuChevronRight,
  LuHeartHandshake,
} from "react-icons/lu";
import heroImg from "../../assets/maria/hero-2.jpg";
import { Link } from "react-router";

const keyBenefits = [
  "Automatic tax calculations",
  "Employee self-service portal",
  "Compliance management",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="bg-gradient-to-b from-[#eff6ff] to-white px-5 py-10 md:pt-32 md:pb-16"
    >
      <div className="md:container md:mx-auto">
        {/* label */}
        {/*   <div className="text-center">
          <div className="text-primary inline-flex items-center gap-1 rounded-full border border-[#D1D5DB] bg-[#FFF8F5] px-3 py-0.5 text-xs font-semibold tracking-wide uppercase">
            <LuHeartHandshake className="size-5" /> Specialized in women owned
            business
          </div>
        </div> */}

        {/* title */}
        <h1 className="text-primary font-playfair mt-4 w-full text-center text-4xl font-bold text-balance lg:text-6xl">
          Streamline Your Payroll & HR <br /> Management
        </h1>

        {/* overview */}
        <p className="mx-auto mt-5 w-full text-center text-lg text-[#4B5563]">
          Our cloud-based payroll and HR platform helps businesses of all sizes{" "}
          <br />
          automate payroll, manage benefits and ensure compliance with ease.
        </p>

        {/* buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
          <Link
            to="contact"
            className="bg-primary hover:bg-primary-hover inline-flex w-full items-center justify-center gap-2 rounded border border-transparent px-6 py-3.5 text-sm font-medium text-white transition-all duration-200 ease-linear md:w-fit"
          >
            Request Pricing <LuChevronRight className="size-4" />
          </Link>

          <Link
            to="#pricing"
            className="hover:border-primary-hover inline-flex w-full items-center justify-center gap-2 rounded border border-[#D1D5DB] px-6 py-3.5 text-sm font-medium text-[#374151] transition-all duration-200 ease-linear hover:underline md:w-fit"
          >
            View Pricing Details
          </Link>
        </div>

        {/* feats */}
        <div className="mt-12 hidden items-center justify-evenly md:flex">
          {keyBenefits.map((feat, i) => (
            <div key={i} className="flex items-center gap-2">
              <LuCircleCheckBig size={16} className="text-green-400" />
              <span className="text-sm text-[#4B5563]">{feat}</span>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 w-full max-w-3xl overflow-hidden">
          <img
            src={heroImg}
            alt="payslip image"
            className="h-auto max-h-96 w-full rounded-xl object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
