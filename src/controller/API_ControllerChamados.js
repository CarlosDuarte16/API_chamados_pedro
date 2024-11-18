import * as db from '../repository/API_RepositoryChamados.js'
import { Router } from 'express';
const endpoint = Router();


// Inserir Chamado
endpoint.post('/chamado', async (req, resp) => {
  try {
    const chamado = req.body;

    const id = await db.inserirChamado(chamado);
    resp.send({ novoId: id });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

export default endpoint;


// Consultar Chamado

endpoint.get('/chamados', async (req, resp) => {
  try {
    const chamados = await db.consultarChamados();
    resp.send(chamados);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});


endpoint.get('/chamado/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const chamado = await db.consultarChamadoPorId(id);

    if (!chamado) {
      return resp.status(404).send({ erro: 'Chamado não encontrado' });
    }

    resp.send(chamado);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});


// Alterar Chamado

endpoint.put('/chamado/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const chamado = req.body;

    await db.atualizarChamado(id, chamado);
    resp.sendStatus(200);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Deletar Chamado

endpoint.delete('/chamado/:id', async (req, resp) => {
  try {
    const id = req.params.id;

    await db.deletarChamado(id);
    resp.sendStatus(200);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Inserir usuario

endpoint.post('/usuario', async (req, resp) => {
  try {
    const usuario = req.body;

    const id = await db.inserirUsuario(usuario);
    resp.send({ novoId: id });
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

// Consultar usuario

endpoint.get('/usuario', async (req, resp) => {
  try {
    const email = req.query.email;

    const usuario = await db.consultarUsuarioPorEmail(email);

    if (!usuario) {
      return resp.status(404).send({ erro: 'Usuário não encontrado' });
    }

    resp.send(usuario);
  } catch (err) {
    resp.status(400).send({ erro: err.message });
  }
});

