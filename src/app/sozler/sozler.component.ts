import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';

import { AlphabetService } from '../services/alphabet.service';
import { SozlerService } from '../services/sozler.service';

const range = (count: number) =>
  Array.apply(null, Array(count)).map((_, index) => index);

class Game {
  constructor(
    public index: number,
    public word: string,
    public found: boolean = false
  ) {}
}

@UntilDestroy()
@Component({
  selector: 'app-sozler',
  templateUrl: './sozler.component.html',
  styleUrls: ['./sozler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SozlerComponent implements OnInit {
  public defaultAttemptsCount = 6;

  public availableAlphabets = this.alphabetService.alphabets;
  public currentAlphabet$ = this.alphabetService.current$;

  public games$ = new BehaviorSubject<Game[]>([]);
  public attemptsCount$ = new BehaviorSubject<number>(
    this.defaultAttemptsCount
  );

  private wordsCount: number = 1;

  constructor(
    private route: ActivatedRoute,
    private sozler: SozlerService,
    private alphabetService: AlphabetService
  ) {}

  ngOnInit(): void {
    this.alphabetService.getDefaultAlphabet();

    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((params) => {
      const wordsCount = params.get('words-count');

      if (wordsCount && !Number.isNaN(wordsCount)) {
        this.wordsCount = +wordsCount;
        this.createNewGame();
      }
    });

    this.sozler.restart$
      .pipe(untilDestroyed(this))
      .subscribe(() => this.createNewGame());

    this.alphabetService.current$
      .pipe(untilDestroyed(this))
      .subscribe(() => this.restart());
  }

  public createNewGame() {
    const games = range(this.wordsCount).map(
      (index) => new Game(index, this.alphabetService.getRandomWord())
    );

    this.games$.next([]);
    this.games$.next(games);
    this.attemptsCount$.next(this.calculateAttempsCount(this.wordsCount));
    this.sozler.isGameOver$.next(false);
  }

  public handleKeyboardEvent(letter: string) {
    this.sozler.lastLetter$.next(letter);
  }

  public restart() {
    this.sozler.restart();
  }

  public handleWordFound(game: Game) {
    game.found = true;

    const isGameOver = this.games$.value.every((g) => g.found);
    if (isGameOver) {
      this.sozler.isGameOver$.next(true);
    }

    console.log(this.games$.value, isGameOver);
  }

  private calculateAttempsCount(gamesCount: number) {
    if (gamesCount >= 8) return 13;
    if (gamesCount >= 4) return 9;
    if (gamesCount >= 2) return 7;
    return 6;
  }
}
