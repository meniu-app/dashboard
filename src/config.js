const enviroment = {
    env: 'development'
}

enviroment.env = process.env.REACT_APP_STAGE || 'development';

export default enviroment;