import React, {
  useEffect,
  useState
} from 'react'
import axios from 'axios'
import AddTableModal from './modules/add-table/AddTableCrop'
import ElementLeftMenu from './modules/left-menu-crop/ElementLetfMenu'
import { SevoInGroups } from './modules/sevo-in-groups/SevoInGroups'
import s from './CropRotation.module.scss'

interface MainProps {
  active: boolean
}
interface ClickedElement {

  sowing4YearsAgo: any | null,
  sowing3YearsAgo: any | null,
  sowing2YearsAgo: any | null,
  actualSowing: any | null
}

const CropList: React.FC<MainProps> = ({ active }) => {

  const [data, setData] = useState<any>([])

  const fetchData = async () => {
    const token = localStorage.getItem('token')
    const result = await axios.get('http://myhectare.ru:8000/api/v1/croptable/', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    setData(result.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [clickedElement, setClickedElement] = useState<ClickedElement>({ sowing4YearsAgo: null, sowing3YearsAgo: null, sowing2YearsAgo: null, actualSowing: null })

  const handleElementClick = (name: any, id: any) => {
    const baseUrl = 'http://myhectare.ru:8000/api/v1/crop/'
    const queryParams = `crop_folder=${id}`
    const url = `${baseUrl}?${queryParams}`
    // Извлечение токена из Local Storage

    // Установка заголовков запроса с токеном
    const headers = {
      Authorization: 'Token ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }

    // Выполнение GET-запроса с заголовками
    axios.get(url, { headers })
      .then(response => {
        const data = response.data

        const sowing4YearsAgo = data[0].sowing_4_years_ago[0]

        const sowing3YearsAgo = data[0].sowing_3_years_ago[0]
        const sowing2YearsAgo = data[0].sowing_2_years_ago[0]
        const actualSowing = data[0].actual_sowing[0]

        setClickedElement({
          sowing4YearsAgo,
          sowing3YearsAgo,
          sowing2YearsAgo,
          actualSowing
        })
      })
      .catch(error => {
        console.error('Ошибка при выполнении запроса:', error)
      })
  }

  const handleAddTableClick = () => {
    setIsModalVisible(true)
  }
  const handleDelete = (id: string | number) => {
    // filter out the deleted item from the items array
    const updatedItems = data.filter((item: any) => item.id !== id)
    setData(updatedItems) // update the items state with the filtered array
  }

  const handleAddTableSubmit = (name: string, comment: string) => {
    const token = localStorage.getItem('token')

    axios.post('http://myhectare.ru:8000/api/v1/croptable/', { name, comment }, { headers: { Authorization: `Token ${token}` } })
      .then(() => {
        setIsModalVisible(false)
        fetchData()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className={s.wrapper}>
      <div className={s.left}>
        <p style={{ textAlign: 'center' }}>
          <b>
              Севооборот
          </b>
        </p>
        <div
          className={s.addButton}
          onClick={handleAddTableClick}
        >
            + Добавить план ротации
        </div>
        <div className={s.list}>
          {data.map((item: any, index: any) => (
            <ElementLeftMenu
              key={item.id}
              name={item.name}
              comment={item.comment}
              index={index}
              id={item.id}
              onDelete={handleDelete}

              onClick={() => handleElementClick(item.name, item.id)}
            />
          ))}
        </div>
      </div>
      <SevoInGroups
        sowing4YearsAgo={clickedElement.sowing4YearsAgo}
        sowing3YearsAgo={clickedElement.sowing3YearsAgo}
        sowing2YearsAgo={clickedElement.sowing2YearsAgo}
        actualSowing={clickedElement.actualSowing}
      />
      <AddTableModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleAddTableSubmit}
        name={name}
        setName={setName}
        comment={comment}
        setComment={setComment}
      />
    </div>
  )
}

export default CropList
