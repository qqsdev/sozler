import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, takeWhile } from 'rxjs/operators';
import { SozlerService } from '../sozler.service';

// ikta tilli wordle

const MAX_ATTEMPS = 13;
const LETTERS_COUNT = 5;

@UntilDestroy()
@Component({
  selector: 'app-guesses',
  templateUrl: './guesses.component.html',
  styleUrls: ['./guesses.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessesComponent implements OnInit {
  public guesses: string[][] = [];
  public currentGuess?: string[];
  public solution: string = '';
  public attempts: string[][] = [];

  public currentIndex: number = 0;
  public currentRow: number = 0;
  public incorrectWord: boolean = false;
  public wordFound: boolean = false;

  constructor(public sozler: SozlerService) {}

  ngOnInit(): void {
    this.initialize();

    this.sozler.restart$.pipe(untilDestroyed(this)).subscribe(() => {
      window.location.reload();
      // this.sozler.restart();
      // this.initialize();
    });

    this.sozler.lastLetter$
      .pipe(
        untilDestroyed(this),
        filter(() => !this.wordFound)
      )
      .subscribe((letter) => {
        if (!letter) return;
        if (this.currentIndex >= LETTERS_COUNT) return;

        this.incorrectWord = false;

        if (this.currentGuess) {
          this.currentGuess[this.currentIndex] = letter;
          this.currentIndex = this.currentIndex + 1;

          if (this.currentGuess.length) {
            const guess = this.currentGuess.join('').toLowerCase().trim();

            if (guess.length === LETTERS_COUNT) {
              if (!this.sozler.isWordExists(guess)) {
                this.incorrectWord = true;
              }
            }
          }
        }
      });

    this.sozler.removed$
      .pipe(
        untilDestroyed(this),
        filter(() => !this.wordFound)
      )
      .subscribe(() => {
        if (this.currentIndex <= 0) return;

        if (this.currentGuess) {
          this.currentIndex = this.currentIndex - 1;
          this.currentGuess[this.currentIndex] = '';
        }

        this.incorrectWord = false;
      });

    this.sozler.submitted$
      .pipe(
        untilDestroyed(this),
        filter(() => !this.wordFound)
      )
      .subscribe(() => {
        console.log('submitted$', this.wordFound);
        this.incorrectWord = false;

        if (!this.currentGuess) return;
        if (!this.currentGuess.length) return;

        const guess = this.currentGuess.join('').toLowerCase().trim();

        console.log('submitted$', guess);


        if (guess.length === LETTERS_COUNT) {
          if (this.sozler.isWordExists(guess)) {
            this.attempts[this.currentRow] = this.sozler.verifyInput(
              this.solution,
              guess
            );

            this.currentRow = this.currentRow + 1;
            this.currentIndex = 0;
            this.currentGuess = this.guesses[this.currentRow];

            if (guess === this.solution) {
              this.wordFound = true;
            }
          } else {
            this.incorrectWord = true;
          }
        }

        if (this.currentRow >= MAX_ATTEMPS) {
          this.sozler.isGameOver$.next(true);
        }
      });
  }

  public isCorrect(row: number, i: number) {
    return this.sozler.isCorrect(this.attempts, row, i);
  }

  public isWrong(row: number, i: number) {
    return this.sozler.isWrong(this.attempts, row, i);
  }

  private initialize() {
    this.solution = this.sozler.getRandomWord();

    this.guesses = Array.apply(null, Array(MAX_ATTEMPS)).map(() =>
      Array(LETTERS_COUNT)
    );

    this.currentGuess = this.guesses[0];
    this.currentRow = 0;
    this.currentIndex = 0;
    this.attempts = [];
    this.incorrectWord = false;
    this.wordFound = false;
  }
}
