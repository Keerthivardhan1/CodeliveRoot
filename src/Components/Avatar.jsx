import React, { useState } from 'react'
import "../index.css"

const Avatar = ({name}) => {
    const [letter , setLetter] = useState(name[0]);
    // setLetter(name[0])
  return (
    <div className='avatar'>{letter}
    </div>
  )
}

export default Avatar