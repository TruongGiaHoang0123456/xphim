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
                            SEXTOP1 là trang web phim sex chỉ dành cho các bạn trên 20 tuổi, xem phim JAV chỉ để giải trí, giải tỏa nhu cầu sinh lý, không bắt chước theo phim, tránh vi phạm pháp luật.
                            Copyright 2023 © SEXTOP1.NET All rights reserved | Sitemap | vlxx
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer