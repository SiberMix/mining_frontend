import './EquipsAnalyticMenuTransfer.scss'

import type { TransferProps } from 'antd'
import { Transfer } from 'antd'

import { useEquipAnalyticStore } from '~entities/equips-analytic/model'

import type { Equip } from '../../../../../../../srcOld/redux/slices/mapSlice'

type EquipsAnalyticMenuTransferProps = {
  value: number[],
  onChange: (value: number[]) => void //сюда должны попадать только id из правой части
}

const PAGINATION_NUMBER = 6

export const EquipsAnalyticMenuTransfer = ({
  value,
  onChange
}: EquipsAnalyticMenuTransferProps) => {
  const allEquips = useEquipAnalyticStore(state => state.allEquipList)

  const onChangeHandler: TransferProps['onChange'] = (nextTargetKeys) => {
    const numberNextTargetKeys = nextTargetKeys.map(i => Number(i))
    onChange(numberNextTargetKeys)
  }

  return (
    <Transfer
      className='EquipsAnalyticMenuTransfer'
      rootClassName='EquipsAnalyticMenuTransfer__root'
      dataSource={allEquips}
      titles={['Все', 'Выбранные']}
      operations={['добавить', 'убрать']}
      selectAllLabels={[`${allEquips.length - value.length} ед.`, `${value.length} eд.`]}
      locale={{
        selectAll: 'Выбрать все',
        selectCurrent: 'Выбрать текущую стр',
        selectInvert: 'Выбрать наоборот',
        notFoundContent: 'Пусто'
      }}
      rowKey={item => item.id.toString()}
      targetKeys={value.map(i => i.toString())}
      onChange={onChangeHandler}
      render={(item: Equip) => item.equip_name}
      disabled={false}
      oneWay
      pagination={{ pageSize: PAGINATION_NUMBER }}
    />
  )
}
