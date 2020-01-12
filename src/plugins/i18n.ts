import Vue from 'vue';
import VueI18n, {LocaleMessageObject} from 'vue-i18n';

const numberFormats = {
    en: {
        currency: {
            style: 'currency', currency: 'USD',
        },
        crypto: {
            style: 'decimal',
            maximumFractionDigits: 4,
        },
        cryptoFull: {
            style: 'decimal',
            maximumFractionDigits: 18,
        },
        decimalShort: {
            style: 'decimal',
            maximumFractionDigits: 2,
        },
    },
};

Vue.use(VueI18n);

function loadLocaleMessages() {
    const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
    const messages: { [key: string]: LocaleMessageObject; } = {};
    locales.keys().forEach((key) => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key);
        }
    });

    return messages;
}

export default new VueI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || 'en',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
    messages: loadLocaleMessages(),
    numberFormats,
});
