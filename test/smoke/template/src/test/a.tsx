import c from './index.less'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
export class Index extends Component implements Component {
  render (): JSX.Element {
    return (
      <div className={c.indexClass}>
        adasd
        <img src="https://static001.geekbang.org/resource/image/33/2e/33f57c04bdc46e887d1ef5ca8ec7b42e.jpg?x-oss-process=image/resize,m_fill,h_150,w_150" />
      </div>
    )
  }
}
interface A {
  b(): void;
}
class B implements A {
  b (): number {
    return 1
  }
}
console.log(new B())
ReactDOM.render(<Index />, document.querySelector('#app'))
