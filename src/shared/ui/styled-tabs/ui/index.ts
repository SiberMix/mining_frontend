import { Tabs } from 'antd'
import type { CSSProperties } from 'react'
import styled from 'styled-components'

type TabsStyledProps = {
  color_active?: CSSProperties['color'],
  color?: CSSProperties['color']
}

export const StyledTabs = styled(Tabs)<TabsStyledProps>`
    .ant-tabs-nav {
        &:before {
            border-color: ${({ color }) => color ? color : 'var(--gray-100)'};
        }
    }

    .ant-tabs-tab {
        background-color: var(--green-200) !important;
        border-color: var(--gray-100) !important;
        color: ${({ color }) => color ? color : 'var(--gray-100)'};

        &:hover {
            .ant-tabs-tab-btn {
                color: ${({ color_active }) => color_active ? color_active : 'var(--green-100)'};
            }
        }
    }

    .ant-tabs-tab-active {
        .ant-tabs-tab-btn {
            color: ${({ color_active }) => color_active ? color_active : 'var(--green-100)'} !important;
        }
    }

    .ant-tabs-ink-bar {
        background: ${({ color_active }) => color_active ? color_active : 'var(--green-100)'};
    }

    .ant-tabs-nav-more {
        svg {
            path {
                fill: ${({ color_active }) => color_active ? color_active : 'var(--green-100)'};
            }
        }
    }
`
