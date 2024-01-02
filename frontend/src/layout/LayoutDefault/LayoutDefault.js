import styles from './LayoutDefault.module.scss'
import classNames from 'classnames/bind';

import Header from '../components/Header/Header'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

let cx = classNames.bind(styles);

function LayoutDefault({ children }) {
    return (
        <div className={cx('layout-default')} >
            {/* header */}
            <Header />
            <Navbar />

            <div className={cx('wrap-body')}>
                <div className='grid'>
                    <div className='wide'>
                        <div className={cx('body')}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>

            {/* footer */}
            <Footer />
        </div>
    )
}

export default LayoutDefault