import {
  Users,
  FileText,
  DollarSign,
  Clock,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

export const featuresList = [
  {
    title: "Payroll Processing",
    description:
      "Automate your payroll calculations, tax withholdings, and direct deposits with just a few clicks.",
    icon: DollarSign,
  },
  {
    title: "Tax Management",
    description:
      "Automate tax calculations, filings, and payments to ensure compliance with federal, state, and local regulations.",
    icon: FileText,
  },
  {
    title: "Time & Attendance",
    description:
      "Track employee hours, manage PTO requests, and integrate with your payroll system seamlessly.",
    icon: Clock,
  },
  {
    title: "HR Management",
    description:
      "Streamline employee onboarding, manage personnel records, and automate HR workflows.",
    icon: Users,
  },
  {
    title: "Reporting & Analytics",
    description:
      "Access real-time reports and insights to make informed business decisions about your workforce.",
    icon: BarChart3,
  },
  {
    title: "Compliance Management",
    description:
      "Stay compliant with changing regulations with automatic updates and compliance monitoring.",
    icon: ShieldCheck,
  },
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-10 px-5 py-10 md:py-16">
      <div className="md:container md:mx-auto">
        <h2 className="text-primary font-playfair text-center text-4xl font-bold">
          All-in-One HR & Payroll Solution
        </h2>
        <p className="mx-auto mt-4 w-full max-w-2xl text-center text-pretty text-[#4B5563]">
          Our comprehensive platform handles everything from payroll processing
          to employee management, time tracking and compliance.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuresList.map((feat, index) => (
            <div
              key={index}
              className="group rounded-lg border border-[#E5E7EB] p-8 duration-200 ease-linear"
            >
              <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-lg">
                {<feat.icon size={24} className="text-primary" />}
              </div>
              <h3 className="text-primary mt-4 text-lg font-bold text-balance">
                {feat.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#4B5563]">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
