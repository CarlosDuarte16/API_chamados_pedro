import APIChamados from './controller/API_ControllerChamados.js';

export default function adicionarRotas(server){
    server.use(APIChamados)
}