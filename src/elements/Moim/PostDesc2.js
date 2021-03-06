import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { history } from '../../redux/store'

//* component
import Icon from '../../components/icons/Icon'
import LikeBtn from '../../elements/Moim/LikeBtn'

// * date
import 'moment/locale/ko'
import moment from 'moment'
import { set } from 'date-fns'

// * middleware
import {
    moimLocationMD,
    moimScrollMD,
    moimLocationScrollMD,
} from '../../redux/async/moim'

// * style
import '../../styles/moim/moim-main.scss'

const PostDesc = () => {
    const dispatch = useDispatch()

    const [posts, setPosts] = useState('')
    const post_data_all = useSelector((state) => state.moim.moim_all)
    const loginuserID = useSelector((state) => state.user.userInfo.userID)

    // Filter - Location
    const locations = {
        지역: [
            '서울',
            '부산',
            '인천',
            '대구',
            '대전',
            '광주',
            '울산',
            '세종',
            '제주',
            '경기도',
            '강원도',
            '충청북도',
            '충청남도',
            '경상북도',
            '경상남도',
            '전라북도',
            '전라남도',
        ],
        서울: [
            '강남구',
            '강동구',
            '강북구',
            '강서구',
            '관악구',
            '광진구',
            '구로구',
            '금천구',
            '노원구',
            '도봉구',
            '동대문구',
            '동작구',
            '마포구',
            '서대문구',
            '서초구',
            '성동구',
            '성북구',
            '송파구',
            '양천구',
            '영등포구',
            '용산구',
            '은평구',
            '종로구',
            '중구',
            '중랑구',
        ],
        부산: [
            '강서구',
            '금정구',
            '남구',
            '동구',
            '동래구',
            '부산진구',
            '북구',
            '사상구',
            '사하구',
            '서구',
            '수영구',
            '연제구',
            '영도구',
            '중구',
            '해운대구',
        ],
        인천: [
            '중구',
            '동구',
            '미추홀구',
            '연수구',
            '남동구',
            '부평구',
            '계양구',
            '서구',
        ],
        대구: ['남구', '달서구', '동구', '북구', '서구', '수성구', '중구'],
        대전: ['대덕구', '동구', '서구', '유성구', '중구'],
        광주: ['광산구', '남구', '동구', '북구', '서구'],
        울산: ['남구', '동구', '북구', '중구'],
        세종: ['세종시'],
        제주: ['서귀포시', '제주시'],
        경기도: [
            '수원시',
            '성남시',
            '의정부시',
            '안양시',
            '부천시',
            '광명시',
            '동두천시',
            '평택시',
            '안산시',
            '고양시',
            '과천시',
            '구리시',
            '남양주시',
            '오산시',
            '시흥시',
            '군포시',
            '의왕시',
            '하남시',
            '용인시',
            '파주시',
            '이천시',
            '안성시',
            '김포시',
            '화성시',
            '광주시',
            '양주시',
            '포천시',
            '여주시',
        ],
        강원도: [
            '춘천시',
            '원주시',
            '강릉시',
            '동해시',
            '태백시',
            '속초시',
            '삼척시',
        ],
        충청북도: ['청주시', '충추시', '제천시'],
        충청남도: [
            '천안시',
            '공주시',
            '보령시',
            '아산시',
            '서산시',
            '논산시',
            '계룡시',
            '당진시',
        ],
        경상북도: [
            '포항시',
            '경주시',
            '김천시',
            '안동시',
            '구미시',
            '영주시',
            '영천시',
            '상주시',
            '문경시',
            '경산시',
        ],
        경상남도: [
            '창원시',
            '통영시',
            '사천시',
            '진주시',
            '김해시',
            '밀양시',
            '거제시',
            '양산시',
        ],
        전라북도: [
            '전주시',
            '완산구',
            '덕진구',
            '군산시',
            '익산시',
            '정읍시',
            '남원시',
            '김제시',
        ],
        전라남도: ['목포시', '여수시', '순천시', '나주시', '광양시'],
    }

    const [liked, setLiked] = useState('')
    const [latest, setLatest] = useState('')
    const [location1, setLocation1] = useState('')
    const [location2, setLocation2] = useState('')
    const [filterState, setFilterState] = useState(false)
    const [filterTextState, setFilterTextState] = useState(false)

    // * infinite-scroll data
    const { last, moreMoims, result } = useSelector(
        (state) => state.moim.moim_scroll
    )
    const filter = useSelector((state) => state.moim.moim_filter_scroll)

    // * moim filter data(구버전)
    const locationfilter = location1 + ' ' + location2
    const filter_data_all = useSelector((state) => state.moim.filter)

    const sortarr = () => {
        let temp = [...posts]
        temp.sort(function (a, b) {
            return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
        })
        setPosts(temp)
    }

    React.useEffect(() => {
        // * infinite-scroll

        const onScroll = () => {
            if (
                window.scrollY + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 10
            ) {
                if (!last && result && moreMoims) {
                    dispatch(moimScrollMD(moreMoims[2].id))
                }
            }
            window.addEventListener('scroll', scroll)
            return () => {
                window.removeEventListener('scroll', onScroll)
            }
        },[last, result, moreMoims]
/*
        setPosts(post_data_all)
        posts

        if (filter_data_all?.length > 0) {
            sortarr(posts)
            setPosts(filter_data_all)
        } else if (filter_data_all?.length == 0) {
            setPosts(post_data_all)
        }
    
    }, [post_data_all, filter_data_all])
*/
},  [mainPosts, hasMorePosts, listPostLoading]);
    const handleClickLocationFilterButton = () => {
        dispatch(moimLocationMD(locationfilter))
        setFilterState(false)
        setPosts(filter_data_all)
    }


    return (
        <>
            <button
                onClick={() => {
                    dispatch(moimScrollMD(5))
                   
                }}
            >
                test
            </button>
            {/* ******** FILTER ****** */}
            <div className="filters-container">
                <div className="location-filter-container">
                    {filterState ? (
                        <button
                            className="location-filter-btn"
                            onClick={() => {
                                setFilterTextState(false)
                                setFilterState(false)
                            }}
                        >
                            <Icon icon="place" size="20px" color="#a5abb0" />
                            위치필터
                        </button>
                    ) : (
                        <button
                            className="location-filter-btn"
                            onClick={() => {
                                setFilterTextState(true)
                                setFilterState(true)
                            }}
                            style={{ color: '#6B76FF' }}
                        >
                            <Icon icon="place" size="20px" color="#6B76FF" />
                            {filterTextState === false
                                ? `위치필터`
                                : `${location1} ${location2}`}
                        </button>
                    )}

                    {filterState && (
                        <div className="location-select-container">
                            <select
                                className="location-select"
                                onChange={(e) => setLocation1(e.target.value)}
                            >
                                <option selected>선택하세요</option>
                                {locations['지역']?.map((e, idx) => (
                                    <option key={idx} value={e}>
                                        {e}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="location-select"
                                onChange={(e) => setLocation2(e.target.value)}
                            >
                                <option selected>선택하세요</option>

                                {locations[location1]?.map((e, idx) => (
                                    <option key={idx} value={e}>
                                        {' '}
                                        {e}
                                    </option>
                                ))}
                            </select>
                            <button onClick={handleClickLocationFilterButton}>
                                적용
                            </button>
                        </div>
                    )}
                </div>

                <button
                    className="latest-filter-btn filter-btn"
                    onClick={() => {
                        sortarr()
                    }}
                >
                    최신순
                </button>

                <button
                    className="liked-filter-btn filter-btn"
                    onClick={() => {
                        let temp = [...posts]
                        temp.sort(function (a, b) {
                            return b.Likes.length - a.Likes.length
                        })
                        setPosts(temp)
                    }}
                >
                    좋아요순
                </button>
            </div>

            {/* ******** POST ********* */}
            {posts?.length > 0 &&
                posts?.map((el, idx) => (
                    <div key={idx} className="post-warp">
                        {el?.imgSrc === null ? (
                            <div
                                className="moim-post-box"
                                onClick={() => {
                                    history.push(`/moim/detail/${el?.id}`)
                                }}
                            >
                                <div className="post-info">
                                    <p className="location">
                                        <Icon
                                            icon="place"
                                            size="20px"
                                            color="#6B76FF"
                                        />
                                        {el?.location?.split(' ')[0]}{' '}
                                        {el?.location?.split(' ')[1]}{' '}
                                        {el?.location?.split(' ')[2]}{' '}
                                    </p>
                                    <span className="location">
                                        <Icon
                                            icon="user-person"
                                            size="20px"
                                            color="#A5ABB0"
                                        />
                                        {el?.MoimUsers?.length}
                                    </span>
                                </div>
                                <span className="title">{el?.title}</span>

                                <div className="post-info">
                                    <span>
                                        {el?.MoimUsers[0]?.User?.nickName}
                                    </span>
                                    <span>
                                        {moment(el?.createdAt).fromNow()}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="moim-post-box"
                                onClick={() => {
                                    history.push(`/moim/detail/${el?.id}`)
                                }}
                            >
                                <div className="post-info">
                                    <p className="location">
                                        <Icon
                                            icon="place"
                                            size="20px"
                                            color="#6B76FF"
                                        />
                                        {el?.location?.split(' ')[0]}{' '}
                                        {el?.location?.split(' ')[1]}{' '}
                                        {el?.location?.split(' ')[2]}{' '}
                                    </p>
                                    <span className="location">
                                        <Icon
                                            icon="user-person"
                                            size="20px"
                                            color="#A5ABB0"
                                        />
                                        {el?.MoimUsers?.length}
                                    </span>
                                </div>
                                <p className="title">{el?.title}</p>
                                <div className="imgbox">
                                    <img src={el.imgSrc} />
                                </div>
                                <div className="post-info">
                                    <span>
                                        {el?.MoimUsers[0]?.User?.nickName}
                                    </span>
                                    <span>
                                        {moment(el?.createdAt).fromNow()}
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="ectbox">
                            <div className="icon-text">
                                {/*
                                좋아요 클릭한 애들만 색 바꿈 
                                {el?.Likes?.findIndex(
                                    (user) => user?.userId === loginuserID
                                ) === -1 ? (
                                    <Icon
                                        icon="heart"
                                        size="1rem"
                                        color="lightgray"
                                    />
                                ) : (
                                    <Icon
                                        icon="heart"
                                        size="1rem"
                                        color="#FD8787"
                                    />
                                )} */}
                                {/* 
                                좋아요 클릭시 색 바꿈 ===> push 에러떠서 안돼!!!!!!
                                <LikeBtn
                                    moim_id={el?.id}
                                    likeUsers={el?.Likes}
                                    user_id={el?.user_id}
                                /> */}
                                <span>
                                    좋아요
                                    {el?.Likes?.length}개
                                </span>
                            </div>
                            <div className="icon-text">
                                <Icon
                                    icon={'message'}
                                    size="20px"
                                    color="#A5ABB0"
                                />
                                <span>댓글{el?.Comments?.length}개</span>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    )
}

export default PostDesc
