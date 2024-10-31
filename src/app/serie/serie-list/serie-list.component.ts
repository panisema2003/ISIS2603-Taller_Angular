import { Component, OnInit } from '@angular/core';
import { Serie } from '../Serie';
import { SerieService } from '../serie.service';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrls: ['./serie-list.component.css'],
})
export class SerieListComponent implements OnInit {
  series: Array<Serie> = [];
  avgSeasons: number = 0;

  constructor(private serieService: SerieService) {}

  getSeries(): void {
    this.serieService.getSeries().subscribe((series) => {
      this.series = series;
      this.calcAvgSeasons();
    });
  }

  calcAvgSeasons(): void {
    const totalSeasons = this.series.reduce(
      (sum, serie) => sum + serie.seasons,
      0
    );
    if (this.series.length > 0) {
      this.avgSeasons = totalSeasons / this.series.length;
    }
  }

  ngOnInit() {
    this.getSeries();
  }
}
