# Nany Festa — convite e confirmação

O site mantém a página inicial original, com identidade visual retrô, fotos, animações e contagem regressiva. A experiência foi reduzida ao início + convite/RSVP; mural, quiz, cabine, playlist e álbum não fazem mais parte da navegação.

## Confirmação por e-mail

O formulário envia o nome do convidado para `leonardogabriel3470@gmail.com` usando FormSubmit. Na primeira confirmação real, o FormSubmit enviará uma mensagem de ativação para esse endereço. Abra esse e-mail e clique em ativar; só então os próximos envios serão encaminhados normalmente. Teste depois da ativação.

## Executar localmente

```bash
npm install
npm run dev
```

## Publicar na Vercel

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: `.`

O arquivo `vercel.json` já configura o fallback das rotas React. Também é possível publicar pela Netlify, usando `npm run build` e `dist` como diretório publicado.
