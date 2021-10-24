import * as React from 'react'
import { useEffect, useState } from 'react'

import { ethers } from 'ethers'
import Button from '~/components/base/Button'

import {
  CONTRACT_ADDRESS,
  transformCharacterData,
  getImageFromName,
  getNameFromIndex,
} from '~/constants'
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

      setBoss((prevState: any) => {
        return { ...prevState, hp: bossHp }
      })
      setCharacterNFT((prevState: any) => {
        return { ...prevState, hp: playerHp }
      })
    }

    const onHealComplete = (newPlayerHp: any) => {
      const playerHp = newPlayerHp.toNumber()
      console.log(`AttackComplete: Player Hp: ${playerHp}`)
      setCharacterNFT((prevState: any) => {
        return { ...prevState, hp: playerHp }
      })
    }

    if (gameContract) {
      fetchBoss()
      gameContract.on('AttackComplete', onAttackComplete)
      gameContract.on('HealComplete', onHealComplete)
    }

    return () => {
      if (gameContract) {
        gameContract.off('AttackComplete', onAttackComplete)
        gameContract.on('HealComplete', onHealComplete)
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

  const runHealAction = async () => {
    try {
      if (gameContract) {
        setAttackState('healing')
        console.log('Attacking boss...')
        const attackTxn = await gameContract.healCharacter()
        await attackTxn.wait()
        console.log('attackTxn:', attackTxn)
        setAttackState('healed')
      }
    } catch (error) {
      console.error('Error attacking boss:', error)
      setAttackState('')
    }
  }

  return (
    <div className="max-w-4xl w-full relative h-500px">
      <img
        src="/screens/Screen-2.png"
        className="object-cover rounded absolute top-0 left-0 h-500px w-full"
      />
      {boss && (
        <div className="absolute top-0 left-0 h-500px flex flex-col items-center justify-end w-full">
          <div className="flex flex-row w-full justify-between max-w-lg ">
            <div className="flex flex-col items-center">
              <div className="bg-white rounded text-black p-2">
                <div className="flex flex-row text-sm mb-1">
                  <p className="mr-4">{characterNFT.name}</p>
                  <p>{`${characterNFT.hp} / ${characterNFT.maxHp} HP`}</p>
                </div>
                <div className="h-2 bg-red-500 relative rounded">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{
                      width: `${(characterNFT.hp / characterNFT.maxHp) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <img
                src={getImageFromName(characterNFT.name)}
                className="w-40 rounded text-center"
              />
            </div>

            <div
              className={`flex flex-col items-center mb-4 ${
                attackState === 'attacking' ? `animate-bounce` : ` `
              }`}
            >
              <div className="bg-white rounded text-black p-2">
                <div className="flex flex-row text-sm mb-1">
                  <p className="mr-4">{boss.name}</p>
                  <p>{`${boss.hp} / ${10000} HP`}</p>
                </div>
                <div className="h-2 bg-red-500 relative rounded">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{
                      width: `${(boss.hp / 10000) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <img
                src={getImageFromName(boss.name)}
                className="w-40 rounded text-center"
              />
            </div>
          </div>
          <div className="w-full p-2">
            <div className="bg-gray-100 text-black w-full py-2 px-4 rounded-lg border-4 border-blue-500 text-lg">
              {attackState === '' && (
                <>
                  <p>Choose your action</p>
                  <div className="flex">
                    <p
                      className="w-auto hover:bg-gray-300 cursor-pointer mr-4"
                      onClick={() => runAttackAction()}
                    >{`> Attact ${characterNFT.attackDamage} dmg`}</p>
                    <p
                      className="w-auto hover:bg-gray-300 cursor-pointer"
                      onClick={() => runHealAction()}
                    >{`> Heal 100 hp`}</p>
                  </div>
                </>
              )}
              {attackState === 'attacking' && (
                <p>
                  {characterNFT.name} is attacking {boss.name}!
                </p>
              )}
              {attackState === 'healing' && (
                <p>{characterNFT.name} is healing...</p>
              )}
              {attackState === 'healed' && (
                <>
                  <p>{characterNFT.name} is healed</p>
                  <div className="flex">
                    <p
                      className="w-auto hover:bg-gray-300 cursor-pointer"
                      onClick={() => setAttackState('')}
                    >{`> Choose another action`}</p>
                  </div>
                </>
              )}
              {attackState === 'hit' && (
                <>
                  {characterNFT.hp > 0 && (
                    <p>
                      {characterNFT.name} deals damage to {boss.name}!
                    </p>
                  )}
                  {characterNFT.hp <= 0 && <p>{characterNFT.name} is dead!</p>}
                  <div className="flex">
                    <p
                      className="w-auto hover:bg-gray-300 cursor-pointer"
                      onClick={() => setAttackState('')}
                    >{`> Choose another action`}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Component
