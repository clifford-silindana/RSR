import TableTwo from "@/components/Tables/TableTwo";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";


interface SummaryProps {
    selectedItem: number,
    heading: string
}

const safetyPermitDescriptions: string[] = [
    "Existing Class A, B or C safety permit expiring this financial year ",
    "Temporary Safety Permit holder needing a safety permit ",
    "Construction train and safety permit holder needing a safety permit ",
    "Testing and Commissioning train safety permit holder needing a safety permit ",
    "New Application - first time a safety permit is applied for ",
    "New permit needed due to company name change ",
    "New permit needed due to legal entity change ",
    "New permit needed - taking over an entity in possession of a current safety permit ",
];
const randomCheckedIndex = Math.floor(Math.random() * safetyPermitDescriptions.length);

const BottomBarButtons = () => {
    return (
        <div className="pl-7 pr-7 pb-7">
            <div className="flex justify-between ">
                <div className="flex gap-4.5 ">
                    <button
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="submit"
                    >
                        Print
                    </button>
                    <button
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="submit"
                    >
                        Print SMS
                    </button>
                    <button
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="submit"
                    >
                        Print ASIP
                    </button>
                </div>
                <div className="flex gap-4.5">
                    <button
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="submit"
                    >
                        &laquo; Back
                    </button>
                    <button
                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95"
                        type="submit"
                    >
                        Next &raquo;
                    </button>
                </div>
            </div>
        </div>
    )
}
const PermitSummary = ({selectedItem, heading}: SummaryProps) => {
    return (<>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {selectedItem === 0 && (
                <>
                    {/* Safety Permit Holder Particulars Form Details*/}
                    <div className="border-b border-stroke bg-gray py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Safety Permit Holder Particulars
                        </h3>
                    </div>
                    <div className="p-7">
                        <form action="#">
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    >
                                        Permit Number
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        disabled={true}
                                        defaultValue="+990 3343 7865"
                                    />
                                </div>

                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    >
                                        Company Trade Name
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        disabled={true}
                                        defaultValue="+990 3343 7865"
                                    />
                                </div>
                            </div>
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    >
                                        Company Legal Name
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        disabled={true}
                                        defaultValue="+990 3343 7865"
                                    />
                                </div>

                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    >
                                        Company Registration Number
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        disabled={true}
                                        defaultValue="+990 3343 7865"
                                    />
                                </div>
                            </div>

                            <div className="mb-5.5">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                >
                                    Registered Address
                                </label>
                                <textarea
                                    className="w-full rounded border border-stroke bg-white py-3 px-4.5  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    rows={4}
                                    disabled={true}
                                    readOnly={true}
                                    defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere fermentum urna, eu condimentum mauris tempus ut. Donec fermentum blandit aliquet."
                                ></textarea>
                            </div>

                        </form>
                    </div>
                    {/*Safety Permit particulars Form Details*/}
                    <div className="border-t border-b bg-gray border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Safety Permit Particulars
                        </h3>
                    </div>
                    <div className="p-7">
                        <form action="#">
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    >
                                        Issue Date
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        disabled={true}
                                        defaultValue="+990 3343 7865"
                                    />
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    >
                                        Valid From
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        disabled={true}
                                        defaultValue="+990 3343 7865"
                                    />
                                </div>
                            </div>
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    >
                                        Valid Until
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        disabled={true}
                                        defaultValue="+990 3343 7865"
                                    />
                                </div>

                                <div className="w-full sm:w-1/2">

                                </div>
                            </div>
                        </form>
                    </div>
                    {/*ASIP Assessment Outcome Form Details*/}
                    <div className="border-t border-b bg-gray border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            ASIP Assessment Outcome
                        </h3>
                    </div>
                    <div className="p-7">
                        <form action="#">
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    >
                                        ASIP Assessment Outcome Letter
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        disabled={true}
                                        defaultValue="+990 3343 7865"
                                    />
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    >
                                        Outcome Letter Issue From
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        disabled={true}
                                        defaultValue="+990 3343 7865"
                                    />
                                </div>
                            </div>
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    >
                                        Outcome Letter Issue To
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        disabled={true}
                                        defaultValue="+990 3343 7865"
                                    />
                                </div>

                                <div className="w-full sm:w-1/2">

                                </div>
                            </div>
                        </form>
                    </div>
                    {/*General Conditions*/}
                    <div className="border-t border-b bg-gray border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            General Conditions
                        </h3>
                    </div>
                    <div className="p-7">
                        <TableTwo/>
                    </div>
                    {/*Special Conditions*/}
                    <div className="border-t border-b bg-gray border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Special Conditions
                        </h3>
                    </div>
                    <div className="p-7">
                        <TableTwo/>
                    </div>
                    {/*Sidings*/}
                    <div className="border-t border-b bg-gray border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Sidings
                        </h3>
                    </div>
                    <div className="p-7">
                        <TableTwo/>
                    </div>
                    <BottomBarButtons/>
                </>
            )}

            {
                selectedItem === 1 && (
                    <>
                        <div className="border-b border-stroke bg-gray py-4 px-7 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                {selectedItem}. {heading}
                            </h3>
                            <p className="text-base font-light text-black dark:text-white"> Provide the information
                                requested below and select the appropriate option where
                                applicable.</p>
                        </div>
                        {safetyPermitDescriptions.map((description, index) => (
                            <div className="pl-7 pr-7 pt-6" key={index}>
                                <div className="flex justify-stretch">
                                    <p className={index === randomCheckedIndex ? "text-sm font-medium text-primary pr-2" : "text-sm font-medium text-black dark:text-white pr-2"}>
                                        {`1. ${index + 1} ${description} `}
                                    </p>
                                    {index === randomCheckedIndex && (
                                        <CheckboxTwo
                                            checked={true}
                                            id={`checkbox_${index}`}
                                            title={""}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                        <div className="pl-7 pr-7 pt-6">
                            <form action="#">
                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        >
                                            1.9 Current permit number
                                        </label>
                                        <input
                                            className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            disabled={true}
                                            defaultValue="+990 3343 7865"
                                        />
                                    </div>

                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        >
                                            1.10 Current permit expiry date
                                        </label>
                                        <input
                                            className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            disabled={true}
                                            defaultValue="+990 3343 7865"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <BottomBarButtons/>
                    </>
                )
            }
            {
                selectedItem === 2 && (
                    <>
                        <div className="border-b border-stroke bg-gray py-4 px-7 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                {selectedItem}. {heading}
                            </h3>
                            <p className="text-base font-light text-black dark:text-white">Select the correct option. If the
                                answer is "yes" provide further details as requested</p>
                        </div>
                        <div className="p-7">
                            <p className="text-sm font-medium text-black">
                                Are you aware of any other party objecting against your rail activities or a safety permit
                                being issued to you? If yes provide further details.
                            </p>
                            <CheckboxTwo
                                checked={true}
                                id={`checkbox_1`}
                                title={"Yes"}
                            />
                            <CheckboxTwo
                                checked={false}
                                id={`checkbox_2`}
                                title={"No"}
                            />
                        </div>
                        <BottomBarButtons/>
                    </>
                )
            }
            {
                selectedItem === 3 && (
                    <>
                        <div className="border-b border-stroke bg-gray py-4 px-7 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                {selectedItem}. {heading}
                            </h3>
                        </div>
                        <BottomBarButtons/>
                    </>
                )
            }
            {
                selectedItem === 4 && (
                    <>
                        <div className="border-b border-stroke bg-gray py-4 px-7 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                {selectedItem}. {heading}
                            </h3>
                            <p className="text-base font-light text-black dark:text-white">
                                Select the correct option. If the answer is "yes" submit the annual volumes in space
                                provided.
                                <b> Take Note:</b> Changes made in this section affects other sections in the application
                                process.
                            </p>
                        </div>
                        <div className="p-7">
                            <p className="text-sm font-medium text-black mb-5.5">
                                5.1 Involvement in the transportation of commuters (commuters are people transported to and
                                from work on a daily basis)
                            </p>
                            <p className="text-sm font-medium text-black mb-5.5">
                                5.2 Involvement in the transportation of any passengers (including tourists, excluding
                                commuters)</p>
                            <p className="text-sm font-medium text-black mb-5.5">
                                5.3 Dispatch/receipt/transportation of dangerous goods by rail (provide details in 5.6
                                below)</p>
                            <p className="text-sm font-medium text-black mb-5.5">
                                5.4 Annual Volumes Of People And Goods Transported to "Dispatch/receipt/transportation of
                                general freight by rail (provide details in 5.7 below)</p>

                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    >
                                        5.4.1 Total annual general freight km
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        disabled={true}
                                        defaultValue="+990 3343 7865"
                                    />
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    >
                                        5.4.2 Total annual general freight ton
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-white py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        disabled={true}
                                        defaultValue="+990 3343 7865"
                                    />
                                </div>
                            </div>

                            <p className="text-sm font-medium text-black mb-5.5">
                                5.5 Annual Volumes Of People And Goods Transported to "Are you a railway
                                manufacturing/maintenance company involved only with the movement of equipment and/or empty
                                coaches/wagons and locomotives (provide details in 5.8 below)"</p>
                        </div>
                        <BottomBarButtons/>
                    </>
                )
            }
            {
                selectedItem === 5 && (
                    <>
                        <div className="border-b border-stroke bg-gray py-4 px-7 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Description of Network Operations - Running Lines
                            </h3>
                            <p className="text-base font-light text-black dark:text-white">
                                Running lines are defined as main lines between stations and/or branch lines. It excludes
                                    private sidings.
                            </p>
                            <p className="text-base font-light text-black dark:text-white">
                                Tick the appropriate box. If the answer is "yes" submit answers in the space provided.
                            </p>
                        </div>
                        <div className="p-7">
                            <p className="text-sm font-medium text-black mb-5.5">
                                6.1 Do you operate, manage and/or maintain <b>Running Lines</b> (main lines between stations and/or branch lines excluding private sidings)?</p>
                        </div>
                        <BottomBarButtons/>
                    </>
                )
            }
        </div>


    </>)
}
export default PermitSummary