
export const VEHICLE_TYPES  = {
    TRUCK: 'Truck',
    MICROBUS: 'Microbus',
    CAR:'Car'
}

export const PARKING_CHARGE:Map<string,number> = new Map([
    [VEHICLE_TYPES.TRUCK, 150],
    [VEHICLE_TYPES.MICROBUS, 100],
    [VEHICLE_TYPES.CAR, 50]
])