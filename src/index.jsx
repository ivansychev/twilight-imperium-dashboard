import React from 'react'
import ReactDOM from 'react-dom'

import normalized_style from 'normalize.css'
import style from './style.scss'

const App = () => (
    <div className={style.wrapper}>
        Hello World!
    </div>
)

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)