import React, { useContext } from 'react'

import logout from '../assets/logout.svg'
import { ViewContext } from "../context/AppContext"


const formatAddress = (addr) => addr && `${addr.substr(0, 6)}...${addr.substr(-4)}`

const Pill = () => {
  const { user } = useContext(ViewContext)
  const { address } = user

  return address
    ? <div className="pill signin-button flex flex-col gap-y-1">
      <p>{formatAddress(address)}</p>
      <div>
        <a title="back to eth denver" href="https://ethdenver.com">
          <img src={logout} alt="Logout"/>
        </a>
      </div>
    </div>
    : null
}

export default Pill
