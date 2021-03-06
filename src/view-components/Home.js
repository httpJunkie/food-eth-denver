import React, { useContext } from 'react'
import Confetti from 'react-confetti'

import { ViewContext } from '../context/AppContext'
import { TierProvider } from '../context/TierContext'

import { Logo } from '../components/Logo'
import Pill from '../components/Pill'
import Wallet from '../modals/Wallet'
import ArbitrumConnect from '../modals/ArbitrumConnect'
import RegistrationCode from '../modals/RegistrationCode'
import GetTokens from '../modals/GetTokens'
import Success from '../modals/Success'

const Home = () => {
  const { user, chainId, claimed, isRegistered } = useContext(ViewContext)
  const { address } = user

  if (process.env.NODE_ENV === 'production') {
    console.log('AppVersion: v1.7')
    console.log(`claimed: ${claimed}, isRegistered: ${isRegistered}, address: ${address}`)
    console.log(process.env.REACT_APP_SERVER_URL)
    console.log(process.env.REACT_APP_BUFF_ADDRESS)
    console.log(process.env.REACT_APP_FAUCET_ADDRESS)
  }

  const renderView = () => {
    switch (true) {
      // 01
      case !address:
        return <Wallet />

      // 02
      case address && (chainId !== 421611):
        return <ArbitrumConnect />

      // 03
      case address && !isRegistered && (chainId === 421611):
        return <TierProvider><RegistrationCode /></TierProvider>

      // 03b
      case !address && !isRegistered && (chainId === 421611):
        return <TierProvider><RegistrationCode /></TierProvider>

      // 04
      case address && !claimed && (chainId === 421611):
        return <TierProvider><GetTokens /></TierProvider>

      //05
      case claimed:
        return <Success />

      // 06
      default:
        return <Wallet />
    }
  }

  return (
    <div className="App min-h-screen flex flex-col overflow-y-auto sm:overflow-hidden">
      {claimed && (
        <Confetti
          recycle={false}
          height={window.innerHeight}
          numberOfPieces={200}
          width={window.innerWidth}
          opacity={0.8}
        />
      )}
      <header className="flex justify-between items-center p-4">
        <Logo />
        <Pill />
      </header>
      <main className="flex-grow relative">
        <div className="main-content shadow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-10 sm:px-4 rounded flex flex-col">
          {renderView()}
        </div>
      </main>
    </div>
  )
}

export default Home
