"use client";
import { useCallback, useState } from "react";
import api from "@/common/api";
import config from "@/common/config.json";
import { IOperator } from "@/models/IOperator";
import useSession from "@/hooks/useSession";

const useOperator: () => {
  result: IOperator;
  loading: boolean;
  error: any;
  getMetadata: () => Promise<[]>;
  addOperator: (data: IOperator) => Promise<IOperator>;
  addApplication: (data: any) => Promise<any>;
  generateApplicationReference: (data: any) => Promise<any>;
  updateApplication: (data: any, statusId?: number) => Promise<any>;
  updateRegistration: (data: any, statusId?: number) => Promise<any>;
  updateApplicationStatus: (
    applicationId: number,
    statusId: number,
    comments?: string
  ) => Promise<any>;
  getOperatorApplications: (operatorId: String) => Promise<[]>;
  getOccurrenceBySearchCriteria: (operatorId?: String) => Promise<[]>;
  getOperatorApplicationsByUser: (userId: String) => Promise<[]>;
  getApplicationsBySearch: (operatorId: String) => Promise<[]>;
  getApplication: (applicationId: String) => Promise<any>;
  getOperatorDetails: (operatorId?: string) => Promise<[]>;
  getAllApplications: (applicationTypeId: number) => Promise<[]>;
  getAllNotifications: () => Promise<[]>;
  getAllApprovals: () => Promise<[]>;
  getOperators: () => Promise<[]>;
  getOfficers: () => Promise<[]>;
  assignOfficer: (person: any, applicationId: string) => Promise<boolean>;
  getUserRoles: () => Promise<[]>;
} = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>();
  const [metadata, setMetadata] = useState<any>();
  const [error, setError] = useState<any>();
  const { session } = useSession();
  const getOperatorDetails = useCallback(async (operatorId?: string) => {
    if (operatorId == null) {
      operatorId = session?.user?.operatorId;
    }

    setLoading(true);
    try {
      const result = await api({
        method: "get",
        url: `${config.GET_OPERATOR_ID}${operatorId}`,
      });

      if (result != null) {
        setError(null);
        setMetadata(result.data);
        setLoading(false);
        return result.data;
      }
    } catch (error: any) {
      setError(error.response.data);
      setLoading(false);
      throw error;
    }
  }, []);

  const addOperator = useCallback(async (data?: IOperator) => {
    setLoading(true);
    try {
      const result = await api({
        method: "post",
        url: `${config.ADD_OPERATOR_URL}`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      if (result != null) {
        setError(null);
        setResult(result);
        setLoading(false);
      }
      return result.data;
    } catch (error: any) {
      setError(error.response.data);
      setLoading(false);
      throw error;
    }
  }, []);

  const updateRegistration = useCallback(
    async (data?: any, statusId?: number) => {
      debugger;
      if (statusId == null) {
        statusId = 37;
      }
      setLoading(true);
      const dataObj = {
        modifiedBy: session?.user?.userId,
        createdBy: session?.user?.userId,
        createdDate: new Date(),
        modifiedDate: new Date(),
        applicationId: data?.applicationId,
        applicationStatusId: statusId,
        changeReason: "Update Registration",
        applicationJson: "",
      };

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
        if (result != null) {
          setError(null);
          setResult(result);
          setLoading(false);
        }
        return result.data;
      } catch (error: any) {
        setError(error.response.data);
        setLoading(false);
        throw error;
      }
    },
    []
  );

  const updateApplication = useCallback(
    async (data?: any, statusId?: number) => {
      debugger;
      if (statusId == null) {
        statusId = 37;
      }
      setLoading(true);
      const dataObj = {
        modifiedBy: session?.user?.userId,
        createdBy: session?.user?.userId,
        createdDate: new Date(),
        modifiedDate: new Date(),
        applicationId: data?.step1?.currentApplication?.applicationId,
        applicationStatusId: statusId, //22, //TODO: get the values from the metadata endpoint
        changeReason: "Update Objection To Rail",
        applicationJson: JSON.stringify(data),
      };

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
        if (result != null) {
          setError(null);
          setResult(result);
          setLoading(false);
        }
        return result.data;
      } catch (error: any) {
        setError(error.response.data);
        setLoading(false);
        throw error;
      }
    },
    []
  );

  const updateApplicationStatus = useCallback(
    async (applicationId: number, statusId: number, comments?: string) => {
      debugger;
      if (statusId == null) {
        statusId = 37;
      }
      setLoading(true);
      const dataObj = {
        modifiedBy: session?.user?.userId,
        createdBy: null,
        createdDate: null,
        modifiedDate: new Date(),
        applicationId: applicationId,
        applicationStatusId: statusId,
        comments: comments ? comments : "No Comment",
      };

      try {
        const result = await api({
          method: "post",
          url: `${config.UPDATE_STATUS_URL}`,
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          data: JSON.stringify(dataObj),
        });
        if (result != null) {
          setError(null);
          setResult(result);
          setLoading(false);
        }
        return result.data;
      } catch (error: any) {
        setError(error.response.data);
        setLoading(false);
        throw error;
      }
    },
    []
  );

  const addApplication = useCallback(async (data?: any) => {
    setLoading(true);
    try {
      const result = await api({
        method: "post",
        url: `${config.ADD_APPLICATION_URL}`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      if (result != null) {
        setError(null);
        setResult(result);
        setLoading(false);
      }
      return result.data;
    } catch (error: any) {
      setError(error.response.data);
      setLoading(false);
      throw error;
    }
  }, []);

  const getMetadata = useCallback(async () => {
    setLoading(true);
    try {
      const result = await api({
        method: "get",
        url: `${config.METADATA_URL}`,
      });
      if (result != null) {
        setError(null);
        setMetadata(result.data);
        setLoading(false);
      }
      return result.data;
    } catch (error: any) {
      setError(error.response.data);
      setLoading(false);
      throw error;
    }
  }, []);

  const generateApplicationReference = useCallback(async (data?: any) => {
    setLoading(true);
    try {
      const result = await api({
        method: "post",
        url: `${config.GENERATE_REFERENCE_URL}`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });
      if (result != null) {
        setError(null);
        setResult(result);
        setLoading(false);
      }
      return result.data;
    } catch (error: any) {
      setError(error.response.data);
      setLoading(false);
      throw error;
    }
  }, []);

  const getApplication = useCallback(async (applicationId: String) => {
    debugger;
    setLoading(true);
    try {
      const result = await api({
        method: "get",
        url: `${config.GET_APPLICATION_BY_ID}?applicationid=${applicationId}`,
      });
      if (result != null) {
        setError(null);
        setMetadata(result.data);
        setLoading(false);
        return result.data;
      }
    } catch (error: any) {
      setError(error.response.data);
      setLoading(false);
      throw error;
    }
  }, []);

  const getAllApplications = useCallback(async (applicationTypeId: number) => {
    setLoading(true);
    const data = {
      pageNumber: 1,
      pageSize: 100,
      applicationId: null,
      referenceNumber: null,
      userId: null,
      applicationStatusId: null,
    };

    try {
      const result = await api({
        method: "post",
        url: `${config.GET_APPLICATION_BY_SEARCH}`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });

      if (result != null) {
        setError(null);
        setLoading(false);
        //setResult(result);
        debugger;
        return result.data.results;
      }
    } catch (error: any) {
      setError(error.response.data);
      setLoading(false);
      throw error;
    }
  }, []);

  const getAllApprovals = useCallback(async () => {
    setLoading(true);
    try {
      const result = await api({
        method: "get",
        url: `${config.GET_APPLICATION_BY_SEARCH}`,
      });
      if (result != null) {
        setError(null);
        setLoading(false);
        return result.data.applications;
      }
    } catch (error: any) {
      setError(error.response.data);
      setLoading(false);
      throw error;
    }
  }, []);

  const getOperators = useCallback(async (applicationTypeId: number) => {
    setLoading(true);
    try {
      const result = await api({
        method: "get",
        url: `${config.GET_OPERATORS_BY_SEARCH}`,
      });
      if (result != null) {
        setError(null);
        setLoading(false);
        return result.data.applications;
      }
    } catch (error: any) {
      setError(error.response.data);
      setLoading(false);
      throw error;
    }
  }, []);

  const getAllNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const result = await api({
        method: "get",
        url: `${config.GET_NOTIFICATIONS}`,
      });
      if (result != null) {
        setError(null);
        setLoading(false);
        return result.data.applications;
      }
    } catch (error: any) {
      setError(error.response.data);
      setLoading(false);
      throw error;
    }
  }, []);

  const getApplicationsBySearch = useCallback(async (operatorId: String) => {
    setLoading(true);
    try {
      const result = await api({
        method: "get",
        url: `${config.GET_APPLICATION_BY_SEARCH}`,
      });
      if (result != null) {
        setError(null);
        setLoading(false);
        return result.data.applications;
      }
    } catch (error: any) {
      setError(error.response.data);
      setLoading(false);
      throw error;
    }
  }, []);

  const getOperatorApplications = useCallback(async (operatorId: String) => {
    if (operatorId == null) {
      operatorId = session?.user?.operatorId;
    }
    setLoading(true);
    try {
      const result = await api({
        method: "get",
        url: `${config.GET_OPERATOR_ID}${operatorId}`,
      });
      if (result != null) {
        setError(null);
        setMetadata(result.data);
        setLoading(false);
        return result.data.applications;
      }
    } catch (error: any) {
      setError(error.response.data);
      setLoading(false);
      throw error;
    }
  }, []);

  const getOperatorApplicationsByUser = useCallback(async (userId: String) => {
    if (userId == null) {
      userId = session?.user?.id;
    }
    setLoading(true);
    const data = {
      pageNumber: 1,
      pageSize: 100,
      applicationId: null,
      referenceNumber: null,
      userId: userId,
      applicationStatusId: null,
    };

    try {
      const result = await api({
        method: "post",
        url: `${config.GET_APPLICATION_BY_SEARCH}`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify(data),
      });

      if (result != null) {
        setError(null);
        setLoading(false);
        //setResult(result);
        debugger;
        const filteredResults = result.data.results.filter(
          (a) => a.createdByUser?.userId == userId
        );
        return filteredResults;
      }
    } catch (error: any) {
      setError(error.response.data);
      setLoading(false);
      throw error;
    }
  }, []);

  const getOccurrenceBySearchCriteria = useCallback(
    async (operatorId: string | null = null) => {
      setLoading(true);
      const data = {
        pageNumber: 1,
        pageSize: 100,
        searchKeyword: null,
        occurrenceId: null,
        occurrenceTypeId: null,
        occurrenceStatusId: null,
        occurrenceCategoryId: null,
        hazardClassificationId: null,
        startDate: null,
        endDate: null,
      };

      try {
        const result = await api({
          method: "post",
          url: `${config.GET_OCCURENCE_SEARCH_CRITERIA_URL}`,
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          data: JSON.stringify(data),
        });

        if (result != null) {
          setError(null);
          setLoading(false);
          const filteredResults = operatorId == null
            ? result.data.results
            : result.data.results.filter((a) => a.operatorId == operatorId);
          return filteredResults;
        }
      } catch (error: any) {
        setError(error.response.data);
        setLoading(false);
        throw error;
      }
    },
    []
  );

  const getOfficers = useCallback(async () => {
    setLoading(true);
    const roleId = config.PERMIT_OFFICER_ROLE;
    try {
      const result = await api({
        method: "get",
        url: `${config.GET_USERS_INROLE}${roleId}`,
      });
      if (result != null) {
        setError(null);
        setLoading(false);
        return result.data;
      }
    } catch (error: any) {
      setError(error.response.data);
      setLoading(false);
      throw error;
    }
  }, []);
  const assignOfficer = useCallback(
    async (person: any, applicationId: string) => {
      setLoading(true);
      debugger;
      const dataObj = {
        modifiedBy: session?.user?.userId,
        createdBy: null,
        createdDate: null,
        modifiedDate: new Date(),
        assignedDate: new Date(),
        applicationId: applicationId,
        assignToUserId: person.azureUserId,
        assignedBy: session?.user?.userId,
        assignToUserName: person.firstName,
        assignToEmail: person.email,
      };

      try {
        const result = await api({
          method: "post",
          url: `${config.ASSIGN_APPLICATION_URL}`,
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          data: JSON.stringify(dataObj),
        });
        if (result != null) {
          setError(null);
          setLoading(false);
          return result.data;
        }
      } catch (error: any) {
        setError(error.response.data);
        setLoading(false);
        throw error;
      }
    },
    []
  );

  const getUserRoles = useCallback(async () => {
    setLoading(true);
    try {
      const result = await api({
        method: "get",
        url: config.GET_USER_ROLES,
      });
      if (result != null) {
        setError(null);
        setLoading(false);
        return result.data;
      }
    } catch (error: any) {
      setError(error.response.data);
      setLoading(false);
      throw error;
    }
  }, []);

  return {
    result,
    metadata,
    loading,
    error,
    getMetadata,
    addOperator,
    addApplication,
    updateApplication,
    updateApplicationStatus,
    generateApplicationReference,
    getOperatorApplications,
    getOperatorApplicationsByUser,
    getApplication,
    getOperatorDetails,
    getApplicationsBySearch,
    getAllApplications,
    getAllNotifications,
    getAllApprovals,
    getOperators,
    updateRegistration,
    getOfficers,
    assignOfficer,
    getUserRoles,
    getOccurrenceBySearchCriteria,
  };
};

export default useOperator;
