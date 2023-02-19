import React from "react"
import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } = useMoralis()

    console.log(`is Web3Enabled ${isWeb3Enabled}`)      
    useEffect(() => {
        if (localStorage.getItem("connected")) {
          enableWeb3()          
        }
    }, [isWeb3Enabled])

    useEffect(() => {
      Moralis.onAccountChanged((account) => {
        console.log(`Account changed to ${account}`)
        if(account == null) {          
          localStorage.removeItem("connected")
          deactivateWeb3()
        }        
      })
    }, [account])

    return (
        <div>
            <div>Manual Header</div>
            {account ? (
                `Connected to ${account}`
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()
                        localStorage.setItem("connected", "injected")
                    }}
                disabled={isWeb3EnableLoading}>
                    Connect
                </button>
            )}
        </div>
    )
}
