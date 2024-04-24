import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useFormState } from "../FormContext/FormContext";
import useFormSubmission from "@/hooks/useFormSubmission";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormSectionComponent from "@/components/FormSectionComponent";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AddIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-8 w-8 text-white bg-darkblue rounded cursor-pointer"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );
};

const DeleteIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-8 w-8 text-white bg-danger rounded cursor-pointer"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

type TFormValues = {
  partyObjection: "yes" | "no" | undefined;
  nameOfObjectingParty: string;
  contactOfObjectingParty: string;
};

export const SafetyManagementSystem = ({
  application = null,
  isAdministrator,
  asip = false,
}) => {
  const [file, setFile] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [comment, setComment] = useState("");
  const [formFiles, setFormFiles] = useState({});
  const [comments, setComments] = useState({
    ManagementCommitmentEvidence: [], //8.1.1
    SafetyPolicy: [], //8.1.1.a)
    CorporateSafety: [], //8.1.1.b)
    CompetenceManagement: [], //8.1.1.c)
    ProvisionAdequate: [], //8.1.1.d)
    RiskControl: [], //8.1.1.e)
    ReceivingInformation: [], //8.1.1.f)
    ReviewOfSMSNotBandC: [], //8.1.1.g)
    InternalAuditing: [], //8.1.1.h)
    BoardReviewOfSMS: [], //8.1.1.i)
    InternalExternalCommunication: [], //8.1.1.j)
    StaffInvolvement: [], //8.1.1.k)
    ContinuousSafety: [], //8.1.1.l)
    ManagementOfChangeNotC: [], //8.1.1.m)
    DevelopedByManagement: [], // 8.1.2.a)
    ScaleOfTheOrganization: [], // 8.1.2.b)
    OutlineCoreValue: [], // 8.1.2.c)
    PursuesDevelopment: [], // 8.1.2.d)
    EnjoyCommitmentOfStaff: [], // 8.1.2.e)
    CommunicatedToStaff: [], // 8.1.2.f)
    ClearlyDisplayed: [], // 8.1.2.g)
    AppropriateToService: [], // 8.1.2.h)
    ApprovedByChiefExecutive: [], // 8.1.2.i)
    IsPolicyDisplayed: [], //8.1.2.2
    IsPolicyGuiding: [], //8.1.2.3
    IsManagementCommitted: [], //8.1.2.4
    IsPolicyApproved: [], //8.1.2.5
    IsPolicyPeriodicallyReviewed: [], //8.1.2.6
    CommittedLeadership: [], //8.1.3.1.a)
    InformedStaff: [], //8.1.3.1.b)
    HighVigilance: [], //8.1.3.1.c)
    PromotingCulture: [], //8.1.3.1.d)
    PromotingOrganizational: [], //8.1.3.1.e)
    WillingnessToLearn: [], //8.1.3.1.f)
    SafetyTargetWithFramework: [], //8.1.4.1
    TargetsCredible: [], //8.1.4.2
    SafetyTargetWithType: [], //8.1.4.2.1
    TargetBasedOnPrevious: [], //8.1.4.2.2
    SpecificActionsPlanned: [], //8.1.4.2.3
    ActionsMonitoredEffectiveness: [], //8.1.4.2.4
    CorporateTargetRevised: [], //8.1.4.2.5
    KeyPerformanceIndicators: [], //8.1.4.2.6
    ThereAreBothLeading: [], //8.1.4.2.7
    PerformanceIndicatorIncludeKeyRisk: [], //8.1.4.2.8
    TransparentDecisionMaking: [], //8.1.5.1
    DesignImplementationOfSMS: [], //8.1.6.1.a)
    DesignOrganisationalStructure: [], //8.1.6.1.b)
    DelegationOfResponsability: [], //8.1.6.1.c)
    DelegationOfControl: [], //8.1.6.1.d)
    MonitoringOfSafetyPolicy: [], //8.1.6.1.e)
    MonitoringOfSafetyMeasure: [], //8.1.6.1.f)
    continuous: [], //8.1.6.1.g)
    UsageOfManagementTools: [], //8.1.6.1.h)
    Benchmarking: [], //8.1.6.1.i)
    BalanceBetweenSafety: [], //8.1.6.1.j)
    ImprovementOfManagerial: [], //8.1.6.1.k)
    IntegratingCustomerExpectations: [], //8.1.6.1.l)
    InternalAudit: [], //8.1.6.1.m)
    RiskControlMeasuresRailwayOperator: [], //8.2.1
    IdentifyRisksRailwayOperations: [], //8.2.1.1
    DevelopRiskControlMeasures: [], //8.2.1.2
    MonitorEffectivenessRiskControl: [], //8.2.1.3
    WorkWithOtherOperatorsRiskControl: [], //8.2.1.4
    DocumentationCommunicationProcedures: [], //8.2.1.5
    MonitorEffectivenessArrangements: [], //8.2.1.6
    RisksFromExternalParties: [], //8.2.2
    IdentifyRisksExternalParties: [], //8.2.2.1
    EstablishControlMeasuresExternalParties: [], //8.2.2.2
    MonitorEffectivenessMeasuresExternalParties: [], //8.2.2.3
    RiskEvaluationAndControlMeasures: [], //8.2.3
    ManagementProceduresForChanges: [], //8.2.3.1
    RiskAssessmentProcedures: [], //8.2.3.2
    FeedResultsIntoProcesses: [], //8.2.3.3
    ComplianceWithLegislationRulesStandards: [], //8.2.4
    UpdatedRegisterLegislationStandards: [], //8.2.4.1
    SafetyDataCollectionAnalysis: [], //8.3.1
    OccurrenceReportingPolicyProcedure: [], //8.3.1.1
    CollateAnalyzeIndicators: [], //8.3.1.2
    CollectionOfSafetyDataElements: [], //8.3.1.3
    RecordRailwayOccurrences: [], //8.3.1.4
    ScopeDataAnalysisDetection: [], //8.3.1.5
    RecordRailwayOccurrencesCategories: [], //8.3.1.6
    ProceduresEnsureOccurrenceReportingInvestigation: [], //8.3.2
    ProceduresEnsureReportingInvestigation: [], //8.3.2.1
    InvestigationProcedureImmediateRootCauses: [], //8.3.2.2
    ScopeLevelInvestigation: [], //8.3.2.3
    InvestigationAppointedPersonsCompetenceIndependence: [], //8.3.2.4
    EvaluateImplementRecommendations: [], //8.3.2.5
    ConsiderInformationFromOtherOperators: [], //8.3.2.6
    ProceduresRelevantInformationLearningPreventiveMeasures: [], //8.3.2.7
    StandardisedArrangementsInvestigation: [], //8.3.2.8
    InternalAuditingSMS: [], //8.3.3
    InternalAuditingSystem: [], //8.3.3.1
    ProceduresSelectCompetentAuditors: [], //8.3.3.2
    SchedulePlannedInternalAudits: [], //8.3.3.3
    DetermineAdequacyEffectivenessSMS: [], //8.3.3.4
    SeniorManagementAwarenessResultsAudits: [], //8.3.3.5
    DocumentAuditsPlannedMonitoringArrangements: [], //8.3.3.6
    SMSProceduresCommunicateAuditResults: [], //8.3.3.7
    ReviewOfSMS: [], //8.3.4
    ContinuingSuitabilityEffectivenessReview: [], //8.3.4.1
    SMSReviewCognizanceEffectedChanges: [], //8.3.4.2
    EnsureEffectivenessSMSAssessed: [], //8.3.4.3
    DocumentedSummarisedReportedReview: [], //8.3.4.4
    OrganizationalLearning: [], //8.4
    CorrectiveActionDevelopment: [], //8.4.1
    ProcedureEnsureCorrectiveActionTaken: [], //8.4.1.1
    ProcedureIncludesCorrectiveActions: [], //8.4.1.2
    ProcedureLinkManagementChange: [], //8.4.1.3
    EnsuringContinuousImprovement: [], //8.4.2
    ProceduresEnsureContinuousImprovement: [], //8.4.2.1
    ProcessEffectiveDecisionMaking: [], //8.4.2.2
    ManagementOfChange: [], //8.4.3
    PolicyProcedureManagementChange: [], //8.4.3.1
    DocumentedProceduresAssessmentRisksImplications: [], //8.4.3.2
    ProceduresIdentifyAssessSafetyRisks: [], //8.4.3.3
    ProceduresManagementChangeAssessMitigateRisks: [], //8.4.3.4
    roceduresImplementationMitigatingMeasuresMonitoring: [], //8.4.3.5
    ProceduresStaffAwarenessNatureReasonChanges: [], //8.4.3.6
    ProceduresReviewChangeManagementProcesses: [], //8.4.3.7
    DocumentedProceduresContinuousImprovement: [], //8.4.4
    OperatorDocumentedProceduresContinuousImprovement: [], //8.4.4.1
    ProceduresAnalysisReportingIncidentsAccidents: [], //8.4.4.2
    ProceduresIdentifyReportInvestigateIncidents: [], //8.4.4.3
    ProceduresStaffAwarenessLessonsLearned: [], //8.4.4.4
    ProceduresReviewReviseSMS: [], //8.4.4.5

    //  ----------------- 9 -----------------------
    StructureAndResponsibility: [], //9.1
    AuthorityResponsibilityDist: [], //9.1.1
    SafetyResponsibilitiesAllocation: [], //9.1.1.1
    RailOpsMonitoring: [], //9.1.1.2
    ManagementImpact: [], //9.1.1.3
    Accountability: [], //9.1.1.4
    RailSafetyAllocations: [], //9.1.1.5
    RailSafetyCoordination: [], //9.1.1.6
    DelegationValidity: [], //9.1.1.7
    RailOpsResponsibilities: [], //9.1.1.8
    TaskDelegation: [], //9.1.1.9
    SafetyManager: [], //9.1.1.10. a)
    Empowerment: [], //9.1.1.10. b)
    Autonomy: [], //9.1.1.10. c)
    Responsibilize: [], //9.1.1.10. d)
    CertifyAccountability: [], //9.1.1.10. e)
    RailSafetyAuthority: [], //9.1.1.10. f. i)
    RailwaySafetySolutions: [], //9.1.1.10. f. ii)
    RailSafetyLearning: [], //9.1.1.10. f. iii)
    AuthenticationValidation: [], //9.1.1.10. f. iii)
    RailSafetyRoles: [], //9.1.1.11)
    RailwayResources: [], //9.1.1.12)
    AccountabilityEvidence: [], //9.1.2)
    SupervisionComplementsSafety: [], //9.1.2.1)
    StructureEvidence: [], //9.1.3)
    InterfaceIntegration: [], //9.1.3 a)
    Interfacedelivery: [], //9.1.3 b)
    EffAllocated: [], //9.1.3 c)
    SafetyConsiderations: [], //9.1.3 d)
    UniformityCriterion: [], //9.1.4)
    SafetyCriticalTaskVol: [], //9.1.4.1 a)
    Interconnectedness: [], //9.1.4.1 b I)
    CompliantCombinationSafety: [], //9.1.4.1 b II)
    Harmonioussemblance: [], //9.1.4.1 b III)
    HarmonySafetyProd: [], //9.1.4.1 c)

    PsychophysicalCondition: [], //9.2.1 a)
    fatigue: [], //9.2.1 b)
    substanceAbuse: [], //9.2.1 c)
    medication: [], //9.2.1 d)
    pregnancy: [], //9.2.1 e)
    trainingAndDevelopment: [], //9.2.1 f)
    employeeWellness: [], //9.2.1 g)

    SafetyInfoDocumentation: [], //9.3.1.1)
    DocuManageSys: [], //9.3.1.2)
    SafeConfigurator: [], //9.3.1.3)
    RelevantAndValid: [], //9.3.1.4 a)
    Accurate: [], //9.3.1.4 b)
    Complete: [], //9.3.1.4 c)
    AppropriatelyUpdated: [], //9.3.1.4 d)
    Controlled: [], //9.3.1.4 e)
    StreamlineEfficiency: [], //9.3.1.4 f)
    PreapplicationAwareness: [], //9.3.1.4 g)
    StaffCopiesFormalized: [], //9.3.1.4 h)
    SafetyStaffConsultationProcedure: [], //9.3.2.1)
    StaffConsultationArrangements: [], //9.3.2.2)
    SafetyAccessEase: [], //9.3.3.1 a)
    SafetyManagementDocumentation: [], //9.3.3.1 b)
    OperValidInfo: [], //9.3.3.2 a)
    PrevokeAwareness: [], //9.3.3.2 a)
    FormalCopiesGivenToStaff: [], //9.3.3.2 c)
    RailwayInformationSharing: [], //9.3.3.3)

    DocumentationProcessesAndProcedures: [], // 9.4,
    SMSDocumentation: [], // 9.4.1,
    DocumentationConfirmation: [], // 9.4.1.1,
    UserManualDetailAndSupportingInformation: [], // 9.4.1.2,
    SetOfProcedures: [], // 9.4.1.3,
    ConsistentSafetyManagementSystem: [], // 9.4.1.4,
    SMSReportDescription: [], // 9.4.2,
    PreparedSMSReport: [], // 9.4.2.1,
    ComprehensiveWorkingDocument: [], // 9.4.2.2,
    VisibilityOfProcesses: [], // 9.4.2.3,
    UpdatedSMSReport: [], // 9.4.2.4,
    RegulatorInformedOfChanges: [], // 9.4.2.5,
    SMSREvidenceAndConfidence: [], // 9.4.2.6,
    DocumentManagement: [], // 9.4.3,
    SafetyManagementSystemDocuments: [], // 9.4.3.1,
    DocumentSystemsAndProcedures: [], // 9.4.3.2,
    SMSDocumentsConsidered: [], // 9.4.3.3,
    ReviewAndApprovalOfDocuments: [], // 9.4.3.4,
    MasterListDocumentControlProcedure: [], // 9.4.3.5,
    DocumentControlSystemAndArrangements: [], // 9.4.3.6,
    ProceduresForReviewAndUpdating: [], // 9.4.3.7,
    ProceduresForSafetyInformation: [], // 9.4.3.8,
    SafetyImprovementPlanAndReport: [], // 9.4.4,
    SIPBasedOnReviewAndIndicators: [], // 9.4.4.1,
    FindingsListAndTargets: [], // 9.4.4.2,
    SIPKPIsTargetsObjectives: [], // 9.4.4.3,
    CorrectiveActionsMonitoring: [], // 9.4.4.4,
    ChangesToSMSAndRailwayOperations: [], // 9.4.5,
    //-------------------- 10 --------------------
    SafetyStandardsForEngineering: [], // 10.1
    SafetyStandardsConfirmation: [], // 10.1.1
    DocumentedSetOfStandards: [], // 10.1.1.1
    ControlAndVerificationProcedures: [], // 10.1.1.2
    SystemsProceduresAndStandards: [], // 10.1.1.3
    ProceduresToMeetStandards: [], // 10.1.2
    SafetyManagementSystemCompliance: [], // 10.1.2.1
    InspectionAndTestingProcedures: [], // 10.1.2.2
    EstablishmentAndMaintenanceArrangements: [], // 10.1.2.3
    EquipmentControlCalibrationMaintenance: [], // 10.1.2.4
    MaintenanceProcedures: [], // 10.1.2.5
    OperationsMaintenanceEmergency: [], // 10.2,
    UseOfContractorsAndControlOfSuppliers: [], // 10.2.1,
    OperatorProcessesAndProcedures: [], // 10.2.1.1,
    CriteriaSelectionAccreditation: [], // a),
    EnsureSuppliersSatisfyRequirements: [], // b),
    OperatorEnsuresMonitoring: [], // c),
    OperatorEnsureUndertakeChecks: [], // d),
    OperatorEnsureImplementMeasures: [], // e),
    ResponsibilitiesTasksRailwaySafety: [], // 10.2.1.2,
    AssetManagement: [], // 10.2.2,
    OperatorHasAssetManagementPolicy: [], // 10.2.2.1,
    AssetManagementPolicyProcesses: [], // 10.2.2.2,
    EffectiveConfigurationManagementSystem: [], // 10.2.2.3,
    OperatorSubmitsComprehensiveAssetRegister: [], // 10.2.2.4,
    OccurrenceManagement: [], // 10.2.3,
    ConfirmEvidence: [], // 10.2.3.1,
    ContingencyPlanRailwayOperations: [], // (a),
    PlanIntegratedSimilarPlans: [], // (b),
    PlanBasedOnRiskAssessment: [], // (c),
    PlanReviewedRecently: [], // (d),
    EvidencePeriodicallyTestingEmergencyPlans: [], // (e),
    PlanIncludesMinimumProcedures: [], // 10.2.3.2,
    SecurityManagement: [], // 10.2.4,
    SafetyManagementSystemIncludes: [], // 10.2.4.1,
    SecurityManagementPlanMeasures: [], // a),
    SystemsProceduresEnsureProtection: [], // b),
    NotifyingReportingSecurityIncidents: [], // c),
    ResponseMeasuresImplemented: [], // d),
    SecurityManagementPlanIncludesAll: [], // 10.2.4.2,
    InteroperabilityManagementOfInterfaces: [], // 10.2.5,
    ExistenceUpdatedInterfaceRegister: [], // 10.2.5.1,
    ProceduresIdentificationDevelopmentMonitoring: [], // 10.2.5.2,
    InterfaceAgreementContainsRelevantDiagrams: [], // 10.2.5.3,
    ChangesIdentifiedRevisedReflectChanges: [], // 10.2.5.4,
    TransportationOfDangerousGoods: [], // 10.2.6,
    OperatorIdentifiedAnalysedMitigatedRisks: [], // 10.2.6.1,
    ProvisionSpecialisedTrainingHandlingTransportation: [], // 10.2.6.2,
    ExistenceProceduresProcessesIdentifyDangerousGoods: [], // 10.2.6.3,
    ExistenceUpdatedEmergencyPlanMinimisationImpact: [], // 10.2.6.4,
    ExistenceProceduresProcessesPlacingWagons: [], // 10.2.6.5,
    ExistenceSystemDocumentationDataControl: [], // 10.2.6.6,
    PresenceAdequacySystemPreventTamperingTheft: [], // 10.2.6.7,
    StaffInvolvedHandlingDangerousGoods: [], // 10.2.6.8,
    OperatorProcessesMinimisingEnvironmentalImpact: [], // 10.2.6.9,
    OperatorCompliesResponsibilitiesTrainOperator: [], // 10.2.6.10,
    ComplianceWithNetworkSpecificRequirements: [], // 10.3.1,
    TypesOfRollingStockIndicated: [], // ➢
    DocumentationOutlinesCompliance: [], // ➢,
    AdditionalMaintenanceRequirementsIdentified: [], // ➢
    AdditionalRequirementsManageIncidents: [], // ➢
    SafeDesignOfRailwayInfrastructure: [], // 10.3.2
    ProceduresEnsureSafeDesign: [], // 10.3.2.1
    ProceduresTakeIntoAccountTechnicalChange: [], // 10.3.2.2
    ProceduresShowRelevantRules: [], // 10.3.2.3
    SafeOperationOfInfrastructure: [], // 10.3.3 S
    ProceduresEnsureSafeOperation: [], // 10.3.3.1
    ProceduresShowSafetyManaged: [], // 10.3.3.2
    ProceduresShowCooperationCoordination: [], // 10.3.3.3
    ProceduresShowRulesCoveringSafeOperation: [], // 10.3.3.4
    ProvisionOfMaintenanceMaterial: [], // 10.3.4 P
    ProceduresEnsureMaintenanceUndertakenSafely: [], // 10.3.4.1
    ProceduresEnsureMaintenanceMeetsNeeds: [], // 10.3.4.2
    ProceduresShowRulesCoveringSupply: [], // 10.3.4.3
    MaintenanceOperationTrafficControlSignallingSystem: [], // 10.3.5 M
    ProceduresEnsureSafeOperationRailway: [], // 10.3.5.1
    ProceduresComplyTechnicalOperationalStandards: [], // 10.3.5.2
    ProceduresShowSafetyManagedBorders: [], // 10.3.5.3
    ProceduresShowRulesCoveringSafeOperationIdentified: [], // 10.3.5.4
    ProceduresTakeIntoAccountTechnicalInfrastructureChange: [], // 10.3.5.5
    ProceduresShowRulesCoveringDesign: [], // 10.3.5.6
  });

  const { onHandleBack, onHandleNext, step, setFormData, formData } =
    useFormState();
  const { register, handleSubmit, watch, control } = useForm<TFormValues>({
    defaultValues: application ? application.step9 : formData.step9,
  });
  const { loading, submitting, uploadDocument } = useFormSubmission();
  debugger;
  useEffect(() => {
    const initComments = application
      ? application.step9?.comments
      : formData?.step9?.comments;
    if (initComments) {
      debugger;
      setComments(initComments);
    }
  }, []);

  const onHandleFormSubmit = (data: any) => {
    debugger;
    if (isAdministrator?.isAdministrator) {
      application.step9 = data;
      application.step9.comments = comments;
      setFormData((prevFrormData) => ({
        ...prevFrormData,
        step9: application.step9,
      }));
      submitting(application)
        .then((response: any) => {
          onHandleNext();
        })
        .catch((error: any) => {});
    } else {
      data.comments = comments;
      setFormData((prevFrormData) => ({ ...prevFrormData, step9: data }));
      if (application) {
        application.step9 = data;
        submitting(application)
          .then((data: any) => {
            onHandleNext();
          })
          .catch((error: any) => {});
      } else {
        if (formData?.step9 == null) {
          formData.step9 = data;
        }
        submitting(formData)
          .then((data: any) => {
            onHandleNext();
          })
          .catch((error: any) => {});
      }
    }
  };

  const handleCloseModal = (identifier: string) => {
    debugger;
    if (comment) {
      setComments((prevComments) => ({
        ...prevComments,
        [identifier]: [...comments[identifier], comment],
      }));
    }

    setOpenModal(false);
    setComment("");
  };

  const handleFileChange = (event) => {
    handleUpload(event.target.files[0]);
  };

  const handleFileUpload = (file) => {
    // const formData = new FormData();
    // formData.append("file", file);
    //console.log("WILL start upload ", file);

    uploadDocument(file, input)
      .then((dataFile: any) => {
        //console.log("dataFile ", dataFile);
        setFormFiles((prevData) => ({ ...prevData, [input]: dataFile }));
      })
      .catch((error: any) => {
        //console.log("File upload Failed", error);
      });
  };

  const tab_8_2_array = [
    {
      numbering: "8.2.1",
      html_content:
        "<span>RISK CONTROL MEASURES FOR RISKS ASSOCIATED WITH THE ACTIVITY OF THE RAILWAY OPERATOR Note: This specific criterion provides a practical interpretation of the general risk identification requirements contained in the SANS 3000-series of standards...</span>",
      unique_id: "RiskControlMeasuresRailwayOperator",
      type: "file",
    },
    {
      numbering: "8.2.1.1",
      html_content:
        "<span>There are procedures put into place to identify risks associated with railway operations, including those directly arising from work activities, job design or workload and the activities of other organisations/persons</span>",
      unique_id: "IdentifyRisksRailwayOperations",
      type: "component",
    },
    {
      numbering: "8.2.1.2",
      html_content:
        "<span>There are procedures in place to develop and put into place risk control measures</span>",
      unique_id: "DevelopRiskControlMeasures",
      type: "component",
    },
    {
      numbering: "8.2.1.3",
      html_content:
        "<span>There are procedures in place to monitor the effectiveness of risk control arrangements and to implement changes when required.</span>",
      unique_id: "MonitorEffectivenessRiskControl",
      type: "component",
    },
    {
      numbering: "8.2.1.4",
      html_content:
        "<span>There are procedures in place to recognise the need to work together with other operators, where appropriate, on issues where they have shared interfaces that are likely to affect the putting in place of adequate risk control measures.</span>",
      unique_id: "WorkWithOtherOperatorsRiskControl",
      type: "component",
    },
    {
      numbering: "8.2.1.5",
      html_content:
        "<span>There are procedures for agreed documentation and communication with the relevant entities including the identification of roles and responsibilities of each participating organisation and the specifications for information exchanges</span>",
      unique_id: "DocumentationCommunicationProcedures",
      type: "component",
    },
    {
      numbering: "8.2.1.6",
      html_content:
        "<span>There are procedures to monitor the effectiveness of these arrangements and to implement changes when required</span>",
      unique_id: "MonitorEffectivenessArrangements",
      type: "component",
    },
    {
      numbering: "8.2.2",
      html_content:
        "<span>RISKS ARISING FROM THE ACTIVITIES OF OTHER PARTIES EXTERNAL TO THE RAILWAY SYSTEM (EXPECTED EVIDENCE) All the criteria apply equally to all groups of Operators</span>",
      unique_id: "RisksFromExternalParties",
      type: "file",
    },
    {
      numbering: "8.2.2.1",
      html_content:
        "<span>There are procedures to identify potential risks from parties external to the railway system where appropriate and reasonable.</span>",
      unique_id: "IdentifyRisksExternalParties",
      type: "component",
    },
    {
      numbering: "8.2.2.2",
      html_content:
        "<span>There are procedures to establish control measures to mitigate the risks identified under 8.2.2.1 insofar as the responsibilities of the applicant are concerned.</span>",
      unique_id: "EstablishControlMeasuresExternalParties",
      type: "component",
    },
    {
      numbering: "8.2.2.3",
      html_content:
        "<span>There are procedures to monitor the effectiveness of the measures identified under 8.2.2. and implement changes where appropriate.</span>",
      unique_id: "MonitorEffectivenessMeasuresExternalParties",
      type: "component",
    },
    {
      numbering: "8.2.3",
      html_content:
        "<span>Procedures and methods for carrying out risk evaluation and implementing risk control measures whenever a change of the operating conditions or new material imposes new risks on the infrastructure or on operation (EXPECTED EVIDENCE) All the criteria apply equally to all groups of Operators</span>",
      unique_id: "RiskEvaluationAndControlMeasures",
      type: "file",
    },
    {
      numbering: "8.2.3.1",
      html_content:
        "<span>There are management procedures for changes in equipment, procedures, organisation, staffing or interfaces.</span>",
      unique_id: "ManagementProceduresForChanges",
      type: "component",
    },
    {
      numbering: "8.2.3.2",
      html_content:
        "<span>There are risk assessment procedures to manage changes and to apply a standardised methodology on risk evaluation and assessment when required.</span>",
      unique_id: "RiskAssessmentProcedures",
      type: "component",
    },
    {
      numbering: "8.2.3.3",
      html_content:
        "<span>The operator has procedures in place to feed the results of risk assessment into other processes within the organisation and make them visible to relevant staff.</span>",
      unique_id: "FeedResultsIntoProcesses",
      type: "component",
    },
    {
      numbering: "8.2.4",
      html_content:
        "<span>Compliance with legislation, rules and standards Note: Operators must identify and understand the applicable laws and all other relevant standards and prescriptive conditions and must implement a system of controls to achieve compliance...</span>",
      unique_id: "ComplianceWithLegislationRulesStandards",
      type: "file",
    },
    {
      numbering: "8.2.4.1",
      html_content:
        "<span>Confirm through evidence that: An updated register is in place identifying all applicable legislation, regulations and standards consistent with the type and extent of services operated by the Operator.</span>",
      unique_id: "UpdatedRegisterLegislationStandards",
      type: "component",
    },
  ];
  const tab_8_3_array = [
    {
      numbering: "8.3.1",
      html_content:
        "<span>SAFETY DATA COLLECTION AND ANALYSIS (EXPECTED EVIDENCE) The criteria apply equally to all groups of operators except where otherwise indicated</span>",
      unique_id: "SafetyDataCollectionAnalysis",
      type: "file",
    },
    {
      numbering: "8.3.1.1",
      html_content:
        "<span>Confirm through evidence that: The operator has in place an occurrence reporting policy, procedure and a system for reporting, collating occurrences and to conduct meaningful safety data trend analysis.</span>",
      unique_id: "OccurrenceReportingPolicyProcedure",
      type: "component",
    },
    {
      numbering: "8.3.1.2",
      html_content:
        "<span>Confirm through evidence that: The Operator collate and analyse both leading and lagging indicators. (Not applicable to Group C)</span>",
      unique_id: "CollateAnalyzeIndicators",
      type: "component",
    },
    {
      numbering: "8.3.1.3",
      html_content:
        "<span>Confirm through evidence that: The Operator’s collection of safety data is based on monitoring and it considers the following elements...</span>",
      unique_id: "CollectionOfSafetyDataElements",
      type: "component",
    },
    {
      numbering: "8.3.1.4",
      html_content:
        "<span>Confirm through evidence that: The Operator record railway occurrences in sufficient detail to meaningfully facilitate the development of management information and identify trends and thereby enable management interventions and corrective actions to address negative trends. (Not applicable to Group C)</span>",
      unique_id: "RecordRailwayOccurrences",
      type: "component",
    },
    {
      numbering: "8.3.1.5",
      html_content:
        "<span>Confirm through evidence that: The scope of data analysis includes the detection of: ➢ any deviance from expected outcomes (using lagging indicators); ➢ process anomalies (using leading indicators). (Not applicable to Group C)</span>",
      unique_id: "ScopeDataAnalysisDetection",
      type: "component",
    },
    {
      numbering: "8.3.1.6",
      html_content:
        "<span>Confirm through evidence that: The operator records its railway occurrences in the categories as per the latest template made available by the RSR.</span>",
      unique_id: "RecordRailwayOccurrencesCategories",
      type: "component",
    },
    {
      numbering: "8.3.2",
      html_content:
        "<span>Procedures to ensure that accidents, incidents, near misses and other dangerous occurrences are reported, investigated and analysed and that necessary preventive measures are taken Note: Also refer to 10.2.3 (Occurrence Management) (EXPECTED EVIDENCE) The criteria apply equally to all groups of operators except where otherwise indicated</span>",
      unique_id: "ProceduresEnsureOccurrenceReportingInvestigation",
      type: "file",
    },
    {
      numbering: "8.3.2.1",
      html_content:
        "<span>There are procedures to ensure that accidents, incidents, near misses and other dangerous occurrences: (a) are reported, logged, investigated and analysed; (b) are reported to the RSR as required by the Act</span>",
      unique_id: "ProceduresEnsureReportingInvestigation",
      type: "component",
    },
    {
      numbering: "8.3.2.2",
      html_content:
        "<span>The investigation procedure of the operator aims to determine the immediate, contributory and root causes of each railway occurrence and implementation of the corrective action(s) needed to prevent recurrences.</span>",
      unique_id: "InvestigationProcedureImmediateRootCauses",
      type: "component",
    },
    {
      numbering: "8.3.2.3",
      html_content:
        "<span>The scope and level of the investigation are determined by the frequency of the railway occurrence and the severity or consequences (or both), both actual and potential.</span>",
      unique_id: "ScopeLevelInvestigation",
      type: "component",
    },
    {
      numbering: "8.3.2.4",
      html_content:
        "<span>Persons appointed by the operator to investigate occurrences have the necessary competence and independence, both in relation to the nature and seriousness of the occurrence, and the scope and level of the investigation.</span>",
      unique_id: "InvestigationAppointedPersonsCompetenceIndependence",
      type: "component",
    },
    {
      numbering: "8.3.2.5",
      html_content:
        "<span>There are procedures to ensure that recommendations from the RSR and from industry as well as from internal investigations are evaluated and implemented if appropriate.</span>",
      unique_id: "EvaluateImplementRecommendations",
      type: "component",
    },
    {
      numbering: "8.3.2.6",
      html_content:
        "<span>Relevant reports/information from other interfacing railway operators and maintenance service providers are considered and taken into account</span>",
      unique_id: "ConsiderInformationFromOtherOperators",
      type: "component",
    },
    {
      numbering: "8.3.2.7",
      html_content:
        "<span>There are procedures in place for relevant information relating to the investigation and causes of accidents, incidents, near misses and other dangerous occurrences to be used to learn and, where required, to adopt preventive measures.</span>",
      unique_id: "ProceduresRelevantInformationLearningPreventiveMeasures",
      type: "component",
    },
    {
      numbering: "8.3.2.8",
      html_content:
        "<span>Standardised arrangements exist for when and how investigation is carried out include: a) procedures for internal and external accident and incident notification and reporting; b) procedures, formats and approaches (e.g., site protocol) for investigations...</span>",
      unique_id: "StandardisedArrangementsInvestigation",
      type: "component",
    },
    {
      numbering: "8.3.3",
      html_content:
        "<span>Processes to ensure the recurrent Internal Auditing of the SMS (EXPECTED EVIDENCE) This criterion applies equally to Group A and B operators. Group C: Exempted</span>",
      unique_id: "InternalAuditingSMS",
      type: "file",
    },
    {
      numbering: "8.3.3.1",
      html_content:
        "<span>Confirm through evidence that: (i)There is an internal auditing system which is independent and impartial, and which acts in a transparent way. (ii) Regular internal compliance audits are carried out...</span>",
      unique_id: "InternalAuditingSystem",
      type: "component",
    },
    {
      numbering: "8.3.3.2",
      html_content:
        "<span>Confirm through evidence that: There are procedures in place to identify and select suitably competent auditors.</span>",
      unique_id: "ProceduresSelectCompetentAuditors",
      type: "component",
    },
    {
      numbering: "8.3.3.3",
      html_content:
        "<span>Confirm through evidence that: There is a schedule of planned internal audits, which can be revised depending on the results of previous audits and monitoring of performance.</span>",
      unique_id: "SchedulePlannedInternalAudits",
      type: "component",
    },
    {
      numbering: "8.3.3.4",
      html_content:
        "<span>Confirm through evidence that procedures are in place to: (a) determine the adequacy and effectiveness of each element and subelement of the SMS as part of an integrated process for managing...</span>",
      unique_id: "DetermineAdequacyEffectivenessSMS",
      type: "component",
    },
    {
      numbering: "8.3.3.5",
      html_content:
        "<span>Confirm through evidence that: There are procedures to ensure that senior levels of the management chain are aware of the results of audits and take overall responsibility for implementation of changes...</span>",
      unique_id: "SeniorManagementAwarenessResultsAudits",
      type: "component",
    },
    {
      numbering: "8.3.3.6",
      html_content:
        "<span>Confirm through evidence that: There is a document showing how audits are planned in relation to routine monitoring arrangements to ensure compliance with internal procedures and standards</span>",
      unique_id: "DocumentAuditsPlannedMonitoringArrangements",
      type: "component",
    },
    {
      numbering: "8.3.3.7",
      html_content:
        "<span>Confirm through evidence that: The safety management system includes procedures for: a) communicating the results of audits to those people who are responsible for the oversight of the railway operations...</span>",
      unique_id: "SMSProceduresCommunicateAuditResults",
      type: "component",
    },
    {
      numbering: "8.3.4",
      html_content:
        "<span>Review of the SMS Note: The safety management system must include systems and procedures for the review of the safety management system at specified periods (EXPECTED EVIDENCE) These criteria apply...</span>",
      unique_id: "ReviewOfSMS",
      type: "file",
    },
    {
      numbering: "8.3.4.1",
      html_content:
        "<span>Confirm through evidence that: In order to ensure the continuing suitability and effectiveness of the SMS, the operator’s SMS has been reviewed at least annually.</span>",
      unique_id: "ContinuingSuitabilityEffectivenessReview",
      type: "component",
    },
    {
      numbering: "8.3.4.2",
      html_content:
        "<span>Confirm through evidence that: The SMS has been reviewed and the review took cognizance of the effected changes, including those resulting from: a) changes to legislation, in particular to the relevant...</span>",
      unique_id: "SMSReviewCognizanceEffectedChanges",
      type: "component",
    },
    {
      numbering: "8.3.4.3",
      html_content:
        "<span>Confirm through evidence that in conducting the safety management system review the rail operator have ensured: a) that the effectiveness of the safety management system is assessed (including an examination...</span>",
      unique_id: "EnsureEffectivenessSMSAssessed",
      type: "component",
    },
    {
      numbering: "8.3.4.4",
      html_content:
        "<span>All of the above aspects of the safety management system review have been documented, and subsequently summarised and reported in the Safety Improvement Plan provided to the RSR. (Refer to 9.4.4) (Group C exempted)</span>",
      unique_id: "DocumentedSummarisedReportedReview",
      type: "component",
    },
  ];
  const tab_8_4_array = [
    {
      numbering: "8.4",
      html_content:
        "<span>ORGANIZATIONAL LEARNING The effective safety management system should rely on a continual, structured and documented reflection upon practice through monitoring performance, analysing data and results and establishing a feedback system to continuously improve its safety performance, culture and attitude</span>",
      unique_id: "OrganizationalLearning",
      type: "file",
    },
    {
      numbering: "8.4.1",
      html_content:
        "<span>CORRECTIVE ACTION DEVELOPMENT (EXPECTED EVIDENCE) This criterion applies equally to all groups of Operators except where otherwise indicated</span>",
      unique_id: "CorrectiveActionDevelopment",
      type: "file",
    },
    {
      numbering: "8.4.1.1",
      html_content:
        "<span>Does the Operator’s safety management system include a procedure to ensure that, so far as is reasonably practicable, corrective action is taken in response to any safety deficiencies identified following inspections, testing, audits, investigations or notifiable occurrences.</span>",
      unique_id: "ProcedureEnsureCorrectiveActionTaken",
      type: "component",
    },
    {
      numbering: "8.4.1.2",
      html_content:
        "<span>In particular, does the procedure includes the following: a) registration of any corrective actions taken (which register is in use and is it updated; b) the review of those corrective actions (by who...</span>",
      unique_id: "ProcedureIncludesCorrectiveActions",
      type: "component",
    },
    {
      numbering: "8.4.1.3",
      html_content:
        "<span>Does the procedure for the implementation of corrective action provide a link to processes for the management of change where appropriate? (See also section 8.4.3 on Management of Change) (Group C Exempted...</span>",
      unique_id: "ProcedureLinkManagementChange",
      type: "component",
    },
    {
      numbering: "8.4.2",
      html_content:
        "<span>ENSURING CONTINUOUS IMPROVEMENT Notes: In assessing against these criteria, the auditor/assessor should remember that requirements for continuous improvement should be built into all phases of safety management development and not just...</span>",
      unique_id: "EnsuringContinuousImprovement",
      type: "file",
    },
    {
      numbering: "8.4.2.1",
      html_content:
        "<span>Confirm through evidence that: There are procedures in place to ensure, where reasonably practicable, the continuous improvement of the safety management system. These include: (a) procedures for periodic reviews of the safety management system...</span>",
      unique_id: "ProceduresEnsureContinuousImprovement",
      type: "component",
    },
    {
      numbering: "8.4.2.2",
      html_content:
        "<span>Confirm through evidence that: In order to be effective and support decision-making, the operator’s continuous improvement process cover and extend to all relevant phases of an organisation’s SMS, e.g.: (a) planning of preventive/corrective actions...</span>",
      unique_id: "ProcessEffectiveDecisionMaking",
      type: "component",
    },
    {
      numbering: "8.4.3",
      html_content:
        "<span>MANAGEMENT OF CHANGE (EXPECTED EVIDENCE) This criterion applies equally to all Groups of Operators except where otherwise indicated</span>",
      unique_id: "ManagementOfChange",
      type: "file",
    },
    {
      numbering: "8.4.3.1",
      html_content:
        "<span>Confirm through evidence that: The Operator has in place a policy and procedure for the management of change? (Group C Exempted)</span>",
      unique_id: "PolicyProcedureManagementChange",
      type: "component",
    },
    {
      numbering: "8.4.3.2",
      html_content:
        "<span>Confirm through evidence that: There are documented procedures for the assessment of the safety risks, and also the organisational implications, of changes to the organisation’s structure, plans, responsibilities, accountabilities, and its SMS...</span>",
      unique_id: "DocumentedProceduresAssessmentRisksImplications",
      type: "component",
    },
    {
      numbering: "8.4.3.3",
      html_content:
        "<span>Confirm through evidence that: There are procedures to identify and assess safety risks arising from changes to the operator’s activities or to its SMS, in particular, the introduction of new services, changes to...</span>",
      unique_id: "ProceduresIdentifyAssessSafetyRisks",
      type: "component",
    },
    {
      numbering: "8.4.3.4",
      html_content:
        "<span>Confirm through evidence that: There are procedures in place for the management of change which include at least the following: a) procedures for assessing and mitigating risks arising from changes to the organisation’s structure...</span>",
      unique_id: "ProceduresManagementChangeAssessMitigateRisks",
      type: "component",
    },
    {
      numbering: "8.4.3.5",
      html_content:
        "<span>Confirm through evidence that: There are procedures to ensure the implementation of mitigating measures, and monitoring of the effectiveness of these mitigating measures, and implementing changes where required. (Group C Exempted)</span>",
      unique_id: "ProceduresImplementationMitigatingMeasuresMonitoring",
      type: "component",
    },
    {
      numbering: "8.4.3.6",
      html_content:
        "<span>Confirm through evidence that: There are procedures in place to ensure that staffs are made aware of the nature and reason for the changes. (Group C Exempted)</span>",
      unique_id: "ProceduresStaffAwarenessNatureReasonChanges",
      type: "component",
    },
    {
      numbering: "8.4.3.7",
      html_content:
        "<span>Confirm through evidence that: There are procedures in place for the review of change management processes to ensure that they are adequate and effective in mitigating risks. (Group C Exempted)</span>",
      unique_id: "ProceduresReviewChangeManagementProcesses",
      type: "component",
    },
    {
      numbering: "8.4.4",
      html_content:
        "<span>Documented procedures to ensure continuous improvement (expected evidence) This criterion applies equally to all Groups of Operators except where otherwise indicated</span>",
      unique_id: "DocumentedProceduresContinuousImprovement",
      type: "file",
    },
    {
      numbering: "8.4.4.1",
      html_content:
        "<span>Confirm through evidence that: The Operator has documented procedures to ensure continuous improvement. (Group C Exempted)</span>",
      unique_id: "OperatorDocumentedProceduresContinuousImprovement",
      type: "component",
    },
    {
      numbering: "8.4.4.2",
      html_content:
        "<span>Confirm through evidence that: There are procedures for the analysis and reporting of incidents, accidents, dangerous occurrences and unplanned events with the objective of introducing corrective action, preventive measures, and sharing...</span>",
      unique_id: "ProceduresAnalysisReportingIncidentsAccidents",
      type: "component",
    },
    {
      numbering: "8.4.4.3",
      html_content:
        "<span>Confirm through evidence that: There are procedures to identify, report and investigate incidents and accidents which may have implications for the safe operation of the rail service. (Group C Exempted)</span>",
      unique_id: "ProceduresIdentifyReportInvestigateIncidents",
      type: "component",
    },
    {
      numbering: "8.4.4.4",
      html_content:
        "<span>Confirm through evidence that: There are procedures in place to ensure that all relevant staff are made aware of lessons learned from analysis of incidents, accidents, and occurrences affecting safety performance and to...</span>",
      unique_id: "ProceduresStaffAwarenessLessonsLearned",
      type: "component",
    },
    {
      numbering: "8.4.4.5",
      html_content:
        "<span>Confirm through evidence that: There are procedures in place to ensure that the safety management system is reviewed and revised on a regular basis, and as a minimum annually. (Group C Exempted)</span>",
      unique_id: "ProceduresReviewReviseSMS",
      type: "component",
    },
  ];
  const tab_9_4_array = [
    {
      numbering: "9.4",
      html_content:
        "<span>DOCUMENTATION Processes and procedures describing activities, having direct and indirect effects on railway safety, are relevant parts of the SMS, both at an organisational and operational level and should be duly documented to ensure traceability.</span>",
      unique_id: "DocumentationProcessesAndProcedures",
      type: "file",
    },
    {
      numbering: "9.4.1",
      html_content:
        "<span>SMS DOCUMENTATION (EXPECTED EVIDENCE) This criterion applies equally to all groups of operators except where otherwise indicated</span>",
      unique_id: "SMSDocumentation",
      type: "file",
    },
    {
      numbering: "9.4.1.1",
      html_content:
        "<span>Confirm through evidence that there are up-to-date and consolidated documentation (User Manual) exists describing the characteristics and elements of the safety management system.</span>",
      unique_id: "DocumentationConfirmation",
      type: "component",
    },
    {
      numbering: "9.4.1.2",
      html_content:
        "<span>The user manual must detail and give supporting information and evidence of the different processes or company standards/rules implemented (or in the phase of implementation), cross-referencing or linked to the items in this document.</span>",
      unique_id: "UserManualDetailAndSupportingInformation",
      type: "component",
    },
    {
      numbering: "9.4.1.3",
      html_content:
        "<span>In addition to the manual, a set of procedures is requested. (Note: A procedure is the specified way to perform a task</span>",
      unique_id: "SetOfProcedures",
      type: "component",
    },
    {
      numbering: "9.4.1.4",
      html_content:
        '<span>Confirm through evidence that the safety management system is in a form that is consistent with this guideline. It must:<ul class="list-disc"><li>a) be evidenced in writing;</li><li>b) provide a comprehensive and integrated management system for all aspects of control measures adopted in accordance with the legislation;</li><li>c) be set out and expressed in a way that its contents are readily accessible and comprehensible to persons who use it;</li><li>d) be prepared in accordance with this guideline;</li><li>e) contain the matters and information required by the Standards and this guideline;</li><li>f) be kept and maintained in accordance with the Standards and this guideline;</li><li>g) and state the persons responsible for the development of all, or all parts of, the safety management system.</li></ul></span>',
      unique_id: "ConsistentSafetyManagementSystem",
      type: "component",
    },
    {
      numbering: "9.4.2",
      html_content:
        "<span>SMS REPORT The SMS Report describes the Operator’s organisational and procedural arrangements through which it will ensure safety of railway operations. The structure and content of the SMSR is defined on clause 9.4.2.3 of the Determination, and A1 of this guide (EXPECTED EVIDENCE) This criterion applies equally to all groups of Operators except where otherwise indicated</span>",
      unique_id: "SMSReportDescription",
      type: "file",
    },
    {
      numbering: "9.4.2.1",
      html_content:
        '<span>Is the Operator’s SMS Report prepared in accordance with the Determination and can it:<ul class="list-disc"><li>a) be evidenced in writing;</li><li>b) provide for a comprehensive and integrated management system for all aspects of control measures adopted in accordance with the legislation;</li><li>c) is set out and expressed in a way that its contents are readily accessible and comprehensible to persons who use it;</li><li>d) contain the matters and information required by the Standards and this guideline;</li><li>e) is kept and maintained in accordance with the Standards and this guideline; and</li><li>f) state the persons responsible for the development of all, or all parts of, the safety management system.</li><li>g) The structure and content must comply with the SMSR Determination (also see A1 of this guide)</li></ul></span>',
      unique_id: "PreparedSMSReport",
      type: "component",
    },
    {
      numbering: "9.4.2.2",
      html_content:
        "<span>Does the SMSR provide for a comprehensive working document against which both the operator and the regulator can check that the accepted risk control measures and SMS have been put properly into place and continue to operate in the way in which they were intended.</span>",
      unique_id: "ComprehensiveWorkingDocument",
      type: "component",
    },
    {
      numbering: "9.4.2.3",
      html_content:
        "<span>Is there visibility of the processes being applied to demonstrate that the operator’s arrangements for ensuring safety are effective and sufficiently robust? (Not applicable to Group C)</span>",
      unique_id: "VisibilityOfProcesses",
      type: "component",
    },
    {
      numbering: "9.4.2.4",
      html_content:
        "<span>Confirm through evidence that the operator has kept the SMS Report up to date and amended it to reflect changes in operations.</span>",
      unique_id: "UpdatedSMSReport",
      type: "component",
    },
    {
      numbering: "9.4.2.5",
      html_content:
        "<span>The Regulator has been informed timely of any changes made to the SMS (See 9.4.5 below)</span>",
      unique_id: "RegulatorInformedOfChanges",
      type: "component",
    },
    {
      numbering: "9.4.2.6",
      html_content:
        "<span>Does the SMSR provide adequate evidence and does it instill confidence that the operator has the ability, commitment, organization and resources to properly assess and effectively control the risks to assets, environment, health and safety of its customers, staff, contractors, visitors and others who may be affected by its railway operations?</span>",
      unique_id: "SMSREvidenceAndConfidence",
      type: "component",
    },
    {
      numbering: "9.4.3",
      html_content:
        "<span>DOCUMENT MANAGEMENT (EXPECTED EVIDENCE) The criteria are equally applicable to all groups of Operators</span>",
      unique_id: "DocumentManagement",
      type: "file",
    },
    {
      numbering: "9.4.3.1",
      html_content:
        "<span>Does the safety management system have systems and procedures to control and manage all documents and information relevant to the management of risks associated with safe railway operations?</span>",
      unique_id: "SafetyManagementSystemDocuments",
      type: "component",
    },
    {
      numbering: "9.4.3.2",
      html_content:
        '<span>Do the systems and procedures in 9.4.3.1 include:<ul class="list-disc"><li>a) the identification, creation, maintenance, management, storage and retention of records and documents;</li><li>b) ensuring the validity of documents required for railway operations; and</li><li>c) the communication of any changes to the document control systems and procedures, to rail safety workers and employees of the rail operator who rely on those systems and procedures to carry out their work.</li></ul></span>',
      unique_id: "DocumentSystemsAndProcedures",
      type: "component",
    },
    {
      numbering: "9.4.3.3",
      html_content:
        '<span>Are the following documents pertaining to the SMS considered:<ul class="list-disc"><li>a) procedures listed in this guideline and other procedures applicable at company level;</li><li>b) safety plans/ reports;</li><li>c) audit and monitoring results;</li><li>d) documents related to implementation of corrective/preventive actions;</li><li>e) any other operational document that is necessary to ensure compliance with applicable rules (rule books, route books, safety orders, etc.), including all operational information described as “configuration control of safety information”;</li><li>f) applicable standards;</li><li>g) any other technical document that is related to life cycle of equipment and operation and with risk analysis.</li></ul></span>',
      unique_id: "SMSDocumentsConsidered",
      type: "component",
    },
    {
      numbering: "9.4.3.4",
      html_content:
        "<span>Are safety-related documents and data reviewed and approved for adequacy prior to issue and use?</span>",
      unique_id: "ReviewAndApprovalOfDocuments",
      type: "component",
    },
    {
      numbering: "9.4.3.5",
      html_content:
        "<span>Does a master list or equivalent document control procedure exist identifying current revision status of documents should be established and be readily available to preclude the use of invalid or obsolete documents?</span>",
      unique_id: "MasterListDocumentControlProcedure",
      type: "component",
    },
    {
      numbering: "9.4.3.6",
      html_content:
        '<span>The document control system and arrangements ensure that:<ul class="list-disc"><li>a) the pertinent issues of appropriate documents are available at all locations where operations essential to the effective functioning of the safety management system are performed and</li><li>b) invalid or obsolete documents are promptly removed from all points of issue or use, or otherwise assured against unintended use. any obsolete documents retained for legal or knowledge preservation purposes are suitably identified</li></ul></span>',
      unique_id: "DocumentControlSystemAndArrangements",
      type: "component",
    },
    {
      numbering: "9.4.3.7",
      html_content:
        "<span>Are procedures in place to ensure the review, updating and approval of documents and data for applicability and validity</span>",
      unique_id: "ProceduresForReviewAndUpdating",
      type: "component",
    },
    {
      numbering: "9.4.3.8",
      html_content:
        "<span>There are procedures to ensure that all relevant safety information is accurate, complete, consistent, easy to understand, appropriately updated, and duly documented</span>",
      unique_id: "ProceduresForSafetyInformation",
      type: "component",
    },
    {
      numbering: "9.4.4",
      html_content:
        "<span>SAFETY IMPROVEMENT PLAN AND SAFETY PERFORMANCE REPORT (EXPECTED EVIDENCE) These criteria apply equally to all Groups</span>",
      unique_id: "SafetyImprovementPlanAndReport",
      type: "file",
    },
    {
      numbering: "9.4.4.1",
      html_content:
        '<span>The safety improvement plan (SIP) is based on(i) review of past safety performance of the operator based on occurrence data trend analyses (Safety Performance Report), (ii) information on how the organisation\'s corporate safety targets are met and the results of previous safety plans, (iii) the development of safety indicators (KPI’s) (lagging and leading indicators), (iv) the results of risk assessments, internal safety auditing and SMS review and observations on deficiencies and malfunctions of railway operations and infrastructure management that might be relevant for the safety authority. The Safety Performance Report contains:<ul class="list-disc"><li>a) a description and assessment of the safety performance of the operator’s railway operations;</li><li>b) comment on any deficiencies, and any irregularities, in the railway operations that may be relevant to the safety of the railway;</li><li>c) a description of any safety initiatives in relation to the railway operations undertaken during the reporting period or proposed to be undertaken in the next reporting period; and</li><li>d) any other information or performance indications prescribed in this Guideline and the relevant SANS 3000 -1 Standard (Group C exempted) Confirm through evidence that the Safety Improvement Plan contains:<ul class="list-disc"><li>Safety Performance Report</li><li>Results of the most recent risk assessment and the control strategies</li><li>results of internal safety auditing</li><li>analysis of occurrence data to identify safety trends</li><li>Results of trend analysis using historical data of railway occurrences reportable to the RSR, and also the root causes</li><li>the development of safety indicators (both leading and lagging indicators)</li><li>Observations on deficiencies and malfunctions of railway operations and infrastructure management</li><li>information on how the organisation\'s safety targets are met and the results of safety plans;</li><li>A list of the most critical railway safety issues to be addressed for the next year and beyond</li><li>Where appropriate, annual safety performance targets must be set for each discipline or department of the operator. These targets shall promote continual improvement - see 8.4.2</li><li>Deviations from the original planned asset maintenance interventions.</li><li>The summary of the SMS review as required by 8.3.4</li></ul></li></ul></span>',
      unique_id: "SIPBasedOnReviewAndIndicators",
      type: "component",
    },
    {
      numbering: "9.4.4.2",
      html_content:
        "<span>Confirm through evidence that:(i) Based on the findings of (a) and (d) above, a list of the most critical railway issues to be addressed for the next 5 years. (ii) A list of the annual corporate safety performance targets and associated initiatives to achieve the targets for the next 5 years.</span>",
      unique_id: "FindingsListAndTargets",
      type: "component",
    },
    {
      numbering: "9.4.4.3",
      html_content:
        '<span>KPIs, Targets and Safety objectives set within the SIP are:<ul class="list-disc"><li>a) relevant to the results of the Safety Performance report;</li><li>b) Specific, Measurable, Attainable; Realistic, Time-bound;</li><li>c) Allocated to designated persons within the organisation with a role to implement the objectives</li><li>d) Quarterly reviewed and adjusted, where so required</li><li>e) Aimed at continuous improvement</li></ul></span>',
      unique_id: "SIPKPIsTargetsObjectives",
      type: "component",
    },
    {
      numbering: "9.4.4.4",
      html_content:
        "<span>Corrective actions to achieve the set targets are monitored, measured and reported to the head of the operator’s organization.</span>",
      unique_id: "CorrectiveActionsMonitoring",
      type: "component",
    },
    {
      numbering: "9.4.5",
      html_content:
        "<span>CHANGES TO THE SMS AND RAILWAY OPERATIONS (EXPECTED EVIDENCE) This criterion is applicable to all groups of Operators) Confirm through evidence that the Operator has a procedure to inform the RSR of changes (minor or material) made to the SMS and Railway Operations. Changes must be communicated 30 days before changes are planned to be implemented. Major changes will require more time for the RSR to provide approvals.</span>",
      unique_id: "ChangesToSMSAndRailwayOperations",
      type: "file",
    },
  ];

  const tab_10_1_array = [
    {
      numbering: "10.1",
      html_content:
        "<span>SAFETY STANDARDS FOR ENGINEERING AND OPERATIONAL SYSTEMS Note: Also refer to the SANS 3000 and RSR standards suite of Standards</span>",
      unique_id: "SafetyStandardsForEngineering",
      type: "file",
    },
    {
      numbering: "10.1.1",
      html_content:
        "<span>SAFETY STANDARDS FOR ENGINEERING AND OPERATIONAL SYSTEMS Confirm through evidence that:</span>",
      unique_id: "SafetyStandardsConfirmation",
      type: "file",
    },
    {
      numbering: "10.1.1.1",
      html_content:
        '<span>A documented set of engineering standards and procedures, and operational systems, safety standards and procedures, to cover the following, and, if relevant, the interface between any two or more of them has been established:<ul class="list-disc"><li>rail infrastructure;</li><li>rolling stock;</li><li>Operational systems</li></ul></span>',
      unique_id: "DocumentedSetOfStandards",
      type: "component",
    },
    {
      numbering: "10.1.1.2",
      html_content:
        "<span>procedures for the control and verification of the design of structures, rolling stock, equipment, and systems, in accordance with the engineering standards and procedures, and operational systems safety standards exist.</span>",
      unique_id: "ControlAndVerificationProcedures",
      type: "component",
    },
    {
      numbering: "10.1.1.3",
      html_content:
        '<span>systems, procedures and standards for the following in relation to rail infrastructure and rolling stock exist:<ul class="list-disc"><li>engineering design;</li><li>construction and installation;</li><li>implementation and commissioning;</li><li>monitoring and maintenance;</li><li>system operation;</li><li>modification;</li><li>decommissioning or disposal</li></ul></span>',
      unique_id: "SystemsProceduresAndStandards",
      type: "component",
    },
    {
      numbering: "10.1.2",
      html_content:
        "<span>PROCEDURES TO MEET EXISTING, NEW AND ALTERED TECHNICAL AND OPERATIONAL STANDARDS OR OTHER PRESCRIPTIVE CONDITIONS (EXPECTED EVIDENCE) This criterion applies equally to all Groups of Operators except where otherwise indicated</span>",
      unique_id: "ProceduresToMeetStandards",
      type: "file",
    },
    {
      numbering: "10.1.2.1",
      html_content:
        "<span>Confirm through evidence that Operator’s safety management system provides for procedures for the rail operator to monitor its compliance with the standards and procedures specified in section 10.1.1 and taking actions when non-compliance is identified</span>",
      unique_id: "SafetyManagementSystemCompliance",
      type: "component",
    },
    {
      numbering: "10.1.2.2",
      html_content:
        '<span>Confirm through evidence that procedures for the inspection and testing of safety-related engineering and operational systems have been established to provide evidence of the condition of rail infrastructure or rolling stock. The procedures must fulfil the following criteria:<ul class="list-disc"><li>a) must define the location, method, level of detail and frequency of inspection and testing.</li><li>b) frequencies of inspection and testing consider the operational criteria, rate of deterioration, consequences of failure, frequency of occurrences and performance data [Reliability, Availability, Maintainability and Safety (RAMS)].</li><li>c) inspection and testing are undertaken according to a set schedule and in response to defined events.</li></ul></span>',
      unique_id: "InspectionAndTestingProcedures",
      type: "component",
    },
    {
      numbering: "10.1.2.3",
      html_content:
        "<span>arrangements for the establishment and maintenance of inspection and test records to provide evidence of the condition of rail infrastructure or rolling stock are established. These records must fulfil the requirements of section 9.4.3 on Document Management. Page 85 of 101</span>",
      unique_id: "EstablishmentAndMaintenanceArrangements",
      type: "component",
    },
    {
      numbering: "10.1.2.4",
      html_content:
        "<span>the safety management system has procedures in place for the control, calibration and maintenance of all equipment used to inspect or test rail infrastructure or rolling stock.</span>",
      unique_id: "EquipmentControlCalibrationMaintenance",
      type: "component",
    },
    {
      numbering: "10.1.2.5",
      html_content:
        "<span>the safety management system has procedures in place to ensure that maintenance is carried out according to the relevant requirements</span>",
      unique_id: "MaintenanceProcedures",
      type: "component",
    },
  ];

  const tab_10_2_array = [
    {
      numbering: "10.2",
      html_content:
        "<span>OPERATIONS, MAINTENANCE AND EMERGENCY ACTIVITIES Note: Refer to the SANS 3000 series of Standards</span>",
      unique_id: "OperationsMaintenanceEmergency",
      type: "file",
    },
    {
      numbering: "10.2.1",
      html_content:
        "<span>USE OF CONTRACTORS AND CONTROL OF SUPPLIERS Notes: The use of contracts is a generally accepted way to manage risks. However, the prime responsibility for managing contractors and checking their delivery against the set specifications originally rests with the Operator. The use of contractors or sub-contractors does not mean that the Operator delegates any of their responsibilities for ensuring that the contracted services are carried out to the standards specified before operation. The main objective of the RSR in the assessment process is to satisfy itself that the process for managing contractors exists and is described in the SMS. The checking of whether these arrangements work in practice is part of the RSR’s supervision activities after the award of the Safety Permit. (EXPECTED EVIDENCE) This criterion applies equally to all groups of Operators, except where otherwise indicated)</span>",
      unique_id: "UseOfContractorsAndControlOfSuppliers",
      type: "file",
    },
    {
      numbering: "10.2.1.1",
      html_content:
        "<span>The Operator have processes and procedures in place for:</span>",
      unique_id: "OperatorProcessesAndProcedures",
      type: "component",
    },
    {
      numbering: "a)",
      html_content:
        "<span>criteria for selection and accreditation of contractors and suppliers;</span>",
      unique_id: "CriteriaSelectionAccreditation",
      type: "component",
    },
    {
      numbering: "b)",
      html_content:
        '<span>to ensure suppliers, partners and subcontractors satisfy the same requirements as the railway operator itself is required to meet. This is accomplished by ensuring that the corresponding contracts shall cover all the relevant requirements, including at least:<ul class="list-disc"><li>responsibilities and tasks relating to railway safety issues,</li><li>the obligations related to the transfer of relevant information between both partners and</li><li>the traceability of safety-related documents;</li></ul></span>',
      unique_id: "EnsureSuppliersSatisfyRequirements",
      type: "component",
    },
    {
      numbering: "c)",
      html_content:
        "<span>the Operator ensures, through appropriate monitoring, that the supplies and services offered consistently meet safety requirements;</span>",
      unique_id: "OperatorEnsuresMonitoring",
      type: "component",
    },
    {
      numbering: "d)",
      html_content:
        "<span>the operator must ensure that its suppliers, partners and subcontractors undertake to accept the checks, inspections and audits called for by what is contained in the contracts;</span>",
      unique_id: "OperatorEnsureUndertakeChecks",
      type: "component",
    },
    {
      numbering: "e)",
      html_content:
        "<span>the Operator ensures that preventive or corrective measures are implemented after checks, inspections and audits.</span>",
      unique_id: "OperatorEnsureImplementMeasures",
      type: "component",
    },
    {
      numbering: "10.2.1.2",
      html_content:
        "<span>Responsibilities and tasks relating to railway safety issues are clearly defined, known and allocated between the contracting partners and among all other interested parties</span>",
      unique_id: "ResponsibilitiesTasksRailwaySafety",
      type: "component",
    },
    {
      numbering: "10.2.2",
      html_content:
        "<span>ASSET MANAGEMENT (EXPECTED EVIDENCE) This criterion applies equally to all groups of Operators except where otherwise indicated)</span>",
      unique_id: "AssetManagement",
      type: "file",
    },
    {
      numbering: "10.2.2.1",
      html_content:
        "<span>The Operator has in place an asset management policy. (Not applicable to Group C)</span>",
      unique_id: "OperatorHasAssetManagementPolicy",
      type: "component",
    },
    {
      numbering: "10.2.2.2",
      html_content:
        "<span>The asset management policy and processes provide detail of the principles and means by which the organisation will enact the management of its assets, the configuration management requirements for its assets to ensure continuity throughout the various life stages, and the organisation’s responsibilities and accountabilities associated with the management of its assets. . (Not applicable to Group C)</span>",
      unique_id: "AssetManagementPolicyProcesses",
      type: "component",
    },
    {
      numbering: "10.2.2.3",
      html_content:
        "<span>Confirm through evidence that the Operator has an effective configuration management system, as part of the safety management system for assets, which assist in tracking any changes made to the asset (both functional and physical) during its lifecycle and ensure the correct operating context is considered during design, manufacture, commissioning, operation, modification, decommissioning and disposal.(Not applicable to Group C)</span>",
      unique_id: "EffectiveConfigurationManagementSystem",
      type: "component",
    },
    {
      numbering: "10.2.2.4",
      html_content:
        "<span>Confirmation that the Operator regularly submits to the RSR a comprehensive and updated rail asset register as well as maintenance data in the form and format as prescribed by the Regulator (Refer to the RSR requirements as per the NIMS Asset Management Module).</span>",
      unique_id: "OperatorSubmitsComprehensiveAssetRegister",
      type: "component",
    },
    {
      numbering: "10.2.3",
      html_content:
        "<span>OCCURRENCE MANAGEMENT (EXPECTED EVIDENCE) This criterion applies equally to all Groups of operators</span>",
      unique_id: "OccurrenceManagement",
      type: "file",
    },
    {
      numbering: "10.2.3.1",
      html_content: "<span>Confirm through evidence the following:</span>",
      unique_id: "ConfirmEvidence",
      type: "component",
    },
    {
      numbering: "(a)",
      html_content:
        "<span>Is there a contingency plan for railway operations that covers all identified emergency scenarios, and</span>",
      unique_id: "ContingencyPlanRailwayOperations",
      type: "component",
    },
    {
      numbering: "(b)",
      html_content:
        "<span>Is the plan integrated with similar plans of other operators at the interfaces as well as with those of external emergency responders?</span>",
      unique_id: "PlanIntegratedSimilarPlans",
      type: "component",
    },
    {
      numbering: "(c)",
      html_content: "<span>Is the plan based on risk assessment</span>",
      unique_id: "PlanBasedOnRiskAssessment",
      type: "component",
    },
    {
      numbering: "(d)",
      html_content:
        "<span>Has the plan been reviewed recently or after a major accident</span>",
      unique_id: "PlanReviewedRecently",
      type: "component",
    },
    {
      numbering: "(e)",
      html_content:
        "<span>Evidence of periodically testing of the emergency plans, including joint exercises with other involved parties, in order to monitor the effectiveness and update of the emergency plans. (Not applicable to Group C)</span>",
      unique_id: "EvidencePeriodicallyTestingEmergencyPlans",
      type: "component",
    },
    {
      numbering: "10.2.3.2",
      html_content:
        '<span>Does the plan include at a minimum provide for:<ul class="list-disc"><li>initial response procedures;</li><li>call-out procedures;</li><li>on-site management of the occurrence;</li><li>minimization of hazards on the scene</li><li>liaison with emergency responders;</li><li>testing of plans</li><li>evacuation procedures;</li><li>initiation of investigation;</li><li>environmental response and rehabilitation; and</li><li>restoration of normal services</li></ul></span>',
      unique_id: "PlanIncludesMinimumProcedures",
      type: "component",
    },
    {
      numbering: "10.2.4",
      html_content:
        "<span>Security Management (EXPECTED EVIDENCE) This criterion applies equally to all groups of Operators, except where otherwise indicated)</span>",
      unique_id: "SecurityManagement",
      type: "file",
    },
    {
      numbering: "10.2.4.1",
      html_content: "<span>Does the safety management system include:</span>",
      unique_id: "SafetyManagementSystemIncludes",
      type: "component",
    },
    {
      numbering: "a)",
      html_content:
        "<span>A security management plan that includes measures to protect people from theft, assault, sabotage, terrorism and other criminal acts of other parties and from other harm;</span>",
      unique_id: "SecurityManagementPlanMeasures",
      type: "component",
    },
    {
      numbering: "b)",
      html_content:
        "<span>Systems and procedures to ensure that safety-critical railway assets are protected from theft, sabotage, vandalism and other criminal acts,</span>",
      unique_id: "SystemsProceduresEnsureProtection",
      type: "component",
    },
    {
      numbering: "c)",
      html_content:
        "<span>Notifying and reporting security incidents to the RSR and other relevant authorities, and</span>",
      unique_id: "NotifyingReportingSecurityIncidents",
      type: "component",
    },
    {
      numbering: "d)",
      html_content:
        "<span>systems and procedures to ensure that the appropriate response measures of the security plan are implemented without delay if such a security incident occurs</span>",
      unique_id: "ResponseMeasuresImplemented",
      type: "component",
    },
    {
      numbering: "10.2.4.2",
      html_content:
        '<span>Does the security management plan include all of the following:<ul class="list-disc"><li>a list of the risks arising from theft, vandalism, assault, sabotage, terrorism, and other criminal acts or other sources of harm;</li><li>a description of the preventative and response measures to be used to manage those risks, including a description of the policies, procedures and equipment and other physical resources that it is proposed to use for those measures, and of the training that it is proposed to be provided;</li><li>if the rail operator shares a location, such as a model interchange or a port with one or more operators, a description of the arrangements made with those other operators in relation to that location to prevent or respond to security incidents;</li><li>procedures for the recording, reporting and analysis of security incidents;</li><li>the allocation of security roles and responsibilities to appropriate people;</li><li>provision for liaison, the sharing of information and for joint operations with emergency services and with other operators who may be affected by the implementation of the plan; and</li><li>provision for the evaluation, testing and if necessary, the revision, of security measures and procedures.</li></ul></span>',
      unique_id: "SecurityManagementPlanIncludesAll",
      type: "component",
    },
    {
      numbering: "10.2.5",
      html_content:
        "<span>INTEROPERABILITY AND MANAGEMENT OF INTERFACES AND INTRAFACES (Refer to SANS 3000 Part 2-6: Technical requirements for engineering and operational standards – Interface and intraface management, and interoperability) (EXPECTED EVIDENCE) This criterion applies equally to all groups of Operators, except where otherwise indicated)</span>",
      unique_id: "InteroperabilityManagementOfInterfaces",
      type: "file",
    },
    {
      numbering: "10.2.5.1",
      html_content: "<span>Existence of an updated interface register</span>",
      unique_id: "ExistenceUpdatedInterfaceRegister",
      type: "component",
    },
    {
      numbering: "10.2.5.2",
      html_content:
        '<span>Does the safety management system include procedures for:<ul class="list-disc"><li>the identification of interface risks to the safety of railway operations;</li><li>the development and implementation of interface agreements to manage the interface risks identified; and</li><li>monitoring the implementation and effectiveness of and compliance with interface agreements</li></ul></span>',
      unique_id: "ProceduresIdentificationDevelopmentMonitoring",
      type: "component",
    },
    {
      numbering: "10.2.5.3",
      html_content:
        "<span>Does the interface agreement contain relevant diagrams, photographs, engineering standards and technical or engineering drawings attached to the agreement?</span>",
      unique_id: "InterfaceAgreementContainsRelevantDiagrams",
      type: "component",
    },
    {
      numbering: "10.2.5.4",
      html_content:
        "<span>If changes are identified through monitoring and review of risk, the agreement should be revised to reflect the changes. In addition, rail operators should ensure that the changes are reflected in their risk register and their safety management system more broadly</span>",
      unique_id: "ChangesIdentifiedRevisedReflectChanges",
      type: "component",
    },
    {
      numbering: "10.2.6",
      html_content:
        "<span>TRANSPORTATION OF DANGEROUS GOODS Note: Refer to SANS 10405 (EXPECTED EVIDENCE) This criterion is equally applicable to groups A and B Operators only Confirm through evidence the following:</span>",
      unique_id: "TransportationOfDangerousGoods",
      type: "file",
    },
    {
      numbering: "10.2.6.1",
      html_content:
        "<span>Evidence that the Operator has identified, analysed and mitigated the risks associated with the handling and transportation of dangerous goods as required in SANS 10405</span>",
      unique_id: "OperatorIdentifiedAnalysedMitigatedRisks",
      type: "component",
    },
    {
      numbering: "10.2.6.2",
      html_content:
        "<span>Provision of specialised training in the handling and transportation of dangerous goods commensurate with the duties they perform</span>",
      unique_id: "ProvisionSpecialisedTrainingHandlingTransportation",
      type: "component",
    },
    {
      numbering: "10.2.6.3",
      html_content:
        "<span>Existence of appropriate procedures and processes in place to identify dangerous goods according to established standards</span>",
      unique_id: "ExistenceProceduresProcessesIdentifyDangerousGoods",
      type: "component",
    },
    {
      numbering: "10.2.6.4",
      html_content:
        "<span>The existence of an up -dated emergency preparedness and response plan for dealing with occurrences involving dangerous goods and the minimisation of their impact</span>",
      unique_id: "ExistenceUpdatedEmergencyPlanMinimisationImpact",
      type: "component",
    },
    {
      numbering: "10.2.6.5",
      html_content:
        "<span>Existence of updated procedures and processes in place for placing wagons in the prescribed consist in accordance with the compatibility requirements?</span>",
      unique_id: "ExistenceProceduresProcessesPlacingWagons",
      type: "component",
    },
    {
      numbering: "10.2.6.6",
      html_content:
        "<span>Existence of a system for documentation and data control relating to the acceptance, handling and transportation of dangerous goods?</span>",
      unique_id: "ExistenceSystemDocumentationDataControl",
      type: "component",
    },
    {
      numbering: "10.2.6.7",
      html_content:
        "<span>Presence and adequacy of a system in place to prevent tampering or theft of dangerous goods in transit or on site or in yards.</span>",
      unique_id: "PresenceAdequacySystemPreventTamperingTheft",
      type: "component",
    },
    {
      numbering: "10.2.6.8",
      html_content:
        "<span>Are staff involved in handling of dangerous goods supplied with suitable personal protective equipment and trained in the use thereof?</span>",
      unique_id: "StaffInvolvedHandlingDangerousGoods",
      type: "component",
    },
    {
      numbering: "10.2.6.9",
      html_content:
        "<span>Does the Operator have processes in place for minimising environmental impact from dangerous goods related occurrences</span>",
      unique_id: "OperatorProcessesMinimisingEnvironmentalImpact",
      type: "component",
    },
    {
      numbering: "10.2.6.10",
      html_content:
        '<span>Does the Operator comply to the following responsibilities of the train operator:<ul class="list-disc"><li>confirmation of the suitability and service worthiness of the rolling stock or containers (or both) supplied to consignors;</li><li>confirmation of the accuracy of documentation for the dangerous goods to be conveyed;</li><li>have procedures in place for shunting and marshalling of rolling stock, including compatibility requirements;</li><li>have procedures in place for in -transit monitoring of the rolling stock, containers and integrity of the dangerous goods load;</li><li>an appropriate contingency plan; and</li><li>railway occurrence management.</li></ul></span>',
      unique_id: "OperatorCompliesResponsibilitiesTrainOperator",
      type: "component",
    },
  ];

  const tab_10_3_array = [
    {
      numbering: "10.3.1",
      html_content:
        "<span>COMPLIANCE WITH NETWORK-SPECIFIC REQUIREMENTS FOR MANAGEMENT OF ROLLING STOCK</span>",
      unique_id: "ComplianceWithNetworkSpecificRequirements",
      type: "file",
    },
    {
      numbering: "➢",
      html_content:
        "<span>In the SMS documentation, the types of rolling stock to be used on the specific network and the type of operations to be conducted are clearly indicated.</span>",
      unique_id: "TypesOfRollingStockIndicated",
      type: "component",
    },
    {
      numbering: "➢",
      html_content:
        "<span>The documentation outlines how the train operator complies with any operational restrictions placed on the type of rolling stock used on the network.</span>",
      unique_id: "DocumentationOutlinesCompliance",
      type: "component",
    },
    {
      numbering: "➢",
      html_content:
        "<span>In the documentation, any additional maintenance requirements for the network concerned are identified and appropriate arrangements for maintenance are in place.</span>",
      unique_id: "AdditionalMaintenanceRequirementsIdentified",
      type: "component",
    },
    {
      numbering: "➢",
      html_content:
        "<span>In the documentation, any additional requirements to manage rolling stock incidents for the network concerned are identified and appropriate arrangements are put in place.</span>",
      unique_id: "AdditionalRequirementsManageIncidents",
      type: "component",
    },
    {
      numbering: "10.3.2",
      html_content: "<span>SAFE DESIGN OF THE RAILWAY INFRASTRUCTURE</span>",
      unique_id: "SafeDesignOfRailwayInfrastructure",
      type: "file",
    },
    {
      numbering: "10.3.2.1",
      html_content:
        "<span>There are procedures to ensure the safe design of the infrastructure throughout the life cycle of the infrastructure, covering design and installation.</span>",
      unique_id: "ProceduresEnsureSafeDesign",
      type: "component",
    },
    {
      numbering: "10.3.2.2",
      html_content:
        "<span>There is procedures, which take into account technical change of the infrastructure and the management of that change.</span>",
      unique_id: "ProceduresTakeIntoAccountTechnicalChange",
      type: "component",
    },
    {
      numbering: "10.3.2.3",
      html_content:
        "<span>There are procedures which show that relevant rules covering the design of the infrastructure and any national safety methods have been identified and that the applicant can comply with them.</span>",
      unique_id: "ProceduresShowRelevantRules",
      type: "component",
    },
    {
      numbering: "10.3.3 S",
      html_content: "<span>SAFE OPERATION OF THE INFRASTRUCTURE</span>",
      unique_id: "SafeOperationOfInfrastructure",
      type: "file",
    },
    {
      numbering: "10.3.3.1",
      html_content:
        "<span>There are procedures to ensure that the infrastructure is managed and operated safely, taking into account the number, type and extent of operators running services on the network including all necessary interactions depending on the complexity of the operation.</span>",
      unique_id: "ProceduresEnsureSafeOperation",
      type: "component",
    },
    {
      numbering: "10.3.3.2",
      html_content:
        "<span>There are procedures which show how safety is managed at the physical and/or operational borders of the infrastructure</span>",
      unique_id: "ProceduresShowSafetyManaged",
      type: "component",
    },
    {
      numbering: "10.3.3.3",
      html_content:
        "<span>There are procedures which show how effective cooperation and coordination is managed, both in normal and emergency situations.</span>",
      unique_id: "ProceduresShowCooperationCoordination",
      type: "component",
    },
    {
      numbering: "10.3.3.4",
      html_content:
        "<span>There are procedures which show that rules covering the safe operation and management of infrastructure/vehicle interfaces have been identified and that the applicant can comply with them.</span>",
      unique_id: "ProceduresShowRulesCoveringSafeOperation",
      type: "component",
    },
    {
      numbering: "10.3.4 P",
      html_content: "<span>PROVISION OF MAINTENANCE & MATERIAL</span>",
      unique_id: "ProvisionOfMaintenanceMaterial",
      type: "file",
    },
    {
      numbering: "10.3.4.1",
      html_content:
        "<span>There are procedures to ensure that maintenance of the infrastructure is undertaken safely, including clear management control and documented audit and inspection.</span>",
      unique_id: "ProceduresEnsureMaintenanceUndertakenSafely",
      type: "component",
    },
    {
      numbering: "10.3.4.2",
      html_content:
        "<span>There are procedures which ensure that the maintenance of the infrastructure meets the specific needs of the network.</span>",
      unique_id: "ProceduresEnsureMaintenanceMeetsNeeds",
      type: "component",
    },
    {
      numbering: "10.3.4.3",
      html_content:
        "<span>There are procedures which show that rules covering the supply of maintenance and material have been identified and that the applicant can comply with them.</span>",
      unique_id: "ProceduresShowRulesCoveringSupply",
      type: "component",
    },
    {
      numbering: "10.3.5 M",
      html_content:
        "<span>MAINTENANCE AND OPERATION OF THE TRAFFIC CONTROL AND SIGNALLING SYSTEM</span>",
      unique_id: "MaintenanceOperationTrafficControlSignallingSystem",
      type: "file",
    },
    {
      numbering: "10.3.5.1",
      html_content:
        "<span>There are procedures to ensure that the traffic control and signalling system is operated and maintained so as to ensure the safe operation of the railway.</span>",
      unique_id: "ProceduresEnsureSafeOperationRailway",
      type: "component",
    },
    {
      numbering: "10.3.5.2",
      html_content:
        "<span>There are procedures to comply with existing, new and altered technical and operational standards</span>",
      unique_id: "ProceduresComplyTechnicalOperationalStandards",
      type: "component",
    },
    {
      numbering: "10.3.5.3",
      html_content:
        "<span>There are procedures which set out how safety is managed at the physical and/or operational borders of the traffic control and signalling system, including how cooperation, if necessary, is managed.</span>",
      unique_id: "ProceduresShowSafetyManagedBorders",
      type: "component",
    },
    {
      numbering: "10.3.5.4",
      html_content:
        "<span>There are procedures which show that rules covering the safe operation and maintenance of the traffic control and signalling system have been identified and that the applicant can comply with them.</span>",
      unique_id: "ProceduresShowRulesCoveringSafeOperationIdentified",
      type: "component",
    },
    {
      numbering: "10.3.5.5",
      html_content:
        "<span>There is procedures, which take into account technical change of the infrastructure and the management of that change.</span>",
      unique_id: "ProceduresTakeIntoAccountTechnicalInfrastructureChange",
      type: "component",
    },
    {
      numbering: "10.3.5.6",
      html_content:
        "<span>There are procedures which show that relevant rules covering the design of the infrastructure and any national safety methods have been identified and that the applicant can comply with them. (Not applicable to a Group C)</span>",
      unique_id: "ProceduresShowRulesCoveringDesign",
      type: "component",
    },
  ];

  return (
    <div>
      <form className="pb-6 px-6" onSubmit={handleSubmit(onHandleFormSubmit)}>
        <div className="flex flex-col gap-1">
          <ol className="">
            <li>
              {asip ? (
                <h4 className="text-l font-semibold uppercase">
                  Annual Safety Improvement Plans(ASIP)
                </h4>
              ) : (
                <h4 className="text-l font-semibold uppercase">
                  Safety Management System (SMS Determination, 2018)
                </h4>
              )}
            </li>
            <div>
              {asip ? (
                <>
                  <div className="flex justify-between gap-10 py-2 text-sm items-cente my-5">
                    <div className="">
                      <span className="pr-3">A - 1 :</span>
                      <label htmlFor="smsReportFiles">
                        Annual Safety Improvement Plans(ASIP)
                      </label>
                    </div>
                    <div className="flex gap-5 items-center">
                      <input
                        id={"networkOperationItems.stationDiagrams"}
                        type="file"
                        multiple
                        placeholder=""
                        className="border rounded-md w-full"
                        onChange={(event) =>
                          handleFileUpload(
                            event.target.files,
                            "networkOperationItems.stationDiagrams"
                          )
                        }
                        // {...register("networkOperationItems.stationDiagrams")}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between gap-10 py-2 text-sm items-cente my-5">
                    <div className="">
                      <label htmlFor="smsReportFiles">
                        Nominated manager letter
                      </label>
                    </div>
                    <div className="flex gap-5 items-center">
                      <input
                        id={"networkOperationItems.stationDiagrams"}
                        type="file"
                        multiple
                        placeholder=""
                        className="border rounded-md w-full"
                        onChange={(event) =>
                          handleFileUpload(
                            event.target.files,
                            "networkOperationItems.stationDiagrams"
                          )
                        }
                        // {...register("networkOperationItems.stationDiagrams")}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between gap-10 py-2 text-sm items-cente my-5">
                    <div className="">
                      <label htmlFor="smsReportFiles">Asset Register</label>
                    </div>
                    <div className="flex gap-5 items-center">
                      <input
                        id={"networkOperationItems.stationDiagrams"}
                        type="file"
                        multiple
                        placeholder=""
                        className="border rounded-md w-full"
                        onChange={(event) =>
                          handleFileUpload(
                            event.target.files,
                            "networkOperationItems.stationDiagrams"
                          )
                        }
                        // {...register("networkOperationItems.stationDiagrams")}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-10 py-2 text-sm items-cente my-5">
                    <div className="">
                      <span className="pr-3">A - 1 :</span>
                      <label htmlFor="smsReportFiles">
                        Click on "Upload" button to upload SMS report for DESIGN
                        AND IMPROVEMENT section.T
                      </label>
                    </div>
                    <div className="flex gap-5 items-center">
                      <input
                        id={"networkOperationItems.stationDiagrams"}
                        type="file"
                        multiple
                        placeholder=""
                        className="border rounded-md w-full"
                        onChange={(event) =>
                          handleFileUpload(
                            event.target.files,
                            "networkOperationItems.stationDiagrams"
                          )
                        }
                        // {...register("networkOperationItems.stationDiagrams")}
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <Tabs
                  defaultValue={
                    asip ? "implementation" : "designAndImprovement"
                  }
                  className={"w-full"}
                >
                  {asip ? (
                    <TabsList className="flex justify-around w-full h-12 bg-gray">
                      <TabsTrigger
                        value="implementation"
                        className="hidden"
                      ></TabsTrigger>
                    </TabsList>
                  ) : (
                    <TabsList className="flex justify-around w-full h-12 bg-gray">
                      <TabsTrigger value="designAndImprovement">
                        DESIGN AND IMPROVEMENT
                      </TabsTrigger>
                      <TabsTrigger value="implementation">
                        IMPLEMENTATION
                      </TabsTrigger>
                      <TabsTrigger value="operationalActivities">
                        OPERATIONAL ACTIVITIES
                      </TabsTrigger>
                    </TabsList>
                  )}

                  <TabsContent value="designAndImprovement" className="px-5">
                    <div className="py-2 text-sm items-center leading-8">
                      <div className="">
                        <span className="pr-3 py-2">8.</span>
                        <label htmlFor="smsReportFiles">
                          PROCEDURES FOR DESIGN AND IMPROVEMENT
                        </label>
                      </div>
                      {/* accordion here */}
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="leadership">
                          <AccordionTrigger>
                            <div className="">
                              <span className="pr-3">8.1</span>
                              <label htmlFor="smsReportFiles">LEADERSHIP</label>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-5">
                            <div className="">
                              <span className="pr-3">8.1.1</span>
                              <label htmlFor="smsReportFiles">
                                MANAGEMENT COMMITMENT (EXPECTED EVIDENCE) This
                                criterion applies equally except where otherwise
                                indicated Based on the results of evidence found
                                in the list below the assessor must make an
                                informed and objective finding on the level of
                                management commitment
                              </label>
                            </div>
                            <FormSectionComponent
                              application={application}
                              isAdministrator={isAdministrator}
                              commentKey={"ManagementCommitmentEvidence"}
                              register={register}
                              comments={comments.ManagementCommitmentEvidence}
                              comment={comment}
                              setComment={setComment}
                              handleCloseModal={() =>
                                handleCloseModal("ManagementCommitmentEvidence")
                              }
                            />

                            <div className="py-2 mt-3 text-sm items-center">
                              <div className="">
                                <span className="pr-3">a)</span>
                                <label htmlFor="SafetyPolicy">
                                  Safety Policy and objectives
                                </label>
                              </div>
                            </div>

                            <FormSectionComponent
                              application={application}
                              isAdministrator={isAdministrator}
                              commentKey={"SafetyPolicy"}
                              register={register}
                              comments={comments.SafetyPolicy}
                              comment={comment}
                              setComment={setComment}
                              handleCloseModal={() =>
                                handleCloseModal("SafetyPolicy")
                              }
                            />

                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">b)</span>
                                  <label htmlFor="smsReportFilesCorporateSafety">
                                    Corporate safety targets{" "}
                                    <strong>(Not applicable to Group C)</strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"CorporateSafety"}
                                register={register}
                                comments={comments.CorporateSafety}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("CorporateSafety")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">c)</span>
                                  <label htmlFor="smsReportFilesCompetenceManagement">
                                    Competence management system and training{" "}
                                    <strong>(Not applicable to Group C)</strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"CompetenceManagement"}
                                register={register}
                                comments={comments.CompetenceManagement}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("CompetenceManagement")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">d)</span>
                                  <label htmlFor="smsReportFilesProvisionAdequate">
                                    Provision of adequate resources{" "}
                                    <strong>(Not applicable to Group C)</strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"ProvisionAdequate"}
                                register={register}
                                comments={comments.ProvisionAdequate}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("ProvisionAdequate")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">e)</span>
                                  <label htmlFor="smsReportFilesRiskControl">
                                    Risk controls
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"RiskControl"}
                                register={register}
                                comments={comments.RiskControl}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("RiskControl")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">f)</span>
                                  <label htmlFor="smsReportFilesReceivingInformation">
                                    Receiving information (monitor){" "}
                                    <strong>(Not applicable to Group C)</strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"ReceivingInformation"}
                                register={register}
                                comments={comments.ReceivingInformation}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("ReceivingInformation")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">g)</span>
                                  <label htmlFor="smsReportFilesReviewOfSMS">
                                    Review of SMS{" "}
                                    <strong>
                                      (not applicable to Group B and C)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"ReviewOfSMSNotBandC"}
                                register={register}
                                comments={comments.ReviewOfSMSNotBandC}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("ReviewOfSMSNotBandC")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">h)</span>
                                  <label htmlFor="smsReportFilesInternalAuditing">
                                    Internal auditing{" "}
                                    <strong>
                                      (not applicable to Group B and C)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"InternalAuditing"}
                                register={register}
                                comments={comments.InternalAuditing}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("InternalAuditing")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">i)</span>
                                  <label htmlFor="smsReportFilesBoardReviewOfSMS">
                                    Board review of SMS{" "}
                                    <strong>
                                      (not applicable to Group B and C)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"BoardReviewOfSMS"}
                                register={register}
                                comments={comments.BoardReviewOfSMS}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("BoardReviewOfSMS")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">j)</span>
                                  <label htmlFor="smsReportFilesInternalExternalCommunication">
                                    Internal/External communication{" "}
                                    <strong>(Not applicable to Group C)</strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"InternalExternalCommunication"}
                                register={register}
                                comments={
                                  comments.InternalExternalCommunication
                                }
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal(
                                    "InternalExternalCommunication"
                                  )
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">k)</span>
                                  <label htmlFor="smsReportFilesStaffInvolvement">
                                    Staff involvement
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"StaffInvolvement"}
                                register={register}
                                comments={comments.StaffInvolvement}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("StaffInvolvement")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">l)</span>
                                  <label htmlFor="smsReportFilesContinuousSafety">
                                    Continuous safety improvement
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"ContinuousSafety"}
                                register={register}
                                comments={comments.ContinuousSafety}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("ContinuousSafety")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">m)</span>
                                  <label htmlFor="smsReportFilesManagementOfChange">
                                    Management of Change{" "}
                                    <strong>(Not applicable to Group C)</strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"ManagementOfChangeNotC"}
                                register={register}
                                comments={comments.ManagementOfChangeNotC}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("ManagementOfChangeNotC")
                                }
                              />
                            </div>

                            <div className="pt-5 text-sm items-center">
                              <div className="flex items-center gap-10">
                                <div className="">
                                  <span className="pr-3 mb-3">
                                    8.1.2 SAFETY POLICY (EXPECTED EVIDENCE)
                                  </span>
                                  <span className="block ml-2">
                                    This criterion applies equally to all groups
                                    of Operators, except where otherwise
                                    indicated
                                  </span>
                                  <div>
                                    A document exists which describes the
                                    organisation's Safety policy and is:
                                  </div>
                                </div>
                                <div className="flex gap-5 items-center col-span-3 mr-5 mt-2">
                                  <input
                                    id={"saftyPolicyExpectedEvidence"}
                                    type="file"
                                    multiple
                                    placeholder=""
                                    className="h-8 px-4 border rounded-md w-full"
                                    {...register("saftyPolicyExpectedEvidence")}
                                  />
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">a)</span>
                                  <label htmlFor="smsReportFilesManagementOfChange">
                                    developed by management and staff and signed
                                    by the highest level of the organisation
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"DevelopedByManagement"}
                                register={register}
                                comments={comments.DevelopedByManagement}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("DevelopedByManagement")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">b)</span>
                                  <label htmlFor="smsReportFilesManagementOfChange">
                                    is appropriate to the nature and scale of
                                    the organisation's risks and contribute to
                                    all aspects of business performance as part
                                    of a demonstrable commitment to continuous
                                    improvement.
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"ScaleOfTheOrganization"}
                                register={register}
                                comments={comments.ScaleOfTheOrganization}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("ScaleOfTheOrganization")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">c)</span>
                                  <label htmlFor="smsReportFilesManagementOfChange">
                                    Outlines the principles and core values
                                    according to which the organisation and
                                    staff operate,{" "}
                                    <strong>
                                      (Not applicable to Group B and C)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"OutlineCoreValue"}
                                register={register}
                                comments={comments.OutlineCoreValue}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("OutlineCoreValue")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">d)</span>
                                  <label htmlFor="smsReportFilesManagementOfChange">
                                    pursues the development and improvement of
                                    working ethics,{" "}
                                    <strong>
                                      (Not applicable to Group B and C)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"PursuesDevelopment"}
                                register={register}
                                comments={comments.PursuesDevelopment}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("PursuesDevelopment")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">e)</span>
                                  <label htmlFor="smsReportFilesManagementOfChange">
                                    enjoys the commitment and involvement of all
                                    staff,{" "}
                                    <strong>
                                      (Not applicable to Group B and C)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"EnjoyCommitmentOfStaff"}
                                register={register}
                                comments={comments.EnjoyCommitmentOfStaff}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("EnjoyCommitmentOfStaff")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">f)</span>
                                  <label htmlFor="smsReportFilesManagementOfChange">
                                    communicated and made available to all
                                    staff, e.g. via the organisation's intranet,
                                    newsletters,{" "}
                                    <strong>
                                      (Not applicable to Group B and C)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"CommunicatedToStaff"}
                                register={register}
                                comments={comments.CommunicatedToStaff}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("CommunicatedToStaff")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">g)</span>
                                  <label htmlFor="smsReportFilesManagementOfChange">
                                    it is clearly displayed and recently updated
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"ClearlyDisplayed"}
                                register={register}
                                comments={comments.ClearlyDisplayed}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("ClearlyDisplayed")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">h)</span>
                                  <label htmlFor="smsReportFilesManagementOfChange">
                                    appropriate to the type and extent of
                                    service;
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"AppropriateToService"}
                                register={register}
                                comments={comments.AppropriateToService}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("AppropriateToService")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">i)</span>
                                  <label htmlFor="smsReportFilesManagementOfChange">
                                    approved by the organisation's chief
                                    executive
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"ApprovedByChiefExecutive"}
                                register={register}
                                comments={comments.ApprovedByChiefExecutive}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("ApprovedByChiefExecutive")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">8.1.2.2</span>
                                  <label htmlFor="smsReportFilesManagementOfChange">
                                    Is the policy displayed and effectively
                                    communicated and understood by employees?{" "}
                                    <strong>
                                      (Applicable to all groups of Operators)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"IsPolicyDisplayed"}
                                register={register}
                                comments={comments.IsPolicyDisplayed}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("IsPolicyDisplayed")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">8.1.2.3</span>
                                  <label htmlFor="smsReportFilesManagementOfChange">
                                    Is the policy guiding the establishment of
                                    goals and objectives, procedures and
                                    programs?{" "}
                                    <strong>
                                      (Group C operator is exempted)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"IsPolicyGuiding"}
                                register={register}
                                comments={comments.IsPolicyGuiding}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("IsPolicyGuiding")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">8.1.2.4</span>
                                  <label htmlFor="smsReportFilesManagementOfChange">
                                    Is management committed to make available
                                    resources to achieve the safety objectives?{" "}
                                    <strong>
                                      (Applicable to all groups of Operators)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"IsManagementCommitted"}
                                register={register}
                                comments={comments.IsManagementCommitted}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("IsManagementCommitted")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">8.1.2.5</span>
                                  <label htmlFor="smsReportFilesManagementOfChange">
                                    Is the policy approved at the highest
                                    possible level?{" "}
                                    <strong>
                                      (Applicable to all groups of Operators)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"IsPolicyApproved"}
                                register={register}
                                comments={comments.IsPolicyApproved}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("IsPolicyApproved")
                                }
                              />
                            </div>
                            <div>
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">8.1.2.6</span>
                                  <label htmlFor="smsReportFilesManagementOfChange">
                                    Is the policy periodically reviewed and
                                    revised?{" "}
                                    <strong>
                                      (Applicable to all groups of Operators)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"IsPolicyPeriodicallyReviewed"}
                                register={register}
                                comments={comments.IsPolicyPeriodicallyReviewed}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal(
                                    "IsPolicyPeriodicallyReviewed"
                                  )
                                }
                              />
                            </div>

                            <div className="pt-5 text-sm items-center">
                              <div className="">
                                <span className="pr-3">8.1.3</span>
                                <span>
                                  SAFETY CULTURE (EXPECTED EVIDENCE) This
                                  criterion applies equally to Group A and B
                                  operators except where otherwise indicated.
                                  Group C is exempted from all the criteria
                                </span>
                                <div></div>
                                <div className="flex gap-5 items-center col-span-3 mr-5 mt-2">
                                  <input
                                    id={"safetyCulture"}
                                    type="file"
                                    multiple
                                    placeholder=""
                                    className="h-8 px-4 border rounded-md w-full"
                                    {...register("safetyCulture")}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="">
                              <span className="pr-3">8.1.3</span>
                              <span>
                                SAFETY CULTURE (EXPECTED EVIDENCE) This
                                criterion applies equally to Group A and B
                                operators except where otherwise indicated.
                                Group C is exempted from all the criteria
                              </span>
                              <div>
                                <div className="">
                                  <span className="pr-3">8.1.3.1</span>
                                  <label htmlFor="">
                                    As objectively as possible determine
                                    (through interview with staff and
                                    management) whether the following key
                                    elements of a positive safety culture are
                                    present for the railway under discussion:
                                  </label>
                                </div>

                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">a)</span>
                                    <label htmlFor="">
                                      Committed leadership (8.1.1)
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"CommittedLeadership"}
                                  register={register}
                                  comments={comments.CommittedLeadership}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("CommittedLeadership")
                                  }
                                />
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">b)</span>
                                    <label htmlFor="">
                                      Informed staff (9.3)
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"InformedStaff"}
                                  register={register}
                                  comments={comments.InformedStaff}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("InformedStaff")
                                  }
                                />
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">c)</span>
                                    <label htmlFor="">
                                      High levels of vigilance (8.2){" "}
                                      <strong>
                                        (Not required for Group B)
                                      </strong>
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"HighVigilance"}
                                  register={register}
                                  comments={comments.HighVigilance}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("HighVigilance")
                                  }
                                />
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">d)</span>
                                    <label htmlFor="">
                                      Promoting a "just culture" environment
                                      (8.3.2.3){" "}
                                      <strong>
                                        (Not required for Group B)
                                      </strong>
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"PromotingCulture"}
                                  register={register}
                                  comments={comments.PromotingCulture}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("PromotingCulture")
                                  }
                                />
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">e)</span>
                                    <label htmlFor="">
                                      Promoting organizational flexibility (9.1){" "}
                                      <strong>
                                        (Not required for Group B)
                                      </strong>
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"PromotingOrganizational"}
                                  register={register}
                                  comments={comments.PromotingOrganizational}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("PromotingOrganizational")
                                  }
                                />
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">f)</span>
                                    <label htmlFor="">
                                      Encouraging willingness to learn (8.4){" "}
                                      <strong>
                                        (Not required for Group B)
                                      </strong>
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"WillingnessToLearn"}
                                  register={register}
                                  comments={comments.WillingnessToLearn}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("WillingnessToLearn")
                                  }
                                />
                              </div>
                            </div>

                            <div className="pt-5 text-sm items-center">
                              <div className="">
                                <span className="pr-3">8.1.4</span>
                                <span>
                                  SAFETY TARGETS (EXPECTED EVIDENCE) Note: Also
                                  refer to 9.4.4 (Safety Improvement Plan)
                                  below. This criterion applies equally to Group
                                  A and B operators.
                                </span>
                                <div className="flex gap-5 items-center col-span-3 mr-5 mt-2">
                                  <input
                                    id={"safetyTargets"}
                                    type="file"
                                    multiple
                                    placeholder=""
                                    className="h-8 px-4 border rounded-md w-full"
                                    {...register("safetyTargets")}
                                  />
                                </div>

                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">8.1.4.1</span>
                                    <label htmlFor="">
                                      The Operator has processes and procedures
                                      to derive relevant safety targets in line
                                      with the legal framework.
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"SafetyTargetWithFramework"}
                                  register={register}
                                  comments={comments.SafetyTargetWithFramework}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal(
                                      "SafetyTargetWithFramework"
                                    )
                                  }
                                />
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">8.1.4.2</span>
                                    <label htmlFor="">
                                      The operator has processes and procedures
                                      to derive relevant safety targets
                                      consistent with type, extent and relevant
                                      risks of the Operator.Confirm through
                                      evidence that:
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"TargetsCredible"}
                                  register={register}
                                  comments={comments.TargetsCredible}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("TargetsCredible")
                                  }
                                />
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">8.1.4.2.1</span>
                                    <label htmlFor="">
                                      The targets are credible and achievable,
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"SafetyTargetWithType"}
                                  register={register}
                                  comments={comments.SafetyTargetWithType}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("SafetyTargetWithType")
                                  }
                                />
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">8.1.4.2.2</span>
                                    <label htmlFor="">
                                      The targets are based on previous safety
                                      performance,
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"TargetBasedOnPrevious"}
                                  register={register}
                                  comments={comments.TargetBasedOnPrevious}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("TargetBasedOnPrevious")
                                  }
                                />
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">8.1.4.2.3</span>
                                    <label htmlFor="">
                                      Specific actions are planned and
                                      implemented, broken down to be managed at
                                      all relevant levels of the organisation
                                      (safety planning),
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"SpecificActionsPlanned"}
                                  register={register}
                                  comments={comments.SpecificActionsPlanned}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("SpecificActionsPlanned")
                                  }
                                />
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">8.1.4.2.4</span>
                                    <label htmlFor="">
                                      The actions are monitored and their
                                      effectiveness is measured, (again, through
                                      routine checks arrangements, internal
                                      auditing and safety reporting), focussing
                                      not only on the safety outcome but also on
                                      the effective performance of safety
                                      management activities,
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"ActionsMonitoredEffectiveness"}
                                  register={register}
                                  comments={
                                    comments.ActionsMonitoredEffectiveness
                                  }
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal(
                                      "ActionsMonitoredEffectiveness"
                                    )
                                  }
                                />
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">8.1.4.2.5</span>
                                    <label htmlFor="">
                                      Corporate targets are revised according
                                      the result of monitoring,
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"CorporateTargetRevised"}
                                  register={register}
                                  comments={comments.CorporateTargetRevised}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("CorporateTargetRevised")
                                  }
                                />
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">8.1.4.2.6</span>
                                    <label htmlFor="">
                                      Key performance indicators (KPI's) are in
                                      place to measure the effectiveness of the
                                      system.
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"KeyPerformanceIndicators"}
                                  register={register}
                                  comments={comments.KeyPerformanceIndicators}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("KeyPerformanceIndicators")
                                  }
                                />
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">8.1.4.2.7</span>
                                    <label htmlFor="">
                                      There are both leading (positive) and
                                      lagging (outcome) indicators in place.
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"ThereAreBothLeading"}
                                  register={register}
                                  comments={comments.ThereAreBothLeading}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("ThereAreBothLeading")
                                  }
                                />
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">8.1.4.2.8</span>
                                    <label htmlFor="">
                                      The performance indicators selected
                                      include indicators to measure the
                                      performance of key risk controls and
                                      safety management system elements
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={
                                    "PerformanceIndicatorIncludeKeyRisk"
                                  }
                                  register={register}
                                  comments={
                                    comments.PerformanceIndicatorIncludeKeyRisk
                                  }
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal(
                                      "PerformanceIndicatorIncludeKeyRisk"
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <div className="pt-5 text-sm items-center">
                              <div className="">
                                <span className="pr-3">8.1.5</span>
                                <span>
                                  SAFETY DECISION TAKING (EXPECTED EVIDENCE)
                                  This criterion applies equally to Group A and
                                  B operators except where otherwise indicated.
                                  Group C is exempted from all the criteria
                                </span>
                                <div className="flex gap-5 items-center col-span-3 mr-5 mt-2">
                                  <input
                                    id={"safetyDecisionTaking"}
                                    type="file"
                                    multiple
                                    placeholder=""
                                    className="h-8 px-4 border rounded-md w-full"
                                    {...register("safetyDecisionTaking")}
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">8.1.5.1</span>
                                    <label htmlFor="">
                                      The Operator must demonstrate that there
                                      is transparent decision-making process for
                                      management related to possible changes
                                      that have an impact on safety. The process
                                      must be transparent and show how safety is
                                      not compromised when making management
                                      decisions. The process may include
                                      documentation of:
                                    </label>
                                    <ul>
                                      <li>
                                        Identification of safety issues within
                                        the business context (examples as
                                        'budget reduction'),
                                      </li>
                                      <li>Setting of priorities,</li>
                                      <li>
                                        Responsibilities at different levels,
                                      </li>
                                      <li>
                                        Methods available to address problems
                                        (analysis tools),
                                      </li>
                                      <li>
                                        The value of involving specialists,
                                        knowledge, skills and experience
                                        required,
                                      </li>
                                      <li>Extent of consultation,</li>
                                      <li>
                                        Output related actions (plans,
                                        timescale, and responsibilities for
                                        completion).
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"TransparentDecisionMaking"}
                                  register={register}
                                  comments={comments.TransparentDecisionMaking}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal(
                                      "TransparentDecisionMaking"
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <div className="pt-5 text-sm items-center">
                              <div className="">
                                <span className="pr-3">8.1.6</span>
                                <span>
                                  MANAGEMENT CONTROL Management Control is the
                                  means by which an organization's resources are
                                  directed, monitored, and measured. It aims at
                                  helping the organization to accomplish, in the
                                  specific area of safety, its specific targets
                                  or objectives. Control on all levels of the
                                  organisation, proportionately put over the
                                  appropriate delegated functions/staff allows
                                  for the identification of flaws/faults in the
                                  SMS processes and therefore the possibility to
                                  implement preventive or corrective actions
                                  (EXPECTED EVIDENCE) This criterion applies
                                  equally to all groups of operators except
                                  where otherwise indicated.
                                </span>
                                <div className="flex gap-5 items-center col-span-3 mr-5 mt-2">
                                  <input
                                    id={"safetyDecisionTaking"}
                                    type="file"
                                    multiple
                                    placeholder=""
                                    className="h-8 px-4 border rounded-md w-full"
                                    {...register("safetyDecisionTaking")}
                                  />
                                </div>
                              </div>
                              8.1.6.1 Management Control has been adequately
                              demonstrated by the:
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">a)</span>
                                  <label htmlFor="">
                                    Design, implementation and monitoring of the
                                    delivery of the SMS activities, including
                                    the necessary risk assessment (8.2) and
                                    management of changes (8.4.3), (Not
                                    applicable to Group C)
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"DesignImplementationOfSMS"}
                                register={register}
                                comments={comments.DesignImplementationOfSMS}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("DesignImplementationOfSMS")
                                }
                              />
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">b)</span>
                                  <label htmlFor="">
                                    Design of the organisational structure, in
                                    order to comply with regulatory framework
                                    and all applicable rules (9.1.3), and
                                    allocation of resources, (Not applicable to
                                    Group C)
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"DesignOrganisationalStructure"}
                                register={register}
                                comments={
                                  comments.DesignOrganisationalStructure
                                }
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal(
                                    "DesignOrganisationalStructure"
                                  )
                                }
                              />
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">c)</span>
                                  <label htmlFor="">
                                    Delegation of responsibilities, functions
                                    and tasks to the appropriate level of the
                                    organisation (9.1.1), (Not applicable to
                                    Group C)
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"DelegationOfResponsability"}
                                register={register}
                                comments={comments.DelegationOfResponsability}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("DelegationOfResponsability")
                                }
                              />
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">d)</span>
                                  <label htmlFor="">
                                    Delegation of control tasks to the
                                    appropriate level of the organisation and
                                    development of a feedback loop (9.1.2), (Not
                                    applicable to Group C)
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"DelegationOfControl"}
                                register={register}
                                comments={comments.DelegationOfControl}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("DelegationOfControl")
                                }
                              />
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">e)</span>
                                  <label htmlFor="">
                                    Development and monitoring of a safety
                                    policy (8.1.2),
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"MonitoringOfSafetyPolicy"}
                                register={register}
                                comments={comments.MonitoringOfSafetyPolicy}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("MonitoringOfSafetyPolicy")
                                }
                              />
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">f)</span>
                                  <label htmlFor="">
                                    Development and monitoring of safety
                                    measures and projects that allows for
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"MonitoringOfSafetyMeasure"}
                                register={register}
                                comments={comments.MonitoringOfSafetyMeasure}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("MonitoringOfSafetyMeasure")
                                }
                              />
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">g)</span>
                                  <label htmlFor="">
                                    continuous improvement (taking into account
                                    costs) (8.1.4), (Not applicable to Group C)
                                    Promotion of continuous education and
                                    training for all level of the organisation,
                                    to foster employee attitudes, management
                                    beliefs and value system (8.1.3), (Not
                                    applicable to Group C)
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"continuous"}
                                register={register}
                                comments={comments.continuous}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("continuous")
                                }
                              />
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">h)</span>
                                  <label htmlFor="">
                                    Usage of management tools to address safety
                                    issues (i.e.: problem solving tools and
                                    techniques) (8.3.1),
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"UsageOfManagementTools"}
                                register={register}
                                comments={comments.UsageOfManagementTools}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("UsageOfManagementTools")
                                }
                              />
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">i)</span>
                                  <label htmlFor="">
                                    Benchmarking of performance results and
                                    processes, (Not applicable to Group C)
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"Benchmarking"}
                                register={register}
                                comments={comments.Benchmarking}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("Benchmarking")
                                }
                              />
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">j)</span>
                                  <label htmlFor="">
                                    Balance between safety requirements and
                                    accessible resources (8.3.1 and 8.3.2),
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"BalanceBetweenSafety"}
                                register={register}
                                comments={comments.BalanceBetweenSafety}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("BalanceBetweenSafety")
                                }
                              />
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">k)</span>
                                  <label htmlFor="">
                                    Improvement of managerial and technical
                                    processes (8.4), (Not applicable to Group C)
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"ImprovementOfManagerial"}
                                register={register}
                                comments={comments.ImprovementOfManagerial}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("ImprovementOfManagerial")
                                }
                              />
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">l)</span>
                                  <label htmlFor="">
                                    Integrating the customers' and suppliers'
                                    expectations, (Not applicable to Group C)
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"IntegratingCustomerExpectations"}
                                register={register}
                                comments={
                                  comments.IntegratingCustomerExpectations
                                }
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal(
                                    "IntegratingCustomerExpectations"
                                  )
                                }
                              />
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">m)</span>
                                  <label htmlFor="">
                                    Carrying out internal audits and reviews on
                                    a continuous basis (8.3.3). (Not applicable
                                    to Group C)
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"InternalAudit"}
                                register={register}
                                comments={comments.InternalAudit}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("InternalAudit")
                                }
                              />
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="risk-management">
                          <AccordionTrigger>
                            <div className="">
                              <span className="pr-3">8.2</span>
                              <span>RISK MANAGEMENT</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            {tab_8_2_array.map((tabItem, tabItemIndex) => {
                              if (tabItem.type !== "component") {
                                return (
                                  <div
                                    key={tabItemIndex}
                                    className="grid grid-cols-5 gap-5 items-center"
                                  >
                                    <div className="col-span-4 ml-5 mt-4">
                                      <span className="pr-3">
                                        {tabItem.numbering}
                                      </span>
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: tabItem.html_content,
                                        }}
                                      ></span>
                                    </div>
                                    <div className="flex gap-5 items-center">
                                      <input
                                        id={tabItem.unique_id}
                                        type="file"
                                        multiple
                                        placeholder=""
                                        className="border rounded-md w-full"
                                        {...register(`${tabItem.unique_id}`)}
                                      />
                                    </div>
                                  </div>
                                );
                              } else {
                                return (
                                  <div key={tabItemIndex} className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">
                                          {tabItem.numbering}
                                        </span>
                                        <label
                                          dangerouslySetInnerHTML={{
                                            __html: tabItem.html_content,
                                          }}
                                        ></label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      commentKey={tabItem.unique_id}
                                      register={register}
                                      comments={comments[tabItem.unique_id]}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal(tabItem.unique_id)
                                      }
                                    />
                                  </div>
                                );
                              }
                            })}
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="monitoring">
                          <AccordionTrigger>
                            <div className="">
                              <span className="pr-3">8.3</span>
                              <span>MONITORING</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            {tab_8_3_array.map((tabItem, tabItemIndex) => {
                              if (tabItem.type !== "component") {
                                return (
                                  <div
                                    key={tabItemIndex}
                                    className="grid grid-cols-5 gap-5 items-center"
                                  >
                                    <div className="col-span-4 ml-5 mt-4">
                                      <span className="pr-3">
                                        {tabItem.numbering}
                                      </span>
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: tabItem.html_content,
                                        }}
                                      ></span>
                                    </div>
                                    <div className="flex gap-5 items-center">
                                      <input
                                        id={tabItem.unique_id}
                                        type="file"
                                        multiple
                                        placeholder=""
                                        className="border rounded-md w-full"
                                        {...register(`${tabItem.unique_id}`)}
                                      />
                                    </div>
                                  </div>
                                );
                              } else {
                                return (
                                  <div key={tabItemIndex} className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">
                                          {tabItem.numbering}
                                        </span>
                                        <label
                                          dangerouslySetInnerHTML={{
                                            __html: tabItem.html_content,
                                          }}
                                        ></label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      commentKey={tabItem.unique_id}
                                      register={register}
                                      comments={comments[tabItem.unique_id]}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal(tabItem.unique_id)
                                      }
                                    />
                                  </div>
                                );
                              }
                            })}
                          </AccordionContent>
                          {/* <AccordionContent>
                            <div className="">
                              <span className="pr-3">8.3.1</span>
                              <span>
                                SAFETY DATA COLLECTION AND ANALYSIS (EXPECTED
                                EVIDENCE) The criteria apply equally to all
                                groups of operators except where otherwise
                                indicated
                              </span>

                              <div className="flex gap-5 items-center col-span-3 mr-5 mt-2">
                                <input
                                  id={"safetyDecisionTaking"}
                                  type="file"
                                  multiple
                                  placeholder=""
                                  className="h-8 px-4 border rounded-md w-full"
                                  {...register("safetyDecisionTaking")}
                                />
                              </div>
                            </div>
                            <div className="">
                              <span className="pr-3">8.3.2</span>
                              <span>
                                SAFETY DATA COLLECTION AND ANALYSIS (EXPECTED
                                EVIDENCE) The criteria apply equally to all
                                groups of operators except where otherwise
                                indicated
                              </span>

                              <div className="flex gap-5 items-center col-span-3 mr-5 mt-2">
                                <input
                                  id={"safetyDecisionTaking"}
                                  type="file"
                                  multiple
                                  placeholder=""
                                  className="h-8 px-4 border rounded-md w-full"
                                  {...register("safetyDecisionTaking")}
                                />
                              </div>
                            </div>
                            <div className="">
                              <span className="pr-3">8.3.3</span>
                              <span>
                                SAFETY DATA COLLECTION AND ANALYSIS (EXPECTED
                                EVIDENCE) The criteria apply equally to all
                                groups of operators except where otherwise
                                indicated
                              </span>

                              <div className="flex gap-5 items-center col-span-3 mr-5 mt-2">
                                <input
                                  id={"safetyDecisionTaking"}
                                  type="file"
                                  multiple
                                  placeholder=""
                                  className="h-8 px-4 border rounded-md w-full"
                                  {...register("safetyDecisionTaking")}
                                />
                              </div>
                            </div>
                            <div className="">
                              <span className="pr-3">8.3.4</span>
                              <span>
                                SAFETY DATA COLLECTION AND ANALYSIS (EXPECTED
                                EVIDENCE) The criteria apply equally to all
                                groups of operators except where otherwise
                                indicated
                              </span>

                              <div className="flex gap-5 items-center col-span-3 mr-5 mt-2">
                                <input
                                  id={"safetyDecisionTaking"}
                                  type="file"
                                  multiple
                                  placeholder=""
                                  className="h-8 px-4 border rounded-md w-full"
                                  {...register("safetyDecisionTaking")}
                                />
                              </div>
                            </div>
                          </AccordionContent> */}
                        </AccordionItem>
                        <AccordionItem value="organizational">
                          <AccordionTrigger>
                            <div className="">
                              <span className="pr-3">8.4</span>
                              <span>
                                ORGANIZATIONAL LEARNING The effective safety
                                management system should rely on a continual,
                                structured and documented reflection upon
                                practice through monitoring performance,
                                analysing data and results and establishing a
                                feedback system to continuously improve its
                                safety performance, culture and attitude{" "}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            {tab_8_4_array.map((tabItem, tabItemIndex) => {
                              if (tabItem.type !== "component") {
                                return (
                                  <div
                                    key={tabItemIndex}
                                    className="grid grid-cols-5 gap-5 items-center"
                                  >
                                    <div className="col-span-4 ml-5 mt-4">
                                      <span className="pr-3">
                                        {tabItem.numbering}
                                      </span>
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: tabItem.html_content,
                                        }}
                                      ></span>
                                    </div>
                                    <div className="flex gap-5 items-center">
                                      <input
                                        id={tabItem.unique_id}
                                        type="file"
                                        multiple
                                        placeholder=""
                                        className="border rounded-md w-full"
                                        {...register(`${tabItem.unique_id}`)}
                                      />
                                    </div>
                                  </div>
                                );
                              } else {
                                return (
                                  <div key={tabItemIndex} className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">
                                          {tabItem.numbering}
                                        </span>
                                        <label
                                          dangerouslySetInnerHTML={{
                                            __html: tabItem.html_content,
                                          }}
                                        ></label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      commentKey={tabItem.unique_id}
                                      register={register}
                                      comments={comments[tabItem.unique_id]}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal(tabItem.unique_id)
                                      }
                                    />
                                  </div>
                                );
                              }
                            })}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </TabsContent>
                  <TabsContent value="implementation">
                    {/* More details... step 9 */}
                    <div className="py-2 text-sm items-center leading-8">
                      <div className="">
                        <span className="pr-3 py-2">9.</span>
                        <label>PROCESSES FOR IMPLEMENTATION</label>
                      </div>
                      {!asip ? ( <>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="structureAndResposibility">
                          <AccordionTrigger>
                            <div className="">
                              <span className="pr-3">9.1</span>
                              <label>STRUCTURE AND RESPONSIBILITY </label>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-5 gap-5 items-center">
                              <div className="col-span-4">
                                People need to know what their role in the
                                system is and what they’re responsible for. The
                                safety management system should be based on a
                                clear distribution of responsibilities and on
                                adequate human and technical resources, in order
                                to deliver safe operations
                              </div>
                              <div className="">
                                <input
                                  id={"safetyDecisionTaking"}
                                  type="file"
                                  multiple
                                  placeholder=""
                                  className="border rounded-md w-full"
                                  {...register("StructureAndResponsibility")}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-5 gap-5 items-center">
                              <div className="col-span-4 ml-5 mt-4">
                                <span className="pr-3">9.1.1</span>
                                DISTRIBUTION OF AUTHORITIES AND RESPONSIBILITIES
                                (EXPECTED EVIDENCE) This criterion applies
                                equally to all groups of operators except where
                                otherwise indicated
                              </div>
                              <div className="flex gap-5 items-center">
                                <input
                                  id={"safetyDecisionTaking"}
                                  type="file"
                                  multiple
                                  placeholder=""
                                  className="border rounded-md w-full"
                                  {...register("AuthorityResponsibilityDist")}
                                />
                              </div>
                            </div>
                            {/* -------- */}
                            <div className="ml-10">
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">9.1.1.1</span>
                                  <label htmlFor="">
                                    There is a description of how
                                    responsibilities are allocated for each
                                    safety- related process throughout the
                                    organisation.{" "}
                                    <strong>
                                      (Group C: Only for the railway operations
                                      aspect of the business)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"SafetyResponsibilitiesAllocation"}
                                register={register}
                                comments={
                                  comments.SafetyResponsibilitiesAllocation
                                }
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal(
                                    "SafetyResponsibilitiesAllocation"
                                  )
                                }
                              />
                            </div>
                            <div className="ml-10">
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">9.1.1.2</span>
                                  <label htmlFor="">
                                    There is a procedure for regular monitoring
                                    of task performance assured by the line
                                    management chain that must intervene if the
                                    tasks are not being properly performed.{" "}
                                    <strong>
                                      (Group C: Only for the railway operations
                                      aspect of the business)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"RailOpsMonitoring"}
                                register={register}
                                comments={comments.RailOpsMonitoring}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("RailOpsMonitoring")
                                }
                              />
                            </div>
                            <div className="ml-10">
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">9.1.1.3</span>
                                  <label htmlFor="">
                                    There are procedures to identify and manage
                                    the impact of other management activities on
                                    the safety management system.
                                    <strong>
                                      (Group C: Only for the railway operations
                                      aspect of the business)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"ManagementImpact"}
                                register={register}
                                comments={comments.ManagementImpact}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("ManagementImpact")
                                }
                              />
                            </div>
                            <div className="ml-10">
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">9.1.1.4</span>
                                  <label htmlFor="">
                                    There are procedures to hold those with a
                                    role in the management of safety accountable
                                    for their performance.{" "}
                                    <strong>
                                      (Group C: Only for the railway operations
                                      aspect of the business)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"Accountability"}
                                register={register}
                                comments={comments.Accountability}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("Accountability")
                                }
                              />
                            </div>
                            <div className="ml-10">
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">9.1.1.5</span>
                                  <label htmlFor="">
                                    There are procedures to allocate resources
                                    to deliver the tasks under the safety
                                    management system.{" "}
                                    <strong>
                                      (Group C: Only for the railway operations
                                      aspect of the business)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"RailSafetyAllocations"}
                                register={register}
                                comments={comments.RailSafetyAllocations}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("RailSafetyAllocations")
                                }
                              />
                            </div>
                            <div className="ml-10">
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">9.1.1.6</span>
                                  <label htmlFor="">
                                    There are procedures to allocate resources
                                    to deliver the tasks under the safety
                                    management system.{" "}
                                    <strong>
                                      (Group C: Only for the railway operations
                                      aspect of the business)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"RailSafetyCoordination"}
                                register={register}
                                comments={comments.RailSafetyCoordination}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("RailSafetyCoordination")
                                }
                              />
                            </div>
                            <div className="ml-10">
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">9.1.1.7</span>
                                  <label htmlFor="">
                                    There are procedures to ensure that staff
                                    with delegated responsibilities within the
                                    organisation have the authority, competence
                                    and appropriate resources to fulfil their
                                    duty.{" "}
                                    <strong>
                                      (Group C: Only for the railway operations
                                      aspect of the business)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"DelegationValidity"}
                                register={register}
                                comments={comments.DelegationValidity}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("DelegationValidity")
                                }
                              />
                            </div>
                            <div className="ml-10">
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">9.1.1.8</span>
                                  <label htmlFor="">
                                    Safety-related areas of responsibility, and
                                    the distribution of responsibilities to
                                    specific functions associated with them,
                                    together with their interfaces, are clearly
                                    defined.{" "}
                                    <strong>
                                      (Group C: Only for the railway operations
                                      aspect of the business)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"RailOpsResponsibilities"}
                                register={register}
                                comments={comments.RailOpsResponsibilities}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("RailOpsResponsibilities")
                                }
                              />
                            </div>
                            <div className="ml-10">
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">9.1.1.9</span>
                                  <label htmlFor="">
                                    There is a procedure to ensure that safety
                                    tasks are clearly defined and delegated to
                                    staff with appropriate competence.{" "}
                                    <strong>
                                      (Group C: Only for the railway operations
                                      aspect of the business)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"TaskDelegation"}
                                register={register}
                                comments={comments.TaskDelegation}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("TaskDelegation")
                                }
                              />
                            </div>
                            <div className="ml-10">
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">9.1.1.10</span>
                                  <label htmlFor="">
                                    When assigning responsibilities,
                                    accountabilities and authorities, particular
                                    account has been taken by the Operator of
                                    the need for:
                                  </label>
                                </div>
                              </div>
                              <div className="ml-10">
                                <div className="text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">a)</span>
                                    <label htmlFor="">
                                      The appointment of a manager in terms of
                                      Act 16 of 2002 (as amended) who,
                                      irrespective of other responsibilities, is
                                      responsible for maintaining, reviewing and
                                      reporting on the organisation’s safety
                                      management system;
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"SafetyManager"}
                                  register={register}
                                  comments={comments.SafetyManager}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("SafetyManager")
                                  }
                                />
                              </div>
                              <div className="mt-5 ml-10">
                                <div className="text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">b)</span>
                                    <label htmlFor="">
                                      The Nominated Manager has been empowered
                                      with the appropriate authority and
                                      responsibility
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"Empowerment"}
                                  register={register}
                                  comments={comments.Empowerment}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("Empowerment")
                                  }
                                />
                              </div>
                              <div className="mt-5 ml-10">
                                <div className="text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">c)</span>
                                    <label htmlFor="">
                                      individuals have the necessary authority
                                      to execute their responsibilities;
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"Autonomy"}
                                  register={register}
                                  comments={comments.Autonomy}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("Autonomy")
                                  }
                                />
                              </div>
                              <div className="mt-5 ml-10">
                                <div className="text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">d)</span>
                                    <label htmlFor="">
                                      Individuals to be held accountable for the
                                      execution of their responsibilities;
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"Responsibilize"}
                                  register={register}
                                  comments={comments.Responsibilize}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("Responsibilize")
                                  }
                                />
                              </div>
                              <div className="mt-5 ml-10">
                                <div className="text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">e)</span>
                                    <label htmlFor="">
                                      Clear lines of accountability for
                                      personnel certifying the safety of
                                      critical infrastructure, equipment and
                                      operations;
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"CertifyAccountability"}
                                  register={register}
                                  comments={comments.CertifyAccountability}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("CertifyAccountability")
                                  }
                                />
                              </div>
                              <div>
                                <div className="mt-5 ml-10">
                                  <div className="text-sm items-center">
                                    <div className="">
                                      <span className="pr-3">f)</span>
                                      <label htmlFor="">
                                        personnel who manage or carry out work
                                        relating to the safety of the railway
                                        operations, or who verify such work, to
                                        be given the necessary organisational
                                        freedom and technical authority to;
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="mt-5 ml-15">
                                    <div className="text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">I.</span>
                                        <label htmlFor="">
                                          initiate action to prevent unsafe
                                          occurrences;
                                        </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      commentKey={"RailSafetyAuthority"}
                                      register={register}
                                      comments={comments.RailSafetyAuthority}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal("RailSafetyAuthority")
                                      }
                                    />
                                  </div>
                                  <div className="mt-5 ml-15">
                                    <div className="text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">II.</span>
                                        <label htmlFor="">
                                          initiate, recommend or provide
                                          solutions to railway safety issues
                                          through designated channels;
                                        </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      commentKey={"RailwaySafetySolutions"}
                                      register={register}
                                      comments={comments.RailwaySafetySolutions}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal(
                                          "RailwaySafetySolutions"
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="mt-5 ml-15">
                                    <div className="text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">III.</span>
                                        <label htmlFor="">
                                          initiate action to learn from railway
                                          safety occurrences and to prevent any
                                          recurrence;
                                        </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      commentKey={"RailSafetyLearning"}
                                      register={register}
                                      comments={comments.RailSafetyLearning}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal("RailSafetyLearning")
                                      }
                                    />
                                  </div>
                                  <div className="mt-5 ml-15">
                                    <div className="text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">IV.</span>
                                        <label htmlFor="">
                                          verify the implementation of solutions
                                        </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      commentKey={"AuthenticationValidation"}
                                      register={register}
                                      comments={
                                        comments.AuthenticationValidation
                                      }
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal(
                                          "AuthenticationValidation"
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="ml-10">
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">9.1.1.11</span>
                                  <label htmlFor="">
                                    The Operator provided evidence of defined
                                    and communicated safety roles and
                                    responsibilities for customers, contractors
                                    and other parties whose activities may
                                    affect railway safety.{" "}
                                    <strong>
                                      (Group C: Only for the railway operations
                                      aspect of the business)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"RailSafetyRoles"}
                                register={register}
                                comments={comments.RailSafetyRoles}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("RailSafetyRoles")
                                }
                              />
                            </div>
                            <div className="ml-10">
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">9.1.1.12</span>
                                  <label htmlFor="">
                                    Management provide resources required to
                                    fulfil these responsibilities, including
                                    people, skills, technology, and funding.
                                    <strong>
                                      (Group C: Only for the railway operations
                                      aspect of the business)
                                    </strong>
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"RailwayResources"}
                                register={register}
                                comments={comments.RailwayResources}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("RailwayResources")
                                }
                              />
                            </div>
                            <div className="grid grid-cols-5 gap-5 items-center mt-5">
                              <div className="col-span-4 ml-5 mt-4">
                                <span className="pr-3">9.1.2</span>
                                Management Accountability{" "}
                                <strong>
                                  {" "}
                                  (EXPECTED EVIDENCE) This criterion applies
                                  equally to all Groups of Operators{" "}
                                </strong>
                              </div>
                              <div className="flex gap-5 items-center">
                                <input
                                  id={"AccountabilityEvidence"}
                                  type="file"
                                  multiple
                                  placeholder=""
                                  className="border p-1 rounded-md w-full"
                                  {...register("AccountabilityEvidence")}
                                />
                              </div>
                            </div>
                            <div className="ml-10">
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">9.1.2.1</span>
                                  <label htmlFor="">
                                    Evidence has been made available that those
                                    given roles, tasks and objectives in safety
                                    management are accountable for delivery of
                                    the business safety objectives for which
                                    they are responsible. 9.1.2.2 Evidence is
                                    available that adequate supervision is in
                                    place that compliments the provision of
                                    information, instruction and training to
                                    ensure that the safety policy is effectively
                                    implemented and developed.
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"SupervisionComplementsSafety"}
                                register={register}
                                comments={comments.SupervisionComplementsSafety}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal(
                                    "SupervisionComplementsSafety"
                                  )
                                }
                              />
                            </div>
                            <div className="grid grid-cols-5 gap-5 items-center mt-5">
                              <div className="col-span-4 ml-5 mt-4">
                                <span className="pr-3">9.1.3</span>
                                ORGANISATIONAL STRUCTURE{" "}
                                <strong>
                                  (EXPECTED EVIDENCE) This criterion applies to
                                  Groups A and B only. Group C is exempted
                                </strong>
                              </div>
                              <div className="flex gap-5 items-center">
                                <input
                                  id={"StructureEvidence"}
                                  type="file"
                                  multiple
                                  placeholder=""
                                  className="border p-1 rounded-md w-full"
                                  {...register("StructureEvidence")}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-5 gap-5 items-center">
                              <div className="col-span-4 ml-5 mt-4">
                                <span className="pr-3">9.1.3</span>
                                Confirm through evidence that the organisational
                                structure of the Operator is appropriate to
                                deliver the safety policy and safety approach of
                                the organisation, so that:
                              </div>
                            </div>
                            <div className="">
                              <div className="ml-10">
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">a)</span>
                                    <label htmlFor="">
                                      Risk control fits sensibly into management
                                      structure (the design of the structure
                                      should cover all internal and external
                                      interfaces);
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"InterfaceIntegration"}
                                  register={register}
                                  comments={comments.InterfaceIntegration}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("InterfaceIntegration")
                                  }
                                />
                              </div>
                            </div>
                            <div className="">
                              <div className="ml-10">
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">b)</span>
                                    <label htmlFor="">
                                      Responsibility for and delivery of
                                      (possibly conflicting) business objectives
                                      in a safe manner are transparent and
                                      effectively deal with interfaces;
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"Interfacedelivery"}
                                  register={register}
                                  comments={comments.Interfacedelivery}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("Interfacedelivery")
                                  }
                                />
                              </div>
                            </div>
                            <div className="">
                              <div className="ml-10">
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">d)</span>
                                    <label htmlFor="">
                                      Safety related information reaches the
                                      highest level of the organisation, so that
                                      they can be considered when decisions are
                                      taken.
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"SafetyConsiderations"}
                                  register={register}
                                  comments={comments.SafetyConsiderations}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("SafetyConsiderations")
                                  }
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-5 gap-5 items-center mt-5">
                              <div className="col-span-4 ml-5 mt-4 font-bold">
                                <span className="pr-3 font-normal">9.1.4</span>
                                WORKLOAD PLANNING (EXPECTED EVIDENCE) The
                                criteria apply equally to all groups of
                                operators
                              </div>
                              <div className="flex gap-5 items-center">
                                <input
                                  id={"UniformityCriterion"}
                                  type="file"
                                  multiple
                                  placeholder=""
                                  className="border p-1 rounded-md w-full"
                                  {...register("UniformityCriterion")}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="grid grid-cols-5 gap-5 items-center">
                                <div className="col-span-4 ml-5 mt-4">
                                  <span className="pr-3">9.1.4.1</span>
                                  Confirm through evidence that the
                                  organisational structure of the Operator is
                                  appropriate to deliver the safety policy and
                                  safety approach of the organisation, so that:
                                </div>
                              </div>
                              <div className="ml-10">
                                <div className="py-2 mt-3 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">a)</span>
                                    <label htmlFor="">
                                      the volume of tasks to be completed is not
                                      excessive at times when a safety-critical
                                      task is being carried out;
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"SafetyCriticalTaskVol"}
                                  register={register}
                                  comments={comments.SafetyCriticalTaskVol}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("SafetyCriticalTaskVol")
                                  }
                                />
                              </div>
                            </div>
                            <div className="ml-10">
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">b)</span>
                                  <label htmlFor="">
                                    the volume of tasks to be completed is not
                                    excessive at times when a safety-critical
                                    task is being carried out;
                                  </label>
                                </div>
                              </div>
                              <div className="ml-10">
                                <div className="py-2 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">I.</span>
                                    <label htmlFor="">
                                      there is no requirement for independence
                                      of the tasks,
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"Interconnectedness"}
                                  register={register}
                                  comments={comments.Interconnectedness}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("Interconnectedness")
                                  }
                                />
                              </div>
                              <div className="ml-10">
                                <div className="py-2 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">II.</span>
                                    <label htmlFor="">
                                      the combination is permitted by safety
                                      rules and standards,
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"CompliantCombinationSafety"}
                                  register={register}
                                  comments={comments.CompliantCombinationSafety}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal(
                                      "CompliantCombinationSafety"
                                    )
                                  }
                                />
                              </div>
                              <div className="ml-10">
                                <div className="py-2 text-sm items-center">
                                  <div className="">
                                    <span className="pr-3">III.</span>
                                    <label htmlFor="">
                                      the combination contains no “functional”
                                      contradictions;
                                    </label>
                                  </div>
                                </div>
                                <FormSectionComponent
                                  application={application}
                                  isAdministrator={isAdministrator}
                                  commentKey={"Harmonioussemblance"}
                                  register={register}
                                  comments={comments.Harmonioussemblance}
                                  comment={comment}
                                  setComment={setComment}
                                  handleCloseModal={() =>
                                    handleCloseModal("Harmonioussemblance")
                                  }
                                />
                              </div>
                            </div>
                            <div className="ml-10">
                              <div className="py-2 mt-3 text-sm items-center">
                                <div className="">
                                  <span className="pr-3">c)</span>
                                  <label htmlFor="">
                                    there are no contradictions between
                                    execution of safety-critical tasks and other
                                    objectives assigned to staff (for example:
                                    systematic conflict between safety and
                                    production, lack of resources, etc.)
                                  </label>
                                </div>
                              </div>
                              <FormSectionComponent
                                application={application}
                                isAdministrator={isAdministrator}
                                commentKey={"HarmonySafetyProd"}
                                register={register}
                                comments={comments.HarmonySafetyProd}
                                comment={comment}
                                setComment={setComment}
                                handleCloseModal={() =>
                                  handleCloseModal("HarmonySafetyProd")
                                }
                              />
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      
                       
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            <AccordionItem value="fitnessForDuty">
                              <AccordionTrigger>
                                <div className="">
                                  <span className="pr-3">9.2</span>
                                  <label>FITNESS FOR DUTY </label>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="grid grid-cols-5 gap-5 items-center">
                                  <div className="col-span-4 font-semibold">
                                    Fitness for duty outlines the factors that
                                    must be assessed before an individual can be
                                    declared fit to perform their duties. An
                                    organisation must ensure that all staff with
                                    a responsibility in the safety management
                                    system are fit for duty to ensure safe,
                                    effective and efficient delivery of its
                                    objectives, in all circumstances. Fitness
                                    for duty of personnel is crucial for safe
                                    railway operations since it minimizes the
                                    extent to which personnel psychological and
                                    physical conditions and the resulting
                                    performance may compromise safety. (Refer to
                                    SANS 3000-4:2011 Edition1).
                                  </div>
                                  <div className="">
                                    <input
                                      id={"fitnessForDuty"}
                                      type="file"
                                      multiple
                                      placeholder=""
                                      className="border rounded-md w-full"
                                      {...register("fitnessForDuty")}
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-5 gap-5 items-center">
                                  <div className="col-span-4 ml-5 mt-4">
                                    <span className="pr-3">9.2.1</span>
                                    <span className="font-medium">
                                      FITNESS FOR DUTY (EXPECTED EVIDENCE) The
                                      criteria apply equally to all groups of
                                      operators
                                    </span>
                                  </div>
                                  <div className="flex gap-5 items-center">
                                    <input
                                      id={"safetyDecisionTaking"}
                                      type="file"
                                      multiple
                                      placeholder=""
                                      className="border rounded-md w-full"
                                      {...register(
                                        "UniversalFitForDutyCriteria"
                                      )}
                                    />
                                  </div>
                                </div>
                                <div className="ml-10">
                                  <div className="py-2 mt-3 text-sm items-center">
                                    <div className="">
                                      <span className="pr-3">9.2.1.1</span>
                                      <label htmlFor="">
                                        Confirm through evidence that the
                                        operator has established, developed or
                                        adopted, documented, implemented and
                                        maintained policies, processes and
                                        procedures to manage fitness on duty
                                        including the following:
                                      </label>
                                    </div>
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(a)</span>
                                        <label htmlFor="">
                                          Medical conditions – psychological and
                                          physical;
                                        </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"PsychophysicalCondition"}
                                      register={register}
                                      comments={
                                        comments.PsychophysicalCondition
                                      }
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal(
                                          "PsychophysicalCondition"
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(b)</span>
                                        <label htmlFor="">Fatigue</label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"fatigue"}
                                      register={register}
                                      comments={comments.fatigue}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal("fatigue")
                                      }
                                    />
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(c)</span>
                                        <label htmlFor="">
                                          Substance abuse{" "}
                                        </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"substanceAbuse"}
                                      register={register}
                                      comments={comments.substanceAbuse}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal("substanceAbuse")
                                      }
                                    />
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(d)</span>
                                        <label htmlFor="">Medication </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"medication"}
                                      register={register}
                                      comments={comments.medication}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal("medication")
                                      }
                                    />
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(e)</span>
                                        <label htmlFor="">Pregnancy </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"pregnancy"}
                                      register={register}
                                      comments={comments.pregnancy}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal("pregnancy")
                                      }
                                    />
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(f)</span>
                                        <label htmlFor="">
                                          Training and development
                                        </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"trainingAndDevelopment"}
                                      register={register}
                                      comments={comments.trainingAndDevelopment}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal(
                                          "trainingAndDevelopment"
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(g)</span>
                                        <label htmlFor="">
                                          Employee wellness.{" "}
                                        </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"employeeWellness"}
                                      register={register}
                                      comments={comments.employeeWellness}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal("employeeWellness")
                                      }
                                    />
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            <AccordionItem value="structureAndResposibility">
                              <AccordionTrigger>
                                <div className="">
                                  <span className="pr-3">9.3</span>
                                  <label> INFORMATION </label>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="grid grid-cols-5 gap-5 items-center">
                                  <div className="col-span-4 font-semibold">
                                    Organisations must define information
                                    control procedures, based on existing
                                    management systems. Safety information must
                                    be readily available for consultation and/or
                                    verification. The necessary flow(s) of
                                    internal and external information must be
                                    identified and acted upon
                                  </div>
                                  <div className="">
                                    <input
                                      id={"infomnationControlProcedure"}
                                      type="file"
                                      multiple
                                      placeholder=""
                                      className="border rounded-md w-full"
                                      {...register(
                                        "infomnationControlProcedure"
                                      )}
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-5 gap-5 items-center">
                                  <div className="col-span-4 ml-5 mt-4">
                                    <span className="pr-3">9.3.1</span>
                                    <span className="font-medium">
                                      CONFIGURATION CONTROL OF SAFETY RELATED
                                      INFORMATION (EXPECTED EVIDENCE) This
                                      criterion applies equally to all groups of
                                      operators except where otherwise indicated
                                    </span>
                                  </div>
                                  <div className="flex gap-5 items-center">
                                    <input
                                      id={"configurationControl"}
                                      type="file"
                                      multiple
                                      placeholder=""
                                      className="border rounded-md w-full"
                                      {...register("configurationControl")}
                                    />
                                  </div>
                                </div>
                                <div className="ml-10">
                                  <div className="py-2 mt-3 text-sm items-center">
                                    <div className="">
                                      <span className="pr-3">9.3.1.1</span>
                                      <label htmlFor="">
                                        Confirm through evidence that: There are
                                        procedures to ensure that all relevant
                                        safety information is accurate,
                                        complete, consistent, easy to
                                        understand, appropriately updated and
                                        duly documented.
                                      </label>
                                    </div>
                                  </div>
                                  <FormSectionComponent
                                    application={application}
                                    isAdministrator={isAdministrator}
                                    key={"SafetyInfoDocumentation"}
                                    register={register}
                                    comments={comments.SafetyInfoDocumentation}
                                    comment={comment}
                                    setComment={setComment}
                                    handleCloseModal={() =>
                                      handleCloseModal(
                                        "SafetyInfoDocumentation"
                                      )
                                    }
                                  />
                                </div>
                                <div className="ml-10">
                                  <div className="py-2 mt-3 text-sm items-center">
                                    <div className="">
                                      <span className="pr-3">9.3.1.2</span>
                                      <label htmlFor="">
                                        Confirm through evidence that that there
                                        are procedures to: (a) format, generate,
                                        distribute and manage control of changes
                                        to all relevant safety documentation;
                                        (b) receive, collect and store all
                                        relevant documentation/information on
                                        paper or by other registration systems.
                                      </label>
                                    </div>
                                  </div>
                                  <FormSectionComponent
                                    application={application}
                                    isAdministrator={isAdministrator}
                                    key={"DocuManageSys"}
                                    register={register}
                                    comments={comments.DocuManageSys}
                                    comment={comment}
                                    setComment={setComment}
                                    handleCloseModal={() =>
                                      handleCloseModal("DocuManageSys")
                                    }
                                  />
                                </div>
                                <div className="ml-10">
                                  <div className="py-2 mt-3 text-sm items-center">
                                    <div className="">
                                      <span className="pr-3">9.3.1.3</span>
                                      <label htmlFor="">
                                        Confirm through evidence that there is a
                                        procedure for configuration control of
                                        vital safety information.
                                      </label>
                                    </div>
                                  </div>
                                  <FormSectionComponent
                                    application={application}
                                    isAdministrator={isAdministrator}
                                    key={"SafeConfigurator"}
                                    register={register}
                                    comments={comments.SafeConfigurator}
                                    comment={comment}
                                    setComment={setComment}
                                    handleCloseModal={() =>
                                      handleCloseModal("SafeConfigurator")
                                    }
                                  />
                                </div>
                                <div className="ml-10">
                                  <div className="py-2 mt-3 text-sm items-center">
                                    <div className="">
                                      <span className="pr-3">9.3.1.4</span>
                                      <label htmlFor="">
                                        The Operator have provided evidence that
                                        ensures that key operational information
                                        is:{" "}
                                        <strong>
                                          (Only a, f and g are applicable to
                                          Group C)
                                        </strong>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(a)</span>
                                        <label htmlFor="">
                                          Relevant and valid,
                                        </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"RelevantAndValid"}
                                      register={register}
                                      comments={comments.RelevantAndValid}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal("RelevantAndValid")
                                      }
                                    />
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(b)</span>
                                        <label htmlFor="">Accurate</label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"Accurate"}
                                      register={register}
                                      comments={comments.Accurate}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal("Accurate")
                                      }
                                    />
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(c)</span>
                                        <label htmlFor="">Complete</label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"Complete"}
                                      register={register}
                                      comments={comments.Complete}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal("Complete")
                                      }
                                    />
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(d)</span>
                                        <label htmlFor="">
                                          Appropriately updated,
                                        </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"AppropriatelyUpdated"}
                                      register={register}
                                      comments={comments.AppropriatelyUpdated}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal("AppropriatelyUpdated")
                                      }
                                    />
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(e)</span>
                                        <label htmlFor="">Controlled</label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"Controlled"}
                                      register={register}
                                      comments={comments.Controlled}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal("Controlled")
                                      }
                                    />
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(f)</span>
                                        <label htmlFor="">
                                          consistent and easy to understand
                                          (incl. the language used),
                                        </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"StreamlineEfficiency"}
                                      register={register}
                                      comments={comments.StreamlineEfficiency}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal("StreamlineEfficiency")
                                      }
                                    />
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(g)</span>
                                        <label htmlFor="">
                                          Staff are aware of its existence
                                          before it must be applied,
                                        </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"PreapplicationAwareness"}
                                      register={register}
                                      comments={
                                        comments.PreapplicationAwareness
                                      }
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal(
                                          "PreapplicationAwareness"
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(h)</span>
                                        <label htmlFor="">
                                          Easily accessible to staff and where
                                          required copies are formally given to
                                          them
                                        </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"StaffCopiesFormalized"}
                                      register={register}
                                      comments={comments.StaffCopiesFormalized}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal(
                                          "StaffCopiesFormalized"
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-5 gap-5 items-center">
                                  <div className="col-span-4 ml-5 mt-4">
                                    <span className="pr-3">9.3.2</span>
                                    <span className="font-medium">
                                      CONSULTATION AND INVOLVEMENT OF STAFF AND
                                      THEIR REPRESENTATIVES Note: Also refer to:
                                      8.1.2 Safety policy; 8.1.3 Safety Culture
                                      and 8.1.4 Target setting, (EXPECTED
                                      EVIDENCE) This criterion applies equally
                                      to all groups of operators except where
                                      otherwise indicated
                                    </span>
                                  </div>
                                  <div className="flex gap-5 items-center">
                                    <input
                                      id={"StaffInvolvementAndRepresentation"}
                                      type="file"
                                      multiple
                                      placeholder=""
                                      className="border rounded-md w-full"
                                      {...register(
                                        "StaffInvolvementAndRepresentation"
                                      )}
                                    />
                                  </div>
                                </div>
                                <div className="ml-10">
                                  <div className="py-2 mt-3 text-sm items-center">
                                    <div className="">
                                      <span className="pr-3">9.3.2.1</span>
                                      <label htmlFor="">
                                        Confirm through evidence that there are
                                        procedures in place to ensure that staff
                                        and staff representatives are adequately
                                        represented and consulted in defining,
                                        proposing, reviewing and developing the
                                        safety aspects of operational procedures
                                        that may involve staff.{" "}
                                        <strong>
                                          (Not applicable to Group C){" "}
                                        </strong>
                                      </label>
                                    </div>
                                  </div>
                                  <FormSectionComponent
                                    application={application}
                                    isAdministrator={isAdministrator}
                                    key={"SafetyStaffConsultationProcedure"}
                                    register={register}
                                    comments={
                                      comments.SafetyStaffConsultationProcedure
                                    }
                                    comment={comment}
                                    setComment={setComment}
                                    handleCloseModal={() =>
                                      handleCloseModal(
                                        "SafetyStaffConsultationProcedure"
                                      )
                                    }
                                  />
                                </div>
                                <div className="ml-10">
                                  <div className="py-2 mt-3 text-sm items-center">
                                    <div className="">
                                      <span className="pr-3">9.3.2.2</span>
                                      <label htmlFor="">
                                        Staff involvement and consultation
                                        arrangements are documented.
                                        <strong>
                                          (Not applicable to Group C){" "}
                                        </strong>
                                      </label>
                                    </div>
                                  </div>
                                  <FormSectionComponent
                                    application={application}
                                    isAdministrator={isAdministrator}
                                    key={"StaffConsultationArrangements"}
                                    register={register}
                                    comments={
                                      comments.StaffConsultationArrangements
                                    }
                                    comment={comment}
                                    setComment={setComment}
                                    handleCloseModal={() =>
                                      handleCloseModal(
                                        "StaffConsultationArrangements"
                                      )
                                    }
                                  />
                                </div>
                                <div className="grid grid-cols-5 gap-5 items-center">
                                  <div className="col-span-4 ml-5 mt-4">
                                    <span className="pr-3">9.3.3</span>
                                    <span className="font-medium">
                                      INTERNAL AND EXTERNAL COMMUNICATION
                                      (EXPECTED EVIDENCE) This criterion applies
                                      equally to all groups of operators except
                                      where otherwise indicated
                                    </span>
                                  </div>
                                  <div className="flex gap-5 items-center">
                                    <input
                                      id={"InterComEvidence"}
                                      type="file"
                                      multiple
                                      placeholder=""
                                      className="border rounded-md w-full"
                                      {...register("InterComEvidence")}
                                    />
                                  </div>
                                </div>
                                <div className="ml-10">
                                  <div className="py-2 mt-3 text-sm items-center">
                                    <div className="">
                                      <span className="pr-3">9.3.3.1</span>
                                      <label htmlFor="">
                                        Confirm through evidence that there are
                                        procedures to ensure that:
                                      </label>
                                    </div>
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(a)</span>
                                        <label htmlFor="">
                                          staff has knowledge and understanding
                                          of the safety management system and
                                          information is easily accessible; and
                                        </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"SafetyAccessEase"}
                                      register={register}
                                      comments={comments.SafetyAccessEase}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal("SafetyAccessEase")
                                      }
                                    />
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(b)</span>
                                        <label htmlFor="">
                                          appropriate documentation on the
                                          safety management system is given to
                                          relevant safety personnel.{" "}
                                          <strong>
                                            (Not applicable to Group C)
                                          </strong>
                                        </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"SafetyManagementDocumentation"}
                                      register={register}
                                      comments={
                                        comments.SafetyManagementDocumentation
                                      }
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal(
                                          "SafetyManagementDocumentation"
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="ml-10">
                                  <div className="py-2 mt-3 text-sm items-center">
                                    <div className="">
                                      <span className="pr-3">9.3.3.2</span>
                                      <label htmlFor="">
                                        Confirm through evidence that there are
                                        procedures to ensure that:
                                      </label>
                                    </div>
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(a)</span>
                                        <label htmlFor="">
                                          key operational information is
                                          relevant and valid;
                                        </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"OperValidInfo"}
                                      register={register}
                                      comments={comments.OperValidInfo}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal("OperValidInfo")
                                      }
                                    />
                                  </div>
                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(b)</span>
                                        <label htmlFor="">
                                          Staff are aware of its existence
                                          before it must be applied;
                                        </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"PrevokeAwareness"}
                                      register={register}
                                      comments={comments.PrevokeAwareness}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal("PrevokeAwareness")
                                      }
                                    />
                                  </div>

                                  <div className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">(c)</span>
                                        <label htmlFor="">
                                          it is available to staff and where
                                          required copies are formally given to
                                          them.
                                        </label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      key={"FormalCopiesGivenToStaff"}
                                      register={register}
                                      comments={
                                        comments.FormalCopiesGivenToStaff
                                      }
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal(
                                          "FormalCopiesGivenToStaff"
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="ml-10">
                                  <div className="py-2 mt-3 text-sm items-center">
                                    <div className="">
                                      <span className="pr-3">9.3.3.3</span>
                                      <label htmlFor="">
                                        There are arrangements in place for the
                                        sharing of information between railway
                                        organisations
                                      </label>
                                    </div>
                                  </div>
                                  <FormSectionComponent
                                    application={application}
                                    isAdministrator={isAdministrator}
                                    key={"RailwayInformationSharing"}
                                    register={register}
                                    comments={
                                      comments.RailwayInformationSharing
                                    }
                                    comment={comment}
                                    setComment={setComment}
                                    handleCloseModal={() =>
                                      handleCloseModal(
                                        "RailwayInformationSharing"
                                      )
                                    }
                                  />
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            <AccordionItem value="structureAndResposibility">
                              <AccordionTrigger>
                                <div className="">
                                  <span className="pr-3">9.4</span>
                                  <label> DOCUMENTATION </label>
                                  <span>
                                    Processes and procedures describing
                                    activities, having direct and indirect
                                    effects on railway safety, are relevant
                                    parts of the SMS, both at an organisational
                                    and operational level and should be duly
                                    documented to ensure traceability.
                                  </span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                {tab_9_4_array.map((tabItem, tabItemIndex) => {
                                  if (tabItem.type !== "component") {
                                    return (
                                      <div
                                        key={tabItemIndex}
                                        className="grid grid-cols-5 gap-5 items-center"
                                      >
                                        <div className="col-span-4 ml-5 mt-4">
                                          <span className="pr-3">
                                            {tabItem.numbering}
                                          </span>
                                          <span
                                            dangerouslySetInnerHTML={{
                                              __html: tabItem.html_content,
                                            }}
                                          ></span>
                                        </div>
                                        <div className="flex gap-5 items-center">
                                          <input
                                            id={tabItem.unique_id}
                                            type="file"
                                            multiple
                                            placeholder=""
                                            className="border rounded-md w-full"
                                            {...register(
                                              `${tabItem.unique_id}`
                                            )}
                                          />
                                        </div>
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div key={tabItemIndex} className="ml-10">
                                        <div className="py-2 mt-3 text-sm items-center">
                                          <div className="">
                                            <span className="pr-3">
                                              {tabItem.numbering}
                                            </span>
                                            <label
                                              dangerouslySetInnerHTML={{
                                                __html: tabItem.html_content,
                                              }}
                                            ></label>
                                          </div>
                                        </div>
                                        <FormSectionComponent
                                          application={application}
                                          isAdministrator={isAdministrator}
                                          commentKey={tabItem.unique_id}
                                          register={register}
                                          comments={comments[tabItem.unique_id]}
                                          comment={comment}
                                          setComment={setComment}
                                          handleCloseModal={() =>
                                            handleCloseModal(tabItem.unique_id)
                                          }
                                        />
                                      </div>
                                    );
                                  }
                                })}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </>
                      ):(<>
                      <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            <AccordionItem value="structureAndResposibility">
                              <AccordionTrigger>
                                <div className="">
                                  <span className="pr-3">9.4</span>
                                  <label> DOCUMENTATION </label>
                                  <span>
                                    Processes and procedures describing
                                    activities, having direct and indirect
                                    effects on railway safety, are relevant
                                    parts of the SMS, both at an organisational
                                    and operational level and should be duly
                                    documented to ensure traceability.
                                  </span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                {tab_9_4_array.map((tabItem, tabItemIndex) => {
                                  if (tabItem.type !== "component") {
                                    return (
                                      <div
                                        key={tabItemIndex}
                                        className="grid grid-cols-5 gap-5 items-center"
                                      >
                                        <div className="col-span-4 ml-5 mt-4">
                                          <span className="pr-3">
                                            {tabItem.numbering}
                                          </span>
                                          <span
                                            dangerouslySetInnerHTML={{
                                              __html: tabItem.html_content,
                                            }}
                                          ></span>
                                        </div>
                                        <div className="flex gap-5 items-center">
                                          <input
                                            id={tabItem.unique_id}
                                            type="file"
                                            multiple
                                            placeholder=""
                                            className="border rounded-md w-full"
                                            {...register(
                                              `${tabItem.unique_id}`
                                            )}
                                          />
                                        </div>
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div key={tabItemIndex} className="ml-10">
                                        <div className="py-2 mt-3 text-sm items-center">
                                          <div className="">
                                            <span className="pr-3">
                                              {tabItem.numbering}
                                            </span>
                                            <label
                                              dangerouslySetInnerHTML={{
                                                __html: tabItem.html_content,
                                              }}
                                            ></label>
                                          </div>
                                        </div>
                                        <FormSectionComponent
                                          application={application}
                                          isAdministrator={isAdministrator}
                                          commentKey={tabItem.unique_id}
                                          register={register}
                                          comments={comments[tabItem.unique_id]}
                                          comment={comment}
                                          setComment={setComment}
                                          handleCloseModal={() =>
                                            handleCloseModal(tabItem.unique_id)
                                          }
                                        />
                                      </div>
                                    );
                                  }
                                })}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion></>) }
                    </div>
                  </TabsContent>
                  <TabsContent value="operationalActivities">
                    <div className="py-2 text-sm items-center leading-8">
                      <div className="">
                        <span className="pr-3 py-2">10.</span>
                        <label>OPERATIONAL ACTIVITIES</label>
                      </div>
                      <p className="">
                        Operational activities form the core of a company by
                        creating, producing and delivering the products and
                        services that customers want - taking into account
                        primary business objectives like safety, from initial
                        planning to conform to applicable requirement to
                        maintenance and operation.
                      </p>
                      <p>
                        Operational activities should ensure that service is
                        delivered in compliance with applicable rules. Typical
                        operational processes (the list is not exhaustive) refer
                        to:
                        <ul className="list-disc ml-9">
                          <li>Traffic planning,</li>
                          <li>
                            Traffic management in normal and degraded situation
                            (it includes control-command system and equipment),
                          </li>
                          <li>Train preparation,</li>
                          <li>
                            Train driving in normal and degraded situation,
                          </li>
                          <li>
                            Infrastructure (track and signalling) maintenance,
                            Rolling stock fitness for operation.
                          </li>
                        </ul>
                      </p>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="structureAndResposibility">
                          <AccordionTrigger>
                            <div className="">
                              <span className="pr-3">10.1</span>
                              <label>
                                SAFETY STANDARDS FOR ENGINEERING AND OPERATIONAL
                                SYSTEMS{" "}
                              </label>
                              <p>
                                Note: Also refer to the SANS 3000 and RSR
                                standards suite of Standards{" "}
                              </p>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            {tab_10_1_array.map((tabItem, tabItemIndex) => {
                              if (tabItem.type !== "component") {
                                return (
                                  <div
                                    key={tabItemIndex}
                                    className="grid grid-cols-5 gap-5 items-center"
                                  >
                                    <div className="col-span-4 ml-5 mt-4">
                                      <span className="pr-3">
                                        {tabItem.numbering}
                                      </span>
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: tabItem.html_content,
                                        }}
                                      ></span>
                                    </div>
                                    <div className="flex gap-5 items-center">
                                      <input
                                        id={tabItem.unique_id}
                                        type="file"
                                        multiple
                                        placeholder=""
                                        className="border rounded-md w-full"
                                        {...register(`${tabItem.unique_id}`)}
                                      />
                                    </div>
                                  </div>
                                );
                              } else {
                                return (
                                  <div key={tabItemIndex} className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">
                                          {tabItem.numbering}
                                        </span>
                                        <label
                                          dangerouslySetInnerHTML={{
                                            __html: tabItem.html_content,
                                          }}
                                        ></label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      commentKey={tabItem.unique_id}
                                      register={register}
                                      comments={comments[tabItem.unique_id]}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal(tabItem.unique_id)
                                      }
                                    />
                                  </div>
                                );
                              }
                            })}
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="operationsMaintenanceAndEmergencyActivities">
                          <AccordionTrigger>
                            <div className="">
                              <span className="pr-3">10.2</span>
                              <label>
                                OPERATIONS, MAINTENANCE AND EMERGENCY ACTIVITIES{" "}
                              </label>
                              <p>
                                Note: Refer to the SANS 3000 series of Standards{" "}
                              </p>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            {tab_10_2_array.map((tabItem, tabItemIndex) => {
                              if (tabItem.type !== "component") {
                                return (
                                  <div
                                    key={tabItemIndex}
                                    className="grid grid-cols-5 gap-5 items-center"
                                  >
                                    <div className="col-span-4 ml-5 mt-4">
                                      <span className="pr-3">
                                        {tabItem.numbering}
                                      </span>
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: tabItem.html_content,
                                        }}
                                      ></span>
                                    </div>
                                    <div className="flex gap-5 items-center">
                                      <input
                                        id={tabItem.unique_id}
                                        type="file"
                                        multiple
                                        placeholder=""
                                        className="border rounded-md w-full"
                                        {...register(`${tabItem.unique_id}`)}
                                      />
                                    </div>
                                  </div>
                                );
                              } else {
                                return (
                                  <div key={tabItemIndex} className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">
                                          {tabItem.numbering}
                                        </span>
                                        <label
                                          dangerouslySetInnerHTML={{
                                            __html: tabItem.html_content,
                                          }}
                                        ></label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      commentKey={tabItem.unique_id}
                                      register={register}
                                      comments={comments[tabItem.unique_id]}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal(tabItem.unique_id)
                                      }
                                    />
                                  </div>
                                );
                              }
                            })}
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="networkCoOrdinationActivities">
                          <AccordionTrigger>
                            <div className="">
                              <span className="pr-3">10.3</span>
                              <label>NETWORK CO-ORDINATION ACTIVITIES </label>
                              <p>
                                (EXPECTED EVIDENCE) This criterion applies
                                equally to all groups of Operator{" "}
                              </p>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            {tab_10_3_array.map((tabItem, tabItemIndex) => {
                              if (tabItem.type !== "component") {
                                return (
                                  <div
                                    key={tabItemIndex}
                                    className="grid grid-cols-5 gap-5 items-center"
                                  >
                                    <div className="col-span-4 ml-5 mt-4">
                                      <span className="pr-3">
                                        {tabItem.numbering}
                                      </span>
                                      <span
                                        dangerouslySetInnerHTML={{
                                          __html: tabItem.html_content,
                                        }}
                                      ></span>
                                    </div>
                                    <div className="flex gap-5 items-center">
                                      <input
                                        id={tabItem.unique_id}
                                        type="file"
                                        multiple
                                        placeholder=""
                                        className="border rounded-md w-full"
                                        {...register(`${tabItem.unique_id}`)}
                                      />
                                    </div>
                                  </div>
                                );
                              } else {
                                return (
                                  <div key={tabItemIndex} className="ml-10">
                                    <div className="py-2 mt-3 text-sm items-center">
                                      <div className="">
                                        <span className="pr-3">
                                          {tabItem.numbering}
                                        </span>
                                        <label
                                          dangerouslySetInnerHTML={{
                                            __html: tabItem.html_content,
                                          }}
                                        ></label>
                                      </div>
                                    </div>
                                    <FormSectionComponent
                                      application={application}
                                      isAdministrator={isAdministrator}
                                      commentKey={tabItem.unique_id}
                                      register={register}
                                      comments={comments[tabItem.unique_id]}
                                      comment={comment}
                                      setComment={setComment}
                                      handleCloseModal={() =>
                                        handleCloseModal(tabItem.unique_id)
                                      }
                                    />
                                  </div>
                                );
                              }
                            })}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              <div className="flex justify-end items-end mt-10 gap-10">
                <button
                  onClick={onHandleBack}
                  className="h-11 px-6 bg-black text-white"
                >
                  Back
                </button>
                {true ? (
                  <button className="h-11 px-6 rounded-md bg-black text-white hover:bg-logoorange">
                    Next
                  </button>
                ) : (
                  <button
                    onClick={onHandleFormSubmit}
                    type="button"
                    className="h-11 px-6 rounded-md bg-black text-white hover:bg-logoorange"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </ol>
        </div>
      </form>
    </div>
  );
};
