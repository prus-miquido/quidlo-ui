const
    LSset = (key, value) => {
        const db = JSON.parse(window.localStorage.getItem('formPersistance')) || {};
        db[key] = value;
        window.localStorage.setItem('formPersistance', JSON.stringify(db));
    },
    LSget = key => {
        const db = JSON.parse(window.localStorage.getItem('formPersistance')) || {};
        return db[key];
    };

export default {
    LSset,
    LSget
};
