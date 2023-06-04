import { createSlice } from '@reduxjs/toolkit'

type SidebarInitialState = {
  sidebarOpenWindow: SidebarOpenWindow
}

const sidebarInitialState: SidebarInitialState = {
  sidebarOpenWindow: 'PolygonList'
}

const mapSlice = createSlice({
  name: 'sidebar',
  initialState: sidebarInitialState,
  reducers: {
    setOpenSidebarWindow: (state: SidebarInitialState, action: {type: any, payload: 'PolygonList' | 'EquipmentList' | 'FieldList' | 'Calendar'}) => {
      state.sidebarOpenWindow = action.payload
    }
  }
})

const {
  reducer,
  actions
} = mapSlice

export const {
  setOpenSidebarWindow
} = actions

export default reducer

export type SidebarOpenWindow = 'PolygonList' | 'EquipmentList' | 'FieldList' | 'Calendar'
