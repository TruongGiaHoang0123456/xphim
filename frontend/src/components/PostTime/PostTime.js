import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
momentDurationFormatSetup(moment)

const PostTime = (time) => {
    let start = time === false ? moment() : moment(`${time}`);
    const end = moment();

    const diff = end.diff(start, 'days')

    switch (true) {
        case diff === 0:
            const diffSeconds = end.diff(start, 'seconds')
            if (diffSeconds < 60) {
                return diffSeconds + ' giây trước'
            } else if (diffSeconds < 3600) {
                return end.diff(start, 'minutes') + ' phút trước'
            } else if (diffSeconds < 86400) {
                return end.diff(start, 'hours') + ' giờ trước'
            } else {
                return '1 giây trước'
            }
        // break;
        case diff < 8:
            return diff + ' ngày trước'
        // break;
        case diff < 31:
            return end.diff(start, 'weeks') + ' tuần trước'
        // break;
        case diff < 365:
            return end.diff(start, 'months') + ' tháng trước'
        // break;
        case diff >= 365:
            return start.format('DD/MM/YYYY')
        // break;
        default:
            console.log('sai')
    }
}

export default PostTime