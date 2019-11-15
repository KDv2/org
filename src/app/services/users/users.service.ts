import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  user
  currentSession
  categoriesLoop =[]
  data
  currentUser
  currentSessionId
  userProfile = []
  currentState : boolean                         
  //rootRef = database.ref().child("Categories")
  email
  password
  constructor() { }
  // Logging users in to the app
  login(email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password).then((result)=>{
      // this.setCurrentSession(firebase.auth())
      // this.checkingAuthState()
      return result
    }).catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage)
    return error
    });
  }
  //Adding new users to the database
  register(email, password, name){
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(data => {
      // this.setCurrentSession(firebase.auth())
      // this.checkingAuthState()
      let userEmail = email;
      let userName = name;
      let userID = data.user.uid;
      let now = moment().format('LLLL')
      console.log(userID)
      firebase.firestore().collection('Users/').doc(userID).set({
        email: userEmail,
        name: userName,
        hasProfilePic: false,
        hasRequestedLink: false,          //when the user has requested to link his/her account with someone else
        hasReceivedLinkRequest: false,    //when the user has received a link request from another user
        registeredAt: now
      })
      return data
     }).catch((error) => {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log(errorMessage)
       // ...
       return error
     })
  }
  //Allowing users to reset their password
  passwordReset(emailAddress){
    firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
      // Email sent.
      console.log("Email has been sent")
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }
  //Function : Routing logged out users to the login page
  signOut(){
    this.userProfile.pop()
    console.log(this.userProfile);
    return new Promise((resolve, reject) =>{
      firebase.auth().signOut().then(()=> {
        // Sign-out successful.
        
        resolve()
        this.checkingAuthState().then(data=>{
          console.log(data);
        });
        
      }).catch(error => {
        // An error happened.
      });
    })
  }
​
  getUserProfile(userId)  {
    return firebase.firestore().collection("Users/").doc(userId).get().then((snapshot) =>{
      // Edit
      let profile = snapshot.data()
      if(profile.hasProfilePic){
        return firebase.storage().ref('userDisplayPic/' + userId).getDownloadURL().then(url =>{
            profile['profilePicUrl'] = url
            return profile
          })
      }else{
          profile['profilePicUrl'] = "../assets/icon/person.png"
          return profile
      }
    })
  }
​
  checkingAuthState(){
    return new Promise((resolve, reject) =>{
      firebase.auth().onAuthStateChanged((user) =>{
        if(user){
          console.log(user);
          
          resolve (user)
        }else{
​
        }
      })
    })
  }
​
  savePic(image){
    this.login(this.email, this.password).then((userID) =>{
      let storageRef = firebase.storage().ref('userDisplayPic/' + userID)
      return storageRef.put(image).then((data) => {
        console.log('Saved');
      })
    })
  }
  //Delete?
  returnUserProfile(){
    console.log(this.userProfile);
    return this.userProfile
  }
​
​//Delete?
readCurrentSession(){
    console.log(this.user);
    return this.user
  }
​
  //Delete?
  setCurrentSession(user){
    var uid
    if (user !== null){
      uid = user.currentUser.uid;
      this.user = user.currentUser
      console.log(uid);
      
      var userRoot = firebase.database().ref("Users").child(uid)
      userRoot.once("value", snap => {
        //console.log(userRoot);
        let values = snap.val()
          console.log(values["name"]);
          console.log(values["email"]);
          this.userProfile.push({
          key: snap.key,
          displayName : values["name"],
          email : values["email"],
​
          })
      })  
    }
     this.currentSessionId = uid
     console.log(uid);
     console.log(user);
     console.log(this.user);
     return this.user
  }
  //delete?
  retrievingUserInfo(uid){
    return new Promise((resolve, reject) => {
      var userRoot = firebase.database().ref("Users").child(uid)
      userRoot.once("value", snap => {
        //console.log(userRoot);
        let values = snap.val()
        console.log(values["name"]);
        console.log(values["email"]);
        let userProfile = {
          key: snap.key,
          displayName : values["name"],
          email : values["email"],
        }
        resolve (userProfile)
      })
      
    })
  }
​
  // checkState(){
  //   if(!this.currentState){
  //    this.router.navigate(['/login'])
  //   }
  // }
​
  // returnState(){
  //   return this.currentState
  // }

  updateProfile(userID, newUsername, username, newEmail, email){
    return new Promise((resolve, reject) => {
      if(newUsername !== username){
        firebase.firestore().collection('Users/').doc(userID).update({
          name: newUsername
        })
        //return 'Profile has been reset'
      }
      console.log(newEmail);
      console.log(email);
      
      
      if(newEmail !== email){
        var user = firebase.auth().currentUser;
        console.log(user);
        firebase.firestore().collection('Users/').doc(userID).update({
          email: newEmail
        })
        user.updateEmail(newEmail).then((data) => {
          let message = 'Profile has been reset'
          console.log(data);
        }).catch(function(error) {
          // An error happened.
        });
      }
      resolve ()
    })
  }
}
