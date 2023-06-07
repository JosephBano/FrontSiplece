import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Criterio } from 'src/app/models/criterios.model';
import { Instituciones } from 'src/app/models/instituciones.model';
import { Modelo } from 'src/app/models/modelo.model';
import { SubCriterio } from 'src/app/models/subCriterios.model';
import { DataService } from 'src/app/services/data.service';
import { CriteriosService } from 'src/app/services/modeloServicios/criterios.service';
import { InstitucionesService } from 'src/app/services/modeloServicios/instituciones.service';
import { ModeloService } from 'src/app/services/modeloServicios/modelo.service';
import { SubCriteriosService } from 'src/app/services/modeloServicios/sub-criterios.service';
import { UpdateService } from 'src/app/services/update-service.service';

@Component({
  selector: 'app-crear-elemento',
  templateUrl: './crear-elemento.component.html',
  styleUrls: ['./crear-elemento.component.css']
})
export class CrearElementoComponent {

  @ViewChild('CloseBtn') myButton!: ElementRef;
  elementForm!: FormGroup;
  identificator!: string;
  objData!: {institucion: string, modelo: string, criterio: string, subCriterio: string};

  fechaActual = new Date();

  constructor(private fb: FormBuilder, private institucionesService: InstitucionesService, private modeloService: ModeloService, private criterioService: CriteriosService, private subCriterioService: SubCriteriosService, private toastr: ToastrService, private ds: DataService, private updateService: UpdateService) { 
    
  }

  ngOnInit(): void {
    
    this.initializeParameters();
    this.elementForm = this.fb.group({
      detalle: ['', [Validators.required, Validators.minLength(10)]],
      siglas: ['', Validators.required]
    });

  }

  //Funcionalidades

  initializeParameters() {
    this.ds.getObj().subscribe(data => {
      this.objData = data;
    })
    this.ds.getIdentificator().subscribe(data => {
      this.identificator = data;
    })
  }

  onSubmit(): void {        

    this.initializeParameters();

    switch(this.identificator){
      case 'institucion':
        this.createInstitucion();
        break;
      case 'modelo':
        this.createModelo();
        this.refreshModelo();
        break;
      case 'criterio':
        this.createCriterio();
        this.refreshCriterio();
        break;
      case 'subCriterio':
        this.createSubCriterio();
        this.refreshSubCriterio();
        break;
    }
    
    //Cierra la aplicacion y setea los parametros por defecto si hay error o si ya se envio la solicitud post
    this.handlerbuttonClicked();
  }

  handlerbuttonClicked() {
    this.setDefautlIdentificator();
    this.myButton.nativeElement.click();
    this.elementForm.get('descripcion')?.setValue('');
  }

  setDefautlIdentificator(){
    this.ds.setIdentificator('');
  }

  transformPlaceHolde(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  //refreshers
  refreshModelo() {
    this.updateService.requestRefreshModelo();
  }
  refreshCriterio() {
    this.updateService.requestRefreshCriterio();
  }
  refreshSubCriterio() {
    this.updateService.requestRefreshSubCriterio();
  }

  //Creacion de elementos
  createInstitucion(): void {
    const institucion: Instituciones = {
      Detalle: this.elementForm.value.detalle,
      Siglas: this.elementForm.value.siglas
    }

    this.institucionesService.postInstitucion(institucion).subscribe(data => {
      this.toastr.success('Institucion creada con exito!');
      console.log('Institucion creada con exito!');
    }, error => {
      this.toastr.error('No se ha podido crear la institucion!');
      console.log(error);
    })
    
  }

  createModelo(): void {
    const modelo: Modelo = {
      idInstitucion: this.objData.institucion,
      Detalle: this.elementForm.value.detalle,
      Anio: this.fechaActual.getFullYear(),
    }

    this.modeloService.postModelo(modelo).subscribe(data => {
      this.toastr.success('Modelo creado con exito!');
      console.log(data);
    }, error => {
      this.toastr.error('No se ha podido crear el Modelo!');
      console.log(error);
    })
  }

  createCriterio(): void {
    const criterio: Criterio = {
      descripcion: this.elementForm.value.descripcion,
      modeloId: this.objData.modelo
    }

    this.criterioService.postCriterios(criterio).subscribe(data => {
      this.toastr.success('Criterio creado con exito!');
      console.log(data);
    }, error => {
      this.toastr.error('No se ha podido crear el criterio!');
      console.log(error);
    })
  }

  createSubCriterio(): void {
    const subcriterio: SubCriterio = {
      descripcion: this.elementForm.value.descripcion,
      criterioId: this.objData.criterio
    }

    this.subCriterioService.postSubCriterios(subcriterio).subscribe(data => {
      this.toastr.success('SubCriterio creado con exito!');
      console.log(data);
    }, error => {
      this.toastr.error('No se ha podido crear el SubCriterio!');
      console.log(error);
    })
  }

}
