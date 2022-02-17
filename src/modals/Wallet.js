import React, { useContext } from 'react'
import { motion } from 'framer-motion'
// import { isMobile } from 'react-device-detect'

// import { MobileInstallButton, BrowserInstallButton } from '../components/InstallMetaMask'
import { walletMeta } from '../modals/walletMeta'
import { ViewContext } from '../context/AppContext'

const Wallet = () => {
  const { actions } = useContext(ViewContext)
  const { connect } = actions

  // const renderInstallButton = () => {
  //   switch(true) {
  //     case provider !== null:
  //     case provider && isMobile:
  //       return (
  //         <motion.h4
  //           whileTap={{ scale: 0.95 }}
  //           whileHover={{ scale: 1.05 }}
  //           className="btn-primary">
  //           {walletMeta['metamask']?.description}
  //         </motion.h4>
  //       )
  //     case !provider && isMobile:
  //       return <MobileInstallButton />
  //     case !provider:
  //       return <BrowserInstallButton />
  //     default: console.log('no provider')
  //   }
  // }

  return (
    <>
      <header className="text-center">
        <h2 className="header1">Sign in with Web3</h2>
      </header>
      <div className="walletButtonContainer">
        <div className="mx-auto block w-full h-full text-center">
          <button onClick={() => connect()} type="button" className="network-btns text-center relative block w-full h-full">
            <motion.img
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.075 }}
              className="mx-auto mb-5" src={walletMeta['metamask']?.uri} alt="" role="presentation" />
            <motion.h4
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="btn-primary">
              {walletMeta['metamask']?.description}
            </motion.h4>
          </button>
        </div>
      </div>
    </>
  )
}

export default Wallet
