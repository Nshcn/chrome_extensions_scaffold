// 这个文件会在扩展安装时运行
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// 监听来自 popup 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SHOW_NOTIFICATION') {
    // 显示通知
    chrome.notifications.create({
      type: 'basic',
      iconUrl: chrome.runtime.getURL('assets/icon-128.png'),
      title: '提示',
      message: '你好'
    });
    console.log('Notification shown');
  }
  // 必须返回 true 来表示我们会异步发送响应
  return true;
});

// 保持 service worker 活跃
export { } 