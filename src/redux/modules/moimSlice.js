import { createSlice } from '@reduxjs/toolkit'
import {
    moimCreateMD,
    moimReadMD,
    moimUpdateMD,
    moimDeleteMD,
    moimLikeMD,
    moimUnlikeMD,
    moimJoinMD,
    moimLeaveMD,
    moimDetailMD,
    moimReviewCreateMD,
    moimDeleteReviewMD,
    moimUpdateReviewMD,
    moimLocationMD,
} from '../async/moim'

const initialState = {
    moim_all: {},
    moim_detail: {},
    moim_ref_update: {},
    address: '',
    place: '',
}

const moimSlice = createSlice({
    name: 'moim',
    initialState: initialState,
    reducers: {
        moimUpdate: (state, action) => {
            state.moim_ref_update = action.payload
        },
        setAddress: (state, action) => {
            state.address = action.payload
            console.log('setAddress', action.payload)
        },
        setPlace: (state, action) => {
            state.place = action.payload
            console.log('setPlace', action.payload)
        },
    },
    extraReducers: {
        [moimCreateMD.fulfilled]: (state, { payload }) => {
            console.log(payload)
        },
        [moimCreateMD.rejected]: (state, { payload }) => {
            console.log(payload)
        },
        [moimReadMD.fulfilled]: (state, { payload }) => {
            console.log(payload)
            state.moim_all = payload.data.allMoims
        },
        [moimReadMD.rejected]: (state, { payload }) => {},
        [moimUpdateMD.fulfilled]: (state, { payload }) => {},
        [moimDeleteMD.fulfilled]: (state, { payload }) => {
            console.log('<<', state.moim_all)
            const ref_moim_post = state.moim_all.filter(
                (post) => post.id !== payload
            )
            state.moim_all = ref_moim_post
        },
        [moimDetailMD.fulfilled]: (state, { payload }) => {
            state.moim_detail = payload.data.targetMoim
            console.log(payload)
        },
        [moimLikeMD.fulfilled]: (state, { payload }) => {
            console.log('><>', payload)
            const likeUser = payload.data.msg.slice(0, 1)
            state.moim_detail.Likes.push({ userId: Number(likeUser) })
        },
        [moimUnlikeMD.fulfilled]: (state, { payload }) => {
            const likeUser = state.moim_detail.Likes
            const unlikeUser = payload.data.msg.slice(0, 1)
            const result = state.moim_detail.Likes.filter(
                (likeUser) => likeUser.userId !== Number(unlikeUser)
            )
            state.moim_detail.Likes = result
        },
        [moimJoinMD.fulfilled]: (state, { payload }) => {
            state.moim_detail.MoimUsers.push({
                User: { nickName: payload.nickName },
            })
        },
        [moimLeaveMD.fulfilled]: (state, { payload }) => {
            const refUser = payload.user
            const moimUsers = state.moim_detail.MoimUsers.filter(
                ({ User }) => User.nickName
            )
            const result = moimUsers.filter(
                ({ User }) => User.nickName !== refUser
            )
            state.moim_detail.MoimUsers = result
        },
        [moimReviewCreateMD.fulfilled]: (state, { payload }) => {
            console.log(payload)
            state.moim_detail.Comments.push({
                contents: payload.data.contents,
                id: payload.response.data.newCommentId,
                User: { nickName: payload.data.writer },
            })
        },
        [moimDeleteReviewMD.fulfilled]: (state, { payload }) => {
            const refReviews = state.moim_detail.Comments.filter(
                (comment) => comment.id !== payload.reviewId
            )
            state.moim_detail.Comments = refReviews
        },
        [moimUpdateReviewMD.fulfilled]: (state, { payload }) => {
            const refIdx = state.moim_detail.Comments.findIndex(
                (comment) => comment.id === payload.commentId
            )
            state.moim_detail.Comments[refIdx].contents = payload.contents
        },
        [moimLocationMD.fulfilled]: (state, { payload }) => {
            console.log('>>>>><', payload)
        },
    },
})

//* reducer export
export const { moimUpdate, setAddress, setPlace } = moimSlice.actions

//* slice export
export default moimSlice
