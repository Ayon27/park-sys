import { Injectable } from '@angular/core';
import { LOCAL_STORAGE_KEYS } from '../constants/local-storage-keys';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

   addVehicle(vehicle:any):void {
    const list = this.getList()
    list.push(vehicle)
    this.setList(list)
  }

  updateVehicle(vehicle:any):void {
    const list = this.getList()
    const index = list.findIndex(oldRecord=> oldRecord.licenseNumber === vehicle.licenseNumber)
    if(index >=0) {
      list.splice(index,1,vehicle)
    }
    this.setList(list)
  }

   getList():any[] {
    const list = localStorage.getItem(LOCAL_STORAGE_KEYS.VEHICLE_LIST)    
     return list ? JSON.parse(list) : []
  }

   setList(list:any[]):void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.VEHICLE_LIST, JSON.stringify(list))
  }
}
