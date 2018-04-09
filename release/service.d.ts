import { IRemoteResponse, IHvacResponse } from "./models";
export declare class Service {
    private vin;
    private country;
    private readonly url;
    private readonly apiKey;
    private accountId;
    private authToken;
    constructor(vin: string, country?: string);
    login(username: string, password: string): Promise<boolean>;
    softLogin(username: string, password: string): Promise<boolean>;
    activateHvac(): Promise<IHvacResponse>;
    deactivateHvac(): Promise<IHvacResponse>;
    unlockDoors(authorizationKey: string): Promise<IRemoteResponse>;
    lockDoors(authorizationKey: string): Promise<IRemoteResponse>;
    flashLights(authorizationKey: string): Promise<IRemoteResponse>;
    private _getOptions();
}