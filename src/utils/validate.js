
export const validate = (email,password) => {
    const isEmailValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    const isPasswordValid = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);
    
  
    
    if(!isEmailValid) return "Please Enter Valid Email";
    if(!isPasswordValid) return "Please Enter Valid Password";
    return null;

}
