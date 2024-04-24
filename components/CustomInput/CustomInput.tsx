import React from 'react';

const CustomInput = ({ value, placeholder }) => {
    return (

                <input
                    value={value}
                    placeholder={placeholder}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                     />
    )
};

export default CustomInput