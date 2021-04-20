
const { v4: uuidv4 } = require('uuid');

class Tarea {

    static tareaDb( tarea ){
        const tareaTemp = new Tarea( tarea.desc );
        tareaTemp.id = tarea.id;
        tareaTemp.completadoEn = tarea.completadoEn;

        return tareaTemp;
    }

    id = '';
    desc= '';
    completadoEn = null;

    constructor( desc ){
        this.id   = uuidv4();
        this.desc = desc;
        this.completadoEn = null;
    }

}

module.exports = Tarea;