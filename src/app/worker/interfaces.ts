export interface ConfigSimple {
    password: string;
    urls: string[];
    worker: string;
    [property: string]: any;
}
export const simple = {
    urls: [
        "stratum+tcp://ltc.hashspace.one:3333",
        "stratum+tcp://ltc.hashspace.one:443",
        "stratum+tcp://ltc.hashspace.one:25"
    ],
    worker: "account.001",
    password: "123456"
}



export interface WorkerListResp {
    list: WorkerList[];
    pagination: Pagination;
    worker_stats: WorkerStats;
    [property: string]: any;
}

export const  worker_stats = {
    "all": 5,
        "active": 0,
        "in_active": 4,
        "offline": 1
}

export const workerList: WorkerList[] = [
    {
        "worker_name": "005",
        "realtime_hashrate": "133111222312",
        "daily_hashrate": "0",
        "reject_rate": "0",
        "last_share_time": "1726462476",
        "status": 1,
        "unit": "GH/s",
        "version": "1.0",
        "ip": ""
    },
    {
        "worker_name": "004",
        "realtime_hashrate": "123111222311",
        "daily_hashrate": "0",
        "reject_rate": "0",
        "last_share_time": "1726538040",
        "status": 1,
        "unit": "GH/s",
        "version": "1.0",
        "ip": ""
    },
    {
        "worker_name": "003",
        "realtime_hashrate": "113111222312",
        "daily_hashrate": "0",
        "reject_rate": "0",
        "last_share_time": "1726581237",
        "status": 1,
        "unit": "GH/s",
        "version": "proxy/1.2023.0720-ltc-mrg",
        "ip": ""
    },
    {
        "worker_name": "002",
        "realtime_hashrate": "183111222312",
        "daily_hashrate": "0",
        "reject_rate": "0",
        "last_share_time": "1726584791",
        "status": 2,
        "unit": "GH/s",
        "version": "proxy/1.2023.0720-ltc-mrg",
        "ip": ""
    },
    {
        "worker_name": "001",
        "realtime_hashrate": "143111222312",
        "daily_hashrate": "0",
        "reject_rate": "0",
        "last_share_time": "1726584758",
        "status": 3,
        "unit": "GH/s",
        "version": "proxy/1.2023.0720-ltc-mrg",
        "ip": ""
    }
]

export interface WorkerList {
    /**
     * 24小时算力
     */
    daily_hashrate: string;
    /**
     * 天级算力列表
     */
    days_hashrate_history?: DaysHashrateHistory;
    /**
     * 小时算力列表
     */
    hours_hashrate_history?: HashrateHistory;
    /**
     * ip
     */
    ip: string;
    /**
     * 最近提交时间
     */
    last_share_time: string;
    /**
     * 实时算力
     */
    realtime_hashrate: string;
    /**
     * 拒绝率
     */
    reject_rate: string;
    /**
     * 状态
     * 枚举值
     * 1 活跃
     * 2 不活跃
     * 3 失效
     */
    status: number;
    /**
     * 版本
     */
    version: string;
    /**
     * 矿机名
     */
    worker_name: string;
    [property: string]: any;
}

/**
 * 天级算力列表
 *
 * hashrateHistory，天级算力列表
 *
 * 小时算力列表
 */
export interface DaysHashrateHistory {
    list: DaysHashrateHistoryList[];
    unit: string;
    [property: string]: any;
}

export interface DaysHashrateHistoryList {
    created_at: string;
    hashrate: string;
    unit: string;
    [property: string]: any;
}

/**
 * 天级算力列表
 *
 * hashrateHistory，天级算力列表
 *
 * 小时算力列表
 */
export interface HashrateHistory {
    list: DaysHashrateHistoryList[];
    [property: string]: any;
}

export interface Pagination {
    page: number;
    page_size: number;
    total_count: string;
    total_page: string;
    [property: string]: any;
}

export interface WorkerStats {
    /**
     * 活跃矿机数
     */
    active: number;
    /**
     * 所有矿机数量
     */
    all: number;
    /**
     * 不活跃矿机数
     */
    in_active: string;
    /**
     * 失效矿机数
     */
    offline: string;
    [property: string]: any;
}