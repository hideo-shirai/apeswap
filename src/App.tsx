import React, { useState, useCallback,  } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from 'components/composites/Header';
import Home from 'pages/Home'
import Nft from 'pages/Nft'
import getWalletSigner from 'api/wallet';


export const SignerContext = React.createContext<Nullable<string>>(null)

const App: React.FC<{}>  = () => {
  const [signer, setSigner] = useState<Nullable<string>>(null)

  const handleConnectWalletClick = useCallback(
    async () => {
      try {
        const signer = await getWalletSigner()
        const address = await signer.getAddress()
        setSigner(address)
      } catch (e) {
        alert('Please reload this page and reconnect Metamask.')
      }
    },
    [],
  )

  return (
    <div className='App'>
      <Header onConnectWalletClick={handleConnectWalletClick} />

      <div className='container mx-auto px-4 mt-8'>
        <SignerContext.Provider value={signer}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:address" element={<Nft />} />
          </Routes>
        </SignerContext.Provider>
      </div>
    </div>
  )
}

export default App;
