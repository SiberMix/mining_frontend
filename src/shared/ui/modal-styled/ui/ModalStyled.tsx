import { Modal } from 'antd'
import styled from 'styled-components'

type ModalStyledProps = {}

export const ModalStyled = styled(Modal)<ModalStyledProps>`
    .ant-modal {
        &-header {
            background-color: inherit;
            padding: 3px;
            border-radius: 0;
        }

        &-close-x {
            color: var(--gray-100);
            transition: color .3s;

            &:hover {
                color: #FFFFFF;
            }
        }

        &-content {
            border: 1px solid var(--gray-100);
            background-color: var(--gray-500);
        }

        &-title {
            color: var(--gray-100);
        }

        &-body {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: var(--gray-100);

            .ant-input {
                border: 1px solid var(--gray-100);
                color: #FFFFFF;
                background-color: var(--gray-200);

                &::-moz-placeholder {
                    color: var(--gray-200);
                }

                &::-webkit-input-placeholder {
                    color: var(--gray-200);
                }
            }
        }

        &-footer {
            button {
                border: 1px solid var(--gray-100) !important;
                color: var(--gray-100) !important;
                background-color: var(--gray-200) !important;
                transition: background-color, color .3s;

                &:hover {
                    color: #FFFFFF !important;
                    border: 1px solid var(--gray-100) !important;
                    background-color: var(--gray-100) !important;
                }
            }
        }
    }
`
