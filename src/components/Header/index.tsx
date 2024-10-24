import {ActionType, MyContext, State} from "@/service/context";
import IconKyc from "../../../public/icon-kyc.png";
import IconSecurity from "../../../public/icon-security.png";
import IconMyorder from "../../../public/icon-myorder.png";
import IconAddress from "../../../public/icon-address.png";
import IconElectfee from "../../../public/icon-electfee.png";
import {Button,Drawer, Popover, Space} from "antd";
import Image from "next/image";
import IconAvatar from "../../../public/icon-avatar.png";
import DividerCus from "@/components/ui/dividerCus";
import Link from "next/link";
import React, {useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {getUserInfo, logout} from "@/service/api";
import Logo from "../../../public/logo-group.png";
import NavMobile from '../../../public/nav-mobile.png'
import LanguageSelector from '@/components/LanguageSelector'


import css from './index.module.css'
import {CloseOutlined, LoginOutlined, MenuOutlined} from "@ant-design/icons";
import {cn} from "@/lib/utils";
import {useTranslations} from 'next-intl';

import LanguageSelectorMobile from "@/components/LanguageSelectorMobile";

const routerLinkList = [
    {
        text: '用户面板',
        href: '/userPanel',
        icon: IconKyc
    },
    {
        text: '子账户管理',
        href: '/subAccounts',
        icon: IconSecurity,
    },
    {
        text: '矿机',
        href: '/worker',
        icon: IconMyorder,
    },
    {
        text: '收益',
        href: '/walletAddress',
        icon: IconAddress
    },
    {
        text: '账户总览',
        href: '/electricityFee',
        icon: IconElectfee
    },
    {
        text: '云算力',
        href: '/electricityFee',
        icon: IconElectfee
    },
]

const HoverContent = ({outState, onLogOut, isMobile = false}: {
    outState: State,
    onLogOut: Function,
    isMobile: Boolean
}) => {
    const t = useTranslations('header');



    return (
        <div style={{fontSize: '14px', color: '#333', fontWeight: 400}}>
            <Space direction={"vertical"} size={0} style={{width: '100%'}}>
                <Space style={{
                    padding: '0 26px',
                    paddingTop: '26px'
                }}>
                    <Image  style={{marginLeft: 'auto'}} width={32} src={IconAvatar} alt={'avatar'} />
                    <div>
                        <div style={{fontWeight: 400}}>{outState.userInfo.email.length > 22 ? outState.userInfo.email.slice(0,22)+'...' : outState.userInfo.email}</div>
                        <div style={{fontSize: '12px', color: '#999'}}>{outState.userInfo.has_identity ? <span style={{color: 'green'}}>{t('certified')}</span> : <span>{t('notCertified')}</span>}</div>
                    </div>
                </Space>

                <Space style={{
                    width: '100%'
                }} direction={"vertical"}  size={0}>
                    <DividerCus></DividerCus>
                    {
                        routerLinkList.map(item => (
                            <div key={item.text}>
                                <Link href={item.href}>
                                    <Button
                                        key={item.text}
                                        style={{
                                            padding: 0,
                                            height : '52px',
                                            borderRadius: 0
                                        }}
                                        block type="text" size={"large"}>
                                        <div className={cn(css.hoverButton, !isMobile && css.pcHoverBottom)}>
                                            <Image width={18} height={18} src={item.icon} alt={'avatar'} style={{
                                                margin:'2px 8px 0 0'
                                            }}/>
                                            <span>
                                            {item.text}
                                        </span>
                                        </div>
                                    </Button>
                                </Link>
                            </div>
                        ))
                    }
                    {!isMobile && <DividerCus />}

                    <div style={{
                        width: '100%',
                        display: 'flex'
                    }}>
                        <Button className={cn(css.logOutButton, !isMobile && css.logOutButtonPC)} icon={<LoginOutlined />} shape={'round'} type="default" onClick={() => onLogOut()}>
                            {t('logout')}
                        </Button>

                    </div>

                </Space>
            </Space>
        </div>
    )
}

export const Header: React.FC = () => {
    const t = useTranslations('header');
    const {state, dispatch} = useContext(MyContext)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [type, setType] = useState('')
    const router = useRouter();
    const logOut = () => {
        router.replace('/')
        logout().then(() => {
            // @ts-ignore
            dispatch({
                type: ActionType.setUserInfo,
                payload: {}
            })
        })
    }
    const openDrawerWithType = (type: string) => {
        setType(type)
        setOpenDrawer(true)
    }
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo();
                dispatch({ type: ActionType.setUserInfo, payload: userInfo });
            } catch (error) {
                // 处理错误，例如日志记录或显示错误消息
                console.error("Failed to fetch user info:", error);
            }
        };
        fetchUserInfo().then(() => {
            console.log(MyContext)
        });
    }, [dispatch]);
    if (state.isMobile) {
        return <><header
            className="sticky top-0 z-50 w-full border-b border-border/40"
            style={{
                borderBottom: "none",
                backgroundColor: 'rgba(255,255,255,0.91)',
            }}
        >
            <div className={cn('container-my flex max-w-screen-2xl items-center', css.mobileHeader)} style={{'gap': '24px',color: '#666', backdropFilter: 'blur(10px)'}}>
                <Link href={'/'}>
                    <div className="logospace">
                        <Image style={{
                            width: '110px',
                            marginLeft: '5px'
                        }} width={110} src={Logo} alt={'logo'}/>
                    </div>
                </Link>
                <div>
                    <div className={css.top}>
                        {
                            !(state?.userInfo?.email) &&
                            <Button style={{marginLeft: 'auto', height: '28px', lineHeight: '18px'}} shape={'round'} ghost className={css.logInButton} type={'primary'}>
                                <Link href="/login" legacyBehavior passHref>
                                    {t('startMining')}
                                </Link>
                            </Button>
                        }
                        {
                            (state?.userInfo?.email) && (
                                <Image onClick={() => openDrawerWithType('user')} style={{marginLeft: 'auto'}} width={28} src={IconAvatar} alt={'avatar'}/>                        )
                        }
                        <div style={{marginLeft: '20px', marginRight: '5px'}} onClick={() => openDrawerWithType('navi')}>
                            <Image alt={'nav'} width={14} src={NavMobile} />
                        </div>
                    </div>
                </div>
            </div>
            <Drawer
                placement="top"
                closable={false}
                open={openDrawer}
                getContainer={false}
                height={'100vh'}
                bodyStyle={{
                    padding: '0',
                    backgroundColor: 'rgba(255,255,255,0.91)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.01s'
                }}
            >
                {
                    type === 'navi' && <div onClick={() => setOpenDrawer(false)}>
                        <div className={css.mobileHeader}>
                            <div></div>
                            <div style={{height: '28px',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                {
                                    !(state?.userInfo?.email) &&
                                    <Button style={{marginLeft: 'auto', height: '28px', lineHeight: '18px'}} shape={'round'} ghost className={css.logInButton} type={'primary'}>
                                        <Link href="/login" legacyBehavior passHref>
                                            {t('startMining')}
                                        </Link>
                                    </Button>

                                }
                                <div onClick={() => setOpenDrawer(false)}>
                                    <CloseOutlined width={14} style={{marginLeft: '20px', marginRight: '5px'}}/>
                                </div>
                            </div>
                        </div>
                        <div className={css.mobileList}>
                            {
                                routerLinkList.map(item => (
                                    <Link href={item.href} key={item.text} legacyBehavior passHref>
                                        {item.text}
                                    </Link>
                                ))
                            }
                            <LanguageSelectorMobile onClick={() => setOpenDrawer(false)}/>
                        </div>
                    </div>
                }
                {
                    type === 'user' && <div  onClick={() => setOpenDrawer(false)}>
                        <div className={css.mobileHeader}>
                            <div></div>
                            <div  className={css.top}>
                                <Image width={28} src={IconAvatar} alt={'avatar'}/>
                                <div
                                    onClick={() => setOpenDrawer(false)}>
                                    <CloseOutlined width={14} style={{marginLeft: '20px', marginRight: '5px'}}/>
                                </div>
                            </div>
                        </div>
                        <HoverContent isMobile={state.isMobile} outState={state} onLogOut={logOut}/>
                    </div>
                }
            </Drawer>
        </header>
        </>
    } else {
        return (
            <header
                style={{
                    minWidth: '1200px'
                }}
                className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            >
                <div className="container-my flex h-16 max-w-screen-2xl items-center" style={{'gap': '0',color: '#666'}}>
                    <Link href={'/'}>
                        <div className="logospace">
                            <Image width={152} src={Logo} alt={'logo'}/>
                        </div>
                    </Link>
                    {
                        routerLinkList.map(item => (
                            <Link href={item.href} key={item.text} legacyBehavior passHref>
                                <span className={css.menuBtn}>{item.text}</span>
                            </Link>
                        ))
                    }
                    {
                        !(state?.userInfo?.email) &&
                        <Button style={{marginLeft: 'auto'}} shape={'round'} size={'middle'} type={'primary'}>
                            <Link href="/login" legacyBehavior passHref>
                                 {t('startMining')}
                            </Link>
                        </Button>
                    }
                    {
                        (state?.userInfo?.email) && (
                            <Popover overlayInnerStyle={{
                                padding: 0,
                                borderRadius: '20px',
                                minWidth: '210px'
                            }} content={() => <HoverContent isMobile={state.isMobile} outState={state} onLogOut={logOut}/>}>
                                <Image style={{marginLeft: 'auto'}} width={32} src={IconAvatar} alt={'avatar'}/>
                                {/*<Avatar style={{marginLeft: 'auto'}} size={40} icon={<UserOutlined />} />*/}
                            </Popover>
                        )
                    }
                    <LanguageSelector />
                </div>
            </header>
        )
    }
}

export default Header;