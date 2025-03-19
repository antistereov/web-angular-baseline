export interface User {
    id: string;
    name: string | undefined;
    email: string;
    roles: "USER" | "GUEST" | "ADMIN"
    emailVerified: boolean;
    devices: DeviceInfo[];
    lastActive: Date;
    twoFactorEnabled: boolean;
    app: ApplicationInfo;
}

export interface ApplicationInfo {}

export interface DeviceInfo {
    id: string;
    browser: string | undefined;
    os: string | undefined;
    ipAddress: string | undefined;
    location: LocationInfo | undefined;
    lastActive: Date;
}

export interface LocationInfo {
    latitude: number;
    longitude: number;
    cityName: string;
    regionName: string;
    countryCode: string;
}
