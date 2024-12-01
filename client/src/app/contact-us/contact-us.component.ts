import { Component } from '@angular/core';
import { SupportArticleComponent } from "../shared/support-article/support-article.component";

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [SupportArticleComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

}
