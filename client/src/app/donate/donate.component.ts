import { Component } from '@angular/core';
import { SupportArticleComponent } from "../shared/support-article/support-article.component";

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [SupportArticleComponent],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css'
})
export class DonateComponent {

}
