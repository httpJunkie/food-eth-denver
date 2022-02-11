import React, { createContext, useEffect, useCallback } from 'react'
import { useImmerReducer } from 'use-immer'
import { ethers } from 'ethers'

import { initialState } from './initialState.js'
import { reducer } from '../reducers'

import buffiTruckAbi from '../abi/BuffiTruck.json'
import faucetAbi from '../abi/Faucet.json'

export const ViewContext = createContext(initialState)

//utils
export const bigNumberify = (amt) => {
  return ethers.utils.parseEther(amt)
}
export const smolNumberify = (amt, decimals = 18) => {
  return parseFloat(ethers.utils.formatUnits(amt, decimals))
}
//utils

export const ViewProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState)
  const BuffiTruckAddress = process.env.REACT_APP_BUFF_ADDRESS
  const faucetAddress = process.env.REACT_APP_FAUCET_ADDRESS

  const setAccount = useCallback(async (accounts) => {
    if (accounts.length > 0) {
      try {
        const connectedAccount = {
          address: accounts[0],
        }
        dispatch({ type: 'SET_ACCOUNT', payload: connectedAccount })
      } catch (e) {
        console.log(e)
      }
    } else {
      dispatch({ type: 'SET_ACCOUNT', payload: initialState.user })
    }
  }, [dispatch])

  const connectUser = useCallback(async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      if (provider) {
        const signer = await provider.getSigner()
        const { name, chainId } = await provider.getNetwork()
        const buffiTruck = new ethers.Contract(BuffiTruckAddress, buffiTruckAbi.abi, signer)
        const faucet = new ethers.Contract(faucetAddress, faucetAbi.abi, signer)
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        setAccount(accounts)
        dispatch({
          type: 'CONNECTED_PROVIDER',
          payload: {
            provider,
            signer,
            chainId,
            name,
            buffiTruck,
            faucet
          }
        })
      }
    } catch (e) {
      console.log(e)
    }
  }, [setAccount, dispatch])

  useEffect(() => {
    if (window.ethereum) {
      connectUser()
      window.ethereum.on('accountsChanged', () => {
        connectUser()
      })
      window.ethereum.on('chainChanged', () => {
        connectUser()
      })
      window.ethereum.on('disconnect', () => {
        dispatch({ type: 'SET_ACCOUNT', payload: initialState.user })
      })
    }
  }, [connectUser, dispatch])

  const { contracts, isLoading, isConnected, isRegistered, name, chainId, provider, user, feedback, claimed } = state

  const connect = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(accounts)
    } catch (e) {
      console.log(e)
    }
  }  
  useEffect(()=>{
    if(user && user.address && isConnected && contracts && contracts.faucet && chainId === 421611){  
      // set initial claimed / registered state on load
      console.log('setting initial state:');
      
      const isWhitelisted = contracts.faucet.allowedWallets(user.address)
      const hits = contracts.faucet.hits(user.address)
      Promise.all([isWhitelisted,hits]).then((res)=>{
        const isRegistered = res[0]
        const isClaimed = !res[1].isZero()
        dispatch({
          type: "REGISTERED",
          payload: isRegistered
        })
        dispatch({
          type: "SET_CLAIMED",
          payload: isClaimed
        })        
      })      
    }
  },[user, isConnected, contracts, chainId])

  return (
    <ViewContext.Provider
      value={{
        state,
        dispatch,
        contracts,
        isLoading,
        isConnected,
        isRegistered,
        provider,
        user,
        name,
        chainId,
        feedback,
        claimed,
        actions: { connect }
      }}>
      {children}
    </ViewContext.Provider>
  )
}
