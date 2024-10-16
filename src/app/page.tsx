'use client'
import './pages.css';
import {Button} from "antd";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {useContext, useEffect, useState} from "react";

import css from './page.module.css'
import {MyContext} from "@/service/context";
import {cn} from "@/lib/utils";
import {useTranslations} from 'next-intl';
import langCn from '../../messages/zh-CN.json'
import langEn from '../../messages/en.json'
import {Table} from "antd";
import {getHomePage} from "@/service/api";
import Image from "next/image";
import ImageHome from '../../public/img_home.png'

let language = 'zh-CN';
let questionList: any[] = [];
if (typeof window !== 'undefined') {
    language = window.localStorage.getItem('language') || 'en';
    if (language === 'zh-CN') {
        questionList = langCn.home.questions
    } else if (language === 'en') {
        questionList = langEn.home.questions
    } else {
        questionList = []
    }
    for (let i = 0; i < questionList.length; i++) {
        // 在这里加一个key
        questionList[i].index = i + 1;
    }
} else {
    questionList = [];
}

export default function Home() {
    const t = useTranslations('home');
    const [questionOpen, setQuestionOpen] = useState(0);
    const {state, dispatch} = useContext(MyContext)
    const [isClient, setIsClient] = useState(false)
    const columns = [
        {
            title: '币种',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '算法',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '矿池算力',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '全网算力',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '教程',
            dataIndex: 'name',
            key: 'name',
        },
    ]
    const data = [{}]

    useEffect(() => {
        setIsClient(true)
        getHomePage().then(res => {
            console.log(res)
        })
    }, [])


    return (
    <main>
        <div className=''>
            <div className={state.isMobile ? css.mobileBanner : css.banner}>
                <div style={{
                    display: 'flex'
                }}>
                    <Image style={{
                        width: '351px'
                    }} src={ImageHome} alt={'imghome'} />
                    <div>

                        <div>挖矿并赚取收益</div>
                        <div className={css.bannerSubtitle}>欢迎加入HashSpace矿池，准备开始您的采矿之旅了吗？首先请创建您的第一个子账户，<br/>点击这里开始创建。
                        </div>
                        <Button shape={"round"} size={'large'} type={'primary'} style={{width: 264}}>{'开始挖矿'}</Button>
                    </div>
                </div>
            </div>
            <div style={{paddingBottom: '40px', backgroundColor: "white"}} id={'question'}>
                <div className="container-my" style={{padding: state.isMobile ? '0 12px' : ''}}>
                    <div
                        className={cn(css.questionTitle, state.isMobile && css.mobileQuestionTitle)}>挖矿币种
                        <span style={{fontWeight: 500}}></span>
                    </div>
                    <Table columns={columns} dataSource={data} />
                </div>

            </div>
            <div style={{paddingBottom: '40px', backgroundColor: "white"}} id={'question'}>
                <div className="container-my" style={{padding: state.isMobile ? '0 12px' : ''}}>
                    <div
                        className={cn(css.questionTitle, state.isMobile && css.mobileQuestionTitle)}>{t('questionTitle')}
                        <span style={{fontWeight: 500}}></span></div>
                    <>
                        {
                            questionList && isClient && questionList.map((item) => (
                                <Collapsible open={questionOpen === item.index} key={item.index} onClick={() => {
                                    if (questionOpen === item.index) {
                                        setQuestionOpen(0)
                                    } else {
                                        setQuestionOpen(item.index)
                                    }
                                }} style={{transition: 'all 0.3s'}}
                                             className={questionOpen === item.index ? 'grayquestionopen' : 'grayquestion'}>
                                    <CollapsibleTrigger className="collapse-title">
                                  <span style={{maxWidth: '80%', display: 'flex', alignItems: 'center'}}>
                                      <div>{item.title}</div>
                                  </span>
                                        <span
                                            className={cn(item.index === questionOpen ? "downarrowimg" : "uparrowimg", 'arrow-img')}
                                            style={{
                                                margin: state.isMobile ? '0' : '',
                                                display: 'inline-block',
                                                width: state.isMobile ? '28px' : '40px',
                                                height: state.isMobile ? '28px' : '40px'
                                            }}/>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="collapse-text">
                                        {item.text}
                                    </CollapsibleContent>
                                </Collapsible>
                            ))
                        }
                    </>
                </div>

            </div>


        </div>
    </main>
    );
}
