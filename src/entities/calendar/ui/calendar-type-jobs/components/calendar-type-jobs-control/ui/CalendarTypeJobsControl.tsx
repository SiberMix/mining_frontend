import { useState } from 'react'

import { StyledButton } from '~shared/ui/button-styled'

import { CalendarTypeJobsRightSide } from '../../calendar-type-jobs-right-side'

export const CalendarTypeJobsControl = () => {
  const [isOpenTypeJobs, setIsOpenTypeJobs] = useState(false)

  return (
    <>
      <StyledButton
        width='auto'
        height='auto'
        onClick={setIsOpenTypeJobs.bind(null, true)}
      >
        Работы
      </StyledButton>
      <CalendarTypeJobsRightSide
        isOpen={isOpenTypeJobs}
        onClose={setIsOpenTypeJobs.bind(null, false)}
      />
    </>
  )
}
