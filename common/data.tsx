export const carouselImages = [
  {
    id: "",
    src: "/images/logo/header-stakeholders-1.jpg",
    alt: "",
  },
  {
    id: "",
    src: "/images/cards/cards-01.png",
    alt: "",
  },
  {
    id: "",
    src: "/images/cards/cards-06.png",
    alt: "",
  },
  {
    id: "",
    src: "/images/cards/cards-03.png",
    alt: "",
  },
  {
    id: "",
    src: "/images/cards/cards-02.png",
    alt: "",
  },
];
export const homeNavigationItems = [
  // {
  //     href: '/auth/registration',
  //     imageSrc: '/images/brand/Black and White Basic Presentation Template.png',
  //     alt: 'background',
  //     title: 'Operator Sign Up',
  //     iconSrc: '/images/brand/icons8-id-card-96.png',
  // },
  //   {
  //     href: "/auth/signin",
  //     imageSrc: "/images/brand/Black and White Basic Presentation Template.png",
  //     alt: "background",
  //     title: "Log In",
  //     iconSrc: "/images/brand/icons8-log-in-96.png",
  //   },
  {
    href: "",
    imageSrc: "/images/brand/Black and White Basic Presentation Template.png",
    alt: "background",
    title: "Private Individual user SCG Registration",
    iconSrc: "/images/brand/icons8-register-52.png",
  },
  {
    href: "",
    imageSrc: "/images/brand/Black and White Basic Presentation Template.png",
    alt: "background",
    title: "Check SCG License",
    iconSrc: "/images/brand/icons8-search-document-100.png",
  },
];
export const PermitManagementOptions = [
  {
    title: "Applications",
    description: "Permits you have applied for.",
  },
  {
    title: "Apply for Permit / ASIP Submission",
    description: "Submit and track the progress of your application.",
  },
  {
    title: "Permit Amendment",
    description: "Update and adjust your permit details without the paperwork.",
  },
];


export const OccurenceManagementOptions = [
  {
    title: "Occurences",
    description: "Occurences you have reported/have access to.",
    url:"/occurence/DailyPage"
  },
  {
    title: "Report Occurence",
    description: "Submit daily or immediate occurence.",
    url:"/occurence/DailyPage"
  }
];


export interface ApplicationData {
  step1: {
    reasonForApplying: string;
    permitNumber: string;
    permitExpiryDate: string;
  };
  step2: {
    partyObjection: string;
  };
  step3: {
    legalName: string;
    tradeName: string;
    registrationNumber: string;
    physicalStreetNumber: string;
    physicalStreeName: string;
    physicalUnitNumber: string;
    physicalComplex: string;
    physicalSuburb: string;
    physicalcityTown: string;
    physicalProvince: string;
    physicalPostalCode: string;
    postalStreetNumber: string;
    postalStreeName: string;
    postalUnitNumber: string;
    postalComplex: string;
    postalSuburb: string;
    postalcityTown: string;
    postalProvince: string;
    postalPostalCode: string;
    companyTelephone: string;
    faxNumber: string;
  };
  step4: {
    networkOperator: boolean;
    trainOperator: boolean;
    stationOperator: boolean;
  };
  transportCommuters: string;
  transportPassengers: string;
  transportationOfDangerousGoods: string;
  annualVolumePeopleAndGoodTransportedTo: string;
  annualVolumePeopleAndGood: string;
  items: any[]; // Update 'any' with the actual type when available
  annualCommutersTransported: string;
  annualKilometersForCommuters: string;
  annualPassengersTransported: string;
  annualKilometersForPassengers: string;
  annualFeightKm: string;
  annualFeightTon: string;
  annualKilometersForDangerousGoods: string;
  step6: {
    networkOperationItems: {
      networkDescription: string;
      lengthInKm: string;
      trains: {
        operatorName: string;
        activityNature: string;
      }[];
      stations: {
        operatorName: string;
        activityNature: string;
      }[];
      maintenance: {
        operatorName: string;
        activityNature: string;
      }[];
      id: string;
    }[];
    runningLines: string;
  };
  step7: {
    coverForOtherUse: string;
    traction: {
      tractionType: string;
      description: string;
      model: string;
      numberOfUnits: string;
      averageAge: string;
    }[];
    rollingStock: any[]; // Update 'any' with the actual type when available
    runningLines: any[]; // Update 'any' with the actual type when available
    stations: any[]; // Update 'any' with the actual type when available
    rolling: {
      description: string;
      model: string;
      numberOfUnits: string;
      averageAge: string;
    }[];
    running: {
      description: string;
      networkOperator: string;
      controlResponsible: string;
      frequency: string;
    }[];
    station: {
      stationName: string;
      stationOperator: string;
      networkOperator: string;
      frequency: string;
    }[];
    reasonsForConverstion: any; // Update 'any' with the actual type when available
    motivationSafeConversion: string;
  };
  step8: {
    partyObjection: string;
    stationName: string;
    nameOfObjectingParty: any; // Update 'any' with the actual type when available
  };
  haveRunningLines: null;
}