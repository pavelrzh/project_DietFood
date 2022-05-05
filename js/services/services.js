const postData = async (url, data) => {                     // отвечает за постинг данных на сервер
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
            },
        body: data,
    });
    return await res.json();
};         

const getResource = async (url) => {                     // отвечает за (GET) получение данных (MenuCard) с сервера
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status} `);
    }
    return await res.json();
};        


export {postData};
export {getResource};