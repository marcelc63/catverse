import * as React from 'react'
import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'

import Layout from '~/layouts/Centered'
import { ethers } from 'ethers'
import Textarea from '~/components/base/controlled/Textarea'
import Button from '~/components/base/Button'
import { connect } from 'react-redux'

import { CONTRACT_ADDRESS, transformCharacterData } from '~/constants'
import myEpicGame from '~/assets/NFTGame.json'
import SelectCharacter from '~/components/SelectCharacter'
import Arena from '~/components/Arena'

export default function Home() {
  const router = useRouter()
  const { address } = router.query
  const [currentAccount, setCurrentAccount] = useState<string | undefined>(
    undefined
  )
  const [characterNFT, setCharacterNFT] = useState<any>(null)
  const [network, setNetwork] = useState(0)
  const [message, setMessage] = useState<string | undefined>(undefined)
  const [tip, setTip] = useState('0.001')

  const checkNetwork = async () => {
    try {
      const { ethereum }: any = window
      if (ethereum) {
        setNetwork(parseInt(ethereum.networkVersion))
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkIfWalletIsConnected = async (): Promise<String | boolean> => {
    const { ethereum }: any = window

    if (!ethereum) {
      console.log('Make sure you have metamask!')
      return false
    } else {
      console.log('We have the ethereum object', ethereum)
      await checkNetwork()
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' })

    if (accounts.length !== 0) {
      let account = accounts[0]
      setCurrentAccount(accounts[0])
      console.log('Found an authorized account:', account)
      return account
    } else {
      console.log('No authorized account found')
      return false
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum }: any = window

      if (!ethereum) {
        alert('Get MetaMask!')
        return
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })

      console.log('Connected', accounts[0])
      await checkIfWalletIsConnected()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    /*
     * The function we will call that interacts with out smart contract
     */
    const fetchNFTMetadata = async () => {
      console.log('Checking for Character NFT on address:', currentAccount)

      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      )
      const signer = provider.getSigner()
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicGame.abi,
        signer
      )
      if (gameContract) {
        console.log(gameContract)
        const txn = await gameContract.checkIfUserHasNFT()
        if (txn.name) {
          console.log('User has character NFT')
          setCharacterNFT(transformCharacterData(txn))
        }
      }
    }

    /*
     * We only want to run this, if we have a connected wallet
     */
    if (currentAccount) {
      console.log('CurrentAccount:', currentAccount)
      fetchNFTMetadata()
    }
  }, [currentAccount])

  // Render Methods
  const renderContent = () => {
    if (!currentAccount) {
      return (
        <div>
          <Button onClick={connectWallet}>Connect Wallet To Get Started</Button>
        </div>
      )
    } else if (currentAccount && !characterNFT) {
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />
    } else if (currentAccount && characterNFT) {
      return (
        <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />
      )
    }
  }

  return (
    <Layout>
      <p>Catverse</p>
      <p>Team up to defeat the Catverse!</p>
      {renderContent()}
      <p>built by @marcelc63 as a @_buildspace project</p>
    </Layout>
  )
}
