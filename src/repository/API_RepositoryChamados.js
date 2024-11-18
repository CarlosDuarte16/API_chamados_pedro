import con from './connection.js';

// Functions CRUD Table Chamados \/ \/ \/ \/

export async function inserirChamado(chamado) {
  const comando = `
    INSERT INTO Chamado (nm_titulo, ds_informacoes, ds_impacto, dt_ocorrencia, usuario_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [resposta] = await con.query(comando, [
    chamado.titulo,
    chamado.informacoes,
    chamado.impacto,
    chamado.dataOcorrencia,
    chamado.usuarioId || null, 
  ]);

  return resposta.insertId;
}

export async function consultarChamados() {
  const comando = `
    SELECT c.id, c.nm_titulo, c.ds_informacoes, c.ds_impacto, c.dt_ocorrencia, u.nm_usuario AS usuario_responsavel
    FROM Chamado c
    LEFT JOIN Usuario u ON c.usuario_id = u.id
  `;

  const [resposta] = await con.query(comando);
  return resposta;
}


export async function consultarChamadoPorId(id) {
  const comando = `
    SELECT c.id, c.nm_titulo, c.ds_informacoes, c.ds_impacto, c.dt_ocorrencia, u.nm_usuario AS usuario_responsavel
    FROM Chamado c
    LEFT JOIN Usuario u ON c.usuario_id = u.id
    WHERE c.id = ?
  `;

  const [resposta] = await con.query(comando, [id]);
  return resposta[0];
}

export async function atualizarChamado(id, chamado) {
  const comando = `
    UPDATE Chamado
    SET nm_titulo = ?, ds_informacoes = ?, ds_impacto = ?, dt_ocorrencia = ?, usuario_id = ?
    WHERE id = ?
  `;

  await con.query(comando, [
    chamado.titulo,
    chamado.informacoes,
    chamado.impacto,
    chamado.dataOcorrencia,
    chamado.usuarioId || null,
    id,
  ]);
}

export async function deletarChamado(id) {
  const comando = `
    DELETE FROM Chamado WHERE id = ?
  `;

  await con.query(comando, [id]);
}

// Functions CRUD Table Chamados ^ ^ ^

// Functions CRUD Table Usuario \/\/\/


export async function inserirUsuario(usuario) {
  const comando = `
    INSERT INTO Usuario (nome, email, funcao)
    VALUES (?, ?, ?)
  `;

  const [resposta] = await con.query(comando, [
    usuario.nome,
    usuario.email,
    usuario.funcao,
  ]);

  return resposta.insertId; 
};

export async function consultarUsuarioPorEmail(email) {
  const comando = `
    SELECT id, nome, email, funcao
    FROM Usuario
    WHERE email = ?
  `;

  const [resposta] = await con.query(comando, [email]);
  return resposta[0];
}





