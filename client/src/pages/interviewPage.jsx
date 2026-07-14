import React, { useState } from 'react';
// Standardized import names to match the exact component definitions
import Step1SetUp from "../components/Step1SetUp";
import Step2Interview from '../components/Step2Interview';
import Step3Report from "../components/Step3Report";

function InterviewPage() {
    const [step, setStep] = useState(1);
    const [interviewData, setInterviewData] = useState(null);

    // Added reset handler so users can take another interview from the report page
    const handleReset = () => {
        setInterviewData(null);
        setStep(1);
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            {step === 1 && (
                <Step1SetUp 
                    onStart={(data) => {
                        setInterviewData(data);
                        setStep(2);
                    }}
                />
            )}
            
            {step === 2 && (
                <Step2Interview 
                    interviewData={interviewData}
                    onFinish={(report) => {
                        setInterviewData(report);
                        setStep(3);
                    }}
                />
            )}
            
            {step === 3 && (
                <Step3Report 
                    report={interviewData} 
                    onActionComplete={handleReset} // Pass down the restart handler here
                />
            )}
        </div>
    );
}

export default InterviewPage;