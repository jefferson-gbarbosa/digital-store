# 🛍️ E-Commerce Digital Store Frontend

Este projeto é uma aplicação web de e-commerce construída com **React**, **TypeScript** e **Vite**. A loja permite que usuários explorem produtos, visualizem detalhes, filtrem por categorias e atributos, e preparem produtos para compra.

## 🔑 Funcionalidades

- 🛒 **Listagem de Produtos** com filtros por categoria, preço e atributos
- 📄 **Página de Produto** com imagens, descrição, variações e botão de compra
- 🔎 **Sistema de Filtros** dinâmico e responsivo
- 🧩 Componentes reutilizáveis para UI padronizada
- 🌐 Roteamento de páginas com React Router

## 🧱 Tecnologias Utilizadas

- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) para build rápido e otimizado
- [Tailwind CSS](https://tailwindcss.com/) para estilização moderna e responsiva
- [React Router DOM](https://reactrouter.com/) para navegação
- [ESLint](https://eslint.org/) com configuração personalizada
- 🎨 Guia de estilos (`style-guide.md`) para consistência visual

## 📁 Estrutura de Pastas

```

├── src/
│ ├── components/ # Componentes reutilizáveis como FilterGroup, BuyBox, etc.
│ ├── pages/ # Páginas como HomePage, ProductListingPage, ProductViewPage
│ ├── App.tsx # Componente principal da aplicação
│ ├── main.tsx # Ponto de entrada
│ └── index.css # Estilos globais
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── style-guide.md

```

## 📦 Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/jefferson-gbarbosa/digital-store
cd digital-store

# 2. Instale as dependências
npm install

# 3. Rode o projeto localmente
npm run dev

Acesse o projeto em http://localhost:5173.

```
## 🔗 Link 

- Acesse o projeto ao vivo [digitalstr.netlify.app](https://digitalstr.netlify.app/)

## 🧪 Scripts

- npm run dev — Inicia o servidor de desenvolvimento

- npm run build — Gera a versão otimizada para produção

- npm run lint — Executa o ESLint para verificar o código

## 📚 Estilo e Convenções

Consulte o arquivo [style-guide.md](./style-guide.md) para seguir os padrões definidos de código e UI/UX.
