import styles from './Footer.module.scss'
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

function Footer({ content, children }) {

    return (
        <footer className={cx('wrap-footer')}>
            <div className='grid'>
                <div className='wide'>
                    <div className={cx('footer-wrap-content')}>
                        <p >
                            Sex Color là một trang web giải trí phù hợp với lứa tuổi 18+ giúp xã street hiệu hả.
                            Nhưng phải biết chừng mực tránh làm dụng ảnh hưởng đến sức khỏe của bản thân và hạnh
                            phúc của gia đình.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer