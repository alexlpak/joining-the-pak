const baseURL = `https://joining-the-pak.herokuapp.com`;

export const validatePasscode = async (passcode: string) => {
    return await fetch(`${baseURL}/validateKey?key=${window.btoa(passcode)}`).then(res => res.json());
};