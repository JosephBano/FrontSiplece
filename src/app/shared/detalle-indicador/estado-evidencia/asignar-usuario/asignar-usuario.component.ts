import { Component, Input, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-asignar-usuario',
  templateUrl: './asignar-usuario.component.html',
  styleUrls: ['./asignar-usuario.component.css']
})
export class AsignarUsuarioComponent implements OnInit{
  @Input() IdEvidencia: any;

  Usuarios: Usuario[] = [];
  
  filter!: string;

  constructor(
    private userService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.userService.getUsuarios().subscribe(data => this.Usuarios = data);  
  }
}
