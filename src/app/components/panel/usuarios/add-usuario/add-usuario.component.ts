import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { DataService } from 'src/app/services/data.service';
import { Sidebar } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit{
  usuario?: Usuario;
  usuarios: Usuario[] = [];
  formulario!: FormGroup;
  nombre: string = '';
  apellido: string = '';
  contrasenia: string = '';
  correo: string = '';
  showPassword = false;

  constructor(
    private bar: Sidebar,
    private fb: FormBuilder,
    private ds: DataService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { 
 
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      contrasenia: ['',Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)],
      
    });
  }
  
  ngOnInit(): void {
    this.bar.actualizarActiveLiOrder1('admin');
    this.bar.actualizarActiveLiOrder2('addusuarios')
    this.usuarioService.getUsuarios().subscribe(
      usuario =>this.usuarios=usuario
    );
  }

  getUsuarios() {
    this.usuarioService.getUsuarios()
      .subscribe(
        (data: Usuario[]) => {
          this.usuarios = data;
        },
        (error) => {
          console.error('Error al mostar usuarios', error);
        }
     );
  }

  getUsuario(id: number) {
    this.usuarioService.getUsuario(id).subscribe(
      (usuario: Usuario) => {
        this.usuario = usuario;
        // Realiza cualquier otra lógica que necesites con los datos del usuario.
      },
      error => {
        console.error('Error al obtener el usuario', error);
      }
    );
  }

  agregarUsuario(form: NgForm) {
    if (this.nombre && this.apellido && this.contrasenia) {
      const apellidoMinusculas = this.apellido.toLowerCase();
      const nombreMinusculas = this.nombre.toLocaleLowerCase();
      const usuario: Usuario = {
        codigoAd: `${nombreMinusculas}.${apellidoMinusculas}`,
        correo: `${nombreMinusculas}.${apellidoMinusculas}@istpet.edu.ec`,
        nombre: this.nombre,
        apellido: this.apellido,
        rol: '',
        contrasenia: this.contrasenia,
        activo: '1'
      };
  
      this.usuarioService.crearUsuario(usuario).subscribe(
        response => {
          console.log('Usuario creado con éxito', response);
        },
        (error) => {
          console.error('Error al crear usuario', error);
        }
      );
      this.nombre = '';
      this.apellido = '';
      this.contrasenia = '';
    }
  }
}
