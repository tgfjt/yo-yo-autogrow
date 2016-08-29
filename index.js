var yo = require('yo-yo')
var sf = require('sheetify')
var xtend = require('xtend')
var emitter = require('namespace-emitter')

var styling = sf('./index.css')

function TextareaData (options) {
  var defaultProps = {
    placeholder: '',
    value: '',
    name: '',
    disabled: false,
    required: false,
    inputmode: '',
    autocomplete: 'off'
  }

  this.state = xtend(defaultProps, options)
  this.emitter = emitter()
}

TextareaData.prototype.update = function (event) {
  switch (event.type) {
    case 'focus':
      this.setState({focused: true})
      this.emitter.emit('update')
      break

    case 'blur':
      this.setState({focused: false})
      this.emitter.emit('update')
      break

    case 'input':
      this.setState({value: event.target.value})
      this.emitter.emit('update')
      break

    default:
      break
  }
}

TextareaData.prototype.setState = function (newState) {
  this.state = xtend(this.state, newState)
}

function textarea (data) {
  var disabled = data.state.disabled ? 'disabled' : ''
  var required = data.state.required ? 'required' : ''
  var disabledClass = data.state.disabled ? 'is-disabled' : ''
  var focusClass = data.state.focused ? 'is-focused' : ''

  return yo`
    <div class="${styling}">
      <div class="AutogrowTextarea ${focusClass} ${disabledClass}">
        <div class="AutogrowTextarea-mirror">${data.state.value + ' '}</div>
        <div class="AutogrowTextarea-container">
          <textarea rows="1"
            name="${data.state.name}"
            ${required}
            ${disabled}
            inputmode="${data.state.inputmode}"
            placeholder="${data.state.placeholder}"
            autocomplete="${data.state.autocomplete}"
            onfocus=${data.update.bind(data)}
            onblur=${data.update.bind(data)}
            oninput=${data.update.bind(data)}>${data.state.value}</textarea>
        </div>
      </div>
    </div>
  `
}

module.exports = function (options) {
  var t = new TextareaData(options)
  var el = textarea(t)

  t.emitter.on('update', function () {
    yo.update(el, textarea(t))
  })

  return el
}
