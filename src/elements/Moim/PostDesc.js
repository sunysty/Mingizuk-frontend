import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { history } from '../../redux/store'
import Icon from '../../components/icons/Icon'
import 'moment/locale/ko'
import moment from 'moment'
import Filter from '../../components/Filter'
import { queryGet } from '../../shared/api'

const PostDesc = () => {
    const loginuserID = useSelector((state) => state.user.userInfo.userID)
    const usePostListQuery = () => {
        return queryGet('POST_LIST_ALL', '/api/moims')
    }
    const { data } = usePostListQuery()
    const post_data_all = data?.allMoims
    const dispatch = useDispatch()
    const [posts, setPosts] = useState(post_data_all)
    const handleClickLike = () => {
        setPosts(
            post_data_all
                .sort((postA, postB) => postB.Likes.length - postA.Likes.length)
                .slice()
        )
    }
    const handleClickLastestOrderButton = () => {
        setPosts(
            post_data_all
                .sort(
                    (postA, postB) =>
                        moment(postB.createdAt) - moment(postA.createdAt)
                )
                .slice()
        )
    }

    console.log('render')

    return (
        <>
            <div>
                <Filter />
                <button onClick={handleClickLike}>좋아요순</button>
                <button onClick={handleClickLastestOrderButton}>최신순</button>
            </div>

            {posts?.length > 0 &&
                posts?.map((data, idx) => (
                    <div key={idx} className="post-warp">
                        {data?.imgSrc === null ? (
                            <div
                                className="moim-post-box"
                                onClick={() => {
                                    history.push(`/moim/detail/${data?.id}`)
                                }}
                            >
                                <div className="post-info">
                                    <span className="location">
                                        {data?.location?.split(' ')[0]}{' '}
                                        {data?.location?.split(' ')[1]}
                                    </span>
                                    <span className="moimuser">
                                        참여자 {data?.MoimUsers?.length}명
                                    </span>
                                </div>
                                <span className="title">{data?.title}</span>
                                <p className="content">{data?.contents}</p>
                                <div className="post-info">
                                    <span>
                                        {data?.MoimUsers[0]?.User?.nickName}
                                    </span>
                                    <span>
                                        {moment(data?.createdAt).fromNow()}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="moim-post-box"
                                onClick={() => {
                                    history.push(`/moim/detail/${data?.id}`)
                                }}
                            >
                                <div className="post-info">
                                    <p className="location">
                                        {data?.location?.split(' ')[0]}{' '}
                                        {data?.location?.split(' ')[1]}
                                    </p>
                                    <span>
                                        참여자 {data?.MoimUsers?.length}명
                                    </span>
                                </div>
                                <p className="title">{data?.title}</p>
                                <div className="imgbox">
                                    <img src={data.imgSrc} />
                                </div>
                                <div className="post-info">
                                    <span>
                                        {data?.MoimUsers[0]?.User?.nickName}
                                    </span>
                                    <span>
                                        {moment(data?.createdAt).fromNow()}
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="ectbox">
                            <div className="icon-text">
                                {data?.Likes?.findIndex(
                                    (user) => user?.userId === loginuserID
                                ) === -1 ? (
                                    <Icon
                                        icon="heart"
                                        size="20px"
                                        color="lightgray"
                                    />
                                ) : (
                                    <Icon
                                        icon="heart"
                                        size="20px"
                                        color="red"
                                    />
                                )}
                                <span>
                                    좋아요
                                    {data?.Likes?.length}개
                                </span>
                            </div>
                            <div className="icon-text">
                                <Icon
                                    icon={'message'}
                                    size="20px"
                                    color="#A5ABB0"
                                />
                                <span>댓글{data?.Comments?.length}개</span>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    )
}

export default PostDesc
