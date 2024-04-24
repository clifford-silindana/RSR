"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import useSession from "@/hooks/useSession";
import api from "@/common/api";
import config from "@/common/config.json";
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import HighlightedHeadingForm from "@/components/Forms/HighlightedHeadingForm";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";



const DangerousGoodsPage = () => {
    const { session } = useSession();

    //WagonTypeCheckBoxes
    const WagonTypeYesNo = [
        {
            name: "Yes",
            id: true
        },
        {
            name: "No",
            id: false
        }
    ];

    const [wagonTypeCheckedState, wagonTypeSetCheckedState] = useState(
        new Array(WagonTypeYesNo.length).fill(false)
    );

    const WagonTypeHandleOnChange = (position, name) => {
        const updatedCheckedState = wagonTypeCheckedState.map((item, index) =>
            index === position ? !item : item
        );
        alert(name);
        wagonTypeSetCheckedState(updatedCheckedState);
    };

    //Plascard CheckBoxes
    const PlascardYesNo = [
        {
            name: "Yes",
            id: true
        },
        {
            name: "No",
            id: false
        }
    ];

    const [PlascardCheckedState, PlascardSetCheckedState] = useState(
        new Array(PlascardYesNo.length).fill(false)
    );

    const PlascardHandleOnChange = (position, name) => {
        const updatedCheckedState = PlascardCheckedState.map((item, index) =>
            index === position ? !item : item
        );
        alert(name);
        PlascardSetCheckedState(updatedCheckedState);
    };

    //Documentation CheckBoxes
    const DocumentationYesNo = [
        {
            name: "Yes",
            id: true
        },
        {
            name: "No",
            id: false
        }
    ];

    const [DocumentationCheckedState, DocumentationSetCheckedState] = useState(
        new Array(DocumentationYesNo.length).fill(false)
    );

    const DocumentationHandleOnChange = (position, name) => {
        const updatedCheckedState = DocumentationCheckedState.map((item, index) =>
            index === position ? !item : item
        );
        alert(name);
        DocumentationSetCheckedState(updatedCheckedState);
    };

    //ERAP CheckBoxes
    const ERAPYesNo = [
        {
            name: "Yes",
            id: true
        },
        {
            name: "No",
            id: false
        }
    ];

    const [ERAPCheckedState, ERAPSetCheckedState] = useState(
        new Array(DocumentationYesNo.length).fill(false)
    );

    const ERAPHandleOnChange = (position, name) => {
        const updatedCheckedState = ERAPCheckedState.map((item, index) =>
            index === position ? !item : item
        );
        alert(name);
        ERAPSetCheckedState(updatedCheckedState);
    };



    //VehicleList CheckBoxes
    const VehicleListYesNo = [
        {
            name: "Yes",
            id: true
        },
        {
            name: "No",
            id: false
        }
    ];

    const [VehicleListCheckedState, VehicleListSetCheckedState] = useState(
        new Array(VehicleListYesNo.length).fill(false)
    );

    const VehicleListHandleOnChange = (position, name) => {
        const updatedCheckedState = ERAPCheckedState.map((item, index) =>
            index === position ? !item : item
        );
        alert(name);
        VehicleListSetCheckedState(updatedCheckedState);
    };



    // await loginRequiredServe();
    return (
        <div>
            <div>
                <Table className="rounded-sm">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Unit No</TableHead>
                            <TableHead>Class</TableHead>
                            <TableHead>Shipping Name</TableHead>
                            <TableHead className="">Packing Group</TableHead>
                            <TableHead className="">Estimated Quantity Of Loss</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Unit No"
                                    className="rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Class"
                                    className="rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Shipping Name"
                                    className="rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Packaging Group"
                                    className="rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Loss"
                                    className="rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </td>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className="flex flex-wrap items-center">
                <label className="mb-3 block text-black dark:text-white">
                    Wagon Type
                </label>
                <div style={{ marginLeft: 40, width: 200, display: 'flex', justifyContent: 'space-between' }}>
                    {WagonTypeYesNo.map(({ name, id }, index) => {
                        return (
                            <span className="m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray py-1.5 px-2.5 text-sm font-medium dark:border-strokedark dark:bg-white/30">
                                <label className="mb-1 block text-black dark:text-white">
                                    <input
                                        type="checkbox"
                                        id={`${index}`}
                                        name={name}
                                        value={name}
                                        checked={wagonTypeCheckedState[index]}
                                        onChange={() => WagonTypeHandleOnChange(index, name)}
                                    />
                                    {name}
                                </label>
                            </span>
                        )
                    })}
                </div>
            </div>

            <div style={{ paddingTop: '15px' }}>
                <label className="mb-1 block text-black dark:text-white">
                    Provide Details
                </label>
                <input
                    type="text"
                    placeholder="Details"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
            </div>
            <div className="flex flex-wrap items-center">
                <label className="mb-3 block text-black dark:text-white">
                    Placarding
                </label>
                <div style={{ marginLeft: 53, width: 200, display: 'flex', justifyContent: 'space-between' }}>
                    {WagonTypeYesNo.map(({ name, id }, index) => {
                        return (
                            <span className="m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray py-1.5 px-2.5 text-sm font-medium dark:border-strokedark dark:bg-white/30">
                                <label className="mb-1 block text-black dark:text-white">
                                    <input
                                        type="checkbox"
                                        id={`${index}`}
                                        name={name}
                                        value={name}
                                        checked={PlascardCheckedState[index]}
                                        onChange={() => PlascardHandleOnChange(index, name)}
                                    />
                                    {name}
                                </label>

                            </span>
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-wrap items-center">
                <label className="mb-3 block text-black dark:text-white">
                    Documentation
                </label>
                <div style={{ marginLeft: 20, width: 200, display: 'flex', justifyContent: 'space-between' }}>
                    {WagonTypeYesNo.map(({ name, id }, index) => {
                        return (
                            <span className="m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray py-1.5 px-2.5 text-sm font-medium dark:border-strokedark dark:bg-white/30">
                                <label className="mb-1 block text-black dark:text-white">
                                    <input
                                        type="checkbox"
                                        id={`${index}`}
                                        name={name}
                                        value={name}
                                        checked={DocumentationCheckedState[index]}
                                        onChange={() => DocumentationHandleOnChange(index, name)}
                                    />
                                    {name}
                                </label>

                            </span>
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-wrap items-center">
                <label className="mb-3 block text-black dark:text-white">
                    ERAP
                </label>
                <div style={{ marginLeft: 88, width: 200, display: 'flex', justifyContent: 'space-between' }}>
                    {WagonTypeYesNo.map(({ name, id }, index) => {
                        return (
                            <span className="m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray py-1.5 px-2.5 text-sm font-medium dark:border-strokedark dark:bg-white/30">
                                <label className="mb-1 block text-black dark:text-white">
                                    <input
                                        type="checkbox"
                                        id={`${index}`}
                                        name={name}
                                        value={name}
                                        checked={ERAPCheckedState[index]}
                                        onChange={() => ERAPHandleOnChange(index, name)}
                                    />
                                    {name}
                                </label>
                            </span>
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-wrap items-center">
                <label className="mb-3 block text-black dark:text-white">
                    Vehicle list and consignment note available
                </label>
                <div style={{ marginLeft: 40, width: 200, display: 'flex', justifyContent: 'space-between' }}>
                    {VehicleListYesNo.map(({ name, id }, index) => {
                        return (
                            <span className="m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray py-1.5 px-2.5 text-sm font-medium dark:border-strokedark dark:bg-white/30">
                                <label className="mb-1 block text-black dark:text-white">
                                    <input
                                        type="checkbox"
                                        id={`${index}`}
                                        name={name}
                                        value={name}
                                        checked={VehicleListCheckedState[index]}
                                        onChange={() => VehicleListHandleOnChange(index, name)}
                                    />
                                    {name}
                                </label>
                            </span>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};


export default DangerousGoodsPage;
