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
  setCharacterNFT: any
}

const Component: React.FC<IProps> = ({ setCharacterNFT }) => {
  const [characters, setCharacters] = useState<any>([])
  const [gameContract, setGameContract] = useState<any>(null)

  const mintCharacterNFTAction = (characterId: any) => async () => {
    try {
      if (gameContract) {
        console.log('Minting character in progress...')
        const mintTxn = await gameContract.mintCharacterNFT(characterId)
        await mintTxn.wait()
        console.log('mintTxn:', mintTxn)
      }
    } catch (error) {
      console.warn('MintCharacterAction Error:', error)
    }
  }

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
    const getCharacters = async () => {
      try {
        console.log('Getting contract characters to mint')

        const charactersTxn = await gameContract.getAllDefaultCharacters()
        console.log('charactersTxn:', charactersTxn)

        const characters = charactersTxn.map((characterData: any) =>
          transformCharacterData(characterData)
        )
        console.log(characters)
        setCharacters(characters)
      } catch (error) {
        console.error('Something went wrong fetching characters:', error)
      }
    }

    /*
     * Add a callback method that will fire when this event is received
     */
    const onCharacterMint = async (
      sender: any,
      tokenId: any,
      characterIndex: any
    ) => {
      console.log(
        `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
      )

      /*
       * Once our character NFT is minted we can fetch the metadata from our contract
       * and set it in state to move onto the Arena
       */
      if (gameContract) {
        const characterNFT = await gameContract.checkIfUserHasNFT()
        console.log('CharacterNFT: ', characterNFT)
        setCharacterNFT(transformCharacterData(characterNFT))
      }
    }

    if (gameContract) {
      getCharacters()
      gameContract.on('CharacterNFTMinted', onCharacterMint)
    }

    return () => {
      /*
       * When your component unmounts, let;s make sure to clean up this listener
       */
      if (gameContract) {
        gameContract.off('CharacterNFTMinted', onCharacterMint)
      }
    }
  }, [gameContract])

  const renderCharacters = () =>
    characters.map((character: any, index: number) => (
      <div className="flex flex-col p-2" key={character.name}>
        <div className="">
          <p className="text-center">{character.name}</p>
        </div>
        <img
          src={character.imageURI}
          alt={character.name}
          className="rounded"
        />
        <Button
          className="text-center"
          onClick={mintCharacterNFTAction(index)}
        >{`Mint ${character.name}`}</Button>
      </div>
    ))

  return (
    <div className="">
      <h2 className="text-center">Mint Your Hero. Choose wisely.</h2>
      {characters.length > 0 && (
        <div className="flex flex-row">{renderCharacters()}</div>
      )}
    </div>
  )
}

export default Component
