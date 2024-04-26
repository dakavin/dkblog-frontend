import {useCookies} from "@vueuse/integrations/useCookies";
const cookie = useCookies()

// ============================== Token 令牌 ==============================

// 存储在 Cookie 中的 Token 的 Key
const TOKEN_KEY = 'Authorization'

// 获取 Token 中的值
export function getToken(){
    return cookie.get(TOKEN_KEY)
}

// 设置 Token 到 Cookie 中
export function setToken(token) {
    return cookie.set(TOKEN_KEY,token)
}

// 删除 Token
export function removeToken() {
    return cookie.remove(TOKEN_KEY)
}

// ============================== 标签页 ==============================

// 存储在 Cookie 中的标签页数据的 key
const TAB_LIST_KEY = 'tablist'


// 获取 TabList
export function getTabList(){
    return cookie.get(TAB_LIST_KEY)
}

// 存储 TabList 到 Cookie 中
export function setTabList(tablist){
    return cookie.set(TAB_LIST_KEY,tablist)
}