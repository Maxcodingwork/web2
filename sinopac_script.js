window.collectEvent('init', {
  app_id: 10000004, // 参考2.1节获取，注意类型是number而非字符串
  channel_domain: 'https://cdp.altatech.tw', // 设置私有化部署数据上送地址，参考2.2节获取
  log: true, // true:开启日志，false:关闭日志
  autotrack: true, // 全埋点开关，true开启，false关闭
});
// 此处可添加设置uuid、设置公共属性等代码
window.collectEvent('start'); // 通知SDK设置完毕，可以真正开始发送事件了

  // 初始化資源位SDK
  const sdk = new GmpResourceSDK({ 
    host: 'https://ma.altatech.tw', 
    appid: 3, // number
    uuid: '576709241931300878', 
    idType: 'baseid', // 根據實際情況設置
    webId: '576709241931300878',
    onEvent: function(eventName, eventParams) {
      eventParams.activity_id = '';
      window.collectEvent(eventName, eventParams);
    }
  });

  // 資源位ID，請替換為你在GMP後台配置的resourceId
  const resourceId = '6d32f02b6f200f82c783f5d8cd7d435d';


  // 創建資源位視圖
  let resourceView = sdk.createResourceView('.resource_container', {
    showPagination: true, 
    autoScroll: true, 
    autoScrollTimeInterval: 3,
    backgroundSize: "cover",
    onClick: function(item, index) { 
      // 點擊回調，可自定義上報
      console.log(item,index)
      if (item.navigate_url) {
      window.open(item.navigate_url, '_blank');
      }
    },
    onShow: function(item, index) { 
      // 曝光回調，可自定義上報
    },
  });

  resourceView.loadResource(resourceId);


document.addEventListener('DOMContentLoaded', function() {
  var ctaBtn = document.querySelector('.cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', function() {
      window.collectEvent('apply_test', {});
      alert('感謝您的申請！(此為示範訊息)');
    });
  }
});

