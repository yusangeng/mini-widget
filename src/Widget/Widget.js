/**
 * 组件
 *
 * @author Y3G
 */

import mix from 'mix-with'
import Eventable from '../utils/Eventable'
import DOMBackend from './DOMBackend'
import Lifecycle from './Lifecycle'
import Renderer from './Renderer'
import HasSubWidget from './HasSubWidget'
import WidgetEvent from './WidgetEvent'

const { assign } = Object

export const createWidgetClass = (Backend = DOMBackend) => class Widget extends
  mix(Eventable).with(Backend, Lifecycle, Renderer, HasSubWidget, WidgetEvent) {
    get children () {
      return this.children_
    }

    set children (c) {
      c = c || []
      this.children_ = c
    }

    get parentWidget () {
      return this.parentWidget_
    }

    set parentWidget (widget) {
      this.parentWidget_ = widget
    }

    get vid () {
      return this.vid_
    }

    constructor (options = {}) {
      super()

      const opt = assign({}, { shareMode: false, hooks: {}, data: {}, parent: null, children: [] }, options)
      const { shareMode, hooks, data, parent, children, vid } = opt

      this.initBackend({ shareMode })
      this.initRenderer({ initData: data })
      this.initHasSubWidget()
      this.initWidgetEvent()

      this.children = children
      this.parentWidget = parent
      this.vid_ = vid
    }

    dispose () {
      delete this.parentWidget
      delete this.children

      super.dispose()
    }

    render () {
      return <div>Error: render method SHOULD rewritten by sub widget class.</div>
    }
  }

export default createWidgetClass(DOMBackend)
