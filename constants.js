const CONTRACT_ADDRESS = '0x867af4db2e2ca5FfCCA2743C557A3172DE4310DE'
const transformCharacterData = (characterData) => {
  return {
    name: characterData.name,
    imageURI: characterData.imageURI,
    hp: characterData.hp.toNumber(),
    maxHp: characterData.maxHp.toNumber(),
    attackDamage: characterData.attackDamage.toNumber(),
  }
}

export { CONTRACT_ADDRESS, transformCharacterData }
