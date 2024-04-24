import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { FiEye } from "react-icons/fi";
import Link from "next/link";

const TableOne = ({ allDataApplication }) => {
    return (
        <div>
            <Table className="rounded-sm">
                <TableCaption>Permits and Applications</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead className="">Reference Number</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Operator Name</TableHead>
                        <TableHead className="">Application Date</TableHead>
                        <TableHead className="">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allDataApplication.map((application, index) => (
                        <TableRow
                            className="border border-none"
                            key={application.referenceNumber}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell className="font-medium">
                                {application.referenceNumber}
                            </TableCell>
                            <TableCell>{application?.applicationStatus?.name}</TableCell>
                            <TableCell>{application?.operator?.legalName}</TableCell>
                            <TableCell className="">{application.createdDate}</TableCell>
                            <TableCell className="">
                                <Link href={`/admin/safetyPermit/application?id=${application.applicationId}`}>
                                    <FiEye />
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TableOne;