import React, { useContext, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { motion } from 'framer-motion'

import { ViewContext } from '../context/AppContext'
import buffiFetti from '../assets/buffifeti.png'
import buffiGweiImg from '../assets/buffToken.png'

const Wallet = () => {
  const [pageError, setPageError] = useState(null)
  const [disable, setDisable] = useState(false)
  const { actions } = useContext(ViewContext)
  const { connect } = actions

  const importToken = async () => {
    setDisable(true)
    try {
      const buffiTokenAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: process.env.REACT_APP_BUFF_ADDRESS,
            symbol: 'BGT',
            decimals: 18,
            image: buffiGweiImg
          }
        }
      })
      if (buffiTokenAdded) {
        setDisable(false)
        console.log('import BUFF tokens complete!')
      } else {
        setDisable(false)
        console.log('import BUFF tokens failed')
        setPageError('WARNING: Import BUFF tokens failed')
      }
    } catch (error) {
      setDisable(false)
      setPageError(`Import BUFF tokens did not complete: ${error.message}`)
    }
  }

  return (
    <>
      <header className="text-center">
        <h2 className="header1">BGT Tokens Added!</h2>
      </header>
      <div className="walletButtonContainer">
        <div className="mx-auto block w-full text-center">
          {
            pageError
              ? <>
                <div className="text-xs text-red-500 mb-12">{pageError}</div>
                <a href="/" title="Try connecting to Arbitrum Rinkeby network again" className="btn-primary">Try Again</a>
              </>
              : <>
                <button onClick={() => connect()} disabled={disable} type="button" className="network-btns text-center relative block w-full h-full">
                  <motion.img
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.075 }}
                    className="mx-auto mb-5" src={buffiFetti} alt="Buffifeti" role="presentation" />
                  <motion.a
                    rel='noopener noreferrer'
                    href='https://www.ethdenver.com/'
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    className="btn-secondary">
                    Let's go to ETHDenver!
                  </motion.a>
                </button>
              </>
          }
        </div>

        <div className="mx-auto block w-full text-center mt-12">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <motion.button disabled={disable} onClick={importToken}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className='btn-slim'
                href='https://metamask.io/'
                title='Import BGT Token'
                rel='noopener noreferrer'
                target="_blank">
                IMPORT BGT
              </motion.button>
            </div>
            <div>
              <CopyToClipboard className="btn-slim" text={process.env.REACT_APP_BUFF_ADDRESS}>
                <button>COPY BGT</button>
              </CopyToClipboard>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Wallet
