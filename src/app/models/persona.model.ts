export class Persona {
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    confirmado?: boolean;

    constructor(nombre: string, apellido: string, dni: string, id:number) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
    }
}
