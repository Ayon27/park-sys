import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTE_NAMES } from './core/constants/route-path';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DataTableComponent } from './features/data-table/data-table.component';
import { RegisterVehicleComponent } from './features/register-vehicle/register-vehicle.component';



const routes: Routes = [
  { path: ROUTE_NAMES.DASHBOARD, component: DashboardComponent },
  { path:ROUTE_NAMES.REGISTER, component: RegisterVehicleComponent },
  {path: ROUTE_NAMES.LIST, component: DataTableComponent},
  {path: '**', component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
