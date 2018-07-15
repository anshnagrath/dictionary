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

private errorHandler (error){
 	if(error.status == 404){
	throwError("Not Found",error);
	this.router.navigate([`/error/${error}`])
	}
	else if(error.status == 400){
	throwError("Bad Request",error)
	this.router.navigate([`/error/${error}`])
	}
	else if(error.status == 403){
	throwError("authentication failure",error)
	this.router.navigate([`/error/${error}`])
	}else if(error.status == 500){
	throwError("internal server error",error)
	this.router.navigate([`/error/${error}`])
	}
	else if(error.status == 414){
	throwError("Request URI Too Long",error)
	this.router.navigate([`/error/${error}`])
	}
	else if(error.status == 502){
	throwError("Bad Gateway",error)
	this.router.navigate([`/error/${error}`])
	}
	else(throwError("Gateway timeout",error))
	this.router.navigate([`/error/${error}`])
	}
async getAllSearchResult (lang,word){
let get =  this.http.get(`/api/search/${lang}?q=${word}$prefix=true`).toPromise().catch(err=> this.errorHandler(err));
return get
}

async getAllLanguages(){
let get =  this.http.get(`/api/languages`).toPromise().catch(err=> this.errorHandler(err))
console.log(get)
return get
}
async getInflection(lang,word){
let get =  this.http.get(`/api/inflections/${lang}/${word}`).toPromise().catch(err=> this.errorHandler(err))
return get;
//else this.router.navigate([`/error/${);
}
async getentries(lang,word){
 let get =this.http.get(`/api/entries/${lang}/${word}`).toPromise().catch(err=> this.errorHandler(err))
 return get
}
async getSnoAno(lang,word){
let get =this.http.get(`/api/entries/${lang}/${word}/synonyms;antonyms`).toPromise().catch(error=>{
console.log(error.status)
if(error.status == 404){
throwError("no synonyms and antonyms found in the database",error);
}
else if(error.status == 400){
throwError("not found",error)
}
else if(error.status == 403){
throwError("authentication failure",error)
this.router.navigate([`/error/${error}`])
}else if(error.status == 500){
throwError("internal server error check internet",error)
}
else if(error.status == 414){
throwError("server took to long to respond",error)
}
else if(error.status == 502){
throwError("server down",error)
}
else(throwError("unreachable server",error))
});
  return get
}
}
