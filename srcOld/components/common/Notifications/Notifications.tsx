import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const notificationStyle = {
  fontFamily: 'Helvetica, serif',
  fontSize: '14px'
}

const Notifications = () => {
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

export default Notifications
