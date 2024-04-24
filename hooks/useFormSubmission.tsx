// useFormSubmission.ts
import { useState, useCallback } from "react";
import api from "@/common/api";
import config from "@/common/config.json";

import useSession from "@/hooks/useSession";

type TFormValues = {};

interface TFormData { }

interface NewObject {
    createdBy: string;
    createdDate: Date;
    operatorId: string;
    applicationTypeId: string;
    applicationJson: TFormData;
}

const useFormSubmission = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [successful, setSuccessful] = useState<boolean>(false);
    const { session } = useSession();

    const submitting = useCallback(async (formData?: any) => {
        const dataObj = {
            modifiedBy: session?.user?.userId,
            createdBy: session?.user?.userId,
            createdDate: new Date(),
            modifiedDate: new Date(),
            applicationId: formData.step1.currentApplication.applicationId,
            applicationStatusId: 29,
            changeReason: "Update Objection To Rail",
            applicationJson: JSON.stringify(formData),
        };
        setLoading(true);
        try {
            const result = await api({
                method: "post",
                url: `${config.UPDATE_APPLICATION_URL}`,
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(dataObj),
            });
            setLoading(false);
            setSuccessful(true);
            return result.data;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    }, []);

    const submittingASIP = useCallback(async (formData?: any) => {
        const dataObj = {
            modifiedBy: session?.user?.userId,
            createdBy: session?.user?.userId,
            createdDate: new Date(),
            modifiedDate: new Date(),
            applicationId: formData.step1.currentApplication.applicationId,
            applicationStatusId: 29,
            applicationJson: JSON.stringify(formData),
        };
        setLoading(true);
        try {
            const result = await api({
                method: "post",
                url: `${config.UPDATE_APPLICATION_URL}`,
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(dataObj),
            });
            setLoading(false);
            setSuccessful(true);
            return result.data;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    }, []);
    const calculateApplicationFee = useCallback(async (formData?: any) => {
        const dataObj = {
            modifiedBy: session?.user?.userId,
            createdBy: session?.user?.userId,
            operatorId: session?.user?.operatorId,
            createdDate: new Date(),
            modifiedDate: new Date(),
            applicationId: formData.step1.currentApplication.applicationId,
            isTransportingCommuters: formData.stepData.transportCommuters == "yes" ? true : false,
            totalAnnualCommuters: Number(formData.stepData.annualCommutersTransported ? formData.stepData.annualCommutersTransported : 0),
            totalDistanceForAnnualRailWithCommuters:
                Number(formData.stepData.annualKilometersForCommuters ? formData.stepData.annualKilometersForCommuters : 0),
            isTransportingTourists: formData.stepData.transportPassengers == "yes" ? true : false,
            totalNumberOfAnnualTourists:
                Number(formData.stepData.annualPassengersTransported ? formData.stepData.annualPassengersTransported : 0),
            totalDistanceForAnnualRailWithTourists:
                Number(formData.stepData.annualKilometersForPassengers ? formData.stepData.annualKilometersForPassengers : 0),
            isTransportingDangerousGoods:
                formData.stepData.transportationOfDangerousGoods == "yes" ? true : false,
            totalAnnualDangerousGoods: formData.stepData.annualTonsForDangerousGoods ? formData.stepData.annualTonsForDangerousGoods : 0,
            totalDistanceForAnnualDangerousGoods:
                Number(formData.stepData.annualKilometersForDangerousGoods ? formData.stepData.annualKilometersForDangerousGoods : 0),
            isTransportingGeneralFreight:
                formData.stepData.annualVolumeGeneralFreigtTransportedTo == "yes" ? true : false,
            weightOfGeneralFreight: Number(formData.stepData.annualFeightKm ? formData.stepData.annualFeightKm : 0),
            totalAnnualDistanceForGeneralFreight:
                Number(formData.stepData.annualFeightTon ? formData.stepData.annualFeightTon : 0),
            onlyInvolvedInMovementOfEquipment:
                formData.stepData.onlyInvolvedInMovementOfEquipment == "yes" ? true : false,
        };
        setLoading(true);
        try {
            const result = await api({
                method: "post",
                url: `${config.CALCULATE_APPLICATION_FEE}`,
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(dataObj),
            });
            setLoading(false);
            setSuccessful(true);
            return result.data;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    }, []);

    const uploadDocument = useCallback(async (formData?: any) => {
        setLoading(true);
        try {
            const result = await api({
                method: "post",
                url: `${config.UPLOAD_DOCUMENT}`,
                headers: {
                    accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
                data: formData,
            });
            setLoading(false);
            setSuccessful(true);
            return result.data;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    }, []);

    return {
        loading,
        successful,
        submitting,
        submittingASIP,
        calculateApplicationFee,
        uploadDocument,
    };
};

export default useFormSubmission;