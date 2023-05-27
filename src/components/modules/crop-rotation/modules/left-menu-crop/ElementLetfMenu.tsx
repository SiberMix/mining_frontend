import s from './ElementLeftMenu.module.scss'
import * as cn from 'classnames'
import React from 'react'
import TrashBox from '/src/assets/icons/delete.svg'
import EditBox from '/src/assets/icons/edit.svg'
import styled from 'styled-components'
import SVG from 'react-inlinesvg'
import { mapService } from '../../../../../api/map'

interface IProps {
  name: string,
  index: number,
  id: number,
  onDelete: (id: number | string) => void,
  onClick: () => void,
  comment: any
}

const ElementLeftMenu = ({ name, comment, id, onDelete, onClick }: IProps) => {

  const truncatedComment = comment.length > 30 ? comment.slice(0, 30) + '...' : comment
  const truncatedName = name.length > 30 ? name.slice(0, 30) + '...' : name

  const deleteItemHandler = async (id: string | number) => {
    await mapService.deleteCroptable(id)
    onDelete(id)

  }

  return (
    <div
      className={s.menuItem}
      onClick={onClick}
    >
      <div>
        <div className={cn(s.iconName)}>
          <div className={cn(s.icon)}>
            <Icon src="src/assets/icons/rotation.svg" />
          </div>
          <div className={cn(s.plan)}>
            <div className={cn(s.planNumber)}>
              {truncatedName}
            </div>
            <p>
              {truncatedComment}
            </p>
          </div>
          <div className={cn(s.geoDiv)}>
            <img
              className={cn(s.edit)}
              // onClick={() => editItemHandler(equip)}
              src={EditBox}
              alt=""
              title="Редактировать оборудование"
            />
            <img
              className={cn(s.trash)}
              onClick={() => deleteItemHandler(id)}
              src={TrashBox}
              alt=""
              title="Удалить оборудование"
            />
          </div>
        </div>
      </div>

    </div>
  )
}
export default ElementLeftMenu

const Icon = styled(SVG)`
  padding: 5px;
  height: 70px;
  width: 70px;
  margin-right: 30px;
  cursor: pointer;

  path {
    fill: #c5ef75;
  }
`
