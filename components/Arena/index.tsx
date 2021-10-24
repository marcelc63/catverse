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
  setCharacterNFT: any
}

const Component: React.FC<IProps> = ({ characterNFT, setCharacterNFT }) => {
  // State
  const [gameContract, setGameContract] = useState<any>(null)
  const [boss, setBoss] = useState<any>(null)
  const [attackState, setAttackState] = useState('')
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

  useEffect(() => {
    /*
     * Setup async function that will get the boss from our contract and sets in state
     */
    const fetchBoss = async () => {
      const bossTxn = await gameContract.getBigBoss()
      console.log('Boss:', bossTxn)
      setBoss(transformCharacterData(bossTxn))
    }

    const onAttackComplete = (newBossHp: any, newPlayerHp: any) => {
      const bossHp = newBossHp.toNumber()
      const playerHp = newPlayerHp.toNumber()

      console.log(`AttackComplete: Boss Hp: ${bossHp} Player Hp: ${playerHp}`)

      /*
       * Update both player and boss Hp
       */
      setBoss((prevState: any) => {
        return { ...prevState, hp: bossHp }
      })

      setCharacterNFT((prevState: any) => {
        return { ...prevState, hp: playerHp }
      })
    }

    if (gameContract) {
      fetchBoss()
      gameContract.on('AttackComplete', onAttackComplete)
    }

    return () => {
      if (gameContract) {
        gameContract.off('AttackComplete', onAttackComplete)
      }
    }
  }, [gameContract])

  const runAttackAction = async () => {
    try {
      if (gameContract) {
        setAttackState('attacking')
        console.log('Attacking boss...')
        const attackTxn = await gameContract.attackBoss()
        await attackTxn.wait()
        console.log('attackTxn:', attackTxn)
        setAttackState('hit')
      }
    } catch (error) {
      console.error('Error attacking boss:', error)
      setAttackState('')
    }
  }

  return (
    <div className="text-center">
      {/* Boss */}
      {boss && (
        <div
          className={`flex flex-col items-center mb-4 ${
            attackState === 'attacking' ? `animate-bounce` : ` `
          }`}
        >
          <p>{boss.name}</p>
          <img src={boss.imageURI} className="w-40 rounded text-center" />
          <p>{`${boss.hp} / 10000 HP`}</p>
          <Button onClick={runAttackAction}>{`Attack ${boss.name}`}</Button>
        </div>
      )}

      {/* Character NFT */}
      <div className="flex flex-col items-center">
        <p>Your Character</p>
        <p>{characterNFT.name}</p>
        <img src={characterNFT.imageURI} className="w-40 rounded text-center" />
        <p>{`${characterNFT.hp} / ${characterNFT.maxHp} HP`}</p>
        <p>{`Attack Damage: ${characterNFT.attackDamage}`}</p>
      </div>
    </div>
  )
}

export default Component
