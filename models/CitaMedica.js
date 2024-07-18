const mongoose = require('mongoose');

const citaMedicaSchema = new mongoose.Schema({
    fecha: String,
    motivo: String,
    personaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }
});

module.exports = global.citasConnection.model('CitaMedica', citaMedicaSchema);