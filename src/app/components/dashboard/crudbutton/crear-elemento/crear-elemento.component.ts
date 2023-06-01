import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Instituciones } from 'src/app/models/instituciones.model';
import { InstitucionesService } from 'src/app/services/modeloServicios/instituciones.service';

@Component({
  selector: 'app-crear-elemento',
  templateUrl: './crear-elemento.component.html',
  styleUrls: ['./crear-elemento.component.css']
})
export class CrearElementoComponent {

  @ViewChild('CloseBtn') myButton!: ElementRef;
  @Input() sourceComponentAgg!: string;
  institucionForm!: FormGroup;
  arr = ['institucion', 'modelo', 'criterio', 'subCriterio', 'indicador']

  constructor(private fb: FormBuilder, private institucionesService: InstitucionesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.institucionForm = this.fb.group({
      descripcion: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log(this.sourceComponentAgg);
    
    this.buttonClicked()
  }


  createInstitucion(): void {
    if (this.institucionForm && this.institucionForm.valid) {
      const descripcion = this.institucionForm.get('descripcion')!.value;

      this.institucionesService.checkIfDescriptionExists(descripcion).subscribe(exists => {
        if (exists) {
          this.toastr.error('Este nombre ya se encuentra en la base de datos')
          console.log('error sing in');
          
        } else {
          this.toastr.success('Institucion creada correctamente');
          console.log('Institucion creada correctamente!');
          
          const newInstitucion = new Instituciones();
          newInstitucion.descripcion = descripcion;
          this.institucionesService.postInstituciones(newInstitucion).subscribe();
        }
      });
    } else if (this.institucionForm.get('descripcion')!.value.length > 30) {
      console.log('La descripción no debe tener más de 30 caracteres');
    }
  }

  buttonClicked() {
    this.myButton.nativeElement.click();
  }
}
