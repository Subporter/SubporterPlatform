import { Routes } from '@angular/router';
//import { Home } from '../components/Home';
import { Register } from '../components/Register';
import { Login } from '../components/Login';
//import { AuthGuard } from '../common/AuthGuard';

export const SubporterRoutes: Routes = [
	{ path: '', component: Login },
	{ path: 'register', component: Register },
	{ path: 'login', component: Login },
	//{ path: 'home', component: Home, canActivate: [AuthGuard] },
	{ path: '**',	component: Login },
];