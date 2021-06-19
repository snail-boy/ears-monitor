import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'project',
          name: '项目管理',
          meta: {
            icon: 'form',
          },
          component: PageView,
          children: [
            {
              path: 'addEnd',
              name: '新建后台项目',
              component: () => import('@/pages/project/addEnd'),
            },
            {
              path: 'addFront',
              name: '新建前端项目',
              component: () => import('@/pages/project/addFront'),
            }
          ]
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: {
            icon: 'dashboard'
          },
          component: BlankView,
          children: [
            {
              path: 'workplace',
              name: '网站概况',
              meta: {
                page: {
                  closable: false
                }
              },
              component: () => import('@/pages/dashboard/workplace'),
            },
            {
              path: 'analysis',
              name: '用户分析概况',
              component: () => import('@/pages/dashboard/analysis'),
            }, {
              path: 'event',
              name: '事件分析',
              component: () => import('@/pages/dashboard/event'),
            }
          ]
        },
        {
          path: 'monitor',
          name: '回溯管理',
          meta: {
            icon: 'form',
            page: {
              cacheAble: false
            }
          },
          component: PageView,
          children: [
            {
              path: 'replaySetting',
              name: '视频配置',
              component: () => import('@/pages/monitor/replaySetting'),
            },
            {
              path: 'replayList',
              name: '视频列表',
              component: () => import('@/pages/monitor/replayList'),
            }, {
              path: 'replay',
              name: '视频回放',
              component: () => import('@/pages/monitor/replay'),
            }
          ]
        },

        {
          path: 'exception',
          name: '异常页',
          meta: {
            icon: 'warning',
          },
          component: BlankView,
          children: [
            {
              path: '404',
              name: 'Exp404',
              component: () => import('@/pages/exception/404')
            },
            {
              path: '403',
              name: 'Exp403',
              component: () => import('@/pages/exception/403')
            },
            {
              path: '500',
              name: 'Exp500',
              component: () => import('@/pages/exception/500')
            }
          ]
        }
      ]
    },
  ]
}

export default options
