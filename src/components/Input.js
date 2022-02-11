import React from 'react'
import { motion } from 'framer-motion'
import { keyBlock } from '../lib/utils'

export const CodeInput = ({ innerRef, disabled, inputPlaceholder }) => {
  return (
    <motion.input
      defaultValue=''
      disabled={disabled}
      initial={false}
      onKeyPress={keyBlock}
      placeholder={inputPlaceholder}
      required
      ref={innerRef}
    />
  )
}