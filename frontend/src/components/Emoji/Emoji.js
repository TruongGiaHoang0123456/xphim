import { useState } from 'react'
import Picker from "emoji-picker-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Emoji.module.scss'

const cx = classNames.bind(styles)

function Emoji({ setInputValue }) {
    const [showEmoji, setShowEmoji] = useState(false);

    const onEmojiClick = (event) => {
        setInputValue((pre) => {
            return pre + event.emoji
        });
    };

    return (
        <div className={cx('wrap-emoji')}>
            <div className={cx('wrap-emoji-absolute')}>
                {showEmoji === true ?
                    (<>
                        <FontAwesomeIcon className={cx('icon-close')} icon={faXmark} onClick={() => {
                            setShowEmoji(false)
                        }} />
                        <Picker
                            onEmojiClick={onEmojiClick}
                            width={300}
                            height={382}
                            searchDisabled={false}
                            skinTonesDisabled={true}
                            lazyLoadEmojis={false}
                            skinTonePickerLocation={'PREVIEW'}
                            previewConfig={false}
                            theme='dark'
                            previewConfig={{ showPreview: false }}
                        />
                    </>)
                    :
                    <FontAwesomeIcon className={cx('icon-show-emoji')} onClick={() => {
                        setShowEmoji(true)
                    }} icon={faFaceSmile} />
                }
            </div>
        </div>
    )
}

export default Emoji;
