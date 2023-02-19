import { useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants/"

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAdress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    async function updateUIValues() {
        const new1 = await getEntranceFee()
        console.log(new1)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled])

    return (
        <>
            <button>Enter Lottery</button>
        </>
    )
}
