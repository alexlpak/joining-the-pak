const baseURL = `https://joining-the-pak.herokuapp.com`;

export const validatePasscode = async (passcode: string) => {
    return await fetch(`${baseURL}/validate-key?key=${window.btoa(passcode)}`).then(res => res.json());
};