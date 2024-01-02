import classNames from 'classnames/bind';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Paginate.module.scss'
import InforMovie from '../../components/InforMovie/InforMovie';
import Topic from '../Topic/Topic';
import TopMovie from '../TopMovie/TopMovie';

let cx = classNames.bind(styles);

function Paginate({ itemsPerPage = 30, topMovie = true, items, topic = 'Phim sex mới cập nhật' }) {
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
            <div className={`row ${cx('list-film')}`}>
                {currentItems?.map((item, index) => (
                    <div key={item.id} className={`${topMovie ? 'l-3' : 'l-2-4'} t-3 m-6 ${cx('list-film-item')}`}>
                        <InforMovie key={index}
                            src={item.image}
                            name={item.name}
                            slug={item.slug}
                            likes={item.likes}
                            views={item.views}
                            onClick={() => {
                                window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
                            }}
                        />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={cx('home-body')}>
            {/* list-movie */}
            <div className={`row ${cx('wrap-home-body')}`}>
                <div className={topMovie ? 'l-8-5 t-12 m-12' : 'l-12 t-12 m-12'}>
                    <div className={cx('wrap-topic')}>
                        < Topic mw0={true} mh0={true} content={topic} />
                    </div>
                    <Items currentItems={currentItems} />
                </div>

                {/* top movie */}
                <div className={`${topMovie ? 'l-3-5 hide-on-m-t' : 'hide-on-m-t hide-on-ps-pl'} ${cx('wrap-top-movie')}`}>
                    <TopMovie />
                </div>
            </div>


            <div className={`hide-on-m-t ${cx('container-pagignate')}`}>
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