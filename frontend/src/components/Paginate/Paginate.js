import classNames from 'classnames/bind';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Paginate.module.scss'
import InforMovie from '../../components/InforMovie';
import Topic from '../Topic';
import TopMovie from '../TopMovie';

let cx = classNames.bind(styles);

function Paginate({ itemsPerPage = 30, items }) {
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // handle click
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;

        setItemOffset(newOffset);
    };

    // render item
    function Items({ currentItems }) {
        return (
            <div className={cx('wrap-list-film')}>
                <div className={`row-hidden-col ${cx('list-film')}`}>
                    {currentItems &&
                        currentItems.map((item, index) => (
                            <InforMovie key={index}
                                src={item.image}
                                name={item.name}
                                id={item.id}
                                onClick={() => {
                                    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
                                }}
                                currentEpisode={item.current_episode}
                                numberEpisodes={item.number_episodes}
                                mediumPoint={item.medium_point}
                            />
                        ))
                    }
                </div>
            </div >
        );
    }

    return (
        <div className={cx('home-body')}>
            {/* list-movie */}
            <div className='row-m-0'>
                <div className='col-16 l-8-5'>
                    <div className={cx('home-list-movie')}>
                        < Topic mw0={true} mh0={true} content='Phim sex mới cập nhật' />

                        <div >
                            <Items currentItems={currentItems} />
                        </div>
                    </div>
                </div>

                {/* top movie */}
                <div className='col-16 l-3-5'>

                    <TopMovie />
                </div>
            </div>


            <div className={cx('container-pagignate')}>
                <ReactPaginate
                    breakLabel={false}
                    onPageChange={handlePageClick}
                    marginPagesDisplayed={0}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="Đầu"
                    renderOnZeroPageCount={null}
                    breakClassName={cx('break')}
                    containerClassName={cx('pagignate')}
                    pageClassName={cx('list')}
                    previousClassName={cx('previous')}
                    nextClassName={cx('next')}
                    activeClassName={cx('active')}
                    disabledLinkClassName={cx('disabled')}
                    // itemsCountPerPage={1}
                    nextLabel={'Cuối'}
                />
            </div>
        </div>

    );
}

export default Paginate