import { isIOS } from 'react-device-detect'
import { motion } from 'framer-motion'

import appStoreBadge from '../assets/appStore.svg'
import googlePlayBadge from '../assets/googlePlayBadge.svg'
// import metaMaskFox from '../assets/metamask.svg'

const installLinks = {
  appStore: {
    image: appStoreBadge,
    link: 'https://metamask.app.link/skAH3BaF99',
    title: 'Download MetaMask from AppStore'
  },
  googlePlay: {
    image: googlePlayBadge,
    link: 'https://metamask.app.link/bxwkE8oF99',
    title: 'Download MetaMask from Google Play Store'
  }
}

const Button = ({ os }) => {
  return (
    <a className='store-badge' href={os.link} title={os.title} rel='noopener noreferrer' target="_blank">
      <img src={os.image} alt={os.title} />
    </a>
  )
}

export const MobileInstallButton = () => {
  return (
    <div>
      <p>Don't have MetaMask yet?</p>
      {isIOS
        ? <Button os={installLinks.appStore} />
        : <Button os={installLinks.googlePlay} />
      }
    </div>
  )
}

export const BrowserInstallButton = () => {
  return (
    <motion.a
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className='btn-primary mt-7'
      href='https://metamask.io/'
      style={{ display: 'block' }}
      title='Install MetaMask'
      rel='noopener noreferrer'
      target="_blank">
      Install MetaMask
    </motion.a>
  )
}