// Banco de dados simulado (localStorage)
const DB_KEY = 'denuncias_db';

// Inicializar banco de dados se não existir
if (!localStorage.getItem(DB_KEY)) {
  localStorage.setItem(DB_KEY, JSON.stringify([]));
}

// Funções para manipular o banco de dados
function salvarDenuncia(denuncia) {
  const denuncias = JSON.parse(localStorage.getItem(DB_KEY));
  denuncias.push(denuncia);
  localStorage.setItem(DB_KEY, JSON.stringify(denuncias));
}

function buscarDenuncia(protocolo) {
  const denuncias = JSON.parse(localStorage.getItem(DB_KEY));
  return denuncias.find(d => d.protocolo === protocolo);
}

// Gerar protocolo único
function gerarProtocolo() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Formatar data
function formatarData(data) {
  const d = new Date(data);
  return d.toLocaleDateString('pt-BR');
}

// Página de formulário
if (document.getElementById('denunciaForm')) {
  document.getElementById('denunciaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Gerar protocolo
    const protocolo = gerarProtocolo();
    
    // Coletar dados do formulário
    const denuncia = {
      protocolo: protocolo,
      empresa: document.getElementById('empresa').value,
      classificacao: document.getElementById('classificacao').value,
      turno: document.getElementById('turno').value,
      data_ocorrido: document.getElementById('data_ocorrido').value,
      tempo_ocorrencia: document.getElementById('tempo_ocorrencia').value,
      local: document.getElementById('local').value,
      setor: document.getElementById('setor').value,
      descricao: document.getElementById('descricao').value,
      mensagem: document.getElementById('mensagem').value,
      status: "Em análise",
      created_at: new Date().toISOString()
    };
    
    // Salvar no banco de dados
    salvarDenuncia(denuncia);
    
    // Redirecionar para página de confirmação
    window.location.href = `confirmacao.html?protocolo=${protocolo}`;
  });
}

// Página de consulta
if (document.getElementById('consultaForm')) {
  // Carregar o protocolo do localStorage quando a página carregar
  window.onload = function() {
    const protocolo = localStorage.getItem("protocolo_atual");
    if (protocolo) {
      document.getElementById("protocolo").value = protocolo;
    }
    
    // Carregar histórico de protocolos
    carregarHistorico();
  };
  
  // Formulário de consulta
  document.getElementById('consultaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const protocolo = document.getElementById('protocolo').value;
    const denuncia = buscarDenuncia(protocolo);
    
    if (denuncia) {
      // Mostrar resultado
      document.getElementById('resultado-protocolo').textContent = denuncia.protocolo;
      document.getElementById('resultado-status').textContent = denuncia.status;
      document.getElementById('resultado-data').textContent = formatarData(denuncia.created_at);
      document.getElementById('resultado-classificacao').textContent = denuncia.classificacao;
      
      if (denuncia.resposta) {
        document.getElementById('resultado-resposta').textContent = denuncia.resposta;
        document.getElementById('resposta-container').style.display = 'block';
      } else {
        document.getElementById('resposta-container').style.display = 'none';
      }
      
      document.getElementById('resultado').style.display = 'block';
      document.getElementById('mensagem').style.display = 'none';
    } else {
      // Mostrar mensagem de erro
      document.getElementById('mensagem').textContent = "Protocolo não encontrado. Verifique o número informado.";
      document.getElementById('mensagem').style.display = 'block';
      document.getElementById('resultado').style.display = 'none';
    }
  });
}

// Funções para o histórico de protocolos
function carregarHistorico() {
  const protocolos = JSON.parse(localStorage.getItem("protocolos_historico") || "[]");
  const historicoDiv = document.getElementById("historico-protocolos");
  
  if (protocolos.length > 0 && historicoDiv) {
    historicoDiv.innerHTML = "";
    protocolos.forEach(function(protocolo) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "protocolo-btn";
      btn.textContent = protocolo;
      btn.onclick = function() {
        document.getElementById("protocolo").value = protocolo;
      };
      historicoDiv.appendChild(btn);
    });
    document.getElementById("historico-container").style.display = "block";
  }
}

function limparHistorico() {
  localStorage.removeItem("protocolos_historico");
  document.getElementById("historico-container").style.display = "none";
}