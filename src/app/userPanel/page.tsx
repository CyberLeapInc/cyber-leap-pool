'use client'
import React from "react";
import css from './index.module.css'
import {cn} from "@/lib/utils";
import {Button, Checkbox, Divider, Input, Statistic} from "antd";
import {Modal} from "antd";
import Image from "next/image";
import {Counter} from "@/components/Counter";
import TextWithDesc from "@/components/TextWithDesc";

const CreateSubAccount = () => {
    return (
        <div>
            <div className={css.modalTitle}>创建子账户</div>
            <div className={css.modalContent}>
                <div className={css.inputWrapper}>
                    <div className={css.modalSubTitle}>子账户名称</div>
                    <Input size={"large"} placeholder={'仅支持2-20位的数字或字母'}/>
                    <div className={css.modalExplain}>*挖矿子账户支持多个算法和地区进行挖矿，您最多创建100个挖矿子账户。</div>
                    <div className={css.modalSubExplain}>挖矿子账户用于矿机配置页面进行矿机名配置（worker），例如：
                        “zhangsan.001”,”zhangsan.002”。其中前面的zhangsan即为挖矿子账户，后面的001，002为矿机的编号。</div>
                </div>
                <div className={css.inputWrapper}>
                    <div className={css.modalSubTitle}>设置挖矿子账户备注（选填）</div>
                    <Input size={"large"} placeholder={'请输入子账户备注'}/>
                </div>
                <Checkbox className={css.modalCheckbox}>我接受《服务协议》和 《隐私政策》《免责声明》</Checkbox>
                <Button size={'large'} shape={'round'} block type="primary">创建子账户</Button>
        </div>
        </div>
    )
}

const SuccessModalContent = ({
    onCountDownFinish
                             }: {
    onCountDownFinish: () => void
}) => {
    const { Countdown } = Statistic;
    return (
        <div>
            <div className={css.modalContent}>
                <Image className={css.modalSuccessImage} alt={'success'} src={require('../../../public/kyc-success.png')}/>
                <div className={css.modalSuccessText} style={{textAlign: 'center'}}>子账户创建成功</div>
                <Button size={'large'} shape={'round'} block type="primary">返回
                    <div className={css.countdown}>
                        (<Countdown valueStyle={{color: "white", fontSize: '16px', display: "inline-block"}} format={'s'} value={Date.now() + 5000} onFinish={onCountDownFinish}/>s)
                    </div></Button>
            </div>
        </div>
    )
}

const NoAccount = () => {
    const [open, setOpen] = React.useState(false);
    const handleCreateSubAccount = () => {
        setOpen(true)
    }
    return (<div className={cn(css.bgImg, css.contentWrapper)}>
        <div className={cn(css.safeArea)}>
            <div className={cn(css.rightContent)}>
                <div className={css.mainTitle}>
                    挖矿并<span>赚取收益</span>
                </div>
                <div
                    className={css.subTitle}>欢迎加入HashSpace矿池，准备开始您的采矿之旅了吗？首先请创建您的第一个子账户，点击这里开始创建。
                </div>
                <Button size={'large'} onClick={handleCreateSubAccount} shape={'round'} style={{
                    width: '265px'
                }} type="primary">创建子账户</Button>
            </div>
        </div>
        <Modal width={420} onCancel={() => setOpen(false)} open={open} footer={null}>
            <CreateSubAccount/>
            {/*<SuccessModalContent/>*/}
        </Modal>

    </div>)
}

const HasAccount = () => {
    return (
        <div className={css.contentWrapper}>
            <div className={css.safeArea}>
                <div className={css.row} style={{gap: '20px'}}>
                    <div className={css.statusBlock}>
                        <div className={css.h2}><TextWithDesc desc={'123123'} text={'算力'}/></div>
                        <div className={css.roundContent}>
                            <div className={css.row}>
                                <div className={css.listContent}>
                                    <Image className={css.contentIcon} src={require('../../../public/实时算力@2x.png')}
                                           alt={'realtime'}/>
                                    <div className={css.content}>
                                        <div className={css.contentTitle}>
                                            <TextWithDesc text={'当前算力'} desc={'当前子账户的实时算力'}/>
                                        </div>
                                        <div className={css.valueGroup}>
                                            <span>0.00 TH/s</span>
                                        </div>
                                    </div>
                                </div>
                                <Divider type={'vertical'} style={{height: '58px', margin: '0 20px'}}/>
                                <div className={css.listContent}>
                                    <Image className={css.contentIcon} src={require('../../../public/24小时算力@2x.png')}
                                           alt={'realtime'}/>
                                    <div className={css.content}>
                                        <div className={css.contentTitle}>
                                            <TextWithDesc text={'24小时算力'} desc={'当前子账户的实时算力'}/>
                                        </div>
                                        <div className={css.valueGroup}>
                                            <span>0.00 TH/s</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={css.statusBlock}>
                        <div className={css.h2}><TextWithDesc desc={'123123'} text={'矿机'}/></div>
                        <div className={css.roundContent}>
                            <div className={css.row}>
                                <div className={css.listContent}>
                                    <Image className={css.contentIcon} src={require('../../../public/活跃@2x.png')}
                                           alt={'realtime'}/>
                                    <div className={css.content}>
                                        <div className={css.contentTitle}>
                                            <TextWithDesc text={'活跃'} desc={'当前子账户的实时算力'}/>
                                        </div>
                                        <div className={css.valueGroup}>
                                            <span>0.00 TH/s</span>
                                        </div>
                                    </div>
                                </div>
                                <Divider type={'vertical'} style={{height: '58px', margin: '0 20px'}}/>
                                <div className={css.listContent}>
                                    <Image className={css.contentIcon} src={require('../../../public/不活跃@2x.png')}
                                           alt={'realtime'}/>
                                    <div className={css.content}>
                                        <div className={css.contentTitle}>
                                            <TextWithDesc text={'不活跃'} desc={'当前子账户的实时算力'}/>
                                        </div>
                                        <div className={css.valueGroup}>
                                            <span>0.00 TH/s</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css.statusBlock}>
                    <div className={css.h2}><TextWithDesc desc={'123123'} text={'收益'}/></div>
                    <div className={css.roundContent}>
                        <div className={css.row}>
                            <div className={css.listContent}>
                                <Image className={css.contentIcon} src={require('../../../public/今日预估收益@2x.png')}
                                       alt={'realtime'}/>
                                <div className={css.content}>
                                    <div className={css.contentTitle}>
                                        <TextWithDesc text={'今日预估收益'} desc={'当前子账户的实时算力'}/>
                                    </div>
                                    <div className={css.valueGroup}>
                                        <span>0.00 TH/s</span>
                                        <span>0.00 TH/s</span>
                                    </div>
                                </div>
                            </div>
                            <Divider type={'vertical'} style={{height: '58px', margin: '0 50px'}}/>
                            <div className={css.listContent}>
                                <Image className={css.contentIcon} src={require('../../../public/昨日挖矿收益@2x.png')}
                                       alt={'realtime'}/>
                                <div className={css.content}>
                                    <div className={css.contentTitle}>
                                        <TextWithDesc text={'昨日挖矿收益'} desc={'当前子账户的实时算力'}/>
                                    </div>
                                    <div className={css.valueGroup}>
                                        <span>0.00 TH/s</span>
                                        <span>0.00 TH/s</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css.statusBlock}>
                    <div className={css.h2}><TextWithDesc desc={'123123'} text={'算力曲线'}/></div>

                </div>
            </div>


        </div>
    )
}

export default function SubAccount() {
    return (
        <>
            <NoAccount></NoAccount>
            <HasAccount></HasAccount>

        </>
    );
}
