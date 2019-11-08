import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'forgot', loadChildren: './pages/forgot/forgot.module#ForgotPageModule' },
  { path: 'result', loadChildren: './pages/result/result.module#ResultPageModule' },
  { path: 'clinic/:cid', loadChildren: './pages/clinic/clinic.module#ClinicPageModule' },
  { path: 'clinic/:cid/doctor/:did', loadChildren: './pages/doctor/doctor.module#DoctorPageModule' },
  // { path: 'appointment', loadChildren: './pages/appointment/appointment.module#AppointmentPageModule' },
  // { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
  // { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
