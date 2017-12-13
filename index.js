let syncRe = /(.*)\$sync/

var genListener = function genListener(t, event, body) {
  return t.jSXAttribute(
    t.jSXIdentifier('on' + event),
    t.jSXExpressionContainer(t.ArrowFunctionExpression([t.Identifier('$$val')], t.BlockStatement(body)))
  )
}

var firstUpperCase = function firstUpperCase(str){
  return str.replace(/^\S/, function(s) {
    return s.toUpperCase()
  })
}

var genAssignmentCode = function genAssignmentCode(t, model) {
  return t.ExpressionStatement(t.AssignmentExpression('=', model, t.Identifier('$$val')))
}

module.exports = function(babel) {
  const t = babel.types

  return {
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      JSXOpeningElement(path) {
        path.get('attributes').forEach(function(attr) {
          try {
            let matched = attr.node.name.name.match(syncRe)
            if (matched) {
              let prop = matched[1]
              attr.node.name.name = prop

              let model = t.MemberExpression(t.ThisExpression(), t.Identifier(prop))
              let listener = genListener(t, firstUpperCase(prop) + ':update',
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
