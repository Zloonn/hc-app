import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TextFieldModule } from '@angular/cdk/text-field';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CreditScoreService } from '../credit-score.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [HttpClientModule, MatButtonModule, RouterLink, TextFieldModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, FormsModule, NgIf],
})

export class HomePageComponent {
  value = 0
  flag = 100
  dataToSend: { clientId: string } = { clientId: '' };
  parametersUsed: any;
  errorMessage: string | undefined;

  constructor(private creditService: CreditScoreService) { }

  onSubmit(customerId:string) {
    this.dataToSend = {clientId: customerId};
    this.creditService.getCreditScore(this.dataToSend).subscribe(response => {
      if (response.success == true) {
        this.flag = 0;
        this.value = response.score.toFixed(2);
        this.parametersUsed = response.parameters_used;
        this.errorMessage = ""
      }
    }, (error) => {
      if (error.error && error.error.message) {
        this.errorMessage = error.error.message;  
      } else {
        this.errorMessage = "Erreur inconnue";
      }
      this.parametersUsed = null;
      this.flag = 100;
      this.value = 0;
      console.log(this.errorMessage)
    });
  }

}

