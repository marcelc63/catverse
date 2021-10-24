const CONTRACT_ADDRESS = '0xD67808223CDC6a10ED4B337Cd17119e998d9AFf4'
const transformCharacterData = (characterData) => {
  return {
    characterIndex: characterData.characterIndex,
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxHp.toNumber(),
    attackDamage: characterData.attackDamage.toNumber(),
  }
}
const getImageFromIndex = (index) => {
  switch (index) {
    case 0:
      return '/cats/Cat1-web.png'
    case 1:
      return '/cats/Cat2-web.png'
    case 2:
      return '/cats/Cat3-web.png'
    default:
      return '/cats/Cat4-web.png'
  }
}

const getImageFromName = (index) => {
  switch (index) {
    case 'Calm Cat':
      return '/cats/Cat1-web.png'
    case 'Cool Cat':
      return '/cats/Cat2-web.png'
    case 'Evil Cat':
      return '/cats/Cat3-web.png'
    default:
      return '/cats/Cat4-web.png'
  }
}

const getNameFromIndex = (index) => {
  switch (index) {
    case 0:
      return 'Calm Cat'
    case 1:
      return 'Cool Cat'
    case 2:
      return 'Evil Cat'
    default:
      return 'Boss Cat'
  }
}

export {
  CONTRACT_ADDRESS,
  transformCharacterData,
  getImageFromIndex,
  getImageFromName,
  getNameFromIndex,
}
