import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import {catchError,tap} from 'rxjs/operators';
import {Headers} from '@angular/http';
import {Http} from '@angular/http';
import {Router} from '@angular/router'
import {Observable} from 'rxjs';
import {throwError} from 'rxjs';

@Injectable()

export class AppService {

constructor(private http:HttpClient,private router:Router){
	console.log('look')   
 }

private httpErrorHandler (error:HttpErrorResponse){

 let errorMessage = ''
 console.log(this.router,'how')
 console.log('catch excecuted',error['status'])
 if(error['status'] == 404)
 this.router.navigate(['/error'])
 return throwError("wrong input") 
}
async getAllSearchResult (lang,word){	
let get =  this.http.get(`/api/search/${lang}?q=${word}$prefix=true`).pipe(tap( res=> console.log('data')),catchError(this.httpErrorHandler)).toPromise();
return get
}

async getAllLanguages(){
let get =  this.http.get(`/api/languages`).pipe(tap( res=> console.log('data')),catchError(this.httpErrorHandler)).toPromise()
console.log(get)
return get
}
async getInflection(lang,word){
let get =  this.http.get(`/api/inflections/${lang}/${word}`).toPromise()
if(get)return get;
//else this.router.navigate(['/error']);
}
async getentries(lang,word){ 
 let get =this.http.get(`/api/entries/${lang}/${word}`).toPromise().catch(err=> this.router.navigate(['/error']))
 return get
}
}
