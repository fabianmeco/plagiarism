import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DocumentComponent } from './document/document.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'document', component: DocumentComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);