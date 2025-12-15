export interface Nota {
 estudianteId: string;
 materiaId: string;
 valor: string;
 description: string; 
}

export interface Estudiante {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
}

export interface Materia {
  id: string;
  nombre: string;
  codigo: string;
}

// nota.model.ts
export interface INota {
  id: string;
  estudianteId: string;
  materiaId: string;
  valor: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  estudiante: {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    // Agrega si hay más campos
    isActive?: boolean;
    estado?: string;
  };
  materia: {
    id: string;
    nombre: string;
    codigo: string;
    // Agrega si hay más campos
    isActive?: boolean;
    estado?: string;
  };
}
