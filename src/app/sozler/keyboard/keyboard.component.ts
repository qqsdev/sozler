import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AlphabetService } from 'src/app/services/alphabet.service';
import { SozlerService } from '../../services/sozler.service';

@UntilDestroy()
@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardComponent implements OnInit {
  @Output() keyboardEvent = new EventEmitter<string>();

  public currentAlphabet$ = this.alphabet.current$;

  public emptyLetters: string[] = [];
  public wrongLetters: string[] = [];
  public correctLetters: string[] = [];

  private lastKey = '';
  private shortcuts? = '';

  constructor(
    private sozler: SozlerService,
    private alphabet: AlphabetService
  ) {}

  ngOnInit(): void {
    this.sozler.restart$.pipe(untilDestroyed(this)).subscribe(() => {
      this.emptyLetters = [];
      this.wrongLetters = [];
      this.correctLetters = [];
      this.lastKey = '';
    });

    this.sozler.emptyLetters$.pipe(untilDestroyed(this)).subscribe((letter) => {
      this.emptyLetters.push(letter);
    });

    this.sozler.wrongLetters$.pipe(untilDestroyed(this)).subscribe((letter) => {
      this.wrongLetters.push(letter);
    });

    this.sozler.correctLetters$
      .pipe(untilDestroyed(this))
      .subscribe((letter) => {
        this.correctLetters.push(letter);
      });

    this.alphabet.current$.pipe(untilDestroyed(this)).subscribe((alphabet) => {
      this.shortcuts = alphabet.shortcuts;
    });
  }

  @HostListener('document:keydown', ['$event'])
  public onKeypress({ key, code }: { key: string; code: string }) {
    const alphabet = this.currentAlphabet$.value;
    let letter = key.toUpperCase();

    if (code === 'Enter') {
      this.sozler.submitted$.emit();
      return;
    }

    // TODO: clean up the mess:

    if (alphabet.letters.includes('Ç')) {
      if (code === 'KeyC') {
        letter = 'Ç';
      }
    }

    if (alphabet.letters.includes('Ş')) {
      if (this.lastKey === 'S') {
        if (code === 'KeyH') {
          letter = 'Ş';
          this.sozler.removed$.emit();
        }
      }
      if (this.lastKey === 'Ş') {
        if (code === 'Backspace') {
          this.sozler.removed$.emit();

          letter = 'S';
          this.lastKey = letter;
          this.keyboardEvent.emit(letter);
          return;
        }
      }
    }

    if (code === 'Quote') {
      if (this.lastKey === 'O') {
        letter = 'Õ';
        this.sozler.removed$.emit();
      }
      if (this.lastKey === 'G') {
        letter = 'Ğ';
        this.sozler.removed$.emit();
      }
    }

    if (code === 'Backspace') {
      this.sozler.removed$.emit();

      if (this.lastKey === 'Õ') {
        letter = 'O';
      } else if (this.lastKey === 'Ğ') {
        letter = 'G';
      } else {
        return;
      }
    }

    this.lastKey = letter;

    if (alphabet.letters.includes(letter)) {
      this.keyboardEvent.emit(letter);
    }
  }

  public isWrong(key: string) {
    return this.wrongLetters.includes(key.toLowerCase());
  }

  public isCorrect(key: string) {
    return (
      !this.isWrong(key) && this.correctLetters.includes(key.toLowerCase())
    );
  }

  public isEmpty(key: string) {
    return (
      !this.isCorrect(key) && this.emptyLetters.includes(key.toLowerCase())
    );
  }
}
