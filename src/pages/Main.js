import React from 'react'
import {
    FlexRow,
    FlexColumn,
    SubTitle,
    Title,
    Input,
    ButtonFill,
    ButtonOutlined,
    Text,
} from '../elements/index'
import { CharacterModal, Header } from '../components/index'
import Icon from '../components/icons/Icon'
import { history } from '../redux/store'

const Main = (props) => {
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
                {/* <Text _fontSize={'1.5rem'} _color={'black'} _padding={'0px'}>
                    오늘의{' '}
                    <span style={{ fontWeight: '700', color: '#2baffd' }}>
                        밍기적
                    </span>
                    을 이루세요!
                </Text> */}
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
                            <Icon icon={'create'} size={20} />
                        </Text>
                    </FlexRow>
                    <Text _fontSize={'0.9rem'} _margin={'0px 0px 0.2rem 0px'}>
                        (루틴이름) 하는 날! 오늘도 화이팅!
                    </Text>
                    {/* <FlexRow
                        _width={'100%'}
                        _height={'100px'}
                        _others={
                            'box-sizing: border-box; background-color: #C4C4C4;'
                        }
                    >
                        <ButtonOutlined
                            _width={'100%'}
                            _color={'black'}
                            _border={'none'}
                            _onClick={() => {
                                history.push('/routine/mypage')
                                window.location.reload()
                            }}
                        >
                            당신의 루틴을 설정해보세요!
                        </ButtonOutlined>
                    </FlexRow> */}
                    <FlexRow
                        _width={'100%'}
                        _height={'100px'}
                        _border={'1px solid gray'}
                        _others={'box-sizing: border-box;'}
                    ></FlexRow>
                </FlexColumn>
            </FlexColumn>
        </React.Fragment>
    )
}

export default Main