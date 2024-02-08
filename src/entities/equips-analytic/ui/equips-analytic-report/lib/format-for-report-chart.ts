type FormatForReportChart = {
  firstArr: Record<string, number> | null,
  secondArr: Record<string, number> | null
}

export function formatForReportChart({
  firstArr,
  secondArr
}: FormatForReportChart): { seriesData: number[], categories: string[] } {

  if (firstArr === null || secondArr === null) {
    return {
      seriesData: [],
      categories: []
    }
  }

  const valuesFirstArr = Object.values(firstArr)
  const valuesSecondArr = Object.values(secondArr)

  const mergedArray = valuesFirstArr.reduce((result: number[], value, index) => {
    if (valuesSecondArr[index] !== undefined) {
      result.push(value, valuesSecondArr[index])
    } else {
      result.push(value)
    }
    return result
  }, [])

  const longestObject = Object.keys(firstArr).length > Object.keys(secondArr).length ? firstArr : secondArr
  const categories = Object.keys(longestObject)

  return {
    seriesData: mergedArray,
    categories: categories
  }
}
