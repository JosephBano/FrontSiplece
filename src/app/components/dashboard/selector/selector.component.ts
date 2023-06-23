import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Criterio } from "src/app/models/criterios.model";
import { Instituciones } from "src/app/models/instituciones.model";
import { Modelo } from "src/app/models/modelo.model";
import { SubCriterio } from "src/app/models/subCriterios.model";
import { CriteriosService } from "src/app/services/modeloServicios/criterios.service";
import { InstitucionesService } from "src/app/services/modeloServicios/instituciones.service";
import { ModeloService } from "src/app/services/modeloServicios/modelo.service";
import { SubCriteriosService } from "src/app/services/modeloServicios/sub-criterios.service";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit
{
  selects: FormGroup;

  institucion: Instituciones[] = [];
  srtTituloInstitucion: string = '';
  modelos: Modelo[] = [];
  criterios: Criterio[] = [];
  subCriterios: SubCriterio[] = [];

  institucionID = "1"; // variable que setea la institucion
  modeloId!: string;
  criterioId!: string;
  subcriterioId!: string;

  isCriterioDisabled = true;
  isSubcriterioDisabled = true;

  displayIndicador = false;
  
  constructor(private fb: FormBuilder, 
              private institucionService: InstitucionesService,
              private modeloService: ModeloService,
              private criterioService: CriteriosService,
              private subcriterioService: SubCriteriosService
              ) {
    this.selects = this.fb.group({
      modelo: ['', Validators.required],
      criterio: ['', Validators.required],
      subcriterio: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.institucionService.getInstituciones().subscribe(data => {
      this.institucion = data.filter( e => e.IdInstitucion == this.institucionID);
      this.getData();
    })
  }

  getData(){
    this.srtTituloInstitucion = this.institucion[0].Detalle || '';

    this.modeloService.getModelos().subscribe(data => {
      this.modelos = data;
    })
    this.criterioService.getCriterios().subscribe(data => {
      this.criterios = data;
    })
    this.subcriterioService.getSubCriterio().subscribe(data => {
      this.subCriterios = data;
    })
  }

  modeloChange(){
    this.modeloId = this.selects.value.modelo;
    if(this.modeloId != '') this.isCriterioDisabled = false;
    this.displayIndicador = false;
    this.selects.value.criterio = '';
  }

  criterioChange(){
    this.criterioId = this.selects.value.criterio;
    if(this.criterioId !== '') this.isSubcriterioDisabled = false
    this.displayIndicador = false;
    this.selects.value.subcriterio = '';
  }

  subcriterioChange() {
    this.subcriterioId = this.selects.value.subcriterio;
    this.displayIndicador = false;
  }

  onSubmit() {
    this.displayIndicador = true;
  }

}
