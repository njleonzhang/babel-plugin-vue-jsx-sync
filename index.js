let syncRe = /(.*)\$sync/
const camelizeRE = /-(\w)/g;
const camelize = (str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
}

var genListener = function genListener(t, event, body) {
  return t.jSXAttribute(
    t.jSXIdentifier('on' + event),
    t.jSXExpressionContainer(t.ArrowFunctionExpression([t.Identifier('$$val')], t.BlockStatement(body)))
  )
}

var genAssignmentCode = function genAssignmentCode(t, model) {
  return t.ExpressionStatement(t.AssignmentExpression('=', model, t.Identifier('$$val')))
}

module.exports = function(babel) {
  const t = babel.types

  return {
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      JSXOpeningElement: function(path) {
        path.get('attributes').forEach(function(attr) {
          try {
            let matched = attr.node.name.name.match(syncRe)
            if (matched) {
              let prop = matched[1]
              attr.node.name.name = prop

              let model

              attr.traverse({
                JSXExpressionContainer: function(path) {
                  model = path.node.expression
                }
              })

              if (!t.isMemberExpression(model)) {
                console.error('You should use MemberExpression with sync modifier, prop [' + prop + '] on node [' + path.node.name.name + ']')
                return
              }

              let listener = genListener(t, 'Update:' + camelize(prop),
                [genAssignmentCode(t, model)])
              attr.insertAfter(listener)
            }
          } catch (e) {
            // console.log(e) ignore these nodes
          }
        })
      }
    }
  }
}
