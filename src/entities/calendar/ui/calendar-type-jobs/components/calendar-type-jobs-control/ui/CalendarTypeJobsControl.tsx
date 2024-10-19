import { useState } from 'react'

import { StyledButton } from '~shared/ui/styled-button'

import { CalendarTypeJobsRightSide } from '../../calendar-type-jobs-right-side'
import { t } from 'i18next';

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
        {t("Работы")}
      </StyledButton>
      <CalendarTypeJobsRightSide
        isOpen={isOpenTypeJobs}
        onClose={setIsOpenTypeJobs.bind(null, false)}
      />
    </>
  )
}
