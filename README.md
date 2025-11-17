# 🟢 Atividade Prática 03 — Painel em Tempo Real com Socket.IO

Este projeto consiste no desenvolvimento de um dashboard em tempo real utilizando **Node.js + Express + Socket.IO**, exibindo:

- Número total de usuários conectados
- Room mais populosa
- Atualizações automáticas a cada 1 segundo

---

## 🚀 Funcionalidades

### Backend (Node.js + Express + Socket.IO)

- Registra conexões e desconexões dos usuários
- Mantém a contagem global de usuários conectados
- Permite que cada usuário entre em uma room
- Identifica a room com maior número de usuários
- Envia atualizações a todos os clientes a cada 1 segundo

### Frontend (HTML + CSS + JS)

- Exibe em tempo real:
  - Usuários online
  - Room mais popular
  - Quantidade de usuários na room mais popular
- Permite entrar em uma room informando o nome
- Atualização instantânea usando Socket.IO Client

---

## 🛠️ Tecnologias Utilizadas

- Node.js  
- Express  
- Socket.IO  
- HTML  
- CSS  
- JavaScript  

---

## 📦 Como Executar o Projeto

1️⃣ Instale as dependências:

```bash
npm install
