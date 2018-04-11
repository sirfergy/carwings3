export interface IAuthorizationResponse {
    accountID: string;
    authToken: string;
}

export interface IResponse {
    messageDeliveryStatus: string;
}

export interface IHvacResponse extends IResponse {
}

export interface IRemoteResponse extends IResponse {
    serviceRequestId: string;
}
