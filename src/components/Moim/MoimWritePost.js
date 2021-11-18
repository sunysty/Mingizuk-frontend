/*global kakao*/
import React, { useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { moimCreateMD } from '../../redux/async/moim'
import config from '../../shared/aws_config'
import { uploadFile } from 'react-s3'
import { history } from '../../redux/store'
import Icon from '../icons/Icon'

const MoimWritePost = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = React.useState('')
    const [contents, setContents] = React.useState('')
    const [selectedFile, setSelectedFile] = React.useState(null)
    const [startDate, setStartDate] = React.useState(new Date())
    const [endDate, setEndDate] = React.useState(new Date())
    const [map, setMap] = React.useState('위치를 선택해주세요')

    const getAddress = useSelector((state) => state.moim.address)
    const getPlace = useSelector((state) => state.moim.place)
    console.log('왜 안들어와', getAddress, getPlace)

    // * upload S3
    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0])
    }
    const handleUpload = async (file) => {
        if (selectedFile !== null) {
            uploadFile(file, config)
                .then((data) => {
                    const req = {
                        title,
                        contents,
                        imgSrc: data.location,
                        startAt: startDate,
                        finishAt: endDate,
                        location: `${getAddress}${getPlace}`,
                    }
                    dispatch(moimCreateMD(req))
                })
                .catch((err) => console.error(err))
        } else return
    }
    console.log('<<<', `${getAddress}${getPlace}`)

    const upload = () => {
        if (selectedFile !== null) {
            handleUpload(selectedFile)
        } else {
            const req = {
                title,
                contents,
                imgSrc: null,
                startAt: startDate,
                finishAt: endDate,
                location: `${getAddress}${getPlace}`,
            }
            dispatch(moimCreateMD(req))
        }
    }

    return (
        <>
            <section className="moim-post">
                <h4 className="post-subtitle">모임 제목</h4>
                <input
                    className="moim-post"
                    placeholder="모임 제목을 입력하세요. (ex. 한강 러닝 모집)"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <h4 className="post-subtitle">모임 내용</h4>
                <textarea onChange={(e) => setContents(e.target.value)} />
                <h4 className="post-subtitle">모임 위치 설정</h4>
                <button
                    className="map-btn"
                    onClick={() => {
                        history.push('/moim/map')
                    }}
                >
                    <Icon icon={'create'} size={13} />
                    {getPlace
                        ? `${getPlace} - ${getAddress}`
                        : '위치를 선택해주세요'}
                </button>
                <h4 className="post-subtitle">모임 기간 설정</h4>
                <div className="date-container">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                    />
                </div>
                <h4 className="post-subtitle">이미지 첨부</h4>
                <label className="image-input" htmlFor="image">
                    +
                </label>
                <input
                    id="image"
                    type="file"
                    onChange={handleFileInput}
                    style={{ display: 'none' }}
                />
                <p>
                    모임 모집에 적합한 이미지만 올려주세요.
                    <br />
                    이미지는 <span>최대 1장</span>만 등록 가능합니다.
                </p>
            </section>
            <button className="submit-btn" onClick={() => upload()}>
                완료
            </button>
        </>
    )
}

export default MoimWritePost
