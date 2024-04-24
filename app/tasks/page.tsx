
"use client"
import FormCard from "@/components/Forms/FormCard";
import DetailsOfApplicants from "@/components/Forms/DetailsOfApplicants";
import { useState } from "react";
import HeadOfficePhysicalAddress from "@/components/Forms/HeadOfficePhysicalAddress";

const TaskDetails = () => {
    const handleFormSubmit = (formData: any) => {
    };
    const [formStep, setFormStep] = useState(0);
    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
    return (<>
        {/*        <FormCard showTwoColumns={true} currentStep={formStep} prevFormStep={prevFormStep}>
            <DetailsOfApplicants formStep={formStep} nextFormStep={nextFormStep}
                                 onDataSubmit={handleFormSubmit}/>

            <HeadOfficePhysicalAddress prevFormStep={prevFormStep} onDataSubmit={handleFormSubmit}
                                       formStep={1} nextFormStep={nextFormStep}
                                       title={"Head Office Physical Address"}
                                       addressLabel={"Physical Address"} showNavigation={false}/>

            <HeadOfficePhysicalAddress prevFormStep={prevFormStep} onDataSubmit={handleFormSubmit}
                                       formStep={2} nextFormStep={nextFormStep}
                                       title="Head Office Postal Address" addressLabel={"Postal Address"}
                                       showNavigation={true}/>
        </FormCard>*/}



    </>)
}

export default TaskDetails;