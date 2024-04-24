
import React from "react";
import IHomeProps from "./IHomeProps";

const Home: React.FC<IHomeProps> = (props) => {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                {props.Title}
            </div>
        </>
    );
};

export default Home;