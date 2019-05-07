import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LyTheme2, shadowBuilder, ThemeVariables } from '@alyle/ui';
import { VoteService } from '../services/vote.service';
import { Category, Nominee, Vote } from '../shared/vote';

const styles = (theme: ThemeVariables) => ({
  grow: {
    flexGrow: 1
  },
  tabContent: {
    padding: '2em'
  },
  item: {
    padding: '16px',
    textAlign: 'center',
    background: theme.background.secondary,
    boxShadow: shadowBuilder(1),
    borderRadius: '4px',
    height: '100%'
  }
});

@Component({
  selector: 'app-voting-screen',
  templateUrl: './voting-screen.component.html',
  styleUrls: ['./voting-screen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VotingScreenComponent implements OnInit {
  readonly classes = this.theme.addStyleSheet(styles);
  breakpoint: any;
  sideNavEvents: string[] = [];
  sideNavOpened: boolean;
  categories: Category[];
  nominees: Nominee[];
  preparedList: any;
  votes: Vote[];
  constructor(
    private theme: LyTheme2, private voteService: VoteService,
  ) { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 2 : 8;
    this.voteService.getCategoriesWithNominees()
    .subscribe(categories => {
      this.categories = categories;
    });

    this.voteService.getCategoriesWithNominees()
    .subscribe(categories => {
      console.log(categories);
      this.preparedList = categories.map(category => {
        category.nominees = [];
        return category;
      });
    });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 2 : 8;
  }

  addToVoteList(categoryId, nomineeId) {
    const chosenCategory = this.preparedList.find(category => category.id === categoryId);
    if (chosenCategory.nominees.length > 0) {
      // nominees array must contain only one person
      // first clear the nominee array for this category
      chosenCategory.nominees.splice(0, chosenCategory.nominees.length);
    }
    const nominee = this.categories.find(category => category.id === categoryId).nominees.find(sNom => sNom.id === nomineeId);
    chosenCategory.nominees.push(nominee);
    console.log(this.preparedList);
    // else {
    //   const tempNominee = this.portfolios[pIndex].nominees[cIndex];
    //    // add portfolio property to votes nominee
    //   tempNominee.cpId = pIndex;
    //   console.log(tempNominee);
    //   tempNominee.checked = true;
    //   this.votes.push(tempNominee);

    //   // get mat-tab-label class array

    //   if (this.labelIndex < this.portfolios.length) {
    //     setTimeout(() => {
    //       // cast HTMLCollection to HTMLElement and attach a click to it
    //       (<HTMLElement>this.matTabLabels.item(this.labelIndex)).click();
    //       this.labelIndex++;
    //     }, 1000);
    //   }

    // }
  }

}
