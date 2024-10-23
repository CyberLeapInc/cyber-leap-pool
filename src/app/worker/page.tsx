'use client'
import React, {useState} from 'react'
import css from './index.module.css'
import {Divider, Input, message, Table} from "antd";
import {cn} from "@/lib/utils";
import Image from "next/image";
import copy from "copy-to-clipboard";
import {simple, worker_stats, workerList, WorkerStats} from "@/app/worker/interfaces";
import TextWithDesc from "@/components/TextWithDesc";
import ArrowUpOutlineBlack from "../../../public/arrow-up-outline-black.png";

const StepIcon = ({index} : {
    index: number
}) => {
    return (
        <div className={'step-index-wrapper'}>
            <div className={'step-index'}>{index}</div>
        </div>
    )
}


interface StepContentProps {
    index: number,
    title: string,
    contents: string[]
}

const StepContent = ({
    index,
    title,
    contents
}: StepContentProps) => {
    return (<div style={{flex: 1}}>
        <div className={css.row}>
            <div className={cn(css.row, css.step)}>
                <StepIcon index={index}/>
                <div className={css.line}></div>
            </div>
        </div>
        <div className={css.h3}>
            {title}
        </div>
        <div className={css.content} style={{marginTop: '12px'}}>
            {contents.map((content, index) => {
                return (<div key={index}>
                    {content}
                </div>)
            })}
        </div>
    </div>)
}

const stepList = [{
    title: '连接局域网',
    contents: ['将您的电脑连接至矿机所在的局域网。']
}, {
    title: '挖矿地址配置',
    contents: ['获取矿机IP，登录至矿机配置页，在Pool1/2/3中分别配置上为您推荐的URL(挖矿地址)，最后一个可填备用矿池的挖矿地址。']
},{
    title: '矿机名设置',
    contents: ['照下方配置示例的格式设置好您的worker，密码可以为空。','矿机名（worker）命名规则：挖矿账户+英文句号+您想为矿机设置的编号。如果您的子账户为test001，那矿机名可以设置为test001.001。']
},{
    title: '完成',
    contents: ['保存配置等待生效，矿机将在10分钟内自动添加至矿池【矿机】页面。']
}]

interface InputWithCopyProps {
    value: string,
    isShowCopy?: boolean
}
const InputWithCopy = ({value='', isShowCopy = false}) => {
    const [messageApi, contextHolder] = message.useMessage();
    const handleCopy = () => {
        console.log(value)
        messageApi.open({
            type: 'success',
            content: '复制成功'
        });
        copy(value)
    }
    return (
        <div className={css.inputWithCopy}>
            <Input size={"large"} value={value} disabled className={css.disabledInputDark} />
            {
                isShowCopy && <div className={css.inputWithCopyIcon}>
                    <Image onClick={handleCopy} src={require('../../../public/复制.png')} alt={'copy'}/>
                </div>
            }
            {contextHolder}
        </div>
    )
}

const WorkerNoData = () => {
    return (
        <>
            <div className={css.h2}>如何添加矿机</div>
            <div className={css.row} style={{gap: '16px'}}>
                {
                    stepList.map((step, index) => {
                        return (
                            <StepContent key={index} index={index + 1} title={step.title} contents={step.contents}/>)
                    })
                }
            </div>
            <div className={css.workerCard}>
                <div className={css.h2}>配置示例</div>
                <div className={css.row} style={{gap: '40px'}}>
                    <div style={{flex: 1}}>
                        {
                            simple.urls.map((url, index) => {
                                return (
                                    <div key={index} style={{gap: '40px', marginTop: '24px'}}>
                                        <div className={css.h3}>pool{index + 1}</div>
                                        <InputWithCopy isShowCopy={true} value={url}/>
                                    </div>)
                            })
                        }
                    </div>
                    <div style={{flex: 1}}>
                        <div style={{gap: '40px', marginTop: '24px'}}>
                            <div className={css.h3}>worker</div>
                            <InputWithCopy value={simple.worker}/>
                        </div>
                        <div style={{gap: '40px', marginTop: '24px'}}>
                            <div className={css.h3}>password</div>
                            <InputWithCopy value={simple.password}/>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

const Pot = ({type = ''}) => {
    switch (type) {
        case 'success':
            return <div className={cn(css.pot, css.potSuccess)}></div>
        case 'danger':
            return <div className={cn(css.pot, css.potDanger)}></div>
        default:
            return <div className={cn(css.pot, css.potDefault)}></div>
    }
}

const StatusFilter = ({
                          workerStatus
                      } : {
    workerStatus: WorkerStats
}) => {
    const [current, setCurrent] = useState('all')
    const handleClick = (status: string) => {
        setCurrent(status)
    }
    return (
        <div className={css.row} style={{gap: '40px', marginBottom: '20px'}}>
            <div onClick={() => handleClick('all')} className={cn(css.statusFilterItem, current === 'all' ? css.statusFilterItemActive : '')}>
                全部({workerStatus.all})
            </div>
            <div onClick={() => handleClick('active')} className={cn(css.statusFilterItem, current === 'active' ? css.statusFilterItemActive : '')}>
                <Pot type={'success'} />
                <TextWithDesc desc={'123'} text={`活跃(${workerStatus.active})`} />
            </div>
            <div onClick={() => handleClick('in_active')} className={cn(css.statusFilterItem, current === 'in_active' ? css.statusFilterItemActive : '')}>
                <Pot type={'danger'} />
                <TextWithDesc desc={'123'} text={`不活跃(${workerStatus.in_active})`} />
            </div>
            <div onClick={() => handleClick('offline')} className={cn(css.statusFilterItem, current === 'offline' ? css.statusFilterItemActive : '')}>
                <Pot />
                <TextWithDesc desc={'123'} text={`失效(${workerStatus.offline})`} /></div>
        </div>
    )
}

const WorkerHaveData = () => {
    const data: any= worker_stats
    const list = workerList
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    const columns = [
        {
            title: '矿机名',
            dataIndex: 'worker_name',
            key: 'worker_name',
        },
        {
            title: '实时算力',
            dataIndex: 'realtime_hashrate',
            key: 'realtime_hashrate',
            render: (text, record) => {
                return (
                    <TextWithDesc desc={'123'} text={`${text} ${record.unit}`} />
                )
            }
        },
        {
            title: '24H算力',
            dataIndex: 'daily_hashrate',
            key: 'daily_hashrate',
            render: (text, record) => {
                return (
                    <TextWithDesc desc={'123'} text={`${text} ${record.unit}`} />
                )
            }
        },
        {
            title: '拒绝率',
            dataIndex: 'reject_rate',
            key: 'reject_rate',
            render: (text, record) => {
                return (
                    <TextWithDesc desc={'123'} text={`${text}%`} />
                )
            }
        },
        {
            title: '最近提交时间',
            dataIndex: 'last_share_time',
            key: 'last_share_time',
            render: (text, record) => {
                return (
                    <TextWithDesc desc={'123'} text={text} />
                )
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                const type = text === 1 ? 'success' : text === 2 ? 'danger' : ''
                return (
                   <div style={{
                       marginLeft: '12px'
                   }}>
                       <Pot type={type} />
                   </div>
                )
            }
        },
        Table.EXPAND_COLUMN,
        ]

    const handleExpand = (record: any) => {
        const keys = [...expandedRowKeys];
        // @ts-ignore
        const index = keys.indexOf(record.worker_name);

        if (index >= 0) {
            // 如果行已经展开，折叠它
            keys.splice(index, 1);
        } else {
            // 如果行已经折叠，展开它
            // @ts-ignore
            keys.push(record.worker_name);
            console.log(keys)
        }

        setExpandedRowKeys(keys);
    }

    return (
        <div>
            <StatusFilter workerStatus={data} />
            <Table dataSource={list} columns={columns}
                   rowKey={'worker_name'}
                   expandable={{
                       fixed: true,
                       expandedRowKeys: expandedRowKeys,
                       expandedRowRender: (record) => <div>123</div>,
                       rowExpandable: (record) => true,
                       expandIcon: ({expanded, onExpand, record}) =>
                           <div style={{width: '30px', height: '30px', padding: '11px', cursor: 'pointer'}}
                                onClick={e => handleExpand(record)}>
                               <Image style={{
                                   rotate: expanded ? '180deg' : '0deg',
                                   transition: 'all 0.3s'
                               }} src={ArrowUpOutlineBlack} alt={'arrow'} width={8}/>
                           </div>,
                   }}
            />
        </div>
    )
}

const Worker = () => {
    return (
        <div className={css.contentWrapper}>
            <div className={css.safeArea}>
                {/*<WorkerNoData/>*/}
                <WorkerHaveData/>
            </div>
        </div>
    )
}

export default Worker