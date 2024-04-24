export interface IOperatorApplicationAddresses {
    streetName: string;
    streetNumber: string;
    unitNumber: string;
    complex: string;
    suburb: string;
    cityTown: string;
    province: number;
    postalCode: string;

    postalStreetName: string;
    postalStreetNumber: string;
    postalUnitNumber: string;
    postalComplex: string;
    postalSuburb: string;
    postalCityTown: string;
    postalProvince: number;
    postalPostalCode: string;

    postalSameAsPhysical: boolean;
}