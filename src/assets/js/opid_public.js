import  wxopenidConfig from '../js/opid_config'


// 在下面替换不同的openid:
// 1. DEVE线上环境；
// 2. ZK 周的openid；
// 3. LDX李的openid。
window.ENV = "DEVE";
let open_id;

if (window.ENV !== "undefined") {

  switch (window.ENV) {

    case "DEVE":
      open_id = wxopenidConfig.devopenid;
      break;

    case "ZK":
      open_id = wxopenidConfig.zkopenid;
      break;

    case "LDX":
      open_id = wxopenidConfig.ldxopenid;
      break;
    default:
      open_id = '0x0000';
      break;
  }
}

export {open_id}