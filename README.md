# 🐾 Encontre seu Amigo

Site para ajudar a encontrar pets perdidos na cidade do Rio de Janeiro.

## Tecnologias

- React + TypeScript (Vite)
- Tailwind CSS v4
- Framer Motion
- React Router DOM
- React Icons
- Firebase Firestore

## Pré-requisitos

- Node.js 18+
- Projeto Firebase

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz com base no `.env.example`:

```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc
VITE_FEEDBACK_URL=https://forms.gle/seu_link
```

### Regras do Firestore

No Firebase Console → Firestore → Regras:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /pets/{document=**} {
      allow read, write: true;
    }
  }
}
```

## Execução

```bash
npm run dev
```

## Estrutura do Firestore

Coleção: `pets`

| Campo       | Tipo      | Descrição              |
|-------------|-----------|------------------------|
| imageUrl    | string    | URL da foto do pet     |
| bairro      | string    | Bairro no RJ           |
| contato     | string    | Telefone para contato  |
| createdAt   | timestamp | Data de criação        |

## Páginas

- `/` — Landing page com listagem de pets perdidos e filtro por bairro
- `/registrar` — Formulário para registrar um pet perdido

## Assets

Coloque a logo do projeto em `public/logo.png`.
