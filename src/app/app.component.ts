import { Component } from '@angular/core';
import { Persona } from './models/persona.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { DialogoAgregarPersonaComponent } from './dialogo-agregar-persona/dialogo-agregar-persona.component';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { PersonaService } from './services/persona.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatListModule,
    MatButtonModule, MatInputModule, MatCardModule, MatIconModule, 
    MatDialogModule, DragDropModule, MatToolbarModule, MatCheckboxModule, HttpClientModule
  ]
})
export class AppComponent {
  personas: Persona[] = [];
  personasConfirmadas: Persona[] = [];
  nextId: number;


  editarPersona(personaEditada: Persona) {
    const index = this.personas.findIndex(p => p.id === personaEditada.id);
    if (index !== -1) {
      this.personas[index] = personaEditada;
    }
  }

  abrirDialogoEditar(persona: Persona): void {
    const dialogRef = this.dialog.open(DialogoAgregarPersonaComponent, {
      width: '250px',
      data: {
        persona: {...persona},
        esEdicion: true,
        tituloDialogo: 'Editar Persona'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editarPersona(result);
      }
    });
  }
  
  agregarPersona(nombre: string, apellido: string, dni: string) {
    this.personas.push({
      id: this.nextId,
      nombre: nombre,
      apellido: apellido,
      dni: dni
    });
    this.nextId++;
  }

  constructor(
    public dialog: MatDialog,
    private personaService: PersonaService
  ) { 
    this.nextId = 1
  }

  persona: Persona = new Persona('', '', '', 0);


onInviteConfirmed(): void {
  this.personas.filter(p => p.confirmado).forEach(persona => {
    this.personaService.confirmarInvitacion(persona).subscribe({
      next: (response) => {
        console.log('Invitación confirmada', response);
        this.personasConfirmadas.push(response);
        this.personas = this.personas.filter(p => p.id !== persona.id);
      },
      error: (error) => console.error('Error al confirmar la invitación', error)
    });
  });
}



  invitarPersonas() {
    this.personasConfirmadas = [...this.personasConfirmadas, ...this.personas.filter(p => p.confirmado)];
    this.personas = this.personas.filter(p => !p.confirmado);
  }

  abrirDialogoAgregar(): void {
    const dialogRef = this.dialog.open(DialogoAgregarPersonaComponent, {
      width: '250px',
      data: {
        persona: this.persona,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.agregarPersona(result.nombre, result.apellido, result.dni);
      }
    });
  }

  eliminarPersona(id: number) {
    this.personas = this.personas.filter(persona => persona.id !== id);
  }
}

