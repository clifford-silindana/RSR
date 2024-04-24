import {IFormElement} from "@/components/Forms/IFormElement";

export interface IDynamicFormProps {
    title: string;
    description: string;
    elements: IFormElement[];
    onSubmit: (formData: Record<string, string>) => void;
    nextFormStep?: () => void;
    prevFormStep?: () => void;
}