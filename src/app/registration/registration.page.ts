import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Events, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsersService } from '../services/users/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  name; email; password; confirmPassword; 
  registrationForm
  emailPattern= "[a-zA-Z0-9-_.+#$!=%^&*/?]+[@][a-zA-Z0-9-]+[.][a-zA-Z0-9]+"
  namePattern = "^(?=.*\[A-Z])(?=.*\[a-z])(?=.*\[A-Z]).{2,}$"
  passwordPattern = "^(?=.*\[0-9])(?=.*\[a-z])(?=.*\[A-Z])(?=.*\[@#$!%^&*,.<>]).{8,}$"
  pageURL
  passwordType
  passwordIcon

  constructor(
    public userService : UsersService,
    public formBuilder: FormBuilder,
    public route: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public events: Events) {
      this.events.publish('currentPage:home', false)
    this.registrationForm = formBuilder.group({
      name: [this.name, Validators.compose([Validators.required, Validators.pattern(this.namePattern)])],
      email: [this.email, Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      password: [this.password,Validators.compose([Validators.required, Validators.pattern(this.passwordPattern)])],
      confirmPassword: [this.confirmPassword, Validators.required]
    })
  }
  addUser(){
    this.email = this.registrationForm.get('email').value
    this.name = this.registrationForm.get('name').value
    this.password = this.registrationForm.get('password').value
    this.confirmPassword = this.registrationForm.get('confirmPassword').value
    if(this.password === this.confirmPassword){
      this.userService.register(this.email, this.password, this.name).then((data)=>{
      console.log(data)
          if(data.operationType === "signIn"){
            let link = "home"
            this.route.navigate([link])
            this.presentToast()
          }else{
            this.emailAlert(data)
          }
        }).catch((error) => {
          console.log(error)
        })
      console.log("passwords match");
    }else if(this.password !== this.confirmPassword){
      this.loadPasswordAlert()
    }
  }

  async emailAlert(data){
    const alert = await this.alertController.create({
      header: "Alert",
      message: data,
      buttons: ['OK']
    })
    await alert.present()
  }

  async loadPasswordAlert(){
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Error',
        message: 'Passwords don\'t match',
        buttons: ['OK']
      });
      await alert.present();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'You have been registered',
      duration: 2000,
      color: "tertiary"
    });
    toast.present();
  }
  // showPassword(){
  //   this.passwordType = this.passwordType === 'text'?'password':'text'
  //   this.passwordIcon = this.passwordIcon === 'eye-off'?'eye':'eye-off'
  // }
  ngOnInit() {
    
  }  
}
