import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { SubCriterio } from '../../../../models/modelos-generales/subCriterio.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SubCriteriosService } from 'src/app/services/modeloServicios/sub-criterios.service';
import { CriteriosService } from 'src/app/services/modeloServicios/criterios.service';
import { Criterio } from 'src/app/models/modelos-generales/criterio.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { FilterDataService } from 'src/app/services/filter-data.service';

@Component({
  selector: 'app-sub-criterio',
  templateUrl: './sub-criterio.component.html',
  styleUrls: ['./sub-criterio.component.css', '../../panel.component.css']
})
export class SubCriterioComponent implements OnInit{

  SubCriterios: SubCriterio[] = [];
  Criterios: Criterio[] = [];
  
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
    private fd: FilterDataService,
    private router: Router,
    private toastr: ToastrService,
    private subcriterioService: SubCriteriosService,
    private criterioService: CriteriosService,
    private dataService: DataService,
  )
  {
    this.agregar = this.fb.group({
      criterio: ['0', [Validators.required]],
      detalle: ['', [Validators.required]],
      orden: ['', [Validators.required]],
    })
    this.editar = this.fb.group({
      id: ['', Validators.required],
      criterio: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      orden: ['', [Validators.required]],
    })
    
    this.tablafilter = this.fb.group({
      filter: [''],
    })
  }

  ngOnInit(): void {
    this.dataService.actualizarActiveLiOrder1('tablas');
    this.dataService.actualizarActiveLiOrder2('subcriterio');
    this.InitFiltro();
    this.loadSubCriterios();
    this.loadCriterios();
  }

  //Otras funcionalidades

  InitFiltro(){
    this.fd.actualizarFiltroDefault('subcriterio');
    this.fd.getFiltro('subcriterio').subscribe(
      (data) => {
        if (data) {
          this.tablafilter.get('filter')?.setValue(data);
          this.valueFilter = data;
        }
      }
    )
  }

  setCriterio() {
    this.agregar.get('criterio')?.setValue(this.valueFilter);
    if(this.valueFilter != '0') this.agregar.get('criterio')?.disable();
    else this.agregar.get('criterio')?.enable();
  }

  navegarFiltro(id: string | undefined) {
    const value = id ?? '';
    this.fd.actualizarFiltro('indicador', value);
    this.router.navigate(['/panel/tablas/indicador'])
  }

  OnChangeFilter() {
    this.valueFilter = this.tablafilter.value.filter;
    this.agregar.value.criterio = this.valueFilter;
  }

  loadSubCriterios(): void {
    this.subcriterioService.getSubCriterio().subscribe( data => {
      this.SubCriterios = data;
    })
  }

  loadCriterios(): void {
    this.criterioService.getCriterios().subscribe( data => {
      this.Criterios = data;
    })
  }

  getCriterioName(id: any){
    const detalle = this.Criterios.find(e => e.IdCriterio === id); 
    return detalle?.Detalle;
  }

  cargarDatosEditar(subcriterio: SubCriterio){
    this.editar.get('id')?.setValue(subcriterio.IdSubCriterio);
    this.editar.get('criterio')?.setValue(subcriterio.IdCriterio);
    this.editar.get('criterio')?.disable();
    this.editar.get('detalle')?.setValue(subcriterio.Detalle);
    this.editar.get('orden')?.setValue(subcriterio.Orden);
  }

  //agregar
  agregarSubCriterio(): void{
    this.editar.get('criterio')?.enable();
    const subcriterio: SubCriterio = {
      CodigoSubCriterio: this.agregar.value.codigoSubCriterio,
      IdCriterio: this.agregar.value.criterio,
      Detalle: this.agregar.value.detalle,
      Orden: '1',
    }

    this.subcriterioService.postSubCriterio(subcriterio).subscribe(
      (data) => {
        this.toastr.success('El Sub-Criterio ha sido agregado correctamente!')
        this.loadSubCriterios();
        console.log(data);        
    }, (error) => {
      this.toastr.error('Error!, no se ha podido realizar los cambios')
      console.log(error);
    });

    if (this.cerrarAgregarModal) {
      this.cerrarAgregarModal.nativeElement.click();
    }
  }

  //Editar
  editarSubCriterio(): void {
    this.editar.get('criterio')?.enable();
    const subcriterio: SubCriterio = {
      IdSubCriterio: this.editar.value.id,
      CodigoSubCriterio: this.editar.value.codigoSubCriterio,
      IdCriterio: this.editar.value.criterio,
      Detalle: this.editar.value.detalle,
      Orden: this.editar.value.orden,
      Activo: '1'
    }

    this.subcriterioService.updateSubCriterio(subcriterio).subscribe(
      (data) => {
        this.toastr.success('Se ha realizado los cambios correctamente!')
        this.loadCriterios()      
        this.loadSubCriterios();
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