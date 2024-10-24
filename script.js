// Clase Usuario
class Usuario {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }
}
class Administrador extends Usuario {
    mostrarInfo() {
        return `Soy ${this.nombre}, tengo ${this.edad} años y soy Administrador.`;
    }
}
class Comercial extends Usuario {
    mostrarInfo() {
        return `Soy ${this.nombre}, tengo ${this.edad} años y soy Comercial.`;
    }
}

class AdministradorDeTareas {
    constructor() {
        this.tareas = [];
        this.contadorTareas = 0;
    }

    agregarTarea(tarea, persona) {
        this.contadorTareas++;
        const nuevaTarea = { id: this.contadorTareas, tarea, persona };
        this.tareas.push(nuevaTarea);
        this.renderizarTareas();
    }

    editarTarea(id, nuevaTarea, nuevaPersona) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            tarea.tarea = nuevaTarea;
            tarea.persona = nuevaPersona;
            this.renderizarTareas();
        }
    }

    eliminarTarea(id) {
        this.tareas = this.tareas.filter(t => t.id !== id);
        this.renderizarTareas();
    }

    renderizarTareas() {
        const ul = document.getElementById('listaTareas');
        ul.innerHTML = '';
        this.tareas.forEach(t => {
            const li = document.createElement('li');
            li.id = `tarea-${t.id}`;
            li.innerHTML = `
                ${t.tarea} - Asignado a: ${t.persona} 
                <button onclick="editarTarea(${t.id})">Editar</button>
                <button onclick="eliminarTarea(${t.id})">Eliminar</button>
            `;
            ul.appendChild(li);
        });
    }
}

const administradorDeTareas = new AdministradorDeTareas();

function editarTarea(id) {
    const nuevaTarea = prompt("Editar tarea:");
    const nuevaPersona = prompt("Editar persona asignada:");
    if (nuevaTarea && nuevaPersona) {
        administradorDeTareas.editarTarea(id, nuevaTarea, nuevaPersona);
    }
}

function eliminarTarea(id) {
    administradorDeTareas.eliminarTarea(id);
}

const admin = new Administrador('Roland', 34);
const comercial = new Comercial('Ana', 28);

document.getElementById('adminBtn').addEventListener('click', () => {
    document.getElementById('output').textContent = admin.mostrarInfo();
});

document.getElementById('comercialBtn').addEventListener('click', () => {
    document.getElementById('output').textContent = comercial.mostrarInfo();
});

document.getElementById('addTaskBtn').addEventListener('click', () => {
    const tareaInput = document.getElementById('tareaInput').value;
    const personaInput = document.getElementById('personaInput').value;
    if (tareaInput && personaInput) {
        administradorDeTareas.agregarTarea(tareaInput, personaInput);
        document.getElementById('tareaInput').value = '';
        document.getElementById('personaInput').value = '';
    } else {
        alert('Por favor, completa ambos campos.');
    }
});

document.getElementById('editTaskBtn').addEventListener('click', () => {
    const idTarea = parseInt(prompt("Ingresa el ID de la tarea a modificar:"));
    const nuevaTarea = prompt("Nueva descripción de la tarea:");
    const nuevaPersona = prompt("Nueva persona asignada:");
    
    if (idTarea && nuevaTarea && nuevaPersona) {
        administradorDeTareas.editarTarea(idTarea, nuevaTarea, nuevaPersona);
    } else {
        alert('Por favor, completa todos los datos correctamente.');
    }
});

document.getElementById('deleteTaskBtn').addEventListener('click', () => {
    const idTarea = parseInt(prompt("Ingresa el ID de la tarea a eliminar:"));
    if (idTarea) {
        administradorDeTareas.eliminarTarea(idTarea);
    } else {
        alert('Por favor, ingresa un ID válido.');
    }
});

const colores = ['lightblue', 'lightgreen', 'lightcoral', 'lightpink', 'lightyellow'];

document.getElementById('colorBtn').addEventListener('click', () => {
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    document.getElementById('colorP').style.backgroundColor = colorAleatorio;
});

const signosZodiaco = [
    'Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo',
    'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'
];

const horoscopos = [
    'Hoy es un día excelente para comenzar algo nuevo.',
    'Tu energía estará en su punto máximo.',
    'Podrías recibir buenas noticias en el trabajo.',
    'Mantén la calma, vienen tiempos de cambio.',
    'Un encuentro inesperado te sorprenderá.',
    'Tus finanzas mejorarán pronto, sigue ahorrando.',
    'Alguien cercano necesita tu apoyo hoy.',
    'Es momento de tomar decisiones importantes en tu vida.',
    'Hoy es un buen día para relajarte y disfrutar.',
    'Estás en el camino correcto, sigue adelante.',
    'Tu creatividad será clave para resolver un problema.',
    'Recibirás el reconocimiento que mereces por tu esfuerzo.'
];

function generarHoroscopo() {
    const indice = Math.floor(Math.random() * horoscopos.length);
    return horoscopos[indice];
}

document.getElementById('horoscopoBtn').addEventListener('click', () => {
    const contenedor = document.getElementById('horoscopoContainer');
    contenedor.innerHTML = ''; 

    signosZodiaco.forEach(signo => {
        const boton = document.createElement('button');
        boton.classList.add('signo');
        boton.textContent = signo;

        boton.addEventListener('click', () => {
            alert(`Horóscopo para ${signo}: ${generarHoroscopo()}`);
        });

        contenedor.appendChild(boton);
    });
});