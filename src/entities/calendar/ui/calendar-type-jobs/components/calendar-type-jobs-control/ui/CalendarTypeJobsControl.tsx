import { useState } from 'react'

import { StyledButton } from '~shared/ui/styled-button'

import { CalendarTypeJobsRightSide } from '../../calendar-type-jobs-right-side'

type CalendarTypeJobsLeftSideProps = {
  disabled: boolean
}

export const CalendarTypeJobsControl = ({ disabled }: CalendarTypeJobsLeftSideProps) => {
  const [isOpenTypeJobs, setIsOpenTypeJobs] = useState(false)

  return (
    <>
      <StyledButton
        width='auto'
        height='auto'
        onClick={setIsOpenTypeJobs.bind(null, true)}
        disabled={disabled}
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
