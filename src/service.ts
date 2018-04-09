import * as requestPromise from "request-promise-native";
import { RequestPromiseOptions } from "request-promise-native";
import { IAuthorizationResponse, IRemoteResponse, IResponse, IHvacResponse } from "./models";
import { Agent } from "https";

export class Service {
    private readonly url = "https://icm.infinitiusa.com/NissanLeafProd/rest";
    private readonly apiKey = "f950a00e-73a5-11e7-8cf7-a6006ad3dba0";
    private accountId: string;
    private authToken: string;

    constructor(private vin: string, private country: string = "US") {
    }

    public async login(username: string, password: string): Promise<boolean> {
        try {
            const response: IAuthorizationResponse = await requestPromise.post(`${this.url}/auth/authenticationForAAS?vin=${this.vin}`, {
                ...this._getOptions(),
                body: {
                    "authenticate": {
                        "userid": username,
                        "brand-s": "N",
                        "language-s": "en",
                        "password": password,
                        "country": this.country,
                    },
                }
            });

            this.accountId = response.accountID;
            this.authToken = response.authToken;
            return true;
        }
        catch {
            return false;
        }
    }

    public async softLogin(username: string, password: string): Promise<boolean> {
        try {
            const response: IAuthorizationResponse = await requestPromise.post(`${this.url}/auth/softLoginforAAS?vin=${this.vin}`, {
                ...this._getOptions(),
                body: {
                    "authenticate": {
                        "userid": username,
                        "brand-s": "N",
                        "language-s": "en",
                        "password": password,
                        "country": this.country
                    }
                }
            });

            this.authToken = response.authToken;
            return true;
        } catch {
            return false;
        }
    }

    public async activateHvac(): Promise<IHvacResponse> {
        const response: IHvacResponse = await requestPromise.post(`${this.url}/hvac/vehicles/${this.vin}/activateHVAC`, {
            ...this._getOptions(),
            body: {
                "executionTime": new Date().toISOString()
            }
        });

        return response;
    }

    public async deactivateHvac(): Promise<IHvacResponse> {
        const response: IHvacResponse = await requestPromise.post(`${this.url}/hvac/vehicles/${this.vin}/deactivateHVAC`, {
            ...this._getOptions(),
            body: {
                "executionTime": new Date().toISOString()
            }
        });

        return response;
    }

    public async unlockDoors(authorizationKey: string): Promise<IRemoteResponse> {
        const response: IRemoteResponse = await requestPromise.post(`${this.url}/remote/vehicles/${this.vin}/accounts/${this.accountId}/rdul/createRDUL`, {
            ...this._getOptions(),
            body: {
                "remoteRequest": {
                    "authorizationKey": authorizationKey
                }
            }
        });

        return response;
    }

    public async lockDoors(authorizationKey: string): Promise<IRemoteResponse> {
        const response: IRemoteResponse = await requestPromise.post(`${this.url}/remote/vehicles/${this.vin}/accounts/${this.accountId}/rdl/createRDL`, {
            ...this._getOptions(),
            body: {
                "remoteRequest": {
                    "authorizationKey": authorizationKey
                }
            }
        });

        return response;
    }

    public async flashLights(authorizationKey: string): Promise<IRemoteResponse> {
        const response: IRemoteResponse = await requestPromise.post(`${this.url}/remote/vehicles/${this.vin}/accounts/${this.accountId}/rhl/createRHL`, {
            ...this._getOptions(),
            body: {
                "remoteRHLRequest": {
                    "command" : "LIGHT_ONLY",
                    "authorizationKey": authorizationKey
                }
            }
        });

        return response;
    }

    private _getOptions(): RequestPromiseOptions {
        const options: RequestPromiseOptions = {
            json: true,
            headers: {
                "API-Key": this.apiKey,
                "Content-Type": "application/json",
            },
            jar: true,
        };

        if (this.authToken) {
            options.headers.Authorization = this.authToken;
        }

        return options;
    }
}
