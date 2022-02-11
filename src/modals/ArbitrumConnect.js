import { useContext, useState } from "react"
import { motion } from 'framer-motion'

import { ViewContext } from "../context/AppContext"
import arbitrumLogo from '../assets/arbitrum-logo.svg'

export default function ArbitrumConnect() {
  const [pageError, setPageError] = useState(null)
  const [disable, setDisable] = useState(false)
  const { provider } = useContext(ViewContext)

  const connectArbitrum = async () => {
    if (provider) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x66eeb' }],
        })
      } catch (error) {
        setDisable(false)
        // This error code indicates that the chain has not been added to MetaMask.
        console.log(error)
        // if (error.code === 4902 || error?.data?.originalError?.code === 4902) {
        try {
          setDisable(true)
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x66eeb', // A 0x-prefixed hexadecimal string
                blockExplorerUrls: ['https://rinkeby-explorer.arbitrum.io'],
                chainName: 'Arbitrum Rinkeby',
                nativeCurrency: {
                  decimals: 18,
                  name: 'Ether',
                  symbol: 'ARETH' // 2-6 characters long
                },
                rpcUrls: ['https://rinkeby.arbitrum.io/rpc']
              },
            ],
          })
        } catch (error) {
          setDisable(false)
          // user rejects the request to "add chain" or param values are wrong, maybe you didn't use hex above for `chainId`?
          console.log(`wallet_addEthereumChain Error: ${error.message}`)
          console.log(error)
          setPageError(`Connect Error: ${error.message}`)
        }
        // }
        // handle other "switch" errors
        setDisable(false)
      }
    }
  }

  return (
    <>
      <header className="text-center">
        <h2 className="header1">Add the Network</h2>
        <p>Add the Arbitrum testnet to claim your tokens</p>
      </header>
      <div className="walletButtonContainer">
        <div className="mx-auto block w-full h-full text-center">
          {
            process.env.NODE_ENV === 'development' && (disable
              ? <>disable ui: true</>
              : <>disable ui: false</>)
          }{
            pageError
              ? <>
                <div className="text-xs text-red-500 mb-12">{pageError}</div>
                <a href="/" title="Try connecting to Arbitrum Rinkeby network again" className="btn-primary">Try Again</a>
              </>
              : <>
                <button onClick={connectArbitrum} disabled={disable} type="button"
                  // should we use aria-pressed or have a good disabled state while (connecting to arbitrum or 
                  // getting food tokens)
                  className="network-btns text-center relative block w-full h-full"
                >
                  <motion.img
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.075 }}
                    className="mx-auto mb-5" src={arbitrumLogo} alt="" role="presentation" />
                  <motion.h4
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    className="btn-primary">
                    Connect Network
                  </motion.h4>
                </button>
              </>
          }
        </div>
      </div>
    </>
  )
}