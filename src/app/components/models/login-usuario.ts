// Clase exportable del login del usuario
export class LoginUsuario {
    nombreUsuario: string;
    password: string;
    nombre: string;
    email: string;
    apellidos: string;
    fch_nacimiento: Date;
    telefono: string;
    
    constructor(nombreUsuario: string, password: string) {
        this.nombreUsuario = nombreUsuario;
        this.password = password;
    }
}
