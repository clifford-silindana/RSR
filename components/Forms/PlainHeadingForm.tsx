import React, {useState} from 'react';
import {IDynamicFormProps} from "@/components/Forms/IDynamicFormProps";

const PlainHeadingForm: React.FC<IDynamicFormProps> = ({title, description, elements, onSubmit, prevFormStep, nextFormStep}) => {
    const [formData, setFormData] = useState<Record<string, string>>({});

    const [visible, setVisible] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        //const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const value = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: value,
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLInputElement>) => {
        const {name, value, type} = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
        //nextFormStep();
        setVisible(false);
    };

    return (
        <div className={visible ? "rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark" : "hidden" }>
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    {title}
                </h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                    {elements.map((element, index) => {
                        if (index % 2 == 0) {
                            const nextElement = elements[index + 1]; // Get the next element if it exists
                            return (
                                <div key={index} className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    {/* Render current element */}
                                    <div className="w-full xl:w-1/2">
                                        <label className="mb-3 block text-black dark:text-white">{element.label}</label>
                                        {element.type === 'text' && (
                                            <input
                                                type="text"
                                                name={element.name}
                                                placeholder={element.label}
                                                value={formData[element.name] as string}
                                                onChange={handleInputChange}
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            />
                                        )}
                                        {element.type === 'number' && (
                                            <input
                                                type="number"
                                                name={element.name}
                                                placeholder={element.label}
                                                value={formData[element.name] as string}
                                                onChange={handleInputChange}
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            />
                                        )}
                                        {element.type === 'file' && (
                                            <input
                                                type="file"
                                                name={element.name}
                                                placeholder={element.label}
                                                onChange={handleInputChange}
                                                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                            />)}

                                        {element.type === 'select' && (
                                            <div className="relative z-20 bg-white dark:bg-form-input">
                                                <select
                                                    name={element.name}
                                                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                    onChange={handleChange}
                                                    required={element.required}
                                                >
                                                    {element.options?.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                          <g opacity="0.8">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                fill="#637381"
                                            ></path>
                                          </g>
                                        </svg>
                                    </span>
                                            </div>
                                        )}
                                        {element.type === 'checkbox' && (
                                            <div className="mb-5.5">
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name={element.name}
                                                        checked={!!formData[element.name]}
                                                        onChange={handleChange}
                                                    />
                                                    <span
                                                        className="ml-2 text-sm font-medium text-black dark:text-white">
                                          {element.label}
                                        </span>
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                    {/* Render next element if it exists and is not the same as the current element */}
                                    {nextElement && nextElement !== element && (
                                        <div className="w-full xl:w-1/2">
                                            <label
                                                className="mb-3 block text-black dark:text-white">{nextElement.label}</label>
                                            {nextElement.type === 'text' && (
                                                <input
                                                    type="text"
                                                    name={nextElement.name}
                                                    placeholder={nextElement.label}
                                                    value={formData[nextElement.name] as string}
                                                    onChange={handleInputChange}
                                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                />
                                            )}
                                            {nextElement.type === 'number' && (
                                                <input
                                                    type="number"
                                                    name={nextElement.name}
                                                    placeholder={nextElement.label}
                                                    value={formData[nextElement.name] as string}
                                                    onChange={handleInputChange}
                                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                />
                                            )}
                                            {nextElement.type === 'file' && (
                                                <input
                                                    type="file"
                                                    name={nextElement.name}
                                                    placeholder={nextElement.label}
                                                    onChange={handleInputChange}
                                                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                                />)}
                                            {nextElement.type === 'select' && (
                                                <div className="relative z-20 bg-white dark:bg-form-input">
                                                    <select
                                                        name={nextElement.name}
                                                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                                        onChange={handleChange}
                                                        required={nextElement.required}
                                                    >
                                                        {nextElement.options?.map((option) => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                      <g opacity="0.8">
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                            fill="#637381"
                                                        ></path>
                                                      </g>
                                                    </svg>
                                                </span>
                                                </div>
                                            )}
                                            {nextElement.type === 'checkbox' && (
                                                <div className="mb-5.5">
                                                    <label className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name={nextElement.name}
                                                            checked={!!formData[nextElement.name]}
                                                            onChange={handleChange}
                                                        />
                                                        <span
                                                            className="ml-2 text-sm font-medium text-black dark:text-white">
                                          {nextElement.label}
                                        </span>
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        return null;
                    })}
                    <div className="flex justify-end mt-4">
                        <button onClick={prevFormStep} disabled={true}
                                className="rounded bg-strokedark p-3 font-medium text-gray mr-4.5">
                            &laquo; Back
                        </button>
                        <button
                            className="flex justify-center rounded bg-primary py-3 px-3 font-medium text-gray hover:bg-opacity-95"
                            type="submit"
                        >
                            Next &raquo;
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PlainHeadingForm;
