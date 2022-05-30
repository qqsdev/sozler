import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { SozlerService } from '../../services/sozler.service';

const MAX_ATTEMPS = 13;
const LETTERS_COUNT = 5;

const createJaggeredArray = (outerLenght: number, innerLength: number) =>
  Array.apply(null, Array(outerLenght)).map(() => Array(innerLength));

@UntilDestroy()
@Component({
  selector: 'app-guesses',
  templateUrl: './guesses.component.html',
  styleUrls: ['./guesses.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessesComponent implements OnInit {
  @Input() solution: string = '';
  @Input() attemptsCount: number = MAX_ATTEMPS;
  @Output() wordFoundEvent = new EventEmitter<boolean>();

  public isGameOver$ = this.sozler.isGameOver$;

  public guesses: string[][] = [];
  public attempts: string[][] = [];
  public currentGuess?: string[];

  public currentIndex: number = 0;
  public currentRow: number = 0;
  public incorrectWord: boolean = false;
  public wordFound: boolean = false;

  private subscribtions: Subscription[] = [];

  constructor(private sozler: SozlerService) {}

  ngOnInit(): void {
    this.initialize();
  }

  public isCorrect(row: number, i: number) {
    return this.sozler.isCorrect(this.attempts, row, i);
  }

  public isWrong(row: number, i: number) {
    return this.sozler.isWrong(this.attempts, row, i);
  }

  private initialize() {
    this.solution = this.solution || this.sozler.getRandomWord();

    this.guesses = createJaggeredArray(this.attemptsCount, LETTERS_COUNT);

    this.currentGuess = this.guesses[0];
    this.currentRow = 0;
    this.currentIndex = 0;
    this.attempts = [];
    this.incorrectWord = false;
    this.wordFound = false;

    this.unsubscribeFromEvents();
    this.subscribeToEvents();
  }

  private unsubscribeFromEvents() {
    if (this.subscribtions.length) {
      for (const subscribtion of this.subscribtions) {
        subscribtion.unsubscribe();
      }
    }

    this.subscribtions = [];
  }

  private subscribeToEvents() {
    this.subscribtions.push(
      this.sozler.restart$.pipe(untilDestroyed(this)).subscribe(() => {
        console.log('restarting');
        this.initialize();
      })
    );

    this.subscribtions.push(
      this.sozler.lastLetter$
        .pipe(
          untilDestroyed(this),
          filter(() => !this.wordFound),
          filter((letter) => !!letter),
          filter(() => this.currentIndex < LETTERS_COUNT),
          tap(() => (this.incorrectWord = false))
        )
        .subscribe((letter) => {
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
        })
    );

    this.subscribtions.push(
      this.sozler.removed$
        .pipe(
          untilDestroyed(this),
          filter(() => !this.wordFound),
          filter(() => this.currentIndex > 0),
          tap(() => (this.incorrectWord = false))
        )
        .subscribe(() => {
          if (this.currentGuess) {
            this.currentIndex = this.currentIndex - 1;
            this.currentGuess[this.currentIndex] = '';
          }
        })
    );

    this.subscribtions.push(
      this.sozler.submitted$
        .pipe(
          untilDestroyed(this),
          filter(() => !this.wordFound),
          tap(() => (this.incorrectWord = false))
        )
        .subscribe(() => {
          if (!this.currentGuess) return;
          if (!this.currentGuess.length) return;

          const guess = this.currentGuess.join('').toLowerCase().trim();

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
                this.wordFoundEvent.emit(true);
              }
            } else {
              this.incorrectWord = true;
            }
          }

          if (this.currentRow >= MAX_ATTEMPS) {
            this.sozler.isGameOver$.next(true);
          }
        })
    );
  }
}
