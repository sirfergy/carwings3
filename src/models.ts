export interface IAuthorizationResponse {
    accountID: string;
    authToken: string;
    vehicles: IVehicle[];
}

export interface IVehicle {
    batteryRecords: IBatteryRecords;
    interiorTempRecords: ITemperatureRecords;
    temperatureRecords: ITemperatureRecords;
}

export interface IBatteryRecords {
    batteryStatus: IBatteryStatus;
    cruisingRangeAcOff: number;
    cruisingRangeAcOn: number;
    lastUpdateDateAndTime: Date;
    notificationDateAndTime: Date;
    operationResult: string;
    pluginState: string;
    timeRequired: ITimeRequired;
    timeRequired200: ITimeRequired;
    timeRequired200_6kW: ITimeRequired;
}

export interface IBatteryStatus {
    batteryCapacity: number;
    batteryChargingStatus: string;
    batteryRemainingAmount: number;
    soc: ISoC;
}

export interface ISoC {
    value: number;
}

export interface ITimeRequired {
    hourRequiredToFull: number;
    minutesRequiredToFull: number;
}

export interface ITemperatureRecords {
    inc_temp: number;
    notificationDateAndTime: Date;
    operationDateAndTime: Date;
    operationResult: string;
}

export interface IResponse {
    messageDeliveryStatus: string;
}

export interface IHvacResponse extends IResponse {
}

export interface IRemoteResponse extends IResponse {
    serviceRequestId: string;
}

export interface IVehicleLocatorResponse {
    displayMessages: string;
    sandsNotificationEvent: ISandsNotificationEventWrapper;
}

export interface ISandsNotificationEventWrapper {
    sandsNotificationEvent: ISandsNotificationEvent;
}

export interface ISandsNotificationEvent {
    body: ISandsNotificationEventBody;
    head: ISandsNotificationEventHead;
}

export interface ISandsNotificationEventBody {
    location: ISandsNotificationEventLocation;
}

export interface ISandsNotificationEventLocation {
    country: string;
    home: string;
    latitudeDeg: number;
    latitudeDMS: number;
    latitudeMin: number;
    latitudeMode: string;
    latitudeSec: number;
    locationType: string;
    longitudeDeg: number;
    longitudeDMS: number;
    longitudeMin: number;
    longitudeSec: number;
    position: string;
}

export interface ISandsNotificationEventHead {
    code: string;
    operationResult: string;
    receivedDate: Date;
    resultKey: string;
    userId: string;
    vin: string;
}
