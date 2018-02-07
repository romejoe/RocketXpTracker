import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule, ProgressSpinnerModule } from 'primeng/primeng';

@NgModule({
  imports: [HomeRoutingModule, ButtonModule, ProgressSpinnerModule, FileUploadModule, SharedModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [NameListService]
})
export class HomeModule { }
