import './SettingsEvent.scss'

import { Upload } from 'antd'
import React, { memo } from 'react'

export const SettingsEvent = memo(() => {
  return (
    <div className='settingsUserWrapper'>
      <div className='settingsUser'>
        <div className='settingsUserSidebar'>
          <div className='settingsUserPickAvatarWrapper'>
            <span className='settingsUserPickAvatarWrapperSpan'>
              Пользователь:
            </span>
            <Upload
              name='avatar'
              listType='picture-card'
              className='settingsUserPickAvatar'
              showUploadList={false}
              action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
              style={{ width: 'auto' }}
            >
              <div>
                <div>
                  Аватарка
                </div>
              </div>
            </Upload>
          </div>
        </div>
      </div>
    </div>
  )
})
