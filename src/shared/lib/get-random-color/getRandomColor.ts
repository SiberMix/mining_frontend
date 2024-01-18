import { colors } from '~shared/lib/get-random-color/consts/colors'

export const getRandomColor = (usingColors?: string[]) => {
  const randomSeed = Date.now()
  if (usingColors) {
    const randomIndex = randomSeed % usingColors.length
    return usingColors[randomIndex]
  }

  const randomIndex = randomSeed % colors.length
  return colors[randomIndex]
}
