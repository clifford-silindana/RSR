"use client";
import { useCallback, useState, useContext, useEffect } from "react";
import api from "@/common/api";
import config from "@/common/config.json";
import { IUser } from "@/models/IUser";
import { AppContext } from "@/app/AppContext";

const useSession: () => {
    session: any;
    loading: boolean;
    serverError: any;
    signIn: (provider: string, { }) => Promise<any>;
    signOut: () => Promise<boolean>;
    checkSession: () => Promise<any>;
} = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { session, setSession } = useContext(AppContext);
    const [serverError, setServerError] = useState<any>();
    useEffect(() => {
        if (session == null) {
            const sSession = localStorage.getItem("userSession");
            const jSession = JSON.parse(sSession);
            setSession(jSession);
            //TODO: Check Token Expiry
        }
    }, null);
    const signIn = useCallback(async (provider?: string, data?: {}) => {
        setLoading(true);

        try {

            let url = config.LOGIN_URL;
            if (provider === "openiddict") {
                url = config.AD_VERIFY_URL;
            }

            const result = await api({
                method: "post",
                url: `${url}`,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                data: JSON.stringify(data)
            });

            if (result != null) {
                setServerError(null);
                const response = { user: result.data };
                setSession(response);
                setLoading(false);
                localStorage.setItem("userSession", JSON.stringify(response));
                
                if (session == null) {
                    checkSession();
                }
                
                return session;
            }
            else {
                return session;
            }
        } catch (error: any) {
            setServerError(error.response.data);
            setLoading(false);
            return error;
            //throw error;
        }
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem("userSession");
        window.location.href = "/"
    }, []);


    //USE LOCALSTORAGE
    const checkSession = useCallback(() => {
        setLoading(true);
        const sSession = localStorage.getItem("userSession");
        const jSession = JSON.parse(sSession);
        if (jSession) {
            setSession(jSession);
        }
        setLoading(false);
        return jSession;
    }, []);

    return {
        session,
        loading,
        serverError,
        signIn,
        signOut,
        checkSession
    }
};

export default useSession;
