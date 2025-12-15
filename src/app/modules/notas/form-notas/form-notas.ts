import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Nota } from '../../../core/services/nota';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Nota as NotaModel } from '../../../core/models/nota.model';
@Component({
  selector: 'app-form-notas',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-notas.html',
  styleUrls: ['./form-notas.css'],
})
export class FormNotas {
   @Output() cerrar = new EventEmitter<void>();

   notaService = inject(Nota);
   
    formRegister = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    materia: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    valor: new FormControl('', [
      Validators.required,
    ]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  cancelar() {
    this.cerrar.emit();
  }

  async guardar() {
   try {

    if (this.formRegister.invalid) return;

    const estudiante = "69401135ddf37dd0e2d5518a"
    const materia = "69400f0eddf37dd0e2d55184"

    const nota: NotaModel = {
      estudianteId: estudiante,
      materiaId: materia,
      valor: this.formRegister.value.valor!,
      description: this.formRegister.value.descripcion!,
    }

    console.log('Nota a crear', nota);
    // crearNota returns a Promise that resolves to an Observable (or undefined), so await it first
    const result = await this.notaService.createNota(nota as any);

    if (!result) {
      console.log('crearNota returned undefined or null');
    } else if (typeof (result as any).subscribe === 'function') {
      // It's an Observable — subscribe to it
      (result as any).subscribe({
        next: (resp: any) => {
          console.log('Nota creada', resp);
        },
        error: (err: any) => {
          console.log('Error al crear la nota', err);
        }
      });
    } else {
      // Not an Observable — log the resolved value
      console.log('crearNota result', result);
    }

     this.cerrar.emit();
   } catch (error: any) {
    console.log(error);
   }
  }

}
