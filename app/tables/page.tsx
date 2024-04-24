import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import CardDataStats from "@/components/CardDataStats";
import React from "react";

export const metadata: Metadata = {
    title: "Tables Page | Next.js E-commerce Dashboards Template",
    description: "This is Tables page for TailAdmin Next.js",
    // other metadata
};

const TablesPage = () => {
    return (
        <>
            <Breadcrumb pageName="Dashboard" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            </div>
            <div className="mt-9"></div>
            <div className="flex flex-col gap-10">
                <TableTwo />
            </div>
        </>
    );
};

export default TablesPage;
