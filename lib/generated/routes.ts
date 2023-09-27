export namespace Routes {

  export type Pages = 
    | "/api/trpc/[trpc]"
    | "/api/trpc/docs"
    | "/api/auth/[...nextauth]"
    | "/404"
    | "/not-implemented"

  export type App = 
    | "/fuel-plans/[id]/print/recovery"
    | "/fuel-plans/[id]/print/during"
    | "/fuel-plans/[id]/recovery"
    | "/fuel-plans/[id]/during"
    | "/fuel-plans/[id]/statistics"
    | "/fuel-plans/[id]/settings"
    | "/fuel-plans/[id]"
    | "/fuel-plans/new"
    | "/fuel-plans"
    | "/chat"
    | "/about"
    | "/admin"
    | "/install"
    | "/shop"
    | "/shop/cart"
    | "/faq"
    | "/user/algemeen"
    | "/user/atleet"
    | "/user"
    | "/debug"
    | "/help"
    | "/auth/forgot-password/[id]"
    | "/auth/forgot-password"
    | "/auth/register"
    | "/auth/login"
    | "/auth/logout"
    | "/welcome"

  export type All = Pages | App

}