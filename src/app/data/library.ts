import { InjectionToken } from "@angular/core";

export enum odds {
    likely = 'Likely',
    average = 'Average',
    unlikely = 'Unlikely',
}

export enum amounts {
    more = 'Likely Higher',
    average = 'Average',
    fewer = 'Likely Lower'
}

export enum storage {
    local = 'simpleOracleState',
    test = 'localStorageTest'
}

export const storageToken = new InjectionToken<string>('localStorage', {
    providedIn: 'root',
    factory: () => storage.local
})
export const testLocation = storage.test
// export const testToken = new InjectionToken<string>('testStorage', {
//     providedIn: 'root',
//     factory: () => storage.test
// })