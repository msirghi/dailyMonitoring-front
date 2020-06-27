import 'intersection-observer';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { QuotesService } from '../quotes.service';
import { AuthService } from '../auth/auth.service';
import { ColorSchemeService } from '../settings/color-scheme.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  @ViewChild('welcome', { static: false }) welcomeElement: ElementRef;
  private selectedQuote: { quote: string, author: string };
  private loading = true;
  private opacityChangeIntensity = 1000;
  isLogged = false;

  constructor(private renderer: Renderer2,
              private quoteService: QuotesService,
              private authService: AuthService,
              private colorSchemeService: ColorSchemeService) {
    this.colorSchemeService._setColorScheme({
      name: 'light',
      icon: 'wb_sunny'
    });
  }

  selectQuote(quote: string, author: string) {
    this.selectedQuote = { quote, author };
    this.loading = false;
  }

  getRandomQuote(quotes: Array<{ text: string, author: string }>) {
    const random: number = Math.floor(Math.random() * quotes.length);

    quotes[random].text.length > 100
      ? this.selectQuote(quotes[random].text, quotes[random].author || 'Unknown')
      : this.getRandomQuote(quotes);
  }

  ngOnInit() {
    // this.quoteService
    //   .getQuotes()
    //   .subscribe((quotes: Array<{ text: string, author: string }>) => this.getRandomQuote(quotes));
    setTimeout(() => this.loading = false, 1000);
    this.isLogged = !!this.authService.isAuthenticated();
  }

  public onIntersectionAnimateLeft({ target, visible }: { target: Element; visible: boolean }): void {
    this.renderer.addClass(target, visible ? 'animate-slide-left' : 'inactive');
  }

  public onIntersectionAnimateRight({ target, visible }: { target: Element; visible: boolean }): void {
    this.renderer.addClass(target, visible ? 'animate-slide-right' : 'inactive');
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event) {
    this.renderer.setStyle(this.welcomeElement.nativeElement, 'opacity', 1 - window.pageYOffset / this.opacityChangeIntensity);
  }
}
