import React from 'react'
import './NotefulForm.css'

export default function NotefulForm(props) {
  const { className, handler, ...otherProps } = props
  return (
    <form
      className={['Noteful-form', className].join(' ')}
      onSubmit={handler}
      action='#'
      {...otherProps}
    />
  )
}
