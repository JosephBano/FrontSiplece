import { Component, Input, OnInit } from '@angular/core';
import { ArchivoEvidencia } from 'src/app/models/modelos-generales/archivo-evidencia.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ArchivoEvidenciaService } from 'src/app/services/modeloServicios/archivo-evidencia.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { filter } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-asignar-usuario',
  templateUrl: './asignar-usuario.component.html',
  styleUrls: ['./asignar-usuario.component.css']
})
export class AsignarUsuarioComponent implements OnInit{
  @Input() IdEvidencia: any;

  Usuarios: Usuario[] = [];
  Archivos: ArchivoEvidencia[] = [];
  filter!: string;

  filterBoolean: boolean = false;

  editarEncargado!: FormGroup;

  constructor(
    private userService: UsuarioService,
    private archivoService: ArchivoEvidenciaService,
    private fb: FormBuilder,
  ) {
    this.editarEncargado = this.fb.group({
      buscador: '',
    }
    )
   }

  ngOnInit(): void {
    this.loadData();
  }
  
  loadData() {
    this.userService.getUsuarios().subscribe(data => this.Usuarios = data.filter(e => e.activo == '1'));  
    this.archivoService.GetByEvidencia(this.IdEvidencia).subscribe(data => this.Archivos = data.filter(e => e.Activo == '1'));
  }

  statusFilter() {
    this.filterBoolean = !this.filterBoolean;
  }

  formatName(str: string | undefined) {
    return str?.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }).replace(/\./g, " ").split(" ").map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()).join(" ");
  }

  comprobarUsuario(usuario: Usuario): boolean {
    for (let i = 0; i < this.Archivos.length; i++) {
      if(this.Archivos[i].UsuarioRegistra == usuario.codigoAd) return true 
    }
    return false;
  }

  crearArchivo(archivoE: ArchivoEvidencia) {
    const archivo = {}
  }
}
