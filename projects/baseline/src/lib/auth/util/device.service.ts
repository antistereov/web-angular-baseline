import { Injectable } from '@angular/core';
import platform from 'platform';
import {DeviceInfoRequest} from '@baseline/auth/model/user-session.model';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {

    getDeviceInfo(): DeviceInfoRequest {
        let deviceId = localStorage.getItem('device_id');
        if (!deviceId) {
            deviceId = 'device-' + Math.random().toString(36).substring(2) + Date.now().toString(36);
            localStorage.setItem('device_id', deviceId);
        }

        const browser = platform.name;
        const os = platform.os?.family;

        return { id: deviceId, browser, os }
    }
}
