import Login from './views/login/Login.vue'
import Register from './views/login/Register.vue'
import Forget from './views/login/Forget.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Table from './views/nav3/Table.vue'
import Form from './views/nav3/Form.vue'
import user from './views/nav3/user.vue'
import Page5 from './views/nav2/TinymceDemo.vue'
import echarts from './views/charts/echarts.vue'
import NewBill from './views/bill/NewBill.vue'
import EditBill from './views/bill/EditBill.vue'
import ChartsBill from './views/bill/ChartsBill.vue'

let routes = [
    {
        path: '/register',
        component: Register,
        name: '',
        hidden: true
    },
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/forget',
        component: Forget,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/new_bill', component: NewBill, name: '新建账单' },
            { path: '/edit_bill', component: EditBill, name: '查看账单' },
            { path: '/charts_bill', component: ChartsBill, name: '账单报表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page5, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航三',
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
            { path: '/table', component: Table, name: 'Table' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;