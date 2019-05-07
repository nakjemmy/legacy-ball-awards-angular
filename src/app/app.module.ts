import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LyThemeModule, LY_THEME } from '@alyle/ui';
import { MinimaLight } from '@alyle/ui/themes/minima';
import { VotingScreenComponent } from './voting-screen/voting-screen.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { baseURL } from './shared/baseUrl';
import { VoteService } from './services/vote.service';
import { HttpClientModule } from '@angular/common/http';
import {MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [
    AppComponent,
    VotingScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LyThemeModule.setTheme('minima-light'),
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
    MatSidenavModule,
    HttpClientModule,
    MatListModule
  ],
  providers: [{ provide: LY_THEME, useClass: MinimaLight, multi: true },
    {provide: 'BaseURL', useValue: baseURL},
    VoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
