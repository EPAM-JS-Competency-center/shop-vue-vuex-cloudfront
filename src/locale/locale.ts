import ru from './messages/ru.json';
import en from './messages/en.json';

enum Locale {
    RU =  'RU',
    EN =  'EN',
}

const messages = {
    ru,
    en
};

export {
    messages,
    Locale
}