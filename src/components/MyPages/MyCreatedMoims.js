import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { history } from '../../redux/store'
import styled from 'styled-components'
import Icon from '../icons/Icon'

import { Text } from '../../elements/index'
import { NavBar } from '../index'
import { myMoimCreateMD } from '../../redux/async/myMoim'

const MyCreatedMoims = () => {
    const dispatch = useDispatch()
    const create_list = useSelector((state) => state.myMoim.my_moim)

    console.log(create_list, 'createlist?????')
    useEffect(() => {
        dispatch(myMoimCreateMD())
    }, [])

    return (
        <>
            <section className="mymoim-contents">
                {create_list?.map((i, idx) => (
                    <div
                        className="postbox"
                        onClick={() => history.push(`/moim/detail/${i.moimId}`)}
                    >
                        <div className="titlebox" key={idx}>
                            <div>
                                <span className="location">{}</span>
                                <span className="title">{i?.Moim?.title}</span>
                                <span className="date">{i?.createdAt?.split(['T'])[0]}</span>
                            </div>
                        </div>
                        <div className="ectbox">
                            <div className="smallbox">
                                <Icon icon={'favorite'} size="20px" />
                                좋아요 {(i?.Moim?.Likes).length}
                            </div>
                            <div className="">
                                <Icon icon={'message'} size="20px" />
                                댓글 {(i?.Moim?.Comments).length}개
                            </div>
                        </div>
                    </div>
                ))}
                <NavBar />
            </section>
        </>
    )
}

const TitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px;
`

const PostBox = styled.div`
    margin: 5vw auto;
    width: 90vw;
    height: auto;
    border: 1px solid #c4c4c4;
    position: relative;
`
const SmallBox = styled.div`
    display: flex;
    height: inherit;
    margin: 0 10px 0;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    color: #8f8f8f;
`

const EtcBox = styled.div`
    display: flex;
    flex-direction: row;
    text-align: left;
    width: 90vw;
    height: 45px;
    border-bottom: 1px solid lightgray;
    border-top: 1px solid lightgray;
`

export default MyCreatedMoims
