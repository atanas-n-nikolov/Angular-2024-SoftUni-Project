import { Component } from '@angular/core';
import { SupportArticleComponent } from "../shared/support-article/support-article.component";

@Component({
  selector: 'app-lost-found',
  standalone: true,
  imports: [SupportArticleComponent],
  templateUrl: './lost-found.component.html',
  styleUrl: './lost-found.component.css'
})
export class LostFoundComponent {

}
