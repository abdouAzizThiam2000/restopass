import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { RestaurantComponent } from '../../restaurant/restaurant.component';
import { VigilComponent } from '../../vigil/vigil.component';
import { ParametresComponent } from '../../parametres/parametres.component';
import { HoraireComponent } from '../../horaire/horaire.component';


export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'table-list', component: TableListComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'restaurant', component: RestaurantComponent },
  { path: 'vigil', component: VigilComponent },
  { path: 'parametres', component: ParametresComponent },
  { path: 'horaire', component: HoraireComponent },





  { path: 'notifications', component: NotificationsComponent },
  { path: 'upgrade', component: UpgradeComponent }
];
