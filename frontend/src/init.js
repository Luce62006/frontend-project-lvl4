import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import Login from './components/login';
import resources from './locales';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <I18nextProvider i18n={i18n}>
      <Login />
    </I18nextProvider>
  );
};

export default init;
