import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { VoteService } from '../services/vote.service';
import { Category, Nominee, Vote } from '../shared/vote';
import { AuthService } from '../services/auth.service';
import { PnotifyService } from '../services/pnotify.service';

@Component({
  selector: 'app-voting-screen',
  templateUrl: './voting-screen.component.html',
  styleUrls: ['./voting-screen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VotingScreenComponent implements OnInit {
  breakpoint: any;
  sideNavEvents: string[] = [];
  sideNavOpened: boolean;
  categories: Category[];
  nominees: Nominee[];
  votes: Vote[] = [];
  voteCount = 0;
  pnotify = undefined;
  matTabLabels = document.getElementsByClassName('mat-tab-label');
  labelIndex = 1;
  constructor(
    private voteService: VoteService,
    private auth: AuthService,
    private pnotifyService: PnotifyService
  ) {
    this.pnotify = pnotifyService.getPNotify();
    this.pnotify.info(`Welcome to Legacy Ball Awards.
         Go through the Categories and Choose your prefered Nominee.
         When you are done, click on the first button at top-right corner to review your choices.
         The second button at the top-right corner can be used to log out even when you haven't finished voting.
         Click on the Submit Button to complete the voting process.
         You will be automatically logged out after submitting votes.
         NB: You can always come back and make changes whiles you haven't yet submitted the votes.`,
         {delay: 10000});
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 2 : 8;
    this.voteService.getCategoriesWithNominees()
    .subscribe(categories => {
      this.categories = categories;
    });

    this.voteService.getNominees()
    .subscribe(nominees => {
      this.nominees = nominees;
    });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 2 : 8;
  }

  addToVoteList(categoryId, nomineeId) {
    const previousVoteByCategory = this.votes.find(vote => vote.categoryId === categoryId);
    if (previousVoteByCategory) {
      previousVoteByCategory.nomineeId = nomineeId;
    } else {
      this.votes.push({ categoryId, nomineeId });
    }
    if (this.labelIndex < this.categories.length) {
      setTimeout(() => {
        // cast HTMLCollection to HTMLElement and attach a click to it
        (this.matTabLabels.item(this.labelIndex) as HTMLElement).click();
        this.labelIndex++;
      }, 1000);
    }
  }

  removeVote(voteIndex) {
    this.votes.splice(voteIndex, 1);
  }

  getCategoryById(id) {
    return this.categories.find(cat => cat.id === id);
  }

  getNomieeById(id) {
    return this.nominees.find(nom => nom.id === id);
  }

  submitVote() {
    const notice = this.pnotify.notice({
      title: 'Confirmation Needed',
      text: 'Are you sure?',
      icon: 'fas fa-question-circle',
      hide: false,
      stack: {
        dir1: 'down',
        modal: true,
        firstpos1: 25
      },
      modules: {
        Confirm: {
          confirm: true
        },
        Buttons: {
          closer: false,
          sticker: false
        },
        History: {
          history: false
        },
      }
    });

    notice.on('pnotify.confirm', () => {
      this.voteService.postVote(this.votes)
      .subscribe(res => {
        this.pnotify.success(res.message);
        this.logout();

      }, error => {
        this.pnotify.error({
          text: error.error.message
        });

        if (error.error.status === 'invalid_coupon') {
          this.logout();
        }
      });
    });
    notice.on('pnotify.cancel', () => {
    });
  }

  checkIfSelected(categoryId, nomineeId): boolean {
    return this.votes.find(vote => vote.categoryId === categoryId && vote.nomineeId === nomineeId) ? true : false;
  }

  logout() {
    this.auth.logout();
  }

  refresh() {
    this.voteService.getCategoriesWithNominees()
    .subscribe(categories => {
      this.categories = categories;
    });

    this.voteService.getNominees()
    .subscribe(nominees => {
      this.nominees = nominees;
    });
  }

}
