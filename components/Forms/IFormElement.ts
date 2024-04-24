export interface IFormElement {
    type: 'text' | 'select' | 'checkbox' | 'number' | 'file';
    label: string;
    name: string;
    required: boolean;
    options?: { value: string; label: string }[];
}