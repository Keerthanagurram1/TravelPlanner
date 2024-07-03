const CheckValidate =(email,password)=>{
    const validEmail= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const validPassword=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

if(!validEmail) return "Enter Valid Email Id";
if(!validPassword) return "Enter Valid Password";

return null
};
export default CheckValidate;