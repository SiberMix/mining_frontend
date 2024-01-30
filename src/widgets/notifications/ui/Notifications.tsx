import 'react-toastify/dist/ReactToastify.css'

import { Slide, ToastContainer } from 'react-toastify'

import { notificationStyle } from '../const/notification-style'

export const Notifications = () => {
  return (
    <div className='notifications'>
      <ToastContainer
        style={notificationStyle}
        position='bottom-right'
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        transition={Slide}
        draggable
        pauseOnHover
        theme='colored'
      />
    </div>
  )
}
