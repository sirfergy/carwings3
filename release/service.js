"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const requestPromise = require("request-promise-native");
class Service {
    constructor(vin, country = "US") {
        this.vin = vin;
        this.country = country;
        this.url = "https://icm.infinitiusa.com/NissanLeafProd/rest";
        this.apiKey = "f950a00e-73a5-11e7-8cf7-a6006ad3dba0";
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield requestPromise.post(`${this.url}/auth/authenticationForAAS?vin=${this.vin}`, Object.assign({}, this._getOptions(), { body: {
                        authenticate: {
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
        });
    }
    softLogin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield requestPromise.post(`${this.url}/auth/softLoginforAAS?vin=${this.vin}`, Object.assign({}, this._getOptions(), { body: {
                        authenticate: {
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
        });
    }
    refreshBatteryStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield requestPromise.get(`${this.url}/battery/vehicles/${this.vin}/getChargingStatusRequest`, Object.assign({}, this._getOptions()));
            return response;
        });
    }
    activateHvac() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield requestPromise.post(`${this.url}/hvac/vehicles/${this.vin}/activateHVAC`, Object.assign({}, this._getOptions(), { body: {
                    executionTime: new Date().toISOString()
                } }));
            return response;
        });
    }
    deactivateHvac() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield requestPromise.post(`${this.url}/hvac/vehicles/${this.vin}/deactivateHVAC`, Object.assign({}, this._getOptions(), { body: {
                    executionTime: new Date().toISOString()
                } }));
            return response;
        });
    }
    unlockDoors(authorizationKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield requestPromise.post(`${this.url}/remote/vehicles/${this.vin}/accounts/${this.accountId}/rdul/createRDUL`, Object.assign({}, this._getOptions(), { body: {
                    remoteRequest: {
                        authorizationKey: authorizationKey
                    }
                } }));
            return response;
        });
    }
    lockDoors(authorizationKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield requestPromise.post(`${this.url}/remote/vehicles/${this.vin}/accounts/${this.accountId}/rdl/createRDL`, Object.assign({}, this._getOptions(), { body: {
                    remoteRequest: {
                        authorizationKey: authorizationKey
                    }
                } }));
            return response;
        });
    }
    flashLights(authorizationKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield requestPromise.post(`${this.url}/remote/vehicles/${this.vin}/accounts/${this.accountId}/rhl/createRHL`, Object.assign({}, this._getOptions(), { body: {
                    remoteRHLRequest: {
                        command: "LIGHT_ONLY",
                        authorizationKey: authorizationKey
                    }
                } }));
            return response;
        });
    }
    findVehicleLocation() {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const lastMonth = new Date(now.getDate() - 30);
            const response = yield requestPromise.post(`${this.url}/vehicleLocator/vehicles/${this.vin}/refreshVehicleLocator`, Object.assign({}, this._getOptions(), { body: {
                    serviceName: "MyCarFinderResult",
                    acquiredDataUpperLimit: 1,
                    searchPeriod: `${lastMonth.getFullYear()}${lastMonth.getMonth()}${lastMonth.getDay()},${now.getFullYear()}${now.getMonth()}${now.getDay()}`
                } }));
            return response;
        });
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