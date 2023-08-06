import { colors } from './randomColors.json'

export const getRandomColor = (usingColors?: string[]) => {
  const randomSeed = Date.now()
  if (!!usingColors) {
    let randomIndex = randomSeed % usingColors.length
    return usingColors[randomIndex]
  }

  let randomIndex = randomSeed % colors.length
  return colors[randomIndex]
}
