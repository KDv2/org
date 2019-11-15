import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class SetReportsService {

  crimesList : Array<any> = []
  savedLocations : Array<any> = []
  userIncidents : Array<any> = []
  tempArray : Array<any> = []
  currentDate
  monthNum
  monthArray
  month
  date
  year


  addToOldUserReport = false
  addToNewUserReport = true
  addToHighRisk = false
  constructor() { }
  finallySubmit(addToHighRisk, addToOldUserReport, addToNewUserReport){
    console.log('hello');
    
  }
  submitNew(submitInfo){
    return new Promise((resolve, reject) => {
      let dateTime = moment().format('LLLL')
      let userId = submitInfo.userId
      let place = submitInfo.address
      let description = submitInfo.description
      let lat = submitInfo.lat
      let lng = submitInfo.lng
      let addToOldUserReport = false
      let addToNewUserReport
      let addToHighRisk = false
  
      addToNewUserReport = false
      addToOldUserReport = false
      addToHighRisk = false
      let highRiskReport = []
      let incidentReport = []
      console.log(lat);
      console.log(lng);
      console.log(description);
      console.log(userId);
      console.log(place);
        //checking if place has been reported before
  
        console.log(addToOldUserReport, 'adding to old report');
        console.log(addToHighRisk, 'adding to high risk');
        console.log(addToNewUserReport, 'adding to new report');
  
  
        var newPostKey = firebase.database().ref().child('Incidents/' + "/" + place + "/").push().key;
      console.log(newPostKey);
        firebase.firestore().collection('Incidents/').doc(place).set({
          lat : lat,
          lng : lng,
          numberOfReports: 1        
        })
  
        firebase.firestore().collection('Incidents/').doc(place).collection('Reports').doc().update({
          description: description,
          dateTime: dateTime,
          userID: userId
        })
      resolve()
      let gate = 'hell'
      console.log(gate);
      
    })
  }
  submitToOldIncidents(submitInfo, key, numberOfReports){
    return new Promise((resolve, reject) => {
      let dateTime = moment().format('LLLL')
      let userId = submitInfo.userId
      let place = submitInfo.address
      let description = submitInfo.description
      let lat = submitInfo.lat
      let lng = submitInfo.lng
      let addToOldUserReport = false
      let addToNewUserReport
      let addToHighRisk = false
  
      addToNewUserReport = false
      addToOldUserReport = false
      addToHighRisk = false
      let highRiskReport = []
      let incidentReport = []
      console.log(lat);
      console.log(lng);
      console.log(description);
      console.log(userId);
      console.log(place);
        //checking if place has been reported before
  
        console.log(addToOldUserReport, 'adding to old report');
        console.log(addToHighRisk, 'adding to high risk');
        console.log(addToNewUserReport, 'adding to new report');
  
        
        var newPostKey = firebase.database().ref().child('Incidents/' + "/" + place + "/").push().key;
        var postKey = key
        console.log(postKey);
        
      console.log(newPostKey);
        firebase.firestore().collection('Incidents/').doc(place).collection('Reports').doc().update({
          description: description,
          dateTime: dateTime,
          userID: userId
        })
      resolve()    
    })
  }
  submitToHighRisk(submitInfo){
    return new Promise((resolve, reject) => {
      let dateTime = moment().format('LLLL')
      let userId = submitInfo.userId
      let place = submitInfo.address
      let description = submitInfo.description
      let lat = submitInfo.lat
      let lng = submitInfo.lng
      let addToOldUserReport = false
      let addToNewUserReport
      let addToHighRisk = false
  
      addToNewUserReport = false
      addToOldUserReport = false
      addToHighRisk = false
      let highRiskReport = []
      let incidentReport = []
      console.log(lat);
      console.log(lng);
      console.log(description);
      console.log(userId);
      console.log(place);
        //checking if place has been reported before
  
        console.log(addToOldUserReport, 'adding to old report');
        console.log(addToHighRisk, 'adding to high risk');
        console.log(addToNewUserReport, 'adding to new report');
  
  
        var newPostKey = firebase.database().ref().child('HighRisk/' + "/" + place + "/").push().key;
      console.log(newPostKey);
        firebase.firestore().collection('Incidents/').doc(place).collection('Reports').doc().update({
          description: description,
          dateTime: dateTime,
          userID: userId
        })
      resolve()
    })   
  }

  clearArray(array){
    for(let i=0; i < array.length; i++){array.splice(i)}
  }
}
