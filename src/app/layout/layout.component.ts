import { Component, OnInit } from '@angular/core';
import { AlphabetService, Alphabet } from '../services/alphabet.service';
import { SozlerService } from '../services/sozler.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public title = 'SÕZLER';

  public availableAlphabets = this.alphabetService.alphabets;
  public currentAlphabet$ = this.alphabetService.current$;

  constructor(
    private sozler: SozlerService,
    private alphabetService: AlphabetService
  ) {}

  ngOnInit(): void {}

  public handleKeyboardEvent(letter: string) {
    this.sozler.lastLetter$.next(letter);
  }

  public restart() {
    this.sozler.restart();
  }

  public setAlphabet(alphabet: Alphabet) {
    this.alphabetService.setAlphabet(alphabet);
  }
}
