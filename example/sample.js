const choo = require('choo')
const html = require('choo/html')
const sf = require('sheetify')

const autogrow = require('..')

const prefix = sf('./sample.css')

const app = choo()

app.model({
  state: {title: 'Autogrow Textarea!'}
})

console.log(autogrow())

const mainView = (state) => html`
  <main class="${prefix}">
    <div class="container">
      <h1>${state.title} with Choo.</h1>
      <h2>Default</h2>
      <div>
        ${autogrow()}
      </div>
      <h3>Custom</h3>
      <div class="custom">
        ${autogrow({
          name: 'comment',
          placeholder: 'Placeholder from choo!',
          required: true
        })}
      </div>
    </div>
  </main>
`

app.router((route) => [
  route('/', mainView)
])

const tree = app.start()
document.body.appendChild(tree)
