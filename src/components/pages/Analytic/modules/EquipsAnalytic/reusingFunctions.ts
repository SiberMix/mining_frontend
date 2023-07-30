import { colors } from '../../analytic-data.json'

export const getRandomColor = () => {
  const randomSeed = Date.now()
  let randomIndex = randomSeed % colors.length

  return colors[randomIndex]
}
