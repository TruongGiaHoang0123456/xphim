import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Topic.module.scss'
import classNames from 'classnames/bind';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

let cx = classNames.bind(styles);

function Topic({ content = '???', mw0 = false, mh0 = false, icon, mc }) {
    const classes = cx('wrap-topic', {
        'm-w-0': mw0,
        'm-h-0': mh0,
    })

    const classes2 = cx('topic', {
        'm-c': mc,
    })

    return (
        <div className={classes}>
            <div className={classes2}>
                <span className={cx('title')}>{content}</span>
                {
                    icon ?
                        icon
                        :
                        <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
                }
            </div>
        </div>
    )
}

export default Topic