import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Periodo } from 'src/app/models/modelos-generales/periodo.model';
import { PeriodoService } from 'src/app/services/modeloServicios/periodo.service';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit{

  Periodos: Periodo[] = [];
  cambiar!: FormGroup;

  toggleCambioPeriodo: boolean = false;

  constructor(
    private periodoService: PeriodoService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { 
    this.cambiar = this.fb.group({
      idPeriodo: ['', Validators.required],
    })
  }

  ngOnInit(): void { 
    this.loadPeriodos();
  }

  loadPeriodos(){
    this.periodoService.getPeriodo().subscribe(
      (data) => {
        this.Periodos = data;
      }
    )
  }

  toggleEditMenu(){
    this.toggleCambioPeriodo = !this.toggleCambioPeriodo;
  }

  cambiarPeriodo(){
    let anterior = this.Periodos.find( e => e.Activo == '1');
    let nuevo = this.Periodos.find(e => e.IdPeriodo === this.cambiar.value.idPeriodo)
    
    const idAnterior = anterior?.IdPeriodo ?? '';

    const objNuevo: Periodo = {
      IdPeriodo: nuevo?.IdPeriodo,
      IdModelo: nuevo?.IdModelo,
      FechaInicio: nuevo?.FechaInicio,
      FechaFin: nuevo?.FechaFin,
      Detalle: nuevo?.Detalle,
      Activo: '1',
    }

    this.periodoService.deletePeriodo(idAnterior).subscribe(
      (data) => {
        console.log(data);
        this.toastr.success('Se ha eliminado el periodo activo!');
        this.loadPeriodos();
        this.periodoService.updatePeriodo(objNuevo).subscribe(
          (data) => {
            console.log(data);
            this.toastr.success('El nuevo periodo se ha activado correctamente!');
            this.loadPeriodos();
          }, (error) => {
            console.log(error);
            this.toastr.error('No se ha podido establecer un nuevo periodo')
          }
        )
      }, (error) => {
        console.log(error);
        this.toastr.error('No se ha podido ejecutar los cambios!');
      }
    );

    this.cambiar.value.idPeriodo = '';
    this.toggleEditMenu();
  }
}
