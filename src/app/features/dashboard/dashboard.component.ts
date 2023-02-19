import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VEHICLE_TYPES } from 'src/app/core/constants/parking-charge';
import { LocalStorageService } from 'src/app/core/services/local-storage-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  parkedVehicles: any[];
  parkedVehicleCount:number = 0;
  readonly totalSlots:number = 100;
  emptySlots:number = 0;

  carsCount:number = 0;
  trucksCount:number = 0;
  microbusCount:number = 0;
  longTimeParkedList: any[] = []
  selectedDate:Date = new Date()
  dateChangeSub:Subscription = new Subscription()

filterDate = new FormControl(new Date())
  filteredList: any[] = []

  constructor(private localStorageService:LocalStorageService, private datePipe:DatePipe){
    this.parkedVehicles = this.localStorageService.getList();
    this.filteredList =this.filterByDate(this.datePipe.transform(new Date(), 'yyyy-MM-dd'))
    this.parkedVehicleCount = this.parkedVehicles.length;
    this.emptySlots = this.totalSlots - this.parkedVehicleCount
  }

  ngOnInit():void {
    this.setVehicleCountByType()
    this.setVehiclesParkedForLongTime()
    this.dateChangeSub = this.filterDate.valueChanges.subscribe({
      next:(date)=> {
        const parsedDate =this.datePipe.transform(date, 'yyyy-MM-dd')
        this.filteredList = this.filterByDate(parsedDate)  
              
      }
    })
    
  }

  filterByDate(date:any):any[]{
    
 return this.parkedVehicles.filter(vehicle => 
  vehicle.entryDate == date
)
  }

  setVehicleCountByType():void {
    this.parkedVehicles.forEach(vehicle=> {
      (vehicle.vehicleType);
      
      switch (vehicle.vehicleType) {
        case VEHICLE_TYPES.TRUCK:
          ++this.trucksCount
          break;
          case VEHICLE_TYPES.CAR:
          ++this.carsCount
          break;
          case VEHICLE_TYPES.MICROBUS:
            ++this.microbusCount
            break;
        default:
          break;
      }
    })
  }

  setVehiclesParkedForLongTime():void {
   const date = new Date().toTimeString()
   const currentTime = date.slice(0,date.lastIndexOf(':'))
 const currentTimeInMs:any = new Date(2000, 0, 1,  parseInt(currentTime[0]), parseInt(currentTime[1]));
   
   
   this.longTimeParkedList = this.parkedVehicles.filter(vehicle => {
      const timeList:string[] = vehicle.entryTime.split(':')
     const parkedTime:any = new Date(2000, 0, 1,  parseInt(timeList[0]), parseInt(timeList[1]));
  
return   Math.abs(currentTimeInMs - parkedTime) >  7200000
   
    })
  }

  onDateSelect():void {
    console.log('asd');
    
  }

  convertToMs(list:string[]):number {
    const h:number = parseInt(list[0]) * 3600;
    const m:number = parseInt(list[1]) * 60
   return (h+m) * 1000
   
  }
}
