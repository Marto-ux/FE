import { Persona } from '../models/persona.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialogo-agregar-persona',
  templateUrl: './dialogo-agregar-persona.component.html',
  styleUrls: ['./dialogo-agregar-persona.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
  ]
})
export class DialogoAgregarPersonaComponent implements OnInit {
  personaForm: FormGroup;
  tituloDialogo: string = 'Agregar Nueva Persona';
  textoBoton: string = 'Agregar';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogoAgregarPersonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {persona: Persona, esEdicion?: boolean}
  ) {
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.esEdicion) {
      this.tituloDialogo = 'Editar Persona';
      this.textoBoton = 'Editar';
      this.personaForm.patchValue(this.data.persona);
    }
  }

  onSave(): void {
    if (this.personaForm.valid) {
      this.dialogRef.close(this.personaForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  guardarCambios(): void {
    this.dialogRef.close(this.data.persona);
  }
}
