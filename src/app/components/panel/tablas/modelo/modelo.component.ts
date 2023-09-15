import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Modelo } from 'src/app/models/modelosSeguridad/modelo.model';
import { ModeloService } from 'src/app/services/serviciosSeguridad/modelo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InstitucionesService } from 'src/app/services/serviciosSeguridad/instituciones.service';
import { Institucion } from 'src/app/models/modelosSeguridad/institucion.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { FilterDataService } from 'src/app/services/filter-data.service';


@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css']
})
export class ModeloComponent implements OnInit{
  
  Instituciones: Institucion[] = [];
  Modelos: Modelo[] = [];
  Data: Modelo[] = [];
  
  filter!: string;
  checkboxDeshabilitarValue: boolean = false;
  currentYear!: string;  
  
  moreSettings: boolean = false;
  valueFilter: string = '0';
  tablafilter!: FormGroup;

  @ViewChild('cerrarAgregarModal') cerrarAgregarModal!: ElementRef;
  @ViewChild('cerrarEditarModal') cerrarEditarModal!: ElementRef;
  @ViewChild('cerrarEliminarModal') cerrarEliminarModal!: ElementRef;
  @ViewChild('cerrarRestablecerModal') cerrarRestablecerModal!: ElementRef;

  agregar!: FormGroup;
  editar!: FormGroup;
  eliminar!: FormGroup;
 

  constructor(
    private fb: FormBuilder,
    private fd: FilterDataService,
    private toastr: ToastrService,
    private route: Router,
    private modeloService: ModeloService,
    private institucionService: InstitucionesService,
    private dataService: DataService,
  )
  {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear().toString();        

    this.agregar = this.fb.group({
      institucion: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      anio: [this.currentYear, [Validators.required]],
    })
    this.editar = this.fb.group({
      id: ['', Validators.required],
      institucion: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      anio: ['', [Validators.required]],
    })
    this.eliminar = this.fb.group({
      id: ['', Validators.required],
      institucion: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      anio: ['', [Validators.required]],
    })

    this.tablafilter = this.fb.group({
      filter: [''],
    })
  }

  ngOnInit(): void {
    this.dataService.actualizarActiveLiOrder1('tablas');
    this.dataService.actualizarActiveLiOrder2('modelo');
    this.loadModelos();
    this.loadInstituciones();
  }

  //Otras funcionalidades

  navegarFiltro(id: string | undefined) {
    const value = id ?? '';
    this.fd.actualizarFiltro('criterio', value);
    this.route.navigate(['/panel/tablas/criterio'])
  }

  moreSettingsHandler(){
    this.moreSettings = !this.moreSettings
  }

  OnChangeFilter() {
    this.valueFilter = this.tablafilter.value.filter;
    console.log(this.valueFilter);
    
  }
  Activo(filtro: any): boolean {
    return filtro.Activo === 1;
  }
  
  loadModelos(): void {
    this.modeloService.getModelos().subscribe( data => {
      this.Modelos = data;
      this.Data = data;
    })
  }

  loadInstituciones(): void {
    this.institucionService.getInstituciones().subscribe( data => {
      this.Instituciones = data;
    })
  }

  getInstitucionName(id: any){
    const detalle = this.Instituciones.find(e => e.idInstitucion === id); 
    return detalle?.detalle;
  }

  cargarDatosEditar(modelo: Modelo){
    this.editar.get('id')?.setValue(modelo.idModelo);
    this.editar.get('codigoModelo')?.setValue(modelo.codigoModelo);
    this.editar.get('detalle')?.setValue(modelo.detalle);
    this.editar.get('fechaInicio')?.setValue(modelo.fechaInicio);
    this.editar.get('fechaFin')?.setValue(modelo.fechaFin);
  }

  cargarDatosEliminar(modelo: Modelo){
    this.eliminar.get('id')?.setValue(modelo.idModelo);
    this.eliminar.get('codigoModelo')?.setValue(modelo.codigoModelo);
    this.eliminar.get('detalle')?.setValue(modelo.detalle);
    this.eliminar.get('fechaInicio')?.setValue(modelo.fechaInicio);
    this.eliminar.get('fechaFin')?.setValue(modelo.fechaFin);
  }


  //agregar modelo
  agregarModelo(): void{
    const modelo: Modelo = {
      codigoModelo: this.agregar.value.codigoModelo,
      detalle: this.agregar.value.detalle,
      fechaInicio: this.agregar.value.fechaInicio,
      fechaFin: this.agregar.value.fechaFin
    }

    this.modeloService.postModelo(modelo).subscribe(
      (data) => {
        this.toastr.success('El modelo ha sido agregado correctamente!')
        this.loadModelos();
        console.log(data);        
    }, (error) => {
      this.toastr.error('Error!, no se ha podido realizar los cambios')
      console.log(error);
    });

    if (this.cerrarAgregarModal) {
      this.cerrarAgregarModal.nativeElement.click();
    }
  }

  //Editar Modelo
  editarModelo(): void {
    const modelo: Modelo = {
      idModelo: this.editar.value.id,
      codigoModelo: this.editar.value.codigoModelo,
      detalle: this.editar.value.detalle,
      fechaInicio: this.editar.value.fechaInicio,
      fechaFin: this.editar.value.fechaFin,
      activo: '1'
    }

    this.modeloService.updateModelo(modelo).subscribe(
      (data) => {
        this.toastr.success('Se ha realizado los cambios correctamente!')
        this.loadInstituciones();
        this.loadModelos();        
        console.log(data);
    }, (error) => {
      this.toastr.error('Error!, no se ha podido realizar los cambios')
      console.log(error);
    });

    if (this.cerrarEditarModal || this.cerrarRestablecerModal) {
      this.cerrarEditarModal.nativeElement.click();
      this.cerrarRestablecerModal.nativeElement.click();
    }
  }

  //eliminar Modelo
  eliminarInstitucion(): void{
    const id = this.eliminar.value.id;

    this.modeloService.deleteModelo(id).subscribe(
      (data) => {
        this.toastr.success('Se ha realizado los cambios correctamente!')
        this.loadModelos();
        console.log(data);
      }
      , (error) => {
        this.toastr.error('Error!, no se ha podido realizar los cambios')
        console.log(error);
      });

    if (this.cerrarEliminarModal) {
      this.cerrarEliminarModal.nativeElement.click();
    }
  
  }
}
