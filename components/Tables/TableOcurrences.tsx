import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import useOperator from "@/hooks/useOperator";
import useSession from "@/hooks/useSession";
import PeoplePicker from "../PeoplePicker";

const TableOccurrences = ({
  applications,
  pageProps,
  isregistration,
  isAdministrator,
  people,
  isPermitManager,
  statusesCounts = null,
}) => {
  const ApplicationsList = () => {
    const { assignOfficer } = useOperator();

    const _assign = async (person, id) => {
      await assignOfficer(person, id);
    };

    const [filter, setFilter] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [filterStatus, setFilterStatus] = useState("");

    //this will populate the applications based on the filter or paging
    let apps;

    const indexOfLastApplication = currentPage * pageSize;
    const indexOfFirstApplication = indexOfLastApplication - pageSize;
    apps = applications.slice(indexOfFirstApplication, indexOfLastApplication);

    const totalPages = Math.ceil(applications.length / pageSize);

    //for paging
    const handleChangePage = (page) => {
      setCurrentPage(page);
    };

    //for searching a reference number
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };

    //check if search query has something
    if (searchQuery) {
      apps = applications.filter((application) =>
        application.referenceNumber
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    const handleFilterChange = (index) => {
      setFilter(index);
    };

    /*
    const handleSelectStatus = (_filterStatus) => {
      setFilterStatus(_filterStatus);
    };
    */

    if (filterStatus) {
      //console.log("filterStatus",filterStatus);

      //setFilter(statusesCounts[filterStatus]);
      apps = applications
        .filter((application) =>
          application?.applicationStatus?.name
            .toLowerCase()
            .includes(filterStatus.toLowerCase())
        )
        .slice(indexOfFirstApplication, indexOfLastApplication);

      if (searchQuery) {
        apps = applications.filter((application) =>
          application.referenceNumber
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      }
    }

    if (filterStatus && filterStatus === "All") {
      apps = applications.slice(
        indexOfFirstApplication,
        indexOfLastApplication
      );
    }

    return (
      <div className="flex flex-col gap-10 mt-9">
        <div className="rounded-lg border border-stroke bg-white pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
          <div className="pb-6 px-7.5 flex justify-between items-center">
            {!isAdministrator && (
              <h4 className="hidden sm:block text-xl font-semibold text-black dark:text-white">
                {pageProps.heading}
              </h4>
            )}

            {statusesCounts && (
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  {Object.keys(statusesCounts).map((key, index) => (
                    <button
                      className={`flex justify-center items-center rounded ${
                        filter === index
                          ? "bg-logoorange text-white"
                          : "border border-stroke text-black"
                      } py-2 px-4 font-medium`}
                      type="submit"
                      onClick={() => {
                        setFilterStatus(key);
                        handleFilterChange(index);
                      }}
                      key={index}
                    >
                      <span
                        className={`circle flex h-6 w-6 items-center justify-center rounded-full border ${
                          filter === index
                            ? "border-white bg-logoorange"
                            : "border-stroke bg-white"
                        }`}
                      >
                        <span
                          className={`text-sm text-center ${
                            filter === index ? "text-white" : "text-gray-400"
                          }`}
                        >
                          {statusesCounts[key]}
                        </span>
                      </span>
                      <div className="pl-2">{key.toUpperCase()}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="hidden sm:block border border-logoorange p-2 rounded-sm">
              <form
                action="https://formbold.com/s/unique_form_id"
                method="POST"
              >
                <div className="relative">
                  <button className="absolute left-0 top-1/2 -translate-y-1/2 ">
                    <svg
                      className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                        fill=""
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                        fill=""
                      />
                    </svg>
                  </button>

                  <input
                    type="text"
                    placeholder="Enter Reference Number to search..."
                    className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none wl-w123"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gray text-left dark:bg-meta-4">
                  <th className="min-w-[60px] py-4.5 px-7.5 font-medium text-darkblue dark:text-white">
                    Ref #
                  </th>
                  <th className="min-w-[150px] py-4.5  px-1 font-medium text-darkblue dark:text-white">
                    Investigation Name
                  </th>
                  <th
                    className={`min-w-[150px] py-4.5  px-1 font-medium text-darkblue `}
                  >
                    Occurrence Type
                  </th>
                  <th className="py-4.5  px-1 font-medium text-darkblue dark:text-white">
                    Created Date
                  </th>
                  <th className="min-w-[150px] py-4.5  px-1 font-medium text-darkblue dark:text-white">
                    Status
                  </th>
                  <th className="min-w-[150px] py-4.5  px-1 font-medium text-darkblue dark:text-white">
                    Incident Date
                  </th>
                  <th className="min-w-[150px] py-4.5  px-1 font-medium text-darkblue dark:text-white">
                    Investigation Date
                  </th>
                  <th className="min-w-[150px] py-4.5  px-1 font-medium text-darkblue dark:text-white">
                    {isAdministrator ? "Actions" : "Closed Date"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {/*** */}
                {apps?.map((application, key) => (
                  <tr className="group-hover:text-primary" key={key}>
                    <td className="border-b border-[#eee] py-2 px-7.5 dark:border-strokedark ">
                     
                    </td>
                    <td className="min-w-[150px]  border-b border-[#eee] py-2 px-1 dark:border-strokedark ">
                      <h5 className="font-medium text-black dark:text-white">
                        
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-1  dark:border-strokedark ">
                      <h5 className="font-medium text-black dark:text-white">
                        {application?.applicationType?.name}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark ">
                      
                    </td>

                    {/* <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark ">
                      <h5 className="font-medium text-black dark:text-white">
                        {application?.createdBy ? application?.createdBy : ""}
                      </h5>
                    </td> */}
                    <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          application?.applicationStatusId === 37 ||
                          application?.applicationStatusId === 39
                            ? "text-warning bg-warning"
                            : application?.applicationStatusId === 29
                            ? "text-danger bg-danger"
                            : "text-success bg-success"
                        }`}
                      >
                        {application?.applicationStatusId === 39 &&
                        !isAdministrator &&
                        !isregistration
                          ? "Submitted"
                          : application?.applicationStatusId === 37 &&
                            !isregistration
                          ? "Draft"
                          : application?.applicationStatus?.name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                      {application?.applicationStatusId === 39 &&
                        isAdministrator &&
                        isPermitManager && (
                          <PeoplePicker
                            handleCloseModal={_assign}
                            people={people}
                            person={application?.assignedToUserId}
                            id={application?.applicationId}
                          />
                        )}

                      {!isAdministrator && (
                        <h5 className="font-medium text-black ">
                          {application?.modifiedDate
                            ? new Date(
                                application?.modifiedDate
                              ).toLocaleDateString("en-ZA", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })
                            : ""}
                        </h5>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pb-6 pt-6 px-7.5">
            <div className="flex justify-between items-center">
              <div className="flex gap-4.5 ">
                <h5 className="font-medium text-black dark:text-white">
                  Showing {apps?.length} Results of {applications?.length}
                </h5>
              </div>
              <div className="flex gap-4.5">
                <button
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="submit"
                  onClick={() => handleChangePage((page) => page - 1)}
                  disabled={totalPages - (totalPages - currentPage) === 1}
                >
                  &laquo;
                </button>
                {/* TODO: Include Paging */}
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    className={
                      currentPage === page
                        ? "flex justify-center rounded text-xl  bg-primary border border-stroke py-2 px-6 font-medium text-white hover:shadow-1 dark:border-strokedark dark:text-white"
                        : "flex justify-center rounded bg-white border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    }
                    type="submit"
                    key={page}
                    onClick={() => handleChangePage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:bg-opacity-95"
                  type="submit"
                  onClick={() => handleChangePage((page) => page + 1)}
                  disabled={totalPages === currentPage}
                >
                  &raquo;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <ApplicationsList />;
};

export default TableOccurrences;
