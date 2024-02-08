export type EquipsAnalyticDiagramProps = {
  title: string,
  series: EquipsAnalyticDiagramSeriesType[],
  categories: string[],
  colors: string[]
}
export type EquipsAnalyticDiagramSeriesType = {
  name: string,
  id: number | string,
  data: (number | null)[]
}
