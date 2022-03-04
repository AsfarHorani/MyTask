import React from 'react'

const AuthHeading = (props) => {
    const {heading, subHeading} = props;
    return(
    <div className='auth-header'>
    <p className='main-heading'>{heading}</p>
    <p className='sub-heading'>{subHeading}</p>
    </div>
  )
}

export{
    AuthHeading
}