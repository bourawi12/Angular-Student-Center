import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/Service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private Auth:AuthServiceService,private router:Router) { }
  email: string = '';
  password: string = '';

  Sub(){
    console.log(this.email);
    console.log(this.password);
    //envoyer les données au serveur
    this.Auth.signInWithEmailAndPassword("mohamed12bouaziz@gmail.com", this.password).then(() => {
      console.log("connexion réussie");
      this.router.navigate(['/members'])
      
    }
    )

}}
