import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * @login           登录
 * ///////////////////////
 * @404             404页面
 * ///////////////////////
 * @user            用户管理
 * ///////////////////////
 * /                首页
 * ///////////////////////
 * @article         文章管理
 * @articleList     文章列表
 * @articleCategory 文章分类
 * @articleTags     文章标签
 * @articleType     文章类型
 * ////////////////////////
 * @root            权限管理
 * ////////////////////////
 * @comment         评论管理
 * ////////////////////////
 * @feedBack        反馈管理
 * ////////////////////////
 * @external-link   外部链接
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'dashboard', icon: 'dashboard' }
    }]
  },
  // 用户管理
  {
    path: '/userManage',
    component: Layout,
    redirect: 'noRedirect',
    name: 'UserManage',
    meta: {
      title: 'user',
      icon: 'user'
    },
    children: [
      {
        path: 'manager',
        name: 'Manager',
        component: () => import('@/views/user/manager'),
        meta: { title: 'mangerList', icon: 'list' }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/user'),
        meta: { title: 'userList', icon: 'list' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/articleList',
    name: 'Article',
    meta: {
      title: 'article',
      icon: 'education'
    },
    children: [
      {
        path: 'articleList',
        component: () => import('@/views/article/article-list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      },
      {
        path: 'articleCategory',
        component: () => import('@/views/article/article-category'),
        name: 'ArticleCategory',
        meta: { title: 'articleCategory', icon: 'component' }
      },
      {
        path: 'articleTags',
        component: () => import('@/views/article/article-tags'),
        name: 'ArticleTags',
        meta: { title: 'articleTags', icon: 'tags' }
      },
      {
        path: 'articleType',
        component: () => import('@/views/article/article-type'),
        name: 'ArticleType',
        meta: { title: 'articleType', icon: 'type' }
      }
    ]
  },
  {
    path: '/root',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Root',
        component: () => import('@/views/root/index'),
        meta: { title: 'root', icon: 'user-root' }
      }
    ]
  },
  {
    path: '/comment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Comment',
        component: () => import('@/views/comment/index'),
        meta: { title: 'comment', icon: 'comment' }
      }
    ]
  },
  {
    path: '/feedBack',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'FeedBack',
        component: () => import('@/views/feed-back/index'),
        meta: { title: 'feedBack', icon: 'feed-back' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/LeoChenXY',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
