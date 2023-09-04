import { Component, Input, OnInit } from '@angular/core';
import { ArchivoEvidencia } from 'src/app/models/modelos-generales/archivo-evidencia.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ArchivoEvidenciaService } from 'src/app/services/modeloServicios/archivo-evidencia.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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

  constructor(
    private userService: UsuarioService,
    private archivoService: ArchivoEvidenciaService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  
  loadData() {
    this.userService.getUsuarios().subscribe(data => this.Usuarios = data);  
    this.archivoService.GetByEvidencia(this.IdEvidencia).subscribe(data => this.Archivos = data);
  }
}
