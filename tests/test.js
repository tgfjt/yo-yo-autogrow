const test = require('tape');
const onReady = require('document-ready')

const textarea = require('../');

test('default properties', function (t) {
  t.plan(4)

  const el = textarea()

  onReady(function () {
    const textarea = el.querySelector('textarea')

    t.equal(el.querySelector('.AutogrowTextarea-mirror').innerHTML, ' ', 'same value')
    t.equal(textarea.getAttribute('placeholder'), '', 'same placeholder')
    t.equal(textarea.getAttribute('rows'), '1', 'rows=1')
    t.equal(textarea.getAttribute('autocomplete'), 'off', 'autocomplete=ff')
  })
});

test('overwrite properties', function (t) {
  t.plan(5)

  const el = textarea({
    name: 'test',
    value: 'Hi!\nHi!\nHi!',
    placeholder: 'autogrow placeholder',
    required: true,
    autocomplete: 'on'
  })

  onReady(function () {
    const textarea = el.querySelector('textarea')
    const wrapper = el.querySelector('.AutogrowTextarea')

    t.equal(el.querySelector('.AutogrowTextarea-mirror').innerHTML, 'Hi!\nHi!\nHi! ', 'same value')
    t.equal(textarea.name, 'test', 'name=test')
    t.equal(textarea.getAttribute('placeholder'), 'autogrow placeholder', 'same placeholder')
    t.equal(textarea.getAttribute('required'), 'required', 'required=true')
    t.equal(textarea.getAttribute('autocomplete'), 'on', 'autocomplete=on')
  })
});

test('be disabled', function (t) {
  t.plan(2)

  const el = textarea({
    disabled: true
  })

  onReady(function () {
    const textarea = el.querySelector('textarea')
    const wrapper = el.querySelector('.AutogrowTextarea')

    t.equal(textarea.getAttribute('disabled'), 'disabled', 'disabled=true')
    t.equal(wrapper.classList.contains('is-disabled'), true, 'is-disabled')
  })
});

test('adjust height', function (t) {
  t.plan(1)

  const el1 = textarea({
    value: 'Hello!'
  })

  const el2 = textarea({
    value: 'Hellow!\nworld!'
  })

  document.body.appendChild(el1)
  document.body.appendChild(el2)

  t.ok(el1.clientHeight < el2.clientHeight, 'adjust height via break line')
});
