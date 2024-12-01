import { Component } from '@angular/core';
import { SupportArticleComponent } from "../shared/support-article/support-article.component";

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [SupportArticleComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

}
