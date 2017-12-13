import jsxSync from './index'
import vueJsx from 'babel-plugin-transform-vue-jsx'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'

let code = `
function a() {
  return (
    <div>
      <component visible$sync={this.test}>I am newbie</component>
      <component visible$sync={this.test[1]}>I am newbie</component>
      <component visible$sync={this.test.a}>I am newbie</component>
    </div>
  )
}`

let result = Babel.transform(code, {
  plugins: [
    vueJsx,
    jsxSync
  ]
})

let codeDom = document.querySelector('#code')
let transformedCode = document.querySelector('#transformed-code')
let ast = document.querySelector('#ast')

function prismCode(code, lang) {
  var hl = Prism.highlight(code, Prism.languages[lang])
  return '<pre data-lang="' + lang + '"><code class="lang-' + lang + '">' + hl + '</code></pre>'
}

codeDom.innerHTML = prismCode(code, 'jsx')
transformedCode.innerHTML = prismCode(result.code, 'javascript')
