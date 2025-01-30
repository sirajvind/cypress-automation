import './commands'

const app = window.top
if (app) {
  app.document.addEventListener('DOMContentLoaded', () => {
    const style = app.document.createElement('style')
    style.innerHTML = '.command-name-request, .command-name-xhr { display: none }'
    app.document.head.appendChild(style)
  })
}
