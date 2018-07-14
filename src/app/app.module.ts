import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  {AppService} from './app.service'
import {RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { FullviewComponent } from './fullview/fullview.component';
import { ErrorviewComponent } from './errorview/errorview.component';
import { SearchComponent } from './search/search.component';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    FullviewComponent,
    ErrorviewComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
    {path: '',component:SearchComponent,pathMatch:'full'}, 
    {path: 'search',component:SearchComponent,pathMatch:'full'},  
    {path: 'fullview/:word/:id',component:FullviewComponent,pathMatch:'full'},
    {path: 'error',component:ErrorviewComponent,pathMatch:'full'},
    {path: '*',component:ErrorviewComponent,pathMatch:'full'},
    {path: '**',component:ErrorviewComponent,pathMatch:'full'}
      ])
   
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
