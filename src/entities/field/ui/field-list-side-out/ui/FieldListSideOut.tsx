import './FieldListSideOut.scss'

import { SideOutLayout } from '~shared/ui/side-out-layout'

import { FieldPreview } from '../../field-preview'

export const FieldListSideOut = () => {

  return (
    <SideOutLayout className='FieldListSideOut'>
      <div className='libraries'>
        <p style={{ textAlign: 'center' }}>
          <b>
            Культура
          </b>
        </p>
      </div>
      <FieldPreview />
    </SideOutLayout>
  )
}
