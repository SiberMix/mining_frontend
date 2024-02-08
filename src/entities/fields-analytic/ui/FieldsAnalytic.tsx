import './FieldsAnalytic.scss'

import { memo } from 'react'

import { AngleCircleDiagram, DefaultDiagram } from '~entities/diagrams'

export const FieldsAnalytic = memo(() => {
  return (
    <div className='fields-analytic-wrapper'>
      <div className='fields-analytic-wrapper-main'>
        <div className='fields-analytic-diagram-main'>
          <DefaultDiagram title='' />
          <div />
        </div>
      </div>
      <div className='fields-analytic-wrapper-side'>
        <div className='fields-analytic-diagram-side'>
          <AngleCircleDiagram />
        </div>
      </div>
    </div>
  )
})
