import './PlayBack.scss'
import React from 'react'
import PlayBackMenuItem from './PlayBackMenuItem/PlayBackMenuItem'

type Rnd = Array<{id: number, items: string[]}>

const PlayBack = () => {

  const count: Rnd = [
    { id: 1, items: [ 'Трактор', 'Машинка', 'Паровоз'] },
    { id: 2, items: [ 'НЕ трактор', 'Самолет', 'Теплоход'] },
    { id: 3, items: [ 'Пробка', 'Стакан', 'Кофе'] }
  ]

  return (
    <div className="PlayBack">
      <div className="PlayBack__header">
        Воспроизведение местоположения
      </div>
      <button className="PlayBack__btn-add">
        + Добавить воспроизведение
      </button>
      <div className="PlayBack__content">
        {
          count.map((item, i) => (
            <PlayBackMenuItem
              id={item.id}
              index={i}
              items={item.items}
            />
          ))
        }
      </div>
    </div>
  )
}

export default PlayBack
