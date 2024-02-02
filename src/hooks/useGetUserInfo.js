export const useGetUserInfo = () => {
    const {name, profphoto,userID , isAuth} = 
    JSON.parse(
        localStorage.getItem("Auth") || {}
        );

    return{name, profphoto, userID, isAuth};
};