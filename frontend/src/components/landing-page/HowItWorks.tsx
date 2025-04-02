import { FaUserPlus, FaRobot, FaHandshake } from "react-icons/fa";
import { IconBaseProps } from "react-icons";

const steps = [
  {
    id: 1,
    title: "Create a Profile",
    description: "Define your skills, goals, and interests to get started.",
    icon: (props: IconBaseProps) => <FaUserPlus {...props} />,
  },
  {
    id: 2,
    title: "Get Matched",
    description: "Our AI suggests the best co-founders based on compatibility.",
    icon: (props: IconBaseProps) => <FaRobot {...props} />,
  },
  {
    id: 3,
    title: "Connect & Build",
    description: "Start networking and collaborating with your perfect match.",
    icon: (props: IconBaseProps) => <FaHandshake {...props} />,
  },
];

const HowItWorks = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center py-16">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-gray-900">
          How It Works
        </h2>
        <p className="text-gray-600 mt-4">
          Find your perfect co-founder in three simple steps.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md transition-transform transform hover:scale-105"
            >
              <step.icon className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
              <p className="text-gray-600 text-center mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
