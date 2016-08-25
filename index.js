var yo = require('yo-yo')
var sf = require('sheetify')

var prefix = sf('./index.css')

module.exports = function(options) {
  var value = ' '
  var ph = 'autogrow';

  if (options) {
    if (options.placeholder) ph = options.placeholder
    if (options.value) value = options.value + value
  }

  function textarea (isFocus, val, oninput, placeholder) {
    placeholder = placeholder || ph
    val = val || value
    var tVal = val.trim()
    var focusClass = isFocus ? 'is-focus' : ''

    return yo`
      <div class="${prefix}">
        <div class="AutogrowTextarea ${focusClass}">
          <div class="AutogrowTextarea-mirror">${val}</div>
          <div class="AutogrowTextarea-container">
            <textarea placeholder="${placeholder}" rows="1" autocomplete="off"
              onfocus=${focus}
              onblur=${blur}
              oninput=${oninput}>${tVal}</textarea>
          </div>
        </div>
      </div>
    `
  }

  var el = textarea(false, value, update)

  function update (e) {
    yo.update(el, textarea(true, e.target.value + ' ', update))
  }

  function focus (e) {
    yo.update(el, textarea(true, e.target.value + ' ', update))
  }

  function blur (e) {
    yo.update(el, textarea(false, e.target.value + ' ', update))
  }

  return el
}
