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
    console.log('AppVersion: v1.3')
    console.log(process.env.REACT_APP_SERVER_URL)
    console.log(process.env.REACT_APP_BUFF_ADDRESS)
    console.log(process.env.REACT_APP_FAUCET_ADDRESS)
  }

  const renderView = () => {
    switch (true) {
      case !address:
        return <Wallet />
      case address && (chainId !== 421611):
        return <ArbitrumConnect />
      case !isRegistered:
        return <TierProvider><RegistrationCode /></TierProvider>
      case address && !claimed && (chainId === 421611):
        return <TierProvider><GetTokens /></TierProvider>
      case claimed:
        return <Success />
      default:
        return <Wallet />
    }
  }

  return (
    <div className="App min-h-screen flex flex-col overflow-y-auto sm:overflow-hidden">
      {claimed && (
        <Confetti
          drawShape={ctx => {
            ctx.beginPath()
            for (let i = 0; i < 22; i++) {
              const angle = 0.4 * i
              const x = (0.05 + (1.9 * angle)) * Math.cos(angle)
              const y = (0.05 + (1.9 * angle)) * Math.sin(angle)
              ctx.lineTo(x, y)
            }
            ctx.stroke()
            ctx.closePath()
          }}
          recycle={true}
          height={window.innerHeight}
          numberOfPieces={300}
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
      {
        process.env.NODE_ENV === 'development' 
          ? <div className="text-xs text-indigo-600 pl-6 pb-6">
            <div>
              <div className="font-light">AppVersion: </div>
              v1.3
            </div>
            <div>
              <div className="font-light">REACT_APP_SERVER_URL: </div>
              {process.env.REACT_APP_SERVER_URL}
            </div>
            <div>
              <div className="font-light mt-3">REACT_APP_BUFF_ADDRESS: </div>
              {process.env.REACT_APP_BUFF_ADDRESS}
            </div>
            <div>
              <div className="font-light mt-3">REACT_APP_FAUCET_ADDRESS: </div>
              {process.env.REACT_APP_FAUCET_ADDRESS}
            </div>
          </div>
          : null
      }
    </div>
  )
}

export default Home
