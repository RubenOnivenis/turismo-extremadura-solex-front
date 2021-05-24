// Clase exportable de nuevo usuario con sus datos
export class NuevoUsuario {
    nombre: string;
    nombreUsuario: string;
    email: string;
    password: string;
    apellidos: string;
    fch_nacimiento: Date;
    telefono: string;
    
    constructor(nombre: string, nombreUsuario: string, email: string, password: string,  apellidos: string, fch_nacimiento: Date, telefono: string,) {
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.password = password;
        this.apellidos= apellidos;
        this.fch_nacimiento= fch_nacimiento;
        this.telefono= telefono;
    }
}
