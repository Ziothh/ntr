/* NOTE: THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT. */


export const PAGES_ROUTES = [
  {
    "urlPath": "/",
    "absolutePath": "/home/zioth/projects/libs/nra/playground/src/pages",
    "relativePath": "./",
    "router": {
      "type": "pages"
    },
    "params": null,
    "purpose": "page",
    "parentIndex": null
  },
  {
    "urlPath": "/api/trpc/[trpc]",
    "absolutePath": "/home/zioth/projects/libs/nra/playground/src/pages/api/trpc/[trpc].ts",
    "relativePath": "./api/trpc/[trpc]",
    "router": {
      "type": "pages"
    },
    "params": [
      {
        "type": "single",
        "key": "trpc"
      }
    ],
    "purpose": "page",
    "parentIndex": 0
  },
  {
    "urlPath": "/api/auth/[...nextauth]",
    "absolutePath": "/home/zioth/projects/libs/nra/playground/src/pages/api/auth/[...nextauth].ts",
    "relativePath": "./api/auth/[...nextauth]",
    "router": {
      "type": "pages"
    },
    "params": [
      {
        "type": "single",
        "key": "...nextauth"
      }
    ],
    "purpose": "page",
    "parentIndex": 0
  },
  {
    "urlPath": "/orders",
    "absolutePath": "/home/zioth/projects/libs/nra/playground/src/pages/orders",
    "relativePath": "./orders",
    "router": {
      "type": "pages"
    },
    "params": null,
    "purpose": "page",
    "parentIndex": 0
  },
  {
    "urlPath": "/orders/page",
    "absolutePath": "/home/zioth/projects/libs/nra/playground/src/pages/orders/page.tsx",
    "relativePath": "./orders/page",
    "router": {
      "type": "pages"
    },
    "params": null,
    "purpose": "page",
    "parentIndex": 3
  },
  {
    "urlPath": "/orders/[userId]",
    "absolutePath": "/home/zioth/projects/libs/nra/playground/src/pages/orders/[userId]",
    "relativePath": "./orders/[userId]",
    "router": {
      "type": "pages"
    },
    "params": [
      {
        "type": "single",
        "key": "userId"
      }
    ],
    "purpose": "page",
    "parentIndex": 3
  },
  {
    "urlPath": "/orders/[userId]/[orderId]",
    "absolutePath": "/home/zioth/projects/libs/nra/playground/src/pages/orders/[userId]/[orderId]",
    "relativePath": "./orders/[userId]/[orderId]",
    "router": {
      "type": "pages"
    },
    "params": [
      {
        "type": "single",
        "key": "userId"
      },
      {
        "type": "single",
        "key": "orderId"
      }
    ],
    "purpose": "page",
    "parentIndex": 5
  }
] as const;
export const APP_ROUTES = [
  {
    "urlPath": "/products",
    "absolutePath": "/home/zioth/projects/libs/nra/playground/src/app/products/page.tsx",
    "relativePath": "./products/page",
    "router": {
      "type": "app",
      "loading": false,
      "error": false,
      "layout": false,
      "template": false,
      "notFound": false
    },
    "params": null,
    "purpose": "page",
    "parentIndex": null
  },
  {
    "urlPath": "/products/[id]",
    "absolutePath": "/home/zioth/projects/libs/nra/playground/src/app/products/[id]/page.tsx",
    "relativePath": "./products/[id]/page",
    "router": {
      "type": "app",
      "loading": false,
      "error": false,
      "layout": false,
      "template": false,
      "notFound": false
    },
    "params": [
      {
        "type": "single",
        "key": "id"
      }
    ],
    "purpose": "page",
    "parentIndex": 0
  },
  {
    "urlPath": "/products/[id]/[variant]",
    "absolutePath": "/home/zioth/projects/libs/nra/playground/src/app/products/[id]/[variant]/page.tsx",
    "relativePath": "./products/[id]/[variant]/page",
    "router": {
      "type": "app",
      "loading": false,
      "error": false,
      "layout": false,
      "template": false,
      "notFound": false
    },
    "params": [
      {
        "type": "single",
        "key": "id"
      },
      {
        "type": "single",
        "key": "variant"
      }
    ],
    "purpose": "page",
    "parentIndex": 1
  },
  {
    "urlPath": "/user",
    "absolutePath": "/home/zioth/projects/libs/nra/playground/src/app/user/page.tsx",
    "relativePath": "./user/page",
    "router": {
      "type": "app",
      "loading": false,
      "error": false,
      "layout": false,
      "template": false,
      "notFound": false
    },
    "params": null,
    "purpose": "page",
    "parentIndex": null
  },
  {
    "urlPath": "/user/[userId]",
    "absolutePath": "/home/zioth/projects/libs/nra/playground/src/app/user/[userId]/page.tsx",
    "relativePath": "./user/[userId]/page",
    "router": {
      "type": "app",
      "loading": false,
      "error": false,
      "layout": false,
      "template": false,
      "notFound": false
    },
    "params": [
      {
        "type": "single",
        "key": "userId"
      }
    ],
    "purpose": "page",
    "parentIndex": 3
  },
  {
    "urlPath": "/user/[userId]/[orderId]",
    "absolutePath": "/home/zioth/projects/libs/nra/playground/src/app/user/[userId]/[orderId]/page.tsx",
    "relativePath": "./user/[userId]/[orderId]/page",
    "router": {
      "type": "app",
      "loading": false,
      "error": false,
      "layout": false,
      "template": false,
      "notFound": false
    },
    "params": [
      {
        "type": "single",
        "key": "userId"
      },
      {
        "type": "single",
        "key": "orderId"
      }
    ],
    "purpose": "page",
    "parentIndex": 4
  }
] as const;