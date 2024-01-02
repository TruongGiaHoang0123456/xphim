import classNames from 'classnames/bind';

import styles from './TestPage.module.scss';

let cx = classNames.bind(styles);

const Test = () => {
  return (
    <div className={cx('wrap-box')}>
      <div className={cx('box1')}>
        <div>box1</div>
        <div>box2</div>
      </div>
    </div>
  )
}

export default Test