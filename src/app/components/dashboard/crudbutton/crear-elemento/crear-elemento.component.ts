import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Instituciones } from 'src/app/models/instituciones.model';
import { Modelo } from 'src/app/models/modelo.model';
import { DataService } from 'src/app/services/data.service';
import { InstitucionesService } from 'src/app/services/modeloServicios/instituciones.service';
import { ModeloService } from 'src/app/services/modeloServicios/modelo.service';
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

  idInstitucion = 3; //dar ids de prueba
  idModelo = 5; //dar ids de prueba

  constructor(private fb: FormBuilder, private institucionesService: InstitucionesService, private modeloService: ModeloService ,private toastr: ToastrService, private ds: DataService, private updateService: UpdateService) { 
    
  }

  ngOnInit(): void {
    
    this.initializeParameters();
    this.elementForm = this.fb.group({
      descripcion: ['', [Validators.required, Validators.minLength(10)]]
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
        break;
      case 'criterio':
        break;
      case 'subCriterio':
        break;
    }
    
    //Cierra la aplicacion y setea los parametros por defecto si hay error o si ya se envio la solicitud post
    this.refresh();
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

  refresh() {
    this.updateService.requestRefresh();
  }

  //Creacion de elementos
  createInstitucion(): void {
    const institucion: Instituciones = {
      id: this.idInstitucion.toString(),
      descripcion: this.elementForm.value.descripcion,
    }

    this.idInstitucion++;

    this.institucionesService.postInstituciones(institucion).subscribe(data => {
      this.toastr.success('Institucion creada con exito!');
      console.log('Institucion creada con exito!');
    }, error => {
      this.toastr.error('No se ha podido crear la institucion!');
      console.log(error);
    })
    
  }

  createModelo(): void {
    const modelo: Modelo = {
      id: this.idModelo.toString(),
      descripcion: this.elementForm.value.descripcion,
      institucionId: this.objData.institucion
    }

    this.idModelo++;

    this.modeloService.postModelos(modelo).subscribe(data => {
      this.toastr.success('Modelo creado con exito!');
      console.log(data);
    }, error => {
      this.toastr.error('No se ha podido crear el Modelo!');
      console.log(error);
    })
  }

}
