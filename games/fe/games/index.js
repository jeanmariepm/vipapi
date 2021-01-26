import React from 'react'
import ReactDOM from 'react-dom'
//import 'bootstrap/dist/css/bootstrap.css'
import Addition from './components/addition'
import classes from './index.css'

const Hello = () => {
  return (
    <div className={classes} class='app'>
      <Addition/>
    </div>
  )
}

ReactDOM.render(<Hello/>, document.getElementById("App") )