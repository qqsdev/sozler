import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SozlerComponent } from './sozler.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { GuessesComponent } from './guesses/guesses.component';

@NgModule({
  declarations: [SozlerComponent, KeyboardComponent, GuessesComponent],
  imports: [CommonModule, MatIconModule, MatToolbarModule, MatButtonModule],
  exports: [SozlerComponent],
})
export class SozlerModule {}
