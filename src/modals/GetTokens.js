import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { ViewContext } from '../context/AppContext'
import { TierContext } from '../context/TierContext'

import buffiGweiImg from '../assets/buffToken.png'
import getBuffImg from '../assets/buffigwei-1.png'

const GetTokens = () => {
  const tierContext = useContext(TierContext)
  const [pageError, setPageError] = useState(null)
  const { contracts, isLoading, dispatch, claimed } = useContext(ViewContext)
  const { faucet } = contracts

  async function addBuff() {
    try {
      console.log(`Calling hitMe(${tierContext.tier})`)
      await faucet.hitMe(tierContext.tier)
      dispatch({ type: 'SET_LOADING', payload: true })
      
      try {

        const buffiTokenAdded = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: '0xD1924Dc661A3E0563deFE8E8028485211799e2b0',
              symbol: 'BUFF',
              decimals: 18,
              image: buffiGweiImg
            }
          }
        })
        if (buffiTokenAdded) {
          dispatch({ type: 'SET_CLAIMED', payload: true })
          console.log('BUFF tokens Added!')
        } else {
          console.log('Something went terribly wrong')
          setPageError('WARNING: SET_CLAIM dispatch failed, BUFF Token not added')
        }

      } catch (error) {
        setPageError(`Get BUFF Error: ${error.message}`)
      }

    } catch (error) {
      console.log(`Get BUFF Error:${error}`)
      setPageError(`Get BUFF Error: ${error.message}`)
    }
  }

  return (
    <>
      <header className="text-center">
        <h2 className="header1">Claim BUFF Tokens</h2>
      </header>
      <div className="walletButtonContainer">
        <div className="mx-auto block w-full h-full">
          {
            pageError
              ? <>
                <div className="text-xs text-red-500 mb-12">{pageError}</div>
                <a href="/" title="Try connecting to Arbitrum Rinkeby network again" className="btn-primary">Try Again</a>
              </>
              : <>
                <button onClick={addBuff} disabled={isLoading || claimed}
                  // should we use aria-pressed or have a good disabled state while (connecting to arbitrum or 
                  // getting food tokens)
                  type="button"
                  className="network-btns text-center relative block w-full h-full"
                >
                  <motion.img
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.075 }}
                    className="mx-auto mb-5" src={getBuffImg} alt="" role="presentation" />
                  <motion.h4
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    className="btn-primary">
                    Get Tokens
                  </motion.h4>
                </button>
              </>
          }
        </div>
      </div>
    </>
  )
}

export default GetTokens
