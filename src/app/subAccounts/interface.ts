export interface Response {
    /**
     * 列表数据
     */
    list: SubAccountListItem[];
    /**
     * page数据
     */
    pagination: Pagination;
    [property: string]: any;
}

export interface SubAccountListItem {
    /**
     * 收款地址
     */
    address_list: { [key: string]: any }[];
    /**
     * 报警设置
     */
    alerting_config: AlertingConfig;
    /**
     * 备注
     */
    description?: string;
    hide?: string;
    /**
     * 子账户名
     */
    name?: string;
    /**
     * 观察者链接
     */
    observer_links: { [key: string]: any }[];
    /**
     * puid
     */
    puid?: string;
    [property: string]: any;
}

/**
 * 报警设置
 */
export interface AlertingConfig {
    /**
     * 0 说明没有配置
     */
    id: string;
    [property: string]: any;
}

/**
 * page数据
 */
export interface Pagination {
    page: number;
    page_size: number;
    total_count: string;
    total_page: string;
    [property: string]: any;
}


export const mockdata = [
    {
        "address_list": [
            {
                "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa": "Some address info"
            },
            {
                "1BoatSLRHtKNngkdXEeobR76b53LETtpyT": "Another address info"
            }
        ],
        "alerting_config": {
            "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
        },
        "description": "This is a description",
        "hide": "false",
        "name": "subaccount1",
        "observer_links": [
            {
                "http://example.com/observer1": "Observer link info"
            },
            {
                "http://example.com/observer2": "Another observer link info"
            }
        ],
        "puid": "123e4567-e89b-12d3-a456-426614174000",
        "extra_property_1": "extra_value_1",
        "extra_property_2": "extra_value_2"
    },
    {
        "address_list": [
            {
                "1QLbGuc3WG6SLmZ6xqX2Zc8fW5f8yVZ1Y2": "Some address info"
            }
        ],
        "alerting_config": {
            "id": "f47ac10b-58cc-4372-a567-0e02b2c3d480"
        },
        "description": "Another description",
        "hide": "true",
        "name": "subaccount2",
        "observer_links": [
            {
                "http://example.com/observer3": "Observer link info"
            }
        ],
        "puid": "123e4567-e89b-12d3-a456-426614174001",
        "extra_property_3": "extra_value_3"
    },
    {
        "address_list": [
            {
                "1QLbGuc3WG6SLmZ6xqX2Zc8fW5f8yVZ1Y3": "Some address info"
            },
            {
                "1QLbGuc3WG6SLmZ6xqX2Zc8fW5f8yVZ1Y4": "Another address info"
            },
            {
                "1QLbGuc3WG6SLmZ6xqX2Zc8fW5f8yVZ1Y5": "Yet another address info"
            }
        ],
        "alerting_config": {
            "id": "f47ac10b-58cc-4372-a567-0e02b2c3d481"
        },
        "description": "Yet another description",
        "hide": "false",
        "name": "subaccount3",
        "observer_links": [
            {
                "http://example.com/observer4": "Observer link info"
            },
            {
                "http://example.com/observer5": "Another observer link info"
            }
        ],
        "puid": "123e4567-e89b-12d3-a456-426614174002"
    }
]


export interface ObserverListItem {
    /**
     * 备注信息
     */
    description?: string;
    id?: string;
    /**
     * 观察者链接
     */
    observer_link?: string;
    /**
     * puid
     */
    puid?: string;
    /**
     * 显示收益
     */
    show_income?: boolean;
    /**
     * 显示面板
     */
    show_panel?: boolean;
    /**
     * 显示矿机
     */
    show_worker?: boolean;
    [property: string]: any;
}

export const observeList: ObserverListItem[] =[
    {
        "id": "4",
        "puid": "1361127",
        "show_panel": false,
        "show_worker": false,
        "show_income": true,
        "description": "备注信息",
        "observer_link": "/public/observer?id=84cd70832d314d0aa7e0d615cc1d96bb"
    }
]