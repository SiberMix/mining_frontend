import { Input } from 'antd'
import styled from 'styled-components'

export const StyledInput = styled(Input)`

    border: 1px solid var(--gray-100) !important;
    color: #ffffff !important;
    background-color: #565656 !important;

    &::-moz-placeholder {
        color: rgba(255, 255, 255, 0.3);
    }

    &::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.3);
    }

`
