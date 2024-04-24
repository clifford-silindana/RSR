import Image from "next/image";
import { Product } from "@/types/product";

const productData: any[] = [
  {
    ID: 1,
    Condition: "The management of railway safety resides with the permit holder and cannot be delegated or transferred.",
    DueDate: ""
  },
  {
    ID: 2,
    Condition: "Payment of the Safety Permit Fee upon receipt of an invoice from the Regulator.",
    DueDate: ""
  },
  {
    ID: 3,
    Condition: "Submission of an application for renewal of a Safety Permit at least 90 days prior to the expiry of the permit.",
    DueDate: ""
  }
];

const TableTwo = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">

      <div className="grid grid-cols-6 border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">

        <div className="col-span-1 flex items-center">
          <p className="font-medium"> </p>
        </div>
        <div className="col-span-5 flex items-center">
          <p className="font-medium">Condition</p>
        </div>

      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-7 auto-cols-max border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.ID}
            </p>
          </div>
          <div className="col-span-5 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.Condition}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
