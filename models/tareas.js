const Tarea = require("./tarea");
const colors = require('colors');


class Tareas{

    _listado = {};

    get listadoArr(){
        const listado = [];
        
        Object.keys(this._listado).forEach( key => { 

            const tarea = this._listado[ key ];
            listado.push( tarea );

         })

         return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea( id ){

        if( this._listado[id] ){
            delete this._listado[id]
        }

    }

    crearTarea( desc='' ){

        const tarea = new Tarea( desc );
        this._listado[ tarea.id ] = tarea;

    }

    cargarTareasFromArray = ( tareas ) => { 
        tareas.forEach( tarea => {
            const tareaClass = Tarea.tareaDb( tarea );
            this._listado[ tareaClass.id ] = tareaClass;
        } )
    }

    listadoCompleto(){

        console.log()    // Espacio en blanco

        this.listadoArr.forEach( (tarea, index) => {

            const {desc, completadoEn } = tarea;

            console.log( `${ colors.green( index + 1) }${'.'.green} ${ desc } :: ${ completadoEn ? 'Completada'.green: 'Pendiente'.red }` )

        } )

    }

    listarPendientesCompletadas( completadas = true ){

        const tareas = this.listadoArr.filter( 
                tarea => completadas 
                            ? tarea.completadoEn 
                            : !tarea.completadoEn
             )
        
        console.log();

        tareas.forEach( (tarea, i) =>{
            const {desc, completadoEn } = tarea;
            console.log(` ${ colors.green( i+1 ) }${'.'.green} ${ desc } :: ${ completadas ? completadoEn.green : 'Pendiente'.red }`)
        } )

    } 
    
    toggleCompletadas( ids = [] ){
        
        ids.forEach( id => {

            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString()
            }           

        } )

        Object.keys( this._listado ).forEach( tareaId => {
             if( !ids.includes( tareaId )){
                 this._listado[tareaId].completadoEn = null
             }
        })

    }

};

module.exports = Tareas;