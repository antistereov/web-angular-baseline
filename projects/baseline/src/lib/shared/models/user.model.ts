export interface User {
    id: string;
    name?: string;
    email: string;
    roles: ("USER" | "GUEST" | "ADMIN")[];
    emailVerified: boolean;
    devices: DeviceInfo[];
    lastActive: Date;
    twoFactorAuthEnabled: boolean;
    app: ApplicationInfo;
}

type MimeType = 'image/jpeg' | 'image/png' | 'image/jpg' | 'image/gif' | 'application/pdf' | 'text/plain';

export interface FileResource {
    file: Blob | File;
    type: MimeType;
}

export interface ApplicationInfo {}

export interface DeviceInfo {
    id: string;
    browser?: string;
    os?: string;
    ipAddress?: string;
    location?: LocationInfo;
    lastActive: Date;
}

export interface LocationInfo {
    latitude: number;
    longitude: number;
    cityName: string;
    regionName: string;
    countryCode: string;
}
