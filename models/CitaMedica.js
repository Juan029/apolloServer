const mongoose = require('mongoose');

const citaMedicaSchema = new mongoose.Schema({
    fecha: String,
    motivo: String,
    personaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }
});

let CitaMedica;

if (global.citasConnection) {
    CitaMedica = global.citasConnection.model('CitaMedica', citaMedicaSchema);
} else {
    console.error('La conexión a la base de datos de citas no está disponible');
    // Fallback a la conexión principal
    CitaMedica = mongoose.model('CitaMedica', citaMedicaSchema);
}

module.exports = CitaMedica;