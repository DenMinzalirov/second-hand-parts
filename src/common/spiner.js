import React from 'react'
import { css } from '@emotion/core'
import BounceLoader from 'react-spinners/BounceLoader'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

const Spiner = () => {
  return (
    <BounceLoader css={override} size={40} color={'#123abc'} loading={true} />
  )
}

export default Spiner
