import { Component } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../models/persona.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogoAgregarPersonaComponent } from '../../dialogo-agregar-persona/dialogo-agregar-persona.component';


@Component({
  selector: 'app-lista-personas',
  templateUrl: './lista-personas.component.html',
  styleUrls: ['./lista-personas.component.css'],
})
export class ListaPersonasComponent {
  personas: Persona[] = [];

  constructor(public dialog: MatDialog, private personaService: PersonaService) { }


    
  editarPersona(personaEditada: Persona) {
    const index = this.personas.findIndex(p => p.id === personaEditada.id);
    if (index !== -1) {
      this.personas[index] = personaEditada;
    }
  }

  abrirDialogoEditar(persona: Persona): void {
    const dialogRef = this.dialog.open(DialogoAgregarPersonaComponent, {
      width: '250px',
      data: { persona: {...persona}, esEdicion: true }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editarPersona(result);
      }
    });
  }

  eliminarPersona(id: number) {
    this.personas = this.personas.filter(persona => persona.id !== id);
  }

}
