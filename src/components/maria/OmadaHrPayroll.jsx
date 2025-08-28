import { Link, useLocation } from "react-router";
import { FaRegCircleCheck } from "react-icons/fa6";
import omadaHrImg from "../../assets/maria/hr-payroll-hero-2.jpg";

const omadaHrFeat = [
  "ACOR Payroll manage employees salaries, wages, bonuses",
  "Runs Unlimited Payslips effectively",
  "Manages employee Time management",
  "Manages employee Holiday management",
  "Manage Employee Task",
  "Attendance Management",
  "Dedicated Staff Private Panel for Payslip Privacy",
  "Customized Payslip Design",
  "Print Payslip Multilanguage (16 Language)",
  "Unlimited Dedicated Training and support",
];

export default function OmadaHrPayroll() {
  const location = useLocation();

  const showBtn = location.pathname === "/";

  return (
    <section className="flex flex-col-reverse items-center gap-8 px-5 py-10 md:container md:mx-auto md:py-16 lg:flex-row lg:gap-16">
      <div className="flex justify-center lg:w-1/2">
        <img
          src={omadaHrImg}
          alt="acor payroll dashboard"
          loading="lazy"
          className="h-[390px] w-full rounded-xl object-cover lg:h-auto"
        />
      </div>
      <div className="lg:w-1/2">
        <h2 className="text-primary font-playfair text-4xl font-bold">
          Empower your workflow with{" "}
          <span className="text-primary underline underline-offset-[14px]">
            Acor Payroll
          </span>
        </h2>
        <ul className="my-10">
          {omadaHrFeat.map((detail, i) => (
            <li key={i} className="mb-2.5 flex items-center gap-3.5">
              <FaRegCircleCheck className="text-primary min-w-fit" />
              <span className="text-sm text-[#4B5563]">{detail}</span>
            </li>
          ))}
        </ul>
        {showBtn && (
          <button>
            <Link
              to="/omada-hr-payroll"
              className="bg-primary rounded px-6 py-3 font-medium text-white shadow-lg"
            >
              View Demo
            </Link>
          </button>
        )}
      </div>
    </section>
  );
}
