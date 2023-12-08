import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../reducer/userSlice';

function LoginSection() {

    // use selector
    const inforUsers = useSelector((state) => {
        return state.user.value
    })

    // use dispatch
    const dispatch = useDispatch()

    // use navigate
    const navigate = useNavigate()

    useEffect(() => {
        const decodededToken = jwtDecode(inforUsers.accestoken)

        const currentToken = new Date(decodededToken.exp * 1000).getTime()
        const currentTime = new Date().getTime()

        const id = setTimeout(() => {
            if (window.confirm('Phiên đăng nhập đã hết. Vui lòng đăng nhập lại')) {
                navigate('/log-in')
                dispatch(logout())
            } else {
                dispatch(logout())
            }
        }, currentToken - currentTime)

        return () => {
            clearTimeout(id)
        }

    }, [])

    return (
        <></>
    )
}

export default LoginSection