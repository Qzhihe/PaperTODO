export const validateUserToken = () => {
    const tokens = [
        '模拟数据',
        '你好'
    ]
    let token = localStorage.getItem('token');
    console.log(token);

    if (tokens.includes(token)) { // 假装验证一下,这里肯定得发请求验证token啊
        return true;
    } 
    return false;
} 