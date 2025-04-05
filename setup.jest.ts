import {setupZoneTestEnv} from 'jest-preset-angular/setup-env/zone/index'
import {User} from "@baseline/shared/models/user.model";

setupZoneTestEnv()

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    }),
});

export const mockUser: User = {
    id: 'abc123',
    name: 'TestUser',
    email: 'test@email.com',
    roles: ["USER"],
    emailVerified: true,
    devices: [{
        id: 'device_id',
        lastActive: new Date(2025, 0, 1)
    }],
    twoFactorEnabled: false,
    lastActive: new Date('2025-01-01'),
    app: {}
}
