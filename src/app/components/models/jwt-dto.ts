// Clase exportable del jwtDTO 
// Datos para el token
export class JwtDTO {
    token: string;
    constructor(token: string) {
        this.token = token;
    }
}
