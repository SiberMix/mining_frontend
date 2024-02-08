import { colors } from '~shared/const/colors'

export const getRandomColor = (usingColors?: string[]) => {
  if (usingColors) {
    const randomIndex = Math.floor(Math.random() * usingColors.length)
    return usingColors[randomIndex]
  }

  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}
