export const setAccessToken = (token) => {
    try {
        localStorage.setItem('ACCESS_TOKEN', token)
    } catch (error) {
        console.error(error);
    }
}

export const getAccessToken = () => {
    try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        return token;
    } catch (error) {
        return undefined;
    }
}

export const setRefreshToken = (token) => {
    try {
        localStorage.setItem('REFRESH_TOKEN', token)
    } catch (error) {
        console.error(error);
    }
}

export const getRefreshToken = () => {
    try {
        const token = localStorage.getItem('REFRESH_TOKEN');
        return token;
    } catch (error) {
        return undefined;
    }
}

export const removeTokens = () => {
    try {
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
    } catch (error) {
        console.error(error);
    }
}

export const setUser = (user) => {
    try {
        localStorage.setItem('USER', JSON.stringify(user));
    } catch (error) {
        console.error(error);
    }
}

export const getUser = () => {
    try {
        const user = localStorage.getItem('USER');
        return JSON.parse(user);
    } catch (error) {
        return undefined;
    }
}

export const removeUser = () => {
    try {
        localStorage.removeItem('USER');
    } catch (error) {
        console.error(error);
    }
}