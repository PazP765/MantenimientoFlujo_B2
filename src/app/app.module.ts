import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskComponent } from './components/task/task.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { TaskService } from './services/task.service';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TaskFormComponent,
    TaskComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ZXingScannerModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
