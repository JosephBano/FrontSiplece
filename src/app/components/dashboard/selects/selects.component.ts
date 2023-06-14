import { Component, OnInit } from "@angular/core";
import { DataService } from '../../../services/data.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-selects',
  templateUrl: './selects.component.html',
  styleUrls: ['./selects.component.css']
})
export class SelectsComponent implements OnInit
{
  detalleInd: any;

  constructor(private ds: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

}
