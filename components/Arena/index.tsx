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

interface IProps {
  characterNFT: any
}

const Component: React.FC<IProps> = ({ characterNFT }) => {
  // State
  const [gameContract, setGameContract] = useState<any>(null)
  // UseEffects
  useEffect(() => {
    const { ethereum }: any = window

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicGame.abi,
        signer
      )

      setGameContract(gameContract)
    } else {
      console.log('Ethereum object not found')
    }
  }, [])

  return (
    <div className="text-center">
      {/* Boss */}
      <p>BOSS GOES HERE</p>

      {/* Character NFT */}
      <p>CHARACTER NFT GOES HERE</p>
    </div>
  )
}

export default Component
