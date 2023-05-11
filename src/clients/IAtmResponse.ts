export interface ATMs {
    Name: string;
    Distance: number;
    DistanceUnit: string;
    Address: {
      Line1: string;
      Line2: string | null;
      City: string;
      PostalCode: string;
      CountrySubdivision: {
        Name: string;
        Code: string;
      };
      Country: {
        Name: string;
        Code: string;
        GeoCoding: boolean;
      };
    };
    Point: {
      Latitude: number;
      Longitude: number;
    };
    GeocodingResult: null;
    LocationType: {
      Type: string;
    };
  
    HandicapAccessible: string;
    Camera: string;
    Availability: string;
    AccessFees: string;
    Owner: string;
    SharedDeposit: string;
    SurchargeFreeAlliance: string;
    SurchargeFreeAllianceNetwork: string;
    Sponsor: string;
    SupportEMV: number;
  }