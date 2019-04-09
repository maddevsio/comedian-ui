export const save = (name, state) => {
    let res;
    try {
        res = JSON.stringify(state)
    } catch (e) {
        res = null
    }
    window.localStorage.setItem(name, res)
}

export const get = (name) => {
    const jsonState = window.localStorage.getItem(name)
    try {
        return JSON.parse(jsonState)
    } catch (e) {
        return null
    }
}
