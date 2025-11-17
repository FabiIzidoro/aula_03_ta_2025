🟢 Atividade Prática 03 — Painel em Tempo Real com Socket.IO

Este projeto consiste no desenvolvimento de um dashboard em tempo real utilizando Node.js + Express + Socket.IO, exibindo:

Número total de usuários conectados

Room mais populosa

Atualizações automáticas a cada 1 segundo

O objetivo é aplicar conceitos de comunicação em tempo real com WebSockets usando a biblioteca Socket.IO.

🚀 Funcionalidades
✅ Backend (Node.js + Express + Socket.IO)

Registra conexões e desconexões dos usuários.

Mantém uma contagem global de usuários conectados.

Permite que cada usuário escolha uma room e entre nela.

Calcula qual room está mais populosa.

Emite para todos os clientes, a cada 1 segundo:

Total de usuários online

Nome da room mais ativa

Quantidade de usuários nessa room

🎨 Frontend (HTML + JS)

Exibe em tempo real, sem recarregar a página:

Usuários online

Room mais popular

Número de usuários dentro dela

Permite o usuário entrar em uma room digitando o nome.

Interface simples, clara e funcional.

🛠️ Tecnologias Utilizadas
Backend

Node.js

Express

Socket.IO

Frontend

HTML

CSS

JavaScript (client-side)

Socket.IO Client

📦 Como Executar o Projeto
1️⃣ Instale as dependências
npm install

2️⃣ Inicie o servidor
npm start


O servidor iniciará em:

http://localhost:3000

3️⃣ Acesse o frontend

Abra o navegador e entre em:

http://localhost:3000


Abra várias abas para simular múltiplos usuários conectados.

📡 Estrutura do Projeto
📁 projeto
 ├── 📁 public
 │     ├── index.html
 │     ├── style.css
 │     ├── script.js
 ├── server.js
 ├── package.json
 └── README.md

🔄 Funcionamento do Dashboard
A cada 1 segundo o servidor envia:
{
  "totalUsers": 5,
  "mostPopulatedRoom": "salaA",
  "usersInMostPopulatedRoom": 3
}

E o cliente atualiza automaticamente na tela.


👩‍💻 Desenvolvido por

Fabiana
Atividade Prática 03 — Tecnologias Aplicadas
