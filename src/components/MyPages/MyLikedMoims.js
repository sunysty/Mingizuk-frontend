import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { history } from '../../redux/store'

import styled from 'styled-components'
import Icon from '../icons/Icon'

import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'

import { Text } from '../../elements/index'
import { NavBar } from '../index'
import { myMoimLikeMD } from '../../redux/async/myMoim'

const MyLike = () => {
    const dispatch = useDispatch()
    const like_list = useSelector((state) => state.myMoim.my_like)
    console.log('>>>', like_list)
    console.log

    React.useEffect(() => {
        dispatch(myMoimLikeMD())
    }, [])

    // 모임좋아요기능 끝나면, 마이모임좋아요기능 추가하기!
    return (
        <>
            <section className="mymoim-contents">
                {like_list?.map((i, idx) => (
                    <div
                        className="postbox"
                        onClick={() => {
                            history.push(`/moim/detail/${i?.moimId}`)
                        }}
                        key={idx}
                    >
                        <div className="contentsbox">
                            <span className="location">위치!!!!!!</span>
                            <div className="titlebox">
                                <span className="title">{i?.Moim?.title}</span>
                            </div>

                            <div className="etcbox">
                                <div>
                                    <span className="writer">
                                        작성자{' '}
                                        {/* {i?.Moim.MoimUsers[0]?.User?.nickName} */}
                                    </span>
                                    <span className="date">
                                        {i?.Moim?.createdAt?.split(['T'])[0]}
                                    </span>
                                </div>
                                <span className="join">
                                    <PersonOutlineIcon />
                                    {/* {i?.Moim?.MoimUsers?.length} */}
                                </span>
                            </div>
                        </div>
                        <div className="commentbox">
                            <div>
                                <FavoriteBorderIcon />
                                좋아요 {i?.Moim?.Likes?.length}
                            </div>
                            <div>
                                <ChatBubbleOutlineIcon />
                                댓글 {i?.Moim?.Comments?.length}개
                            </div>
                        </div>
                    </div>
                ))}
            </section>
            <NavBar />
        </>
    )
}

export default MyLike
