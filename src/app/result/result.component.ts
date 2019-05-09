import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { VoteResult, Category } from '../shared/vote';
import { VoteService } from '../services/vote.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResultComponent implements OnInit {
  votes: VoteResult[];
  categories: any = [];
  charts = [];
  chartReady = false;
  constructor(private voteService: VoteService) { }

  ngOnInit() {
    this.voteService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.voteService.getVotes().subscribe(votes => {
        this.votes = votes;
        this.categories.forEach(category => {
          category.nominees = [];
          this.votes.forEach(vote => {
            if (vote.category.id === category.id) {
              category.nominees.push({ name: vote.nominee.name, voteCount: vote.voteCount });
            }
          });
        });

        this.categories.forEach((category, index) => {
          this.prepareChart(category, index);
          if (this.charts.length === this.categories.length) {
            this.chartReady = true;
          }
        });
      });
    });
  }


  prepareChart(category, index) {
    const labels = category.nominees.map(nominee => nominee.name);
    const voteCount = category.nominees.map(nominee => nominee.voteCount);
    const tempChart = new Chart(`canvas${index}`, {
      type: 'pie',
      data: {
        datasets: [{
          data: [...voteCount],
          backgroundColor: ['#FF00FF', '#00BFFF', '#FFFF00', '#FF6103', '#0000FF', '#DC143C', '#473C8B', '#00CED1', '#FFB90F']
        }],

        labels: [...labels]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }],
        }
      }
    });

    this.charts.push(tempChart);
  }




}
