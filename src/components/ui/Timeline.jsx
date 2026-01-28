import React from 'react';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

const Timeline = ({ currentStep }) => {
    const steps = [
        { id: 'Published', label: 'Published' },
        { id: 'Open', label: 'Open' },
        { id: 'Review', label: 'Under Review' },
        { id: 'Awarded', label: 'Awarded' },
    ];

    const getStepStatus = (stepId) => {
        const stepIndex = steps.findIndex(s => s.id === stepId);
        const currentIndex = steps.findIndex(s => s.id === currentStep);

        if (stepIndex < currentIndex) return 'completed';
        if (stepIndex === currentIndex) return 'active';
        return 'pending';
    };

    return (
        <div className="w-full py-4">
            <div className="flex items-center justify-between relative">
                {/* Connector Line */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-100 -z-10" />

                {steps.map((step, index) => {
                    const status = getStepStatus(step.id);
                    return (
                        <div key={step.id} className="flex flex-col items-center bg-white px-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors
                                ${status === 'completed' ? 'bg-green-100 border-green-500 text-green-600' :
                                    status === 'active' ? 'bg-blue-100 border-blue-500 text-blue-600' :
                                        'bg-gray-50 border-gray-300 text-gray-300'
                                }`}>
                                {status === 'completed' ? <CheckCircle className="h-5 w-5" /> :
                                    status === 'active' ? <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse" /> :
                                        <Circle className="h-5 w-5" />}
                            </div>
                            <span className={`text-xs mt-2 font-medium ${status === 'active' ? 'text-blue-600' :
                                    status === 'completed' ? 'text-green-600' : 'text-gray-400'
                                }`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Timeline;
