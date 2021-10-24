const CONTRACT_ADDRESS = '0x867af4db2e2ca5FfCCA2743C557A3172DE4310DE'
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
