import React from 'react'
import './arrows.css'
export const LeftArrow = (props) => {
    const { onClick } = props
    return (
        <i onClick={onClick} className="icono-arrow1-left"></i>
    )
}

export const RightArrow = (props) => {
    const { onClick } = props
    return (
        <i onClick={onClick} className="icono-arrow1-right"></i>
    )
}