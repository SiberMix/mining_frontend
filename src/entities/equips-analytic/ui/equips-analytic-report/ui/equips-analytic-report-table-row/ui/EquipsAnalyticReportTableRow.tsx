import './EquipsAnalyticReportTableRow.scss'

import type { ReactNode } from 'react'

type EquipsAnalyticReportTableRowProps = { tdArr: (string | number | undefined)[], children?: never }
  | { tdArr?: never, children: ReactNode }

export const EquipsAnalyticReportTableRow = ({
  tdArr,
  children
}: EquipsAnalyticReportTableRowProps) => {
  return (
    <tr className='EquipsAnalyticReportTableRow'>
      {
        children
          ? <td>
            {children}
          </td>
          : tdArr?.map((str, index) => (
            <td key={'' + str + index}>
              {str}
            </td>
          ))
      }
    </tr>
  )
}
