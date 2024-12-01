import { Component } from '@angular/core';
import { SupportArticleComponent } from "../shared/support-article/support-article.component";

@Component({
  selector: 'app-adopt',
  standalone: true,
  imports: [SupportArticleComponent],
  templateUrl: './adopt.component.html',
  styleUrl: './adopt.component.css'
})
export class AdoptComponent {

}
