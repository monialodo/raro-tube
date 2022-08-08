export const forgotTemplate = (token: string) => (
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
        <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Aqui está o seu código para redefinir sua senha</h1>
        <img alt="Inspect with Tabs" src="https://i.giphy.com/media/z3ZzHIN66i7X6KAbxh/giphy.webp" style="width: 100%;">
        <p>Copie e cole esse código na tela de esqueci minha senha para resetar-la</p>
        <p>Caso não tenho feito uma requisição para alterar sua senha, por favor desconsidere esse email</p>
        <p>Não compartilhe esse código com ninguém, todos são suspeitos</p>
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