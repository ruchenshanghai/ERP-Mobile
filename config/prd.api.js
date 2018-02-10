let APIUri = {
  AssistData: {
    PayMethodURL: '/index.php/api/AssistData/PayMethod',
    ShippingMethodURL: '/index.php/api/AssistData/ShippingMethod',
    AccountURL: '/index.php/api/AssistData/Account',
    ContactURL: '/index.php/api/AssistData/Contact',
    ContactConfig: {
      CustomerType: -10,
      SupplierType: 10
    },
    WarehouseURL: '/index.php/api/AssistData/Warehouse',
    CurrencyURL: '/index.php/api/AssistData/Currency',
    InventoryURL: '/index.php/api/AssistData/Inventory',
    UnitURL: '/index.php/api/AssistData/Unit'
  },
  Staff: {
    validateURL: '/index.php/api/Staff/validate'
  },
  Purchase: {
    PurchaseOrder: {
      fetchURL: '/index.php/api/PurchaseOrder/fetch',
      detailURL: '/index.php/api/PurchaseOrder/detail'
    },
    PurchaseReturn: {
      fetchURL: '/index.php/api/PurchaseReturn/fetch'
    }
  },
  Sales: {
    SalesQuote: {
      fetchURL: '/index.php/api/SalesQuote/fetch',
      detailURL: '/index.php/api/SalesQuote/detail'
    },
    SalesOrder: {
      fetchURL: '/index.php/api/SalesOrder/fetch',
      detailURL: '/index.php/api/SalesOrder/detail'
    },
    SalesReturn: {
      fetchURL: '/index.php/api/SalesReturn/fetch'
    }
  },
  Warehouse: {
    AllocationList: {
      fetchURL: '/index.php/api/AllocationList/fetch'
    },
    PurchaseInbound: {
      fetchURL: '/index.php/api/PurchaseInbound/fetch',
      detailURL: '/index.php/api/PurchaseInbound/detail'
    },
    SalesOutbound: {
      fetchURL: '/index.php/api/SalesOutbound/fetch',
      detailURL: '/index.php/api/SalesOutbound/detail'
    },
    OtherInbound: {
      fetchURL: '/index.php/api/OtherInbound/fetch',
      detailURL: '/index.php/api/OtherInbound/detail'
    },
    OtherOutbound: {
      fetchURL: '/index.php/api/OtherOutbound/fetch',
      detailURL: '/index.php/api/OtherOutbound/detail'
    }
  },
  PayMethod: [],
  ShippingMethod: [],
  Account: [],
  SupplierContact: [],
  CustomerContact: [],
  Warehouse: [],
  Inventory: [],
  Unit: []
}

export default APIUri
