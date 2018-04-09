"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestPromise = require("request-promise-native");
class Service {
    constructor(vin, country = "US") {
        this.vin = vin;
        this.country = country;
        this.url = "https://icm.infinitiusa.com/NissanLeafProd/rest";
        this.apiKey = "f950a00e-73a5-11e7-8cf7-a6006ad3dba0";
    }
    async login(username, password) {
        try {
            const response = await requestPromise.post(`${this.url}/auth/authenticationForAAS?vin=${this.vin}`, Object.assign({}, this._getOptions(), { body: {
                    "authenticate": {
                        "userid": username,
                        "brand-s": "N",
                        "language-s": "en",
                        "password": password,
                        "country": this.country,
                    },
                } }));
            this.accountId = response.accountID;
            this.authToken = response.authToken;
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    async softLogin(username, password) {
        try {
            const response = await requestPromise.post(`${this.url}/auth/softLoginforAAS?vin=${this.vin}`, Object.assign({}, this._getOptions(), { body: {
                    "authenticate": {
                        "userid": username,
                        "brand-s": "N",
                        "language-s": "en",
                        "password": password,
                        "country": this.country
                    }
                } }));
            this.authToken = response.authToken;
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    async activateHvac() {
        const response = await requestPromise.post(`${this.url}/hvac/vehicles/${this.vin}/activateHVAC`, Object.assign({}, this._getOptions(), { body: {
                "executionTime": new Date().toISOString()
            } }));
        return response;
    }
    async deactivateHvac() {
        const response = await requestPromise.post(`${this.url}/hvac/vehicles/${this.vin}/deactivateHVAC`, Object.assign({}, this._getOptions(), { body: {
                "executionTime": new Date().toISOString()
            } }));
        return response;
    }
    async unlockDoors(authorizationKey) {
        const response = await requestPromise.post(`${this.url}/remote/vehicles/${this.vin}/accounts/${this.accountId}/rdul/createRDUL`, Object.assign({}, this._getOptions(), { body: {
                "remoteRequest": {
                    "authorizationKey": authorizationKey
                }
            } }));
        return response;
    }
    async lockDoors(authorizationKey) {
        const response = await requestPromise.post(`${this.url}/remote/vehicles/${this.vin}/accounts/${this.accountId}/rdl/createRDL`, Object.assign({}, this._getOptions(), { body: {
                "remoteRequest": {
                    "authorizationKey": authorizationKey
                }
            } }));
        return response;
    }
    async flashLights(authorizationKey) {
        const response = await requestPromise.post(`${this.url}/remote/vehicles/${this.vin}/accounts/${this.accountId}/rhl/createRHL`, Object.assign({}, this._getOptions(), { body: {
                "remoteRHLRequest": {
                    "command": "LIGHT_ONLY",
                    "authorizationKey": authorizationKey
                }
            } }));
        return response;
    }
    _getOptions() {
        const options = {
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
exports.Service = Service;
//# sourceMappingURL=service.js.map