# Canal de Denúncia

Sistema simples de canal de denúncia com armazenamento local no navegador.

## Descrição

Este projeto implementa um canal de denúncia onde os usuários podem registrar reclamações e posteriormente consultar o status usando um número de protocolo gerado automaticamente.

## Funcionalidades

- Registro de denúncias com diferentes classificações
- Geração automática de protocolo único
- Consulta de status por protocolo
- Histórico de protocolos salvos no navegador
- Armazenamento local das denúncias (localStorage)

## Estrutura do Projeto

```
canal_denuncia/
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── img/
│   └── logo_valle.png
├── index.html
├── consulta.html
└── confirmacao.html
```

## Como Usar

1. Abra o arquivo `index.html` em um navegador web
2. Preencha o formulário de denúncia e envie
3. Anote o número de protocolo gerado (também é salvo automaticamente)
4. Use a página de consulta para verificar o status da denúncia

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage para persistência de dados

## Instalação

Não é necessária instalação. Basta baixar os arquivos e abrir o `index.html` em um navegador.

Para melhor experiência, recomenda-se usar um servidor web local como:
- Live Server (extensão do VS Code)
- Python HTTP Server: `python -m http.server`
- Node.js http-server: `npx http-server`

## Autor

Desenvolvido por JoTa GoMeZ