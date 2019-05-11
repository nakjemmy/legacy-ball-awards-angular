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
    this.prepareData();
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
          display: true,
          position: 'top',
          labels: {
            generateLabels:  (chart) => {
              const data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.labels.map((label, i) => {
                  const meta = chart.getDatasetMeta(0);
                  const ds = data.datasets[0];
                  const arc = meta.data[i];
                  const custom = arc && arc.custom || {};
                  const getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
                  const arcOpts = chart.options.elements.arc;
                  // tslint:disable-next-line:max-line-length
                  const fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                  const stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                  const bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

                  // We get the value of the current label
                  const value = chart.config.data.datasets[arc._datasetIndex].data[arc._index];

                  return {
                    // Instead of `text: label,`
                    // We add the value to the string
                    text: label + ' : ' + value,
                    fillStyle: fill,
                    strokeStyle: stroke,
                    lineWidth: bw,
                    hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                    index: i
                  };
                });
              } else {
                return [];
              }
            }
          }
        }
      }
    });

    this.charts.push(tempChart);
  }


  prepareData() {
    this.voteService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.voteService.getVotes().subscribe(votes => {
        this.votes = votes;
        console.log(votes);
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

  refresh() {
    this.prepareData();
  }

}
