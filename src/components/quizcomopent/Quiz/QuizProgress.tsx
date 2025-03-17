interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

const QuizProgress = ({ currentStep, totalSteps }: QuizProgressProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>
          Question {currentStep + 1} of {totalSteps}
        </span>
        <span>
          {Math.round(((currentStep + 1) / totalSteps) * 100)}% complete
        </span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-in-out"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default QuizProgress;
