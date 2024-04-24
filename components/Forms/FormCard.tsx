import React, { ReactNode } from 'react';

interface FormCardProps {
    children: ReactNode;
    currentStep: number;
    showTwoColumns: boolean;
    prevFormStep: () => void;
}

const FormCard: React.FC<FormCardProps> = ({ children, currentStep, prevFormStep,showTwoColumns }) => {
    return (
        <div className={showTwoColumns === true ?  "grid grid-cols-2 gap-9" : "grid grid-cols-1 gap-9"} >
            <div className="flex flex-col gap-9">
               <div className="mt-9">
                   {children}
               </div>
            </div>
        </div>
    );
};

export default FormCard;
