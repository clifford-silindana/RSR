import React, { useState } from "react";

interface IData {
  title: string;
  description: string;
}

interface CardDataStatsProps {
  data: IData[];
  activeTab: number;
  handleTabClick: (index: number) => void;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  data,
  activeTab,
  handleTabClick,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {data.map((value, index) => (
        <div
          key={index}
          className={
            activeTab === index
              ? "rounded-lg border border-stroke bg-logoorange py-6 px-7.5 shadow-default cursor-pointer "
              : "rounded-lg border border-stroke bg-white py-6 px-7.5 shadow-default cursor-pointer "
          }
          onClick={() => handleTabClick(index)}>
          <div className="flex items-end justify-between">
            <div>
              <h4
                className={
                  activeTab === index
                    ? "text-title-md font-medium text-white dark:text-white"
                    : "text-title-md font-medium text-black dark:text-white"
                }>
                {value.title}
              </h4>
              <span
                className={
                  activeTab === index
                    ? "text-sm text-white font-medium"
                    : "text-sm font-medium"
                }>
                {value.description}
              </span>
            </div>

            <span className="flex items-center gap-1 text-sm font-medium text-meta-5">
              <svg
                className="fill-meta-5"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardDataStats;
