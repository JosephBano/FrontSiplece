import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Criterio } from 'src/app/models/modelos-generales/criterio.model';
import { Modelo } from 'src/app/models/modelosSeguridad/modelo.model';
import { CriteriosService } from 'src/app/services/modeloServicios/criterios.service';
import { ModeloService } from 'src/app/services/serviciosSeguridad/modelo.service';
import { Sidebar } from '../../../../services/sidebar.service';
import { FilterSidebar } from 'src/app/services/filter-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criterio',
  templateUrl: './criterio.component.html',
  styleUrls: ['./criterio.component.css', '../../panel.component.css']
})
export class CriterioComponent implements OnInit{

  Criterios: Criterio[] = [];
  Modelos: Modelo[] = [];
  
  filter!: string;
  checkboxDeshabilitarValue: boolean = false;

  moreSettings: boolean = false;
  valueFilter: string = '0';
  tablafilter!: FormGroup;

  @ViewChild('cerrarAgregarModal') cerrarAgregarModal!: ElementRef;
  @ViewChild('cerrarEditarModal') cerrarEditarModal!: ElementRef;

  agregar!: FormGroup;
  editar!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fd: FilterSidebar,
    private router: Router,
    private toastr: ToastrService,
    private modeloService: ModeloService,
    private criterioService: CriteriosService,
    private Sidebar: Sidebar,
  )
  {
    this.agregar = this.fb.group({
      modelo: ['0'],
      detalle: ['', [Validators.required]],
      orden: ['', [Validators.required]],
    })
    this.editar = this.fb.group({
      id: ['', Validators.required],
      modelo: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      orden: ['', [Validators.required]],
    })

    this.tablafilter = this.fb.group({
      filter: [''],
    })
  }

  ngOnInit(): void {
    this.Sidebar.actualizarActiveLiOrder1('tablas');
    this.Sidebar.actualizarActiveLiOrder2('criterio')
    this.InitFiltro();
    this.loadCriterios();
    this.loadModelos();
  }

  //Otras funcionalidades

  InitFiltro(){
    this.fd.actualizarFiltroDefault('criterio');
    this.fd.getFiltro('criterio').subscribe(
      (data) => {
        if (data) {
          this.tablafilter.get('filter')?.setValue(data);
          this.valueFilter = data;
        }
      }
    )
  }

  setModelo() {
    this.agregar.get('modelo')?.setValue(this.valueFilter);
    if(this.valueFilter != '0') this.agregar.get('modelo')?.disable();
    else this.agregar.get('modelo')?.enable();
  }

  navegarFiltro(id: string | undefined) {
    const value = id ?? '';
    this.fd.actualizarFiltro('subcriterio', value);
    this.router.navigate(['/panel/tablas/subcriterio'])
  }

  OnChangeFilter() {
    this.valueFilter = this.tablafilter.value.filter;
    this.agregar.value.modelo = this.valueFilter;
  }
  
  loadCriterios(): void {
    this.criterioService.getCriterios().subscribe( data => {
      this.Criterios = data;
    })
  }

  loadModelos(): void {
    this.modeloService.getModelos().subscribe( data => {
      this.Modelos = data;
    })
  }

  getModeloName(id: any){
    const detalle = this.Modelos.find(e => e.idModelo === id); 
    return detalle?.detalle;
  }

  cargarDatosEditar(criterio: Criterio){
    this.editar.get('id')?.setValue(criterio.IdCriterio);
    this.editar.get('modelo')?.setValue(criterio.IdModelo);
    this.editar.get('modelo')?.disable();
    this.editar.get('detalle')?.setValue(criterio.Detalle);
    this.editar.get('orden')?.setValue(criterio.Orden);
  }

  //agregar Criterio
  agregarCriterio(): void{
    this.editar.get('modelo')?.enable();
    const criterio: Criterio = {
      CodigoCriterio: this.agregar.value.codigoCriterio,
      IdModelo: this.agregar.value.modelo,
      Detalle: this.agregar.value.detalle,
      Orden: '1',
    }

    this.criterioService.postCriterios(criterio).subscribe(
      (data) => {
        this.toastr.success('El Criterio ha sido agregado correctamente!')
        this.loadCriterios();
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
  editarCriterio(): void {
    this.editar.get('modelo')?.enable();
    const criterio: Criterio = {
      IdCriterio: this.editar.value.id,
      CodigoCriterio: this.editar.value.codigoCriterio,
      IdModelo: this.editar.value.modelo,
      Detalle: this.editar.value.detalle,
      Orden: this.editar.value.orden,
      Activo: '1'
    }

    this.criterioService.updateCriterio(criterio).subscribe(
      (data) => {
        this.toastr.success('Se ha realizado los cambios correctamente!')
        this.loadModelos();
        this.loadCriterios()      
        console.log(data);  
    }, (error) => {
      this.toastr.error('Error!, no se ha podido realizar los cambios')
      console.log(error);
    });

    if (this.cerrarEditarModal) {
      this.cerrarEditarModal.nativeElement.click();
    }
  }
}