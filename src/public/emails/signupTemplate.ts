export const signupTemplate = (token: string) => (
`<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body style="font-family: sans-serif;">
    <div style="display: block; margin: auto; max-width: 600px;" class="main">
      <div class="logo">
        <img alt="Raro Academy logo" src="https://i.imgur.com/JU7nROQ.png" style="width: 30%;">
      </div>
      <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Parabéns, seu pré-cadastro foi aprovado no RaroTube</h1>
      <p>Agora você terá acesso à nossa plataforma de conteúdos</p>
      <img alt="Inspect with Tabs" src="https://i.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.webp" style="width: 100%;">
      <p>Para prosseguir basta finalizar seu cadastro com o código abaixo</p>
      <p>Boa sorte! Espero que aproveite! :)</p>
      <div class="code">
        <p style="font-weight: bold; font-size: 30px; max-width: 400px;">
          ${token}
        </p>
      </div>
    </div>
    <!-- Example of invalid for email html/css, will be detected by Mailtrap: -->
    <style>
      .main { background-color: white; }
      a:hover { border-left-width: 1em; min-height: 2em; }
      img {text-align: center;}
      .code {
        background-color: #eee;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
        word-wrap: break-word;
        text-align: center;
      }
      .logo {
        display: flex;
        justify-content: center;
      }
    </style>
  </body>
</html>`
)