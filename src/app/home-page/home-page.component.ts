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
  dataToSend: { clientId: string } = { clientId: '' };

  constructor(private creditService: CreditScoreService) { }

  onSubmit(customerId:string) {
    this.dataToSend = {clientId: customerId};
    this.creditService.getCreditScore(this.dataToSend).subscribe(response => {
      this.value = response.score.toFixed(2);
      console.log('Réponse de l\'API', response);
    });
  }

}

