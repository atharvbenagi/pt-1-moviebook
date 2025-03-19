import React from 'react';
import { Check, Clock, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookingStepsProps {
  currentStep: number;
}

export const BookingSteps: React.FC<BookingStepsProps> = ({ currentStep }) => {
  const steps = [
    { icon: Clock, label: 'Select Time' },
    { icon: Check, label: 'Choose Seats' },
    { icon: CreditCard, label: 'Payment' },
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = currentStep > index + 1;
          const isCurrent = currentStep === index + 1;

          return (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`mt-2 text-sm ${
                    isCurrent ? 'text-blue-600 font-medium' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              </motion.div>
              {index < steps.length - 1 && (
                <div
                  className={`w-20 h-1 mx-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};