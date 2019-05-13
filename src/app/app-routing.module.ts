import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotingScreenComponent } from './voting-screen/voting-screen.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: 'vote', component: VotingScreenComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'results', component: ResultComponent },
  { path: '**', redirectTo: ''  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
