'use client'
import css from './index.module.css'
import {Button, Checkbox, Divider, Input, Modal, Table, TableProps, Tabs} from "antd";
import {mockdata, observeList, SubAccountListItem} from "@/app/subAccounts/interface";
import {CopyFilled, DeleteFilled, EditOutlined, PlusCircleFilled} from "@ant-design/icons";
import {useState} from "react";
import Image from "next/image";
import DividerCus from "@/components/ui/dividerCus";



const data = mockdata

const DescModalContent = ({
                              record
                          }: {
    record: SubAccountListItem
}) => {
    return (
        <div>
            <div className={css.modalTitle}>修改备注</div>
            <div className={css.modalContent}>
                <div className={css.modalSubTitle}>备注</div>
                <Input value={record.description} size={"large"} placeholder={'请输入您的备注'} />
            </div>
            <div>
                <Button shape={"round"} size={"large"} block type={"primary"} style={{marginTop: '40px'}}>保存</Button>
            </div>
        </div>
    )
}

const ObserverModalContent = ({
                                    record
                                }: {
        record: SubAccountListItem
    }) => {
    const data = observeList
        return (
            <div>
                <div className={css.modalTitle}>观察者连接</div>
                <DividerCus margin={12} visible={false} />
                <div>
                    <div className={css.modalSubTitle}>当前可查看的观察者链接</div>
                    <div>
                        <div className={css.observerCard}>
                            <div className={css.observerTitle}>小王</div>
                            <div className={css.observerAuthList}>
                                <div className={css.observerAuthItem}>用户面板</div>
                                <div className={css.observerAuthItem}>用户面板</div>
                                <div className={css.observerAuthItem}>用户面板</div>
                            </div>
                            <div className={css.row} style={{alignItems: 'center'}}>
                                <Input value={'123'} size={"large"} disabled className={css.disabledInput}/>

                                <div className={css.smallBtn}>
                                    <Image src={require('../../../public/删除.png')} alt={'delete'} width={16}
                                           height={16}/>
                                </div>
                                <div className={css.smallBtn}>
                                    <Image src={require('../../../public/复制.png')} alt={'copy'} width={16}
                                           height={16}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider  />
                <div className={css.modalContent}>
                    <div className={css.modalSubTitle}>创建新的观察者连接</div>
                    <Input value={record.description} size={"large"} placeholder={'请输入您的备注'}/>
                    <div className={css.modalSubTitle}>观察者权限</div>
                    <div className={css.row} style={{gap: '40px', fontWeight: 'bold'}}>
                        <Checkbox className={css.modalCheckbox} >用户面板</Checkbox>
                        <Checkbox className={css.modalCheckbox} >矿机</Checkbox>
                        <Checkbox className={css.modalCheckbox} >收益</Checkbox>
                    </div>
                </div>
                <div>
                    <Button shape={"round"} size={"large"} block type={"primary"} style={{marginTop: '40px'}}>保存</Button>
                </div>
            </div>
        )
}

const AddressModalContent = ({
                                    record
                                }: {
        record: any
    }) => {
        const [tabList, setTabList] = useState([
            {
                key: '1',
                label: 'BTC',
            },
            {
                key: '2',
                label: 'DOGE',
            },
        ])
    const handleOnTabChange = (key: string)=> {
        console.log(key)
    }
        return (
            <div>
                <div className={css.modalTitle}>收款地址</div>
                <Tabs className={css.cusTab} defaultValue={'1'} items={tabList} onChange={handleOnTabChange}></Tabs>
                <div className={css.modalContent}>
                    <div className={css.modalSubTitle}>现有地址</div>
                    <Input value={record.description} size={"large"} placeholder={'现有地址'} onChange={() => null} disabled className={css.disabledInput}/>
                </div>
                <div className={css.modalContent}>
                    <div className={css.modalSubTitle}>设置新的收款地址</div>
                    <Input value={record.description} size={"large"} placeholder={'请输入新的XXX主网地址'}/>
                </div>
                <div className={css.modalTipsRow} style={{marginTop: '20px', marginBottom: '8px'}}>温馨提示</div>
                <div className={css.modalTipsRow}>1.矿池最小支付金额：0.02 LTC。</div>
                <div className={css.modalTipsRow}>2.修改地址后，支付冻结48h。</div>
                <div className={css.modalTipsRow}>3.一般在更新收益的下一日执行打款，每天满足上述条件的多个算力合并一笔支付。</div>
                <div>
                    <Button shape={"round"} size={"large"} block type={"primary"}
                            style={{marginTop: '40px'}}>保存</Button>
                </div>
            </div>
        )
}

const SubAccounts = () => {
    const [accountModalOpen, setAccountModalOpen] = useState(false)
    const [descModalOpen, setDescModalOpen] = useState(false)
    const [addressModalOpen, setAddressModalOpen] = useState(false)
    const [addressListModalOpen, setAddressListModalOpen] = useState(false)
    const [alarmModalOpen, setAlarmModalOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [record, setRecord] = useState({})

    const handleModalOpen = (record: SubAccountListItem, type: string) => {
        setRecord(record)
        setModalOpen(true)
        switch (type) {
            case 'account':
                setAccountModalOpen(true)
                break
            case 'desc':
                setDescModalOpen(true)
                break
            case 'address':
                setAddressModalOpen(true)
                break
            case 'addressList':
                setAddressListModalOpen(true)
                break
            case 'alarm':
                setAlarmModalOpen(true)
                break
        }
    }

    const columns: TableProps<SubAccountListItem>['columns'] = [
        {
            title: '子账户名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => {
                return (<Button onClick={() => handleModalOpen(record, 'account')} type={"link"} >{text}</Button>)
            }
        },
        {
            title: '备注',
            dataIndex: 'description',
            key: 'description',
            render: (text, record) => {
                return (<Button style={{color: '#666'}} type={"link"} iconPosition={'end'} icon={<EditOutlined/>}>{text}</Button>)
            }
        },
        {
            title: '观察者连接',
            dataIndex: 'address',
            key: 'address',
            render: (text, record) => {
                return (<Button type={"link"}>设置</Button>)
            }
        },
        {
            title: '收款地址',
            dataIndex: 'address_list',
            key: 'address_list',
            render: (text, record) => {
                return (<Button type={"link"}>设置</Button>)
            }
        },
        {
            title: '报警设置',
            dataIndex: 'address',
            key: 'address',
            render: (text, record) => {
                return (<Button type={"link"}>设置</Button>)
            }
        }
    ];

    return (
        <div className={css.contentWrapper}>
            <div className={css.safeArea}>
                <div className={css.row} style={{paddingTop: '100px',marginBottom: '20px',alignItems: 'center', justifyContent: 'space-between'}}>
                    <div className={css.h2} style={{ }}>子账户管理</div>
                    <div>
                        <Button style={{fontSize: '16px'}} icon={<PlusCircleFilled />} type={"link"}>添加子账户</Button>
                    </div>
                </div>
                <Table dataSource={data} columns={columns}/>
                <Modal footer={null} width={420} open={modalOpen} onClose={() => setModalOpen(false)}>
                    {/*<DescModalContent record={record} ></DescModalContent>*/}
                    {/*<ObserverModalContent record={record}></ObserverModalContent>*/}
                    {/*<AddressModalContent record={record}></AddressModalContent>*/}
                </Modal>
            </div>
        </div>
    )
}

export default SubAccounts