import Accordion from './Accordion';



const faqs = [
  {
    question: "How does the queue system work?",
    answer: "Our smart queue system tracks appointment times in real-time and sends you notifications when your turn is approaching. You'll know exactly when to arrive at the clinic.",
  },
  {
    question: "Is my health information secure?",
    answer: "Yes, we take privacy seriously. All data is encrypted and your health information is never shared without your explicit consent.",
  },
  {
    question: "Can I cancel or reschedule appointments?",
    answer: "Absolutely! You can cancel or reschedule appointments anytime through the app, up to 2 hours before your scheduled time.",
  },
  {
    question: "Do I need to pay to use Fibula?",
    answer: "Fibula is completely free for patients. You only pay your normal consultation fees to the healthcare providers.",
  },
  {
    question: "What if my doctor doesn’t use Fibula?",
    answer: "We're constantly expanding our network of doctors. You can suggest Fibula to your doctor, or search for other highly-rated doctors in your area who are already on our platform.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-6">Frequently Asked <span className="gradient-text">Questions</span></h2>
        <p className="text-lg text-gray-400 mb-12">Everything you need to know about Fibula</p>

        <div className="max-w-4xl mx-auto">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
