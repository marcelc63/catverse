import * as React from 'react'
import { useEffect, useState } from 'react'

import Layout from '~/layouts/Centered'
import { ethers } from 'ethers'

import { CONTRACT_ADDRESS, transformCharacterData } from '~/constants'
import myEpicGame from '~/assets/NFTGame.json'
import Home from '~/components/Home'
import Selection from '~/components/Selection'
import Arena from '~/components/Arena'

export default function Component() {
  const [currentAccount, setCurrentAccount] = useState<string | undefined>(
    undefined
  )
  const [characterNFT, setCharacterNFT] = useState<any>(null)

  const checkNetwork = async () => {
    try {
      const { ethereum }: any = window
      if (ethereum) {
        console.log('Network exist!')
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

    if (currentAccount) {
      console.log('CurrentAccount:', currentAccount)
      fetchNFTMetadata()
    }
  }, [currentAccount])

  const renderContent = () => {
    if (!currentAccount) {
      return <Home connectWallet={connectWallet} />
    } else if (currentAccount && !characterNFT) {
      return <Selection setCharacterNFT={setCharacterNFT} />
    } else if (currentAccount && characterNFT) {
      return (
        <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />
      )
    }
  }

  return (
    <Layout>
      <img src="/screens/Logo.png" className="max-w-lg mb-2" />
      <p className="mb-4 text-lg">Protect the Catverse from the Boss Cat!</p>
      {renderContent()}
      <p className="mt-4 font-bold text-sm">
        Please use the Rinkeby Test Network
      </p>
      <p className="mt-1 text-sm">
        built by{' '}
        <a
          className="text-blue-500 underline"
          href="https://twitter.com/marcelc63"
          target="_blank"
        >
          @marcelc63
        </a>{' '}
        as a{' '}
        <a
          className="text-blue-500 underline"
          href="https://twitter.com/_buildspace"
          target="_blank"
        >
          @_buildspace
        </a>{' '}
        project
      </p>
      <p className="mt-1 text-sm">
        View Minted Cats on{' '}
        <a
          className="text-blue-500 underline"
          href="https://testnets.opensea.io/collection/catverse"
          target="_blank"
        >
          OpenSea
        </a>
      </p>
      <p className="mt-1 text-sm">
        Tip me eth at{' '}
        <a
          className="text-blue-500 underline"
          href="https://tipeth.xyz/marcelc63.eth"
          target="_blank"
        >
          tipeth.xyz/marcelc63.eth
        </a>
      </p>
    </Layout>
  )
}
