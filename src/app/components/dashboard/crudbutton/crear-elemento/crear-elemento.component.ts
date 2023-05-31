import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Instituciones } from 'src/app/models/instituciones.model';
import { InstitucionesService } from 'src/app/services/modeloServicios/instituciones.service';
import { ToastrService } from 'ngx-toastr/public_api';

@Component({
  selector: 'app-crear-elemento',
  templateUrl: './crear-elemento.component.html',
  styleUrls: ['./crear-elemento.component.css']
})
export class CrearElementoComponent {

  @Input() sourceComponentAgg!: string;
  institucionForm!: FormGroup;

  constructor(private fb: FormBuilder, private institucionesService: InstitucionesService) { }

  ngOnInit(): void {
    this.institucionForm = this.fb.group({
      descripcion: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.institucionForm && this.institucionForm.valid) {
      const newInstitucion = new Instituciones();
      newInstitucion.descripcion = this.institucionForm.get('descripcion')!.value;
      this.institucionesService.postInstituciones(newInstitucion).subscribe();
    }
  }
}
