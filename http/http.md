### Get 和 Post 的区别
get是读 post是写  所以get是幂等的，post不幂等
get是读 post是写  所以get结果会被缓存，post不会被缓存

通常 get请求参数放在url上 post请求参数放在body消息体里面
浏览器限定了url的长度， post放到body里面一般长度受后端限制

get产生一个TCP数据包 post产生2个或以上的TCP数据包

### http缓存有哪些方案？

http1.1  
Cache-Control: max-age=3600
Etag: ABC  
Etag作用： 当缓存超过3600之后
浏览器会拿着Etag去服务器查询当前Etag对应的缓存还能不能用， 如果能用就返回200， 不能就返回304。
if-None-Match: ABC
响应状态码 304 或 200

### http 和 https 的区别
https === http + SSL/TLS (安全层)
1、http是明文传输的，不安全， https是加密传输的， 比较安全
2、http使用80端口， https使用443端口
3、http较快， https较慢
4、https的证书一般需要购买（也有免费的）, http不需要证书

### 三次握手四次挥手是什么？
建立 TCP 连接时 server 与 client 会经历三次握手
1. 浏览器向服务器发送 TCP 数据：SYN(seq=x)
2. 服务器向浏览器发送 TCP 数据：ACK(seq=x+1) SYN(y)
3. 浏览器向服务器发送 TCP 数据：ACK(seq=y+1)
// 理解如下：
1. Client -> Server 我要开始同步了，发送数据 SYN 要求同步
2. Server -> Client 我知道了，可以开始同步
3. Client -> Server 知道了，开始同步

SYN: 同步 ACK: acknowledge 收到

关闭 TCP 连接时 server 与 client 会经历四次挥手
1. 浏览器向服务器发送 TCP 数据：FIN(seq=x)
2. 服务器向浏览器发送 TCP 数据：ACK(seq=x+1)
3. 服务器向浏览器发送 TCP 数据：FIN(seq=y)
4. 浏览器向服务器发送 TCP 数据：ACK(seq=y+1)
// 理解如下：
1. Client -> Server 我finished， 要拜拜了
2. Server -> Client 好的， 知道了
3. Server -> Client 我也finished了， 要拜拜了
4. Client -> Server 好的，知道了， 那拜拜吧。
FIN: finished ACK: acknowledge 收到
为什么 2、3 步骤不合并起来呢？看起来是脱裤子放屁。
答案：2、3 中间服务器很可能还有数据要发送，不能提前发送 FIN。

### 同源策略和跨域
同源： 如果两个url的 协议、端口和域名一摸一样， 就说两个url是同源的。
怎么做： 在浏览器里面打开， 默认遵守同源策略
优点： 保护用户隐私安全和数据安全
缺点： 很多时候， 前端访问另一个域名的接口， 请求发出去之后， 返回会被同源策略拦截。
如何解决缺点： 使用跨域
1、JSONP
1) JSONP方式实现时， 所有人都可以访问， 需要额外添加token才能防止恶意访问
2) 只能发送GET请求

2、CORS 
- 对于简单请求
响应头添加 Access-Control-Allow-Origin: https://站点
- 对于复杂请求 
如： 响应patch请求 需要添加
```
Access-Control-Allow-Origin: https://站点
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Header: Content-Type
```
响应POST请求
响应头添加 Access-Control-Allow-Origin: https://站点

3、nginx / nodejs 反向代理
client -> nginx / nodejs -> 真正的后端

4、如果需要携带身份信息， 需要用js在ajax中设置xhr.withCredentials = true

### Session、Cookie、LocalStorage、SessionStorage区别
cookie会发到服务端 最大4kb
localStorage不会发到服务端， 可以用5mb

localStorage不会过期， 除非用户手动清除
sessionStorage在会话结束之后会被清除 （关闭浏览器)

cookie储存在浏览器中， session储存在服务端

### http1 和 http2的区别

1、http2是二进制传输， 可以将header和body分成帧来传输， http1是字符串传输
2、http2支持多路复用， 多个请求使用同一个tcp链接， http1不支持。
3、http2支持压缩head， http1不支持
4、http2支持服务器推送，http1不支持
