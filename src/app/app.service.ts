import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import {catchError,tap} from 'rxjs/operators';
import {Headers} from '@angular/http';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
@Injectable()
export class AppService {


constructor(private http:HttpClient){
	console.log('look')
 }

private httpErrorHandler (err:HttpErrorResponse){
 let errorMessage = ''
 if (err.error instanceof Error){
    errorMessage = `An error occured:${err.error.message}`
  }else{
    errorMessage = `An error occured: ${err.status},error message is:${err.message}`
  }
  return Observable.throw(errorMessage);
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
let get =  this.http.get(`/api/inflections/${lang}/${word}`).pipe(tap( res=> console.log('data')),catchError(this.httpErrorHandler)).toPromise()
return get
}
async getentries(lang,word){
let get =  this.http.get(`/api/entries/${lang}/${word}`).pipe(tap( res=> console.log('data')),catchError(this.httpErrorHandler)).toPromise()
return get
}
}
