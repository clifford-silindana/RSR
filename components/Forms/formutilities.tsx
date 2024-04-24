import api from "@/common/api";
import { useRouter, useSearchParams } from "next/navigation";
import config from "@/common/config.json";

const router = useRouter();

export const handleSubmit = async (reportDailyOccurenceObj, descriptionOfOccurence, place, descriptionOfResponseTakenOccurence, operatorId, immediateCause, setIErrorMessage, setIsError, isError, isDangerousGoods) => {
        console.log(JSON.stringify(reportDailyOccurenceObj));

    if (!descriptionOfOccurence ||
        !place ||
        !descriptionOfResponseTakenOccurence ||
        !operatorId ||
        !immediateCause

    ) {
        setIErrorMessage("Please fill out all required fields");
        setIsError(true);
    }
    else {
        setIsError(false);
    }
    try {
        if (isError == false) {
            const result = await api({
                method: "post",
                url: "https://niims-dev.azurewebsites.net/Occurrence/ReportImmediateOccurrence",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json-patch+json",
                },
                data: JSON.stringify(reportDailyOccurenceObj),
            });

            {
                !isDangerousGoods && (
                    router.push("/occurence")
                )
            };

            {
                isDangerousGoods && (
                    handleNext()
                )
            };
        }

    } catch (error) {
        // setLoading(false);
    }

    //router.push("/occurence");
};


export const handleSubCategories = (id, categories, setSubCategories) => {
    let data = []
    categories.forEach(element => {

        if (element.name === id) {
            data.push(element);
            //
        }

    })
    setSubCategories(data);
}

export function removeDuplicates(arr, setDistinctCategories) {
    let unique = [];
    let data = []
    arr.forEach(element => {
        if (!unique.includes(element.name)) {

            if (element.metaType === "OCCURRENCECATEGORY") {
                unique.push(element.name);
                data.push(element)
            }
        }
        setDistinctCategories(data);
    });
    return unique;
}
export const GetMetaData = async (setCategories, setProvinces, provinces, removeDuplicates) => {
    try {
        const result = await api({
            method: "get",
            url: "https://niims-dev.azurewebsites.net/Metadata/GetAllMetadata",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            //: JSON.stringify(reportDailyOccurenceObj),
        });
        console.log("Metadata", JSON.stringify(result.data));
        setCategories(result.data);

        let metadata = result.data;

        let provincesData = [];

        for (var metadatum of metadata) {
            if (metadatum.metaType == "PROVINCE") {
                provincesData.push(metadatum);
                setProvinces(provincesData);
            }
        }

        console.log(provinces);


        removeDuplicates(result.data)

        //router.push("@/components/Occurencies/OccurenceManagementDashboard");
    } catch (error) {
        // setLoading(false);
    }
};

export const getOperators = () => {
    try {
        const result = api({
            method: "get",
            url: `${config.GET_OPERATORS_BY_SEARCH}`,
        });
        if (result != null) {
            console.log(result);
        }
    } catch (error: any) {
        throw error;
    }
};
export const GetOperatorList = async (operatorObj, setOperators) => {
    try {
        const result = await api({
            method: "post",
            url: "https://niims-dev.azurewebsites.net/Operator/GetOperatorBySearchCriteria",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            data: operatorObj,
        });

        let res = result.data.results;
        setOperators(res);

        console.log(result.data.results);


    } catch (error) {
        // setLoading(false);
    }
};

export const GetOperatorDetails = async (id, setContactNumber, setSafetyPermitNumber, setEmail, setOperatorId) => {
    try {

        const result = await api({
            method: "get",
            url: "https://niims-dev.azurewebsites.net/Operator/GetOperatorById?operatorID=" + id,
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        console.log(result.data);
        let currentPermit = result.data.currentPermit.permitNumber;
        let contact = result.data.contacts;

        {
            contact.map((con, index) => {
                if (con.hasUserAccount == true) {
                    setContactNumber(con.landline);
                }

            })
        }
        let email = result.data.contacts[0].email;
        setSafetyPermitNumber(currentPermit);
        setEmail(email);
        setOperatorId(id);
        
    } catch (error) {
        // setLoading(false);
    }
};
export const handleNext = (setFormStep, formStep) => {
    setFormStep(formStep + 1);
};



export const handleBack = async (setFormStep, formStep) => {
    setFormStep(formStep - 1);
};


//just a test button
const testButton = (occurenceCategory) => {
    alert(occurenceCategory);
}

export const handleReportSend = async (setIsReportSent) => {
    setIsReportSent(true);
};
export const handleClose = async () => {
    router.push("/occurence");
};