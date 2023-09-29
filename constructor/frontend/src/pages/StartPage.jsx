import React, {useState} from 'react';
import MyButton from '../components/UI/MyButton/MyButton';

const StartPage = ({setIsAuth}) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const onLogin = (email, password) => {
        setIsAuth(true)
    }

    return (
        <div className='d-flex justify-content-center mt-lg-5'>
            <form className="align-middle w-25 p-5">
                <div className="form-outline mb-2">
                    <input onChange={e => setEmail(e.target.value)} type="email" id="form2Example1" className="form-control"/>
                    <label className="form-label" htmlFor="form2Example1">Почта</label>
                </div>

                <div className="form-outline mb-4">
                    <input onChange={e => setPassword(e.target.value)} type="password" id="form2Example2" className="form-control"/>
                    <label className="form-label" htmlFor="form2Example2">Пароль</label>
                </div>

                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                            <label className="form-check-label" htmlFor="form2Example31"> Запомнить меня </label>
                        </div>
                    </div>

                    <div className="col">
                        <a href="#">Забыли пароль?</a>
                    </div>
                </div>
                <MyButton  type="button"
                    className="btn btn-primary btn-block mb-4"
                    onClick={() => onLogin(email, password)}> Войти </MyButton>
            </form>
        </div>
    )
}

export default StartPage;
