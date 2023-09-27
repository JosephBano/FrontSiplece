import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  loading = false;
  error = null;

  constructor(
    private route: Router,
    private dataService: DataService,
    private reporteService: ReporteService
  ) { }

  ngOnInit(): void {
    this.dataService.actualizarActiveLiOrder1('reportes');
  }
  
  downloadReport() {
    this.reporteService.downloadReport()
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
  }
}

