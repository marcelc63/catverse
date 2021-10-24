import * as React from 'react'
import { useEffect, useState } from 'react'

import { ethers } from 'ethers'
import Button from '~/components/base/Button'

import {
  CONTRACT_ADDRESS,
  transformCharacterData,
  getImageFromIndex,
  getNameFromIndex,
} from '~/constants'
import myEpicGame from '~/assets/NFTGame.json'

interface IProps {
  setCharacterNFT: any
}

const Component: React.FC<IProps> = ({ setCharacterNFT }) => {
  const [characters, setCharacters] = useState<any>([])
  const [gameContract, setGameContract] = useState<any>(null)
  const [chosenCat, setChosenCat] = useState<any>(null)

  const mintCharacterNFTAction = async (characterId: any) => {
    try {
      console.log(gameContract, characterId)
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
    characters
      .filter((_: any, index: number) => {
        if (chosenCat !== null) {
          return index === chosenCat
        }
        return true
      })
      .map((character: any, index: number) => (
        <div className="flex flex-col p-2" key={character.name}>
          <img
            src={getImageFromIndex(chosenCat || index)}
            alt={character.name}
            className="rounded cursor-pointer hover:animate-bounce"
            onClick={() => setChosenCat(index)}
          />
        </div>
      ))

  return (
    <div className="max-w-4xl w-full relative h-500px">
      <img
        src="/screens/Screen-2.png"
        className="object-cover rounded absolute top-0 left-0 h-500px w-full"
      />
      <div className="absolute top-0 left-0 h-500px flex flex-col items-center justify-end w-full">
        {characters.length > 0 && (
          <div className="flex flex-row justify-center items-center max-h-96">
            {renderCharacters()}
          </div>
        )}
        <div className="w-full p-2">
          <div className="bg-gray-100 text-black w-full py-2 px-4 rounded-lg border-4 border-blue-500 text-lg">
            {chosenCat == null && <p>Choose your Cat...</p>}
            {chosenCat !== null && (
              <>
                <p>
                  You choose <b>{getNameFromIndex(chosenCat)}</b>
                </p>
                <div className="flex">
                  <p
                    className="w-auto hover:bg-gray-300 cursor-pointer mr-2"
                    onClick={() => mintCharacterNFTAction(chosenCat)}
                  >{`> Yes`}</p>
                  <p
                    className="w-auto hover:bg-gray-300 cursor-pointer mr-2"
                    onClick={() => setChosenCat(null)}
                  >{`> No`}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Component
