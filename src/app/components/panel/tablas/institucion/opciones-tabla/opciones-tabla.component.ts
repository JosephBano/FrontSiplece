import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Instituciones } from 'src/app/models/instituciones.model';
import { InstitucionesService } from 'src/app/services/modeloServicios/instituciones.service';

@Component({
  selector: 'app-opciones-tabla',
  templateUrl: './opciones-tabla.component.html',
  styleUrls: ['./opciones-tabla.component.css']
})
export class OpcionesTablaComponent {
  @Input() switecher!: number;
  @Input() institucionx!: Instituciones;

  @ViewChild('crearModalInstitucion') crearModalInstitucion: any;

  agregar!: FormGroup;
  editar!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private institucionService: InstitucionesService,
  ) { 
    this.agregar = this.fb.group({
      detalle: ['', Validators.required],
      siglas: ['', Validators.required]
    })
    this.editar = this.fb.group({
      idInstitucion: ['', [Validators.required]],
      Detalle: ['', [Validators.required]],
      Siglas: ['', [Validators.required]],
    })
  }

  closeModal() {
    this.crearModalInstitucion?.nativeElement?.hide();
  }

  agregarInstitucion() {
    const institucion: Instituciones = {
      Detalle: this.agregar.value.detalle,
      Siglas: this.agregar.value.siglas,
    }

    this.institucionService.postInstitucion(institucion).subscribe((response) => {
      this.toastr.success('La institucion ha sido agregada correctamente!')
      console.log(response);
    }, (error) => {
      this.toastr.error('No se ha podido agregar la institucion')
      console.log(error);
    })

    this.closeModal();
  }

  editarInstitucion(){
    const institucion: Instituciones = {
      IdInstitucion: this.editar.value.idInstitucion,
      Detalle: this.editar.value.Detalle,
      Siglas: this.editar.value.Siglas,
      Activo: '1'
    }

    this.institucionService.updateInstitucion(institucion).subscribe((response) => {
      this.toastr.success('La institucion se ha editado correctamente!')
      console.log(response);
    }, (error) => {
      this.toastr.error('Error!, no se ha podido realizar los cambios')
      console.log(error);
    })
  }
}
