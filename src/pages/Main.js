import React from 'react'
import {
    FlexRow,
    FlexColumn,
    SubTitle,
    ButtonOutlined,
    Text,
} from '../elements/index'
import {
    CharacterModal,
    CompleteActionModal,
    Header,
} from '../components/index'
import Icon from '../components/icons/Icon'
import { history } from '../redux/store'
import { useSelector, useDispatch } from 'react-redux'

import { loginCheckMD } from '../redux/async/user'
import { getMainRoutineMD } from '../redux/async/routine'
import Time from '../elements/Time'
import styled from 'styled-components'
import HabitTrakerV2 from '../components/HabitTrakerV2'
import { chageMyHabitModal } from '../redux/modules/routineSlice'

const Main = (props) => {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(loginCheckMD())
        dispatch(getMainRoutineMD())
    }, [])

    const is_login = useSelector((state) => state.user.isLogin)
    const mainRoutine = useSelector((state) => state.setAction.mainRoutine)
    console.log('메인루틴', mainRoutine)
    const isMain = useSelector((state) => state.setAction.isMain)

    if (is_login && isMain) {
        return (
            <React.Fragment>
                <Header />
                <FlexColumn
                    _width={'100vw'}
                    _height={'100%'}
                    _padding={'1rem'}
                    _others={'box-sizing: border-box;'}
                    _border={'none'}
                >
                    <TimeWarp>
                        <Time />
                    </TimeWarp>
                    <CharacterModal />
                    <FlexColumn
                        _align={'start'}
                        _width={'100%'}
                        _border={'none'}
                        _onClick={() => {
                            dispatch(chageMyHabitModal(false))
                        }}
                    >
                        {' '}
                        <FlexRow _width={'false'} _border={'none'}>
                            <Text
                                _fontSize={'1.25rem'}
                                _margin={'0px 0.2rem 0px 0px'}
                                _padding={'0px'}
                            >
                                메인 루틴
                            </Text>
                            <Text _padding={'0px 0px 0.2rem 0px'}>
                                <ButtonOutlined
                                    _width={'false'}
                                    _margin={'none'}
                                    _padding={'none'}
                                    _border={'none'}
                                    _onClick={() => {
                                        history.push('/routine/mypage')
                                    }}
                                >
                                    <Icon icon={'create'} size={20} />
                                </ButtonOutlined>
                            </Text>
                        </FlexRow>
                        <Text
                            _fontSize={'0.9rem'}
                            _margin={'0px 0px 0.2rem 0px'}
                        >
                            <span style={{ fontWeight: '700' }}>
                                {mainRoutine?.routineName}
                            </span>{' '}
                            하는 날! 오늘도 화이팅!
                        </Text>
                        <FlexRow
                            _width={'100%'}
                            _others={'box-sizing: border-box;'}
                        >
                            <CompleteActionModal />
                        </FlexRow>
                    </FlexColumn>
                    <div
                        onClick={() => {
                            dispatch(chageMyHabitModal(false))
                        }}
                    >
                        <SubTitle>Habit Traker</SubTitle>
                        <Text _fontSize="13px">
                            <Time _format="YYYY, MM" type="num" />
                        </Text>
                    </div>
                    <HabitTrakerWarp>
                        <HabitTrakerV2 />
                    </HabitTrakerWarp>
                </FlexColumn>
            </React.Fragment>
        )
    } else if (is_login) {
        return (
            <React.Fragment>
                <Header />
                <FlexColumn
                    _width={'100vw'}
                    _height={'100%'}
                    _padding={'1rem'}
                    _others={'box-sizing: border-box;'}
                    _border={'none'}
                >
                    <TimeWarp>
                        <Time />
                    </TimeWarp>
                    <CharacterModal />
                    <FlexColumn
                        _align={'start'}
                        _width={'100%'}
                        _border={'none'}
                        _onClick={() => {
                            dispatch(chageMyHabitModal(false))
                        }}
                    >
                        {' '}
                        <FlexRow _width={'false'} _border={'none'}>
                            <Text
                                _fontSize={'1.25rem'}
                                _margin={'0px 0.2rem 0px 0px'}
                                _padding={'0px'}
                            >
                                메인 루틴
                            </Text>
                            <Text _padding={'0px 0px 0.2rem 0px'}>
                                <ButtonOutlined
                                    _width={'false'}
                                    _margin={'none'}
                                    _padding={'none'}
                                    _border={'none'}
                                    _onClick={() => {
                                        history.push('/routine/mypage')
                                    }}
                                >
                                    <Icon icon={'create'} size={20} />
                                </ButtonOutlined>
                            </Text>
                        </FlexRow>
                        <FlexRow
                            _width={'100%'}
                            _others={
                                'box-sizing: border-box; background-color: #C4C4C4;'
                            }
                        >
                            <ButtonOutlined
                                _width={'100%'}
                                _color={'black'}
                                _border={'none'}
                                _others={'min-height:6.25rem'}
                                _onClick={() => {
                                    history.push('/routine/mypage')
                                }}
                            >
                                당신의 루틴을 설정해보세요!
                            </ButtonOutlined>
                        </FlexRow>
                    </FlexColumn>
                    <div
                        onClick={() => {
                            dispatch(chageMyHabitModal(false))
                        }}
                    >
                        <SubTitle>Habit Traker</SubTitle>
                        <Text _fontSize="13px">
                            <Time _format="YYYY, MM" type="num" />
                        </Text>
                    </div>
                    <HabitTrakerWarp>
                        <HabitTrakerV2 />
                    </HabitTrakerWarp>
                </FlexColumn>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <Header />
            <TimeWarp>
                <Time _format="MM.DD" />
            </TimeWarp>
            <FlexColumn
                _width={'100vw'}
                _height={'100%'}
                _padding={'1rem'}
                _others={'box-sizing: border-box;'}
                _border={'none'}
            >
                <CharacterModal />
                <FlexColumn _align={'start'} _width={'100%'} _border={'none'}>
                    {' '}
                    <FlexRow _width={'false'} _border={'none'}>
                        <Text
                            _fontSize={'1.25rem'}
                            _margin={'0px 0.2rem 0px 0px'}
                            _padding={'0px'}
                        >
                            메인 루틴
                        </Text>
                        <Text _padding={'0px 0px 0.2rem 0px'}>
                            <ButtonOutlined
                                _width={'false'}
                                _margin={'none'}
                                _padding={'none'}
                                _border={'none'}
                                _onClick={() => {
                                    window.alert('로그인 후 이용해주세요.')
                                }}
                            >
                                <Icon icon={'create'} size={20} />
                            </ButtonOutlined>
                        </Text>
                    </FlexRow>
                    <FlexRow
                        _width={'100%'}
                        _others={
                            'box-sizing: border-box; background-color: #C4C4C4; min-height=6.25rem'
                        }
                    >
                        <ButtonOutlined
                            _width={'100%'}
                            _color={'black'}
                            _border={'none'}
                            _others={'min-height:6.25rem'}
                            _onClick={() => {
                                window.alert('로그인 후 이용해주세요.')
                            }}
                        >
                            당신의 루틴을 설정해보세요!
                        </ButtonOutlined>
                    </FlexRow>
                </FlexColumn>
            </FlexColumn>
        </React.Fragment>
    )
}

const TimeWarp = styled.div`
    width: 100vw;
    height: 24px;
    margin: 16px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const HabitTrakerWarp = styled.section`
    box-sizing: content-box;
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    justify-content: center;
    align-items: center;
    width: 80vw;
    height: 180px;
`

export default Main
