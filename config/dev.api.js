let APIUri = {
  AssistData: {
    PayMethodURL: 'http://localhost/index.php/api/AssistData/PayMethod',
    ShippingMethodURL: 'http://localhost/index.php/api/AssistData/ShippingMethod'
  },
  Staff: {
    validateURL: 'http://localhost/index.php/api/Staff/validate'
  },
  Purchase: {
    PurchaseOrder: {
      fetchURL: 'http://localhost/index.php/api/PurchaseOrder/fetch',
      detailURL: 'http://localhost/index.php/api/PurchaseOrder/detail'
    },
    PurchaseReturn: {
      fetchURL: 'http://localhost/index.php/api/PurchaseReturn/fetch'
    }
  },
  Sales: {
    SalesQuote: {
      fetchURL: 'http://localhost/index.php/api/SalesQuote/fetch',
      detailURL: 'http://localhost/index.php/api/SalesQuote/detail'
    },
    SalesOrder: {
      fetchURL: 'http://localhost/index.php/api/SalesOrder/fetch',
      detailURL: 'http://localhost/index.php/api/SalesOrder/detail'
    },
    SalesReturn: {
      fetchURL: 'http://localhost/index.php/api/SalesReturn/fetch'
    }
  },
  Warehouse: {
    AllocationList: {
      fetchURL: 'http://localhost/index.php/api/AllocationList/fetch'
    },
    PurchaseInbound: {
      fetchURL: 'http://localhost/index.php/api/PurchaseInbound/fetch',
      detailURL: 'http://localhost/index.php/api/PurchaseInbound/detail'
    },
    SalesOutbound: {
      fetchURL: 'http://localhost/index.php/api/SalesOutbound/fetch',
      detailURL: 'http://localhost/index.php/api/SalesOutbound/detail'
    },
    OtherInbound: {
      fetchURL: 'http://localhost/index.php/api/OtherInbound/fetch',
      detailURL: 'http://localhost/index.php/api/OtherInbound/detail'
    },
    OtherOutbound: {
      fetchURL: 'http://localhost/index.php/api/OtherOutbound/fetch',
      detailURL: 'http://localhost/index.php/api/OtherOutbound/detail'
    }
  },
  PayMethod: []
}

export default APIUri
