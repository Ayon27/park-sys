import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PARKING_CHARGE } from 'src/app/core/constants/parking-charge';
import { ROUTE_NAMES } from 'src/app/core/constants/route-path';
import { LocalStorageService } from 'src/app/core/services/local-storage-service.service';

@Component({
  selector: 'app-register-vehicle',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.scss']
})
export class RegisterVehicleComponent   {

  errorMessage:string = '';
  parkingData = []
  vehicleTypes:string[] = [
    "Microbus", "Car", "Truck"
  ]
  routerState:any;

  vehicleData:FormGroup = new FormGroup({
    licenseNumber: new FormControl('', Validators.required),
    vehicleType: new FormControl('', Validators.required),
    ownerName: new FormControl('', Validators.required),
    ownerPhone: new FormControl('', [Validators.required ,Validators.pattern(/^[0-9]{11}$/)]),
    status: new FormControl('', Validators.required),
    ownerAddress: new FormControl('', Validators.required),
    entryDate: new FormControl('', Validators.required),
    entryTime: new FormControl('', Validators.required),
    exitDate: new FormControl('', Validators.required),
    exitTime: new FormControl('', Validators.required),
    parkingCharge: new FormControl({value:'', disabled:true}, [Validators.required, Validators.pattern(/^[0-9]$/)]),
  });

  constructor(private localStorageService: LocalStorageService, private router:Router){
    this.routerState = this.router.getCurrentNavigation()?.extras.state
    if(this.routerState) {
      const previousValues = this.routerState['vehicleData']
      
      Object.keys(this.vehicleData.controls).forEach(key => {
        this.vehicleData.get(key)?.setValue ( previousValues[key])
      });
      this.onVehicleTypeChange()
    }
  }

  onVehicleTypeChange():void {
    setTimeout(() => {
  const type:any =this.vehicleData.get('vehicleType')?.value
  if(type) {
   const price = PARKING_CHARGE.get(type)
this.vehicleData.get('parkingCharge')?.setValue(price)
  }
    }, 0);
  

}


  
  onSubmit(){
    if(this.vehicleData.invalid) 
     throw new Error('Invalid Form')

     else if (this.routerState) {
   this.localStorageService.updateVehicle(this.vehicleData.value)
   this.router.navigate([ROUTE_NAMES.LIST])
      return
     }
      
    this.localStorageService.addVehicle(this.vehicleData.value)
    this.router.navigate([ROUTE_NAMES.LIST])
  }

}
