/* NOTE: THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT. */


export const PAGES_ROUTES = [
  {
    "urlPath": "/api/pagesApi",
    "absolutePath": "/home/zioth/projects/libs/ntr/playground/src/pages/api/pagesApi.ts",
    "relativePath": "./api/pagesApi",
    "router": {
      "type": "pages"
    },
    "params": null,
    "purpose": "page",
    "parentIndex": null
  },
  {
    "urlPath": "/pages-router/required/[...required]",
    "absolutePath": "/home/zioth/projects/libs/ntr/playground/src/pages/pages-router/required/[...required]",
    "relativePath": "./pages-router/required/[..",
    "router": {
      "type": "pages"
    },
    "params": [
      {
        "type": "catchAll",
        "name": "required",
        "optional": false
      }
    ],
    "purpose": "page",
    "parentIndex": null
  },
  {
    "urlPath": "/pages-router/optional/[[...optional]]",
    "absolutePath": "/home/zioth/projects/libs/ntr/playground/src/pages/pages-router/optional/[[...optional]]",
    "relativePath": "./pages-router/optional/[[..",
    "router": {
      "type": "pages"
    },
    "params": [
      {
        "type": "catchAll",
        "name": "optional",
        "optional": true
      }
    ],
    "purpose": "page",
    "parentIndex": null
  },
  {
    "urlPath": "/orders",
    "absolutePath": "/home/zioth/projects/libs/ntr/playground/src/pages/orders",
    "relativePath": "./orders",
    "router": {
      "type": "pages"
    },
    "params": null,
    "purpose": "page",
    "parentIndex": null
  },
  {
    "urlPath": "/orders/page",
    "absolutePath": "/home/zioth/projects/libs/ntr/playground/src/pages/orders/page.tsx",
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
    "absolutePath": "/home/zioth/projects/libs/ntr/playground/src/pages/orders/[userId]",
    "relativePath": "./orders/[userId]",
    "router": {
      "type": "pages"
    },
    "params": [
      {
        "type": "single",
        "name": "userId"
      }
    ],
    "purpose": "page",
    "parentIndex": 3
  },
  {
    "urlPath": "/orders/[userId]/[orderId]",
    "absolutePath": "/home/zioth/projects/libs/ntr/playground/src/pages/orders/[userId]/[orderId]",
    "relativePath": "./orders/[userId]/[orderId]",
    "router": {
      "type": "pages"
    },
    "params": [
      {
        "type": "single",
        "name": "userId"
      },
      {
        "type": "single",
        "name": "orderId"
      }
    ],
    "purpose": "page",
    "parentIndex": 5
  }
] as const;
export const APP_ROUTES = [
  {
    "urlPath": "/",
    "absolutePath": "/home/zioth/projects/libs/ntr/playground/src/app/page.tsx",
    "relativePath": "./page",
    "router": {
      "type": "app",
      "loading": false,
      "error": false,
      "layout": true,
      "template": false,
      "notFound": false
    },
    "params": null,
    "purpose": "page",
    "parentIndex": null
  },
  {
    "urlPath": "/api/trpc/[trpc]",
    "absolutePath": "/home/zioth/projects/libs/ntr/playground/src/app/api/trpc/[trpc]/route.ts",
    "relativePath": "./api/trpc/[trpc]/route",
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
        "name": "trpc"
      }
    ],
    "purpose": "API",
    "parentIndex": 0
  },
  {
    "urlPath": "/app-router/required/[...required]",
    "absolutePath": "/home/zioth/projects/libs/ntr/playground/src/app/app-router/required/[...required]/page.tsx",
    "relativePath": "./app-router/required/[...required]/page",
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
        "type": "catchAll",
        "name": "required",
        "optional": false
      }
    ],
    "purpose": "page",
    "parentIndex": 0
  },
  {
    "urlPath": "/app-router/optional/[[...optional]]",
    "absolutePath": "/home/zioth/projects/libs/ntr/playground/src/app/app-router/optional/[[...optional]]/page.tsx",
    "relativePath": "./app-router/optional/[[...optional]]/page",
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
        "type": "catchAll",
        "name": "optional",
        "optional": true
      }
    ],
    "purpose": "page",
    "parentIndex": 0
  },
  {
    "urlPath": "/products",
    "absolutePath": "/home/zioth/projects/libs/ntr/playground/src/app/products/page.tsx",
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
    "parentIndex": 0
  },
  {
    "urlPath": "/products/[id]",
    "absolutePath": "/home/zioth/projects/libs/ntr/playground/src/app/products/[id]/page.tsx",
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
        "name": "id"
      }
    ],
    "purpose": "page",
    "parentIndex": 4
  },
  {
    "urlPath": "/products/[id]/[variant]",
    "absolutePath": "/home/zioth/projects/libs/ntr/playground/src/app/products/[id]/[variant]/page.tsx",
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
        "name": "id"
      },
      {
        "type": "single",
        "name": "variant"
      }
    ],
    "purpose": "page",
    "parentIndex": 5
  },
  {
    "urlPath": "/user",
    "absolutePath": "/home/zioth/projects/libs/ntr/playground/src/app/user/page.tsx",
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
    "parentIndex": 0
  },
  {
    "urlPath": "/user/[userId]",
    "absolutePath": "/home/zioth/projects/libs/ntr/playground/src/app/user/[userId]/page.tsx",
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
        "name": "userId"
      }
    ],
    "purpose": "page",
    "parentIndex": 7
  },
  {
    "urlPath": "/user/[userId]/[orderId]",
    "absolutePath": "/home/zioth/projects/libs/ntr/playground/src/app/user/[userId]/[orderId]/page.tsx",
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
        "name": "userId"
      },
      {
        "type": "single",
        "name": "orderId"
      }
    ],
    "purpose": "page",
    "parentIndex": 8
  }
] as const;