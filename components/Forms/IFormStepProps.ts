export default interface IFormStepProps {
    onDataSubmit: (data: any) => void;
    formStep: number;
    nextFormStep: () => void;
}
