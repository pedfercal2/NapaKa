import { useState } from "react";

// Elemento personalizado para los inputs de el formulario de inicio de sesión y de registro
const InputField= ({ref, type, placeholder, icon}) =>{
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    return (
        <div className="input-wrapper">
          <input ref={ref} type={isPasswordShown ? 'text' : type} placeholder={placeholder} className="input-field" required />
          <i className="material-symbols-outlined">{icon}</i>
          {type === 'password' && (
            <i onClick={()=>setIsPasswordShown(prevState => !prevState)} className="material-symbols-outlined eye-icon">
                {isPasswordShown ? 'visibility' : 'visibility_off'}
            </i>
          )}
        </div>
    )
}

export default InputField;