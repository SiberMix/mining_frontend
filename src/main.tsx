import { ConfigProvider } from 'antd';
import locale from 'antd/locale/ru_RU';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next'; // Импортируем I18nextProvider

import { App, ErrorBoundary } from '~app';
import { queryClient } from '~app/model';
import { store } from '~processes/redux/store';
import i18n from './i18n'; // Импортируем конфигурацию i18n

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ConfigProvider locale={locale}>
          <I18nextProvider i18n={i18n}> {/* Оборачиваем приложение в I18nextProvider */}
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </I18nextProvider>
        </ConfigProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
