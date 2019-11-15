import { Injectable } from '@angular/core';
import * as firebase from 'firebase'


@Injectable({
  providedIn: 'root'
})
export class GetReportsService {
  constructor() {}
  fetchCrimeTypes(){
    return firebase.database().ref('CrimeTypes').once('value').then(result => {
      console.log(result);
      return result
    })

  }
}
