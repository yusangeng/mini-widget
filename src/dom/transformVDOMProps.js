import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'
import isNumber from 'lodash/isNumber'

const { keys } = Object

export default function transformVDOMProps (vdom) {
  vdom.props = transformProps(vdom.props)
  vdom.children.forEach(child => transformVDOMProps(child))
}

function transformProps (props) {
  const ret = {}
  const names = keys(props)

  props = transformStyle(transformClassName(props))

  names.forEach(name => {
    ret[('' + name).toLowerCase()] = props[name]
  })

  return ret
}

function transformClassName (props) {
  let { className: cls } = props

  if (isArray(cls)) {
    cls = cls.map(el => isArray(el) ? el.join(' ') : el).join(' ')
  } else if (isPlainObject(cls)) {
    cls = keys(cls).map(c => {
      if (cls[c]) {
        return '' + c
      }
    }).filter(el => el && el.length).join(' ')
  } else {
    cls = '' + cls
  }

  props.className = cls

  return props
}

function transformStyle (props) {
  let { style } = props

  if (isPlainObject(style)) {
    style = keys(style).map(key => {
      let value = style[key]

      if (isNumber(value) && key !== 'z-index') {
        value = value + 'px'
      } else {
        value = '' + value
      }

      return `${('' + key).toLowerCase()}: ${value};`
    }).join(' ')
  } else {
    style = '' + style
  }

  props.style = style

  return props
}