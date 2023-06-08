import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Modelo } from 'src/app/models/modelo.model';
import { DataService } from 'src/app/services/data.service';
import { ModeloService } from 'src/app/services/modeloServicios/modelo.service';
import { UpdateService } from 'src/app/services/update-service.service';

@Component({
  selector: 'app-agregar-modelo',
  templateUrl: './agregar-modelo.component.html',
  styleUrls: ['./agregar-modelo.component.css']
})
export class AgregarModeloComponent {
  
  @ViewChild('CloseBtn') myButton!: ElementRef;
  elementForm!: FormGroup;
  objData!: {institucion: string, modelo: string, criterio: string, subCriterio: string};

  fechaActual = new Date();

  constructor(private fb: FormBuilder, private modeloService: ModeloService, private toastr: ToastrService, private ds: DataService, private us: UpdateService) { }

  ngOnInit(): void {
    this.initializeParameters();
    this.elementForm = this.fb.group({
      detalle: ['', [Validators.required, Validators.minLength(10)]]
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
    this.agregarModelo();
    this.refresh();
    this.handlerbuttonClicked();
  }

  agregarModelo(): void {    
    const modelo: Modelo = {
      IdInstitucion: this.objData.institucion,
      Detalle: this.elementForm.value.detalle.toUpperCase(),
      Anio: this.fechaActual.getFullYear()
    }

    this.modeloService.postModelo(modelo).subscribe(data => {
      this.toastr.success('Modelo eliminado con exito!');
    }, error => {
      this.toastr.error('No se ha podido eliminar el modelo!');
      console.log(error);
    })
  }
}
