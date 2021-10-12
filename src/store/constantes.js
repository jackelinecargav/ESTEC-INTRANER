const constantes ={};
const API_SERVICIO =  "https://mz-services.miraflores.gob.pe:8090/api/files";
const API_SERVICIO_TEST =  "https://mz-services-test.miraflores.gob.pe:8090/api/files";
const API_MIRAFLORES = "https://mz-services-test.miraflores.gob.pe:8090/api";
const API_MIRAFLORES_LOCAL = "http://localhost:8090/api";

constantes.rutaTramite= `${API_MIRAFLORES}/tramites/`;
constantes.ruta= `${API_MIRAFLORES}/parametros/`;
constantes.rutacitas= `${API_MIRAFLORES}/citas/`;
constantes.rutaencuesta= `${API_MIRAFLORES}/encuesta/`;
constantes.rutaPersona = `${API_MIRAFLORES}/persona`;
constantes.rutaAccesos = `${API_MIRAFLORES}/accesos/`;
constantes.rutaRentas = `${API_MIRAFLORES}/rentas`;

constantes.filesRecupera=`${API_SERVICIO}/recuperarEntidadArchivo/`;

constantes.entidadArchivo = `${API_SERVICIO}/recuperarEntidadArchivo`;
constantes.rutaTareasComunes=`${API_MIRAFLORES}/tareas-comun/`;
constantes.rutaActividades = `${API_MIRAFLORES}/actividades/`;

constantes.urlPlataforma="https://www.miraflores.gob.pe/plataforma-digital/#/";
export default constantes;
