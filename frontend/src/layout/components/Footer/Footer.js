import styles from './Footer.module.scss'
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

function Footer({ content, children }) {
    return (
        <footer className={cx('wrap-footer')}>
            <div className='grid'>
                <div className='wide'>
                    <div className={cx('footer')}>
                        <img alt='logo' className={cx('logo')} src='/logo_footer.png' />
                        <img alt='advantaged' className={cx('ads')} src='/logo_ads.png' />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer