import { Component, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { COLUMNS } from 'src/app/core/constants/list-columns';
import { LOCAL_STORAGE_KEYS } from 'src/app/core/constants/local-storage-keys';
import { ROUTE_NAMES } from 'src/app/core/constants/route-path';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {

  columns: string[] = COLUMNS
  vehicleList:any[] =[];

  constructor(private router:Router){}

  ngOnInit(): void {
    this.vehicleList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.VEHICLE_LIST) || "[]");
      (this.vehicleList);
      
  }



  editVehicleInfo(vehicle:any):void {
    this.router.navigate([ROUTE_NAMES.REGISTER], {state: {vehicleData:vehicle}})
  }
}
