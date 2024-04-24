import {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

// import {  useSession } from "next-auth/react";
import api from "@/common/api";
import config from "@/common/config.json";
import useSession from "@/hooks/useSession";
import useOperator from "@/hooks/useOperator";

interface TFormData {
  step1: {};
  step2: {};
  step3: {};
  step4: {};
  step5: {};
  step6: {};
  step7: {};
  step8: {};
  step9: {};
  step10: {};
  step11: {};
}

interface TOperatorData {
  companyName: string;
  companyRegistrationNumber: string;
  nominatedManagerName: string;
  headOfOrganizationName: string;
}

interface IFormContext {
  onHandleNext: () => void;
  onHandleBack: () => void;
  onHandleGoTo: (step: number) => void;
  step: number;
  formData: TFormData;
  setFormData: Dispatch<SetStateAction<TFormData>>;
  isComplete: boolean | undefined;
  setIsComplete: Dispatch<SetStateAction<boolean | undefined>>;
  operatorData: TOperatorData;
}

interface IProp {
  children: ReactNode;
}

const FormContext = createContext<IFormContext>({
  onHandleNext: () => { },
  onHandleBack: () => { },
  onHandleGoTo: (step: number) => { },
  step: 1,
  formData: {},
  setFormData: () => { },
  isComplete: undefined, // Providing an initial value for isComplete
  setIsComplete: () => { },
  operatorData: {
    companyName: "",
    companyRegistrationNumber: "",
    nominatedManagerName: "",
    headOfOrganizationName: "",
  },
});

export const FormProvider = ({ children }: IProp) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<TFormData>({});

  const [operatorData, setOperatorData] = useState<TOperatorData>({
    companyName: "",
    companyRegistrationNumber: "",
    nominatedManagerName: "",
    headOfOrganizationName: "",
  });

  const [isComplete, setIsComplete] = useState<boolean | undefined>(false);
  const { session } = useSession();
  const { updateApplication } = useOperator();
  
  useEffect(() => {
    const fetchOperator = async () => {
      if (session?.user) {
        try {          
          const { data: operator } = await api.get(
            `${config.GET_OPERATOR_BY_ID}?operatorId=${session.user.operatorId}`,
            {
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );

          if (operator) {
            
            //console.log(operator);
            // const { registrationNumber, name: nameOfCompany } = operator;
            const registrationNumber = operator.registrationNumber;
            const nameOfCompany = operator.name;
            const nominatedManagerName = "";
            const headOfOrganizationName = "";
            setOperatorData({
              companyRegistrationNumber: registrationNumber,
              companyName: nameOfCompany,
              nominatedManagerName: nominatedManagerName,
              headOfOrganizationName: headOfOrganizationName,
            });
          } else {
            //console.log("Operator Not found", operator);
          }
        } catch (error) {
          //console.log("Error with the axios request", error);
        }
      }
    };
    fetchOperator();
  }, [session?.user, setOperatorData]);

  async function onHandleNext() {
        
    //const applicationJson =  { applicationJson: JSON.stringify(formData) };
    //await updateApplication(applicationJson);
    setStep((prevValue) => prevValue + 1);
    //console.log("save to local storage ", formData);
  }

  function onHandleBack() {
    setStep((prevValue) => prevValue - 1);
  }

  function onHandleGoTo(step: number) {
    setStep(step);
  }

  const contextValue: IFormContext = {
    onHandleNext,
    onHandleBack,
    step,
    formData,
    setFormData,
    isComplete,
    setIsComplete,
    onHandleGoTo,
    operatorData,
  };

  // //console.log(operatorData);

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export const useFormState = () => {
  return useContext(FormContext);
};
