
export default interface ICheckboxProps {
    title: string;
    id:string;
    checked:boolean;
    onChange?: (isChecked: boolean) => {}
}