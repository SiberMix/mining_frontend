import { Collapse } from 'antd'
import styled from 'styled-components'

export const StyledCollapse = styled(Collapse)`
    .ant-collapse-header {
        background-color: var(--gray-500);
        border-radius: 8px !important;
        color: var(--gray-100) !important;
    }
    
    .ant-collapse-content-box {
        background-color: var(--gray-600);
        border-radius: 0 0 8px 8px !important;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
