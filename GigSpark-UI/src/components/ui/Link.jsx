import React from 'react'
import {Link} from "react-router-dom"

const LinkEl = ({href, children, className=""}) => {
  return (
    <Link to={href} className={className}> { children } </Link>
  )
}

export default LinkEl