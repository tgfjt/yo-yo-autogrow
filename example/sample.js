const choo = require('choo')
const html = require('choo/html')
const sf = require('sheetify')

const autogrow = require('..')

const prefix = sf('./sample.css')

const app = choo()

app.model({
  state: {title: 'Autogrow Textarea!'},
  reducers: {
    update: (data, state) => ({ title: data })
  }
})

const mainView = (state, prev, send) => html`
  <main class="${prefix}">
    <div class="container">
      <h1>${state.title}</h1>
      <h2>Default</h2>
      <div>
        ${autogrow()}
      </div>
      <h3>Custom</h3>
      <div class="custom">
        ${autogrow({
          placeholder: 'Placeholder from choo!'
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
