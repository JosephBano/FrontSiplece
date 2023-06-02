import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Instituciones } from 'src/app/models/instituciones.model';
import { DataService } from 'src/app/services/data.service';
import { InstitucionesService } from 'src/app/services/modeloServicios/instituciones.service';

@Component({
  selector: 'app-crear-elemento',
  templateUrl: './crear-elemento.component.html',
  styleUrls: ['./crear-elemento.component.css']
})
export class CrearElementoComponent {

  @ViewChild('CloseBtn') myButton!: ElementRef;
  elementForm!: FormGroup;
  identificator!: string;
  objData!: any[];

  constructor(private fb: FormBuilder, private institucionesService: InstitucionesService, private toastr: ToastrService, private ds: DataService ) { 
    
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

    switch(this.identificator){
      case 'institucion':
        this.createInstitucion();
        break;
      case 'modelo':
        console.log('estoy en el componente modelo HP');
        
        break;
      case 'criterio':
        break;
      case 'subCriterio':
        break;
    }
    
    //Cierra la aplicacion y setea los parametros por defecto si hay error o si ya se envio la solicitud post
    this.buttonClicked();
  }

  buttonClicked() {
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

  //Creacion de elementos
  createInstitucion(): void {
    const institucion: Instituciones = {
      descripcion: this.elementForm.value.descripcion,
    }

    this.institucionesService.postInstituciones(institucion).subscribe(data => {
      this.toastr.success('Institucion creada con exito!');
      console.log(data);
    }, error => {
      this.toastr.error('No se ha podido crear la institucion!');
      console.log(error);
    })
    
  }

  createModelo(): void {
    
  }

}
