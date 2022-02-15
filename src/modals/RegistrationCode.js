import React, { useContext, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ViewContext } from '../context/AppContext'
import { TierContext } from '../context/TierContext'

import buffiFetti from '../assets/buffifeti.png'
import { CodeInput } from '../components/Input'

const RegistrationCode = () => {
  const [pageError, setPageError] = useState(null)
  const [disable, setDisable] = useState(false)
  const tierContext = useContext(TierContext)
  const { user, dispatch } = useContext(ViewContext)
  const { address } = user
  const inputRef = useRef()

  const registerCode = async () => {
    const { value } = inputRef.current
    const url = process.env.REACT_APP_SERVER_URL

    // encode properties into format for the form body
    const details = { 'code': value.toUpperCase(), 'address': address }
    var formBody = []
    for (var property in details) {
      const encodedKey = encodeURIComponent(property)
      const encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&');

    const postData = async (url) => {
      setDisable(false)
      const res = await fetch(url, {
        method: 'POST', mode: 'cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody
      })
      return res.json()
    }

    postData(url)
      .then(res => {
        if (res.ok) {
          console.log(`postData Result: `)
          console.log(res)
          tierContext.updateTier(res.tier)
        } else {
          console.log(`postData Result: (else throw \`Error(res.text))\``)
          console.log(res.text)
          setDisable(false)
          throw Error(res.text)
        }
      })
      .then(() => {
        dispatch({ type: 'REGISTERED', payload: true })
        setDisable(false)
      })
      .catch((error) => {
        console.log(`postData \`.catch()\`: `)
        console.log(error)
        setPageError(`Connect Error: ${error.message}`)
        setDisable(false)
      })
  }

  return (
    <>
      <header className="text-center">
        <h2 className="header1">Registration Code</h2>
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
              : <div className="text-center w-full h-full">
                {/*                   
                // should we disable text while http request to server? */}
                <motion.img
                  src={buffiFetti} alt="Buffifeti" role="presentation"
                  className="mx-auto mb-5"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.075 }}
                />
                <CodeInput innerRef={inputRef} inputPlaceholder="Code" />
                <motion.h4
                  onClick={() => registerCode()}
                  className="btn-primary"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                >
                  Submit
                </motion.h4>
              </div>
          }
        </div>
      </div>
    </>
  );
}

export default RegistrationCode
