import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Modelo } from 'src/app/models/modelo.model';
import { DataService } from 'src/app/services/data.service';
import { ModeloService } from 'src/app/services/modeloServicios/modelo.service';
import { UpdateService } from 'src/app/services/update-service.service';

@Component({
  selector: 'app-editar-modelo',
  templateUrl: './editar-modelo.component.html',
  styleUrls: ['./editar-modelo.component.css']
})
export class EditarModeloComponent {

  @ViewChild('CloseBtn') myButton!: ElementRef;
  elementForm!: FormGroup;
  objData!: {institucion: string, modelo: string, criterio: string, subCriterio: string};
  fechaActual: any;

  constructor(private fb: FormBuilder, private modeloService: ModeloService, private toastr: ToastrService, private ds: DataService, private us: UpdateService) { }

  ngOnInit(): void {
    this.initializeParameters();
    this.elementForm = this.fb.group({
      detalle: ['', [Validators.required, Validators.minLength(10)]],
      activo: ['']
    })
  }

  //Funcionalidades

  initializeParameters() {
    this.ds.getObj().subscribe(data => {
      this.objData = data;
    })
  }

  refresh(){
    this.us.requestRefreshModelo();
  }

  handlerbuttonClicked() {
    this.myButton.nativeElement.click();
    this.elementForm.get('descripcion')?.setValue('');
  }

  onSubmit(): void {        
    this.initializeParameters();
    this.editarModelo();
    this.refresh();
    this.handlerbuttonClicked();
  }

  editarModelo(): void {  
    const estadoCheckbox = this.elementForm.value.estado ? '1' : '0';
    
    const modelo: Modelo = {
      IdModelo: this.objData.modelo,
      IdInstitucion: this.objData.institucion,
      Detalle: this.elementForm.value.detalle.toUpperCase(),
      Activo: estadoCheckbox,
      Anio: this.fechaActual.getFullYear()
    }

    this.modeloService.updateModelo(modelo).subscribe(data => {
      this.toastr.success('Modelo actualizado con exito!');
    }, error => {
      this.toastr.error('No se ha podido actualizar el modelo!');
      console.log(error);
    })
  }
}
